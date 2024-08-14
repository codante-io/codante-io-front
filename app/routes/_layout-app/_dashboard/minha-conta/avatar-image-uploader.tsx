import React, { useState, useCallback } from "react";
import { useSubmit } from "@remix-run/react";
import type { Area, Point } from "react-easy-crop";
import Cropper from "react-easy-crop";
import { Button } from "~/components/ui/button";
import { Send } from "lucide-react";
import { Slider } from "~/components/ui/slider";

const AvatarUpload: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const submit = useSubmit();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && typeof e.target.result === "string") {
          setImage(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  const getCroppedImage = async (): Promise<Blob | null> => {
    if (!croppedAreaPixels || !image) return null;

    const canvas = document.createElement("canvas");
    const img = new Image();
    img.src = image;
    await new Promise((resolve) => {
      img.onload = resolve;
    });

    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;
    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;
    const ctx = canvas.getContext("2d");

    if (!ctx) return null;

    ctx.drawImage(
      img,
      croppedAreaPixels.x * scaleX,
      croppedAreaPixels.y * scaleY,
      croppedAreaPixels.width * scaleX,
      croppedAreaPixels.height * scaleY,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, "image/jpeg");
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const croppedImage = await getCroppedImage();
    if (croppedImage) {
      const formData = new FormData();
      formData.append("avatar", croppedImage, "avatar.jpg");
      formData.append("intent", "avatar-submission");
      submit(formData, { method: "post", encType: "multipart/form-data" });
    }
  };

  const cancelImage = () => {
    setImage(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
  };

  return (
    <div>
      {!image ? (
        <input type="file" accept="image/*" onChange={onFileChange} />
      ) : (
        <div>
          <div style={{ position: "relative", width: "100%", height: 300 }}>
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
          <div className="w-full max-w-sm mt-4 mx-auto">
            <Slider
              defaultValue={[1]}
              value={[zoom]}
              max={3}
              min={1}
              step={0.1}
              onValueChange={(value) => setZoom(value[0])}
            />
          </div>

          <form onSubmit={onSubmit} className="flex gap-2 mt-8">
            <Button type="submit" className="flex gap-2 items-center">
              <Send className="h-4 w-4" />
              Submeter
            </Button>
            <Button variant="outline" type="button" onClick={cancelImage}>
              Cancelar
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AvatarUpload;
