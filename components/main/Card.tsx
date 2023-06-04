"use client";

import {AiTwotoneHeart} from 'react-icons/ai'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from 'next/image';

interface CardsProps {
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

  console.log(menu)

  return (
    <Card className="bg-gradient-to-r from-red-500 to-red-300 shadow-md hover:translate-y-[1px] hover:translate-x-[1px] ease-linear duration-75 transition-all cursor-pointer flex flex-col justify-end pt-6 ">
    <CardContent className="grid gap-6">
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-4">
          <div className='rounded-full'>
            <Image src={mainImage} alt={title} width={150} height={150} className='object-cover'/>
          </div>
          <div className='flex flex-col gap-[1px]'>
            <p className="text-md font-bold leading-none">{title}</p>
            <p className="text-sm text-muted-foreground">{address}</p>
            <p className="text-sm mb-2 underline">{description}</p>
            <div className="text-sm text-muted-foreground flex flex-wrap gap-2">
              {menu.map((a) => <Badge variant="secondary" className="cursor-pointer">{a}</Badge>)}
            </div>
          </div>
        </div>
        <div className="curor-pointer">
          <AiTwotoneHeart size={25} fill="#ff2402"/>
        </div>
      </div>
    </CardContent>
  </Card>
  )
}

export default Cards
