"use client";

import Image, { ImageProps } from "next/image";

import bunnyLoader from "@/lib/image-loader";
import { cn } from "@/lib/utils";

const BunnyImage = (props: ImageProps) => {
  return (
    <Image loader={bunnyLoader} className={cn(props.className)} {...props} />
  );
};

export default BunnyImage;
