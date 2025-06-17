"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";

type Props = {
  imageUrl: string;
};

const ProductZoomImage = ({ imageUrl }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [backgroundPosition, setBackgroundPosition] = useState("center");
  const [isZoomed, setIsZoomed] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { left, top, width, height } =
      containerRef.current!.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;

    setBackgroundPosition(`${x}% ${y}%`);
  };

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
    setBackgroundPosition("center");
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full   lg:h-[400px] border overflow-hidden object-cover"
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: isZoomed ? "150%" : "100%",
        backgroundPosition,
        backgroundRepeat: "no-repeat",
        transition: "background-size",
      }}
    >
      <Image
        src={imageUrl}
        alt={`zoom-image-${imageUrl}`}
        width={800}
        height={800}
        className="opacity-0 w-full h-full hover:cursor-zoom-in"
      />
    </div>
  );
};

export default ProductZoomImage;
