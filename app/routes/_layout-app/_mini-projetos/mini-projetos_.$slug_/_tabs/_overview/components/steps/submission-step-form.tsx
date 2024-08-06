import { useState } from "react";
import Step from "./step";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { InfoIcon } from "lucide-react";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

registerPlugin(FilePondPluginFileValidateType);

export default function SubmissionStepForm({
  user,
  slug,
}: {
  user: any;
  slug: string;
}) {
  const [hasDeployUrl, setHasDeployUrl] = useState(true);

  function handleToggleHasDeploy() {
    setHasDeployUrl((prev) => !prev);
  }

  return (
    <Step.Form
      encType="multipart/form-data" // important!
      user={user}
      slug={slug}
      className="mt-4"
    >
      {hasDeployUrl && (
        <>
          <Input
            placeholder="URL do seu deploy"
            name="submission-url"
            id="submission-url"
            className="pr-1 dark:bg-background-900 w-full"
          />

          <div className="flex justify-between gap-1">
            <Step.PrimaryButton stepId="submit-challenge">
              Submeter
            </Step.PrimaryButton>
            <Button
              variant={"link"}
              type="button"
              className="text-xs pr-2 pl-2 dark:text-gray-500"
              onClick={handleToggleHasDeploy}
            >
              Não tem deploy?
            </Button>
          </div>
        </>
      )}
      {!hasDeployUrl && (
        <div>
          <p className="font-light text-gray-400 mb-4">
            <span>
              <InfoIcon className="w-4 h-4 inline-block mr-1" />
            </span>
            Envie o screenshot da sua aplicação por aqui. A imagem idealmente
            deverá possuir 1920x1080 pixels. Uma ferramenta útil e gratuita é o{" "}
            <a
              className="hover:underline"
              target="_blank"
              href="https://screenshot.rocks"
              rel="noreferrer"
            >
              Screenshot.rocks
            </a>
            . Você poderá substituir a imagem depois.
          </p>
          <FilePond
            labelIdle="Arraste a imagem ou <span class='filepond--label-action'>clique aqui</span>"
            labelThousandsSeparator="."
            storeAsFile={true}
            required
            acceptedFileTypes={["image/*"]}
            name={"submission_image"}
            credits={false}
          />
          <div className="flex justify-between gap-1">
            <Step.PrimaryButton stepId="submit-challenge-without-deploy">
              Submeter
            </Step.PrimaryButton>
            <Button
              variant={"link"}
              type="button"
              className="text-xs pr-2 pl-2 dark:text-gray-500"
              onClick={handleToggleHasDeploy}
            >
              Possui deploy?
            </Button>
          </div>
        </div>
      )}
    </Step.Form>
  );
}
