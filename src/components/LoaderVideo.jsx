import { useEffect, useRef } from "react";
import loaderVideo from "../assets/loader.mp4";
import { ensureLoaderVideoReady } from "../utils/preloadMedia";

function LoaderVideo({ visible }) {
  const videoRef = useRef(null);
  const readyRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    const startPlayback = () => {
      const video = videoRef.current;
      if (cancelled || !video || readyRef.current) return;
      readyRef.current = true;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = "auto";
      video.play().catch(() => {});
    };

    ensureLoaderVideoReady(loaderVideo).then((src) => {
      const video = videoRef.current;
      if (cancelled || !video) return;

      video.src = src;
      video.load();

      if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        startPlayback();
        return;
      }

      video.addEventListener("loadeddata", startPlayback, { once: true });
    });

    return () => {
      cancelled = true;
      videoRef.current?.removeEventListener("loadeddata", startPlayback);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !visible || !readyRef.current) return;
    video.play().catch(() => {});
  }, [visible]);

  return (
    <div
      className={`loader-video-host ${visible ? "loader-video-host--visible" : "loader-video-host--warming"}`}
      aria-hidden={!visible}
    >
      <video
        ref={videoRef}
        className="submission-loader__video"
        muted
        loop
        playsInline
        preload="auto"
      />
    </div>
  );
}

export default LoaderVideo;
