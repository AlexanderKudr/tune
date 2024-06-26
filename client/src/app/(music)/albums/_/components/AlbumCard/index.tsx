"use client";
import Image from "next/image";
import React from "react";

import styles from "./styles.module.scss";

interface AlbumCardProps {
  gradient: string;
  title: string;
  description: string;
  cover?: string;
}

export function AlbumCard({ cover, description, title, gradient }: AlbumCardProps) {
  return (
    <div className={styles.Album}>
      <div className={styles.imageOrRgb}>
        {cover ? (
          <Image src={cover} alt="" />
        ) : (
          <div className={styles.rgb} style={{ background: gradient }}></div>
        )}
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}
