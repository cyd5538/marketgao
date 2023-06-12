"use client";

import { AiTwotoneHeart, AiOutlineComment } from 'react-icons/ai'

import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from 'next/image';
import Link from 'next/link';

interface CardsProps {
  id: string
  localName: string
  koreanName: string
  latitude: string
  longitude: string
  address: string
  title: string
  description: string
  menu: string[]
  phoneNumber: string
  mainImage: string
  subImages: string[]
  link: string
  comments?: {
    createdAt: string
    id: string
    postId: string
    userId: string
  }[]
}

const Cards: React.FC<CardsProps> = ({
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

    <Card className=" dark:from-zinc-800 dark:to-zinc-800 shadow-md hover:translate-y-[1px] flex flex-col justify-end pt-6 ">
      <CardContent className="grid gap-2">
        <div className="flex items-center justify-between space-x-2">
          <div className="flex items-center space-x-2">
            <Link href={`/market/${id}`}>
              <div className='relative h-[150px] w-[150px] sm:h-[300px] sm:w-[250px] hover:scale-110 ease-linear duration-75 transition-all object-cover overflow-hidden'>
                <Image
                  priority={true}
                  style={{ borderRadius: "15%", objectFit: "contain" }}
                  src={mainImage}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </Link>
            <div className='flex flex-col gap-[1px]'>
              <Link href={`/market/${id}`}>
                <p className="text-md hover:underline cursor-pointer sm:text-xl font-bold leading-none">{title}</p>
              </Link>
              <p className="text-sm sm:text-md text-gray-700 dark:text-gray-300">{address}</p>
              <p className="text-sm sm:text-base mb-2 underline">{description}</p>
              <div className="text-sm text-muted-foreground flex flex-wrap gap-2">
                {menu.map((a) =>
                  <Link
                    key={a}
                    href={{
                      pathname: `/tag`,
                      query: { q: `${a}` }
                    }}
                  >
                    <Badge variant="secondary" className="cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700" >
                      {a}
                    </Badge>
                  </Link>
                )}
              </div>
              <div className="flex mt-2 ml-2 gap-2">
                <span className='text-sm flex'>
                  <AiTwotoneHeart size={20} fill="#ff2402" />
                  <span>
                    (0)
                  </span>
                </span>
                <span className='text-sm flex'>
                  <AiOutlineComment size={20} />({comments?.length})
                </span>
              </div>
            </div>
          </div>

        </div>
      </CardContent>
    </Card>
  )
}

export default Cards
