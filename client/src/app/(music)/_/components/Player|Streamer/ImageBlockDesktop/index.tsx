import Image from "next/image";
import { RefObject } from "react";

import styles from "./styles.module.scss";

type ImageBlockProps = {
  isLoading: boolean;
  currentPlayRef: RefObject<{
    id: string;
    title: string;
    cover: string;
    url: string;
    duration?: string;
    urlId?: string;
    addedAt?: Date;
    userId?: string;
  }>;
};

export function ImageBlockDesktop({ isLoading, currentPlayRef }: ImageBlockProps) {
  return (
    <div className={styles.imageBlockDesktop}>
      {isLoading ? (
        <div className={styles.skeletonImage} />
      ) : currentPlayRef.current ? (
        <Image
          src={currentPlayRef.current?.cover || ""}
          alt="cover"
          width={50}
          height={50}
          unoptimized
        />
      ) : (
        <div className={styles.imagePlaceholder} />
      )}
    </div>
  );
}