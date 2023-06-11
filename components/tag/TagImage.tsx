"use client";
import React from 'react'
import Carousel from '../carosuel';
import Image from 'next/image';

interface TagImageProps {
  image : string[]
}

const TagImage:React.FC<TagImageProps> = ({image}) => {
  return (
    <Carousel loop>
      {image.map((src: string) => {
        return (
          <div className="relative h-[150px] w-[200px] sm:h-60 flex-[0_0_100%]" key={src}>
            <Image 
            priority={true}
              style={{borderRadius: "10px"}} 
            src={src} 
            fill 
            className="object-cover" 
            alt="alt"  
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
          </div>
        );
      })}
  </Carousel>
  )
}

export default TagImage
