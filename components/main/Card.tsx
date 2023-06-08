"use client";

import {AiTwotoneHeart, AiOutlineComment} from 'react-icons/ai'

import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from 'next/image';
import Link from 'next/link';

interface CardsProps {
  id : string
  localName : string
  koreanName : string
  latitude: string
  longitude: string
  address : string
  title : string
  description : string
  menu : string[]
  phoneNumber : string
  mainImage : string
  subImages : string[] 
  link : string
  comments?: {
    createdAt: string
    id: string
    postId: string
    userId: string
  }[]
}

const Cards:React.FC<CardsProps> = ({
  id,
  localName,
  koreanName,
  latitude,
  longitude,
  address,
  title,
  description,
  menu,
  phoneNumber,
  mainImage,
  subImages,
  link,
  comments,
}) => {

  return (
    <Link href={`/market/${id}`}>
      <Card className="bg-gradient-to-r from-zinc-100 to-white dark:from-zinc-800 dark:to-zinc-800 shadow-md hover:translate-y-[1px] hover:translate-x-[1px] ease-linear duration-75 transition-all cursor-pointer flex flex-col justify-end pt-6 ">
      <CardContent className="grid gap-2">
        <div className="flex items-center justify-between space-x-2">
          <div className="flex items-center space-x-2">
            <div>
              <div className='relative h-[150px] w-[150px] sm:h-[180px] sm:w-[180px] object-cover overflow-hidden'>
                <Image 
                  src={mainImage} 
                  alt={title}
                  fill
                  className='object-contain rounded-md'
                />
              </div>
            </div>
            <div className='flex flex-col gap-[1px]'>
              <p className="text-md sm:text-sm font-bold leading-none">{title}</p>
              <p className="text-sm sm:text-sm text-gray-700 dark:text-gray-300">{address}</p>
              <p className="text-sm sm:text-sm mb-2 underline">{description}</p>
              <div className="text-sm text-muted-foreground flex flex-wrap gap-2">
                {menu.map((a) => <Badge variant="secondary" className="cursor-pointer" key={a}>{a}</Badge>)}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className='text-sm flex'>
              <AiTwotoneHeart size={14} fill="#ff2402"/>
              <span>
                (0)
              </span>
            </span>
            <span className='text-sm flex'>
              <AiOutlineComment size={14} />({comments?.length})
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  </Link>
  )
}

export default Cards
