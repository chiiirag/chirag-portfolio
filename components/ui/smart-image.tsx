import Image, { type ImageProps } from "next/image";
import { canOptimizeImage } from "@/lib/utils";

type Props = Omit<ImageProps, "src"> & { src: string };

/** next/image that skips optimisation for hosts not listed in images.remotePatterns. */
export function SmartImage({ src, alt, ...props }: Props) {
  return <Image src={src} alt={alt} unoptimized={!canOptimizeImage(src)} {...props} />;
}
