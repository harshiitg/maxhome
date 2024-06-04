export const loadImage = (src, alt, height, width) => {
  return (
    <img src={src} height={height} alt={alt} width={width} loading="lazy" />
  );
};
