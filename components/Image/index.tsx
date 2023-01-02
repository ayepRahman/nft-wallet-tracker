// https://github.com/chakra-ui/chakra-ui/discussions/2475#discussioncomment-1186993

import NextImage, { ImageProps } from "next/image";
import brokenImg from "public/images/broken.jpeg";
import React from "react";

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#4A5568" offset="20%" />
      <stop stop-color="#333b49" offset="50%" />
      <stop stop-color="#4A5568" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#4A5568" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

const Image: React.FC<ImageProps> = ({ src, ...props }) => {
  const [isError, setIsError] = React.useState<boolean>(false);

  const handleOnError = () => {
    setIsError(true);
  };

  const imgSrc = isError ? brokenImg : src || brokenImg;

  return (
    <NextImage
      src={imgSrc}
      onError={handleOnError}
      placeholder="blur"
      blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
      {...props}
    />
  );
};

export default Image;
