let loaderBlobUrl = null;
let loaderBlobPromise = null;

export function ensureLoaderVideoReady(src) {
  if (loaderBlobUrl) {
    return Promise.resolve(loaderBlobUrl);
  }

  if (!loaderBlobPromise) {
    loaderBlobPromise = fetch(src)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to preload loader video.");
        }
        return response.blob();
      })
      .then((blob) => {
        loaderBlobUrl = URL.createObjectURL(blob);
        return loaderBlobUrl;
      })
      .catch(() => src);
  }

  return loaderBlobPromise;
}

export function preloadImage(src) {
  if (!src) return;
  const image = new Image();
  image.src = src;
}
