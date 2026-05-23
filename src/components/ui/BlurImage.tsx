"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/utils/cn";

interface BlurImageProps extends Omit<ImageProps, "onLoadingComplete"> {
  containerClassName?: string;
}

export default function BlurImage({ className, containerClassName, alt, ...props }: BlurImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={cn("overflow-hidden", containerClassName)}>
      <Image
        alt={alt}
        className={cn(
          "transition-all duration-700 ease-in-out",
          loaded ? "scale-100 blur-0" : "scale-105 blur-sm",
          className
        )}
        onLoad={() => setLoaded(true)}
        {...props}
      />
    </div>
  );
}
