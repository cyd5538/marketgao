"use client";
import React from 'react'
import Carousel from '../carosuel';
import Image from 'next/image';

interface MarketImageProps {
  image : string[]
}

const MarketImage:React.FC<MarketImageProps> = ({image}) => {
  return (
    <Carousel loop>
      {image.map((src: string) => {
        return (
          <div className="relative h-96 md:h-[500px] flex-[0_0_100%]" key={src}>
            <Image src={src} fill className="object-cover" alt="alt" />
          </div>
        );
      })}
  </Carousel>
  )
}

export default MarketImage
