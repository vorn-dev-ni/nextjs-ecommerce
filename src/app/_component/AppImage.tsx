"use client";

import Image from "next/image";
import React from "react";

const AppImage = ({ imageUrl, styles }: { imageUrl: string; styles: any }) => {
  return (
    <div className="group relative overflow-hidden bg-gray-300 rounded-t-lg">
      <Image
        alt={`product-${imageUrl}`}
        src={imageUrl}
        priority
        width={150}
        height={150}
        className={`object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-150 cursor-zoom-in ${styles}`}
      />
    </div>
  );
};

export default AppImage;
