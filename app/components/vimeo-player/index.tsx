type VimeoPlayerProps = {
  vimeoUrl: string;
};

export default function VimeoPlayer({ vimeoUrl }: VimeoPlayerProps) {
  return (
    <div className="relative aspect-video">
      <div className="absolute top-0 z-0 w-full overflow-hidden opacity-1 lg:rounded-xl">
        <div style={{ padding: "56.30% 0 0 0", position: "relative" }}>
          <iframe
            src={vimeoUrl}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
            }}
            title="Codante.io"
          ></iframe>
        </div>
        <script src="https://player.vimeo.com/api/player.js"></script>
      </div>
    </div>
  );
}
