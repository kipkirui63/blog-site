import React from "react";
import avatarLogo from '../assets/bussiness-man.png'

export default function Avatar({
  height,
  src = avatarLogo,
  alt,
}) {
  return (
    <img
      src={src}
      className="rounded-circle"
      height={height}
      alt={alt}
      loading="lazy"
    />
  );
}
