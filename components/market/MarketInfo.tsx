
import React, { useCallback, useState } from 'react'
import { BsFillBalloonHeartFill } from 'react-icons/bs'
import { AiFillHeart, AiOutlinePhone } from 'react-icons/ai'
import { MdOutlineOtherHouses } from "react-icons/md";

import { Badge } from "@/components/ui/badge"
import { DatePicker } from './Date';
import { User } from '@prisma/client';
import Link from 'next/link';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface MarketInfoProps {
  currentUser?: User | null
  id: string
  mainImage: string
  postId: string;
  title: string;
  description: string;
  phoneNumber: string;
  address: string;
  likecount: string[]
  menu: string[];
}

async function LikeFnc(postId: string, userId: string) {
  const response = await axios.post(`/api/like`, {
    postId,
    userId
  });
  return response.data
}

const MarketInfo: React.FC<MarketInfoProps> = ({
  id,
  title,
  description,
  phoneNumber,
  address,
  menu,
  postId,
  mainImage,
  likecount,
  currentUser
}) => {
  const [likeIncludes, setLikeIncludes] = useState(likecount.includes(currentUser?.id as string))

  const queryClient = useQueryClient()
  const LikeMutation = useMutation({
    mutationFn: () => LikeFnc(postId, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
      currentUser?.id && likecount.includes(currentUser?.id as string) ?
      toast.custom((t) => (
        <div
          className={`bg-white text-black dark:bg-slate-700 dark:text-white px-6 py-4 shadow-md rounded-full ${
            t.visible ? 'animate-enter' : 'animate-leave'
          }`}
        >
            🤍 좋아요 취소.
        </div>
        )) : 
      toast.custom((t) => (
        <div
          className={`bg-white text-black dark:bg-slate-700 dark:text-white px-6 py-4 shadow-md rounded-full ${
            t.visible ? 'animate-enter' : 'animate-leave'
          }`}
        >
            ❤ 좋아요.
        </div>
        ))
    },
    onError: () => {
      console.log("error")
    }
  })

  const handleLike = useCallback(async () => {
    if (!currentUser?.id) {
      return toast.error("로그인 해주세요")
    }
    LikeMutation.mutate();
  }, [LikeMutation]);
  

  return (
    <div>
      <div className='flex justify-between w-full items-center'>
        <h1 className="text-3xl font-bold mb-4">
          {title}
        </h1>
        <div   className='cursor-pointer'>
          <AiFillHeart
            color={currentUser?.id && likecount.includes(currentUser?.id as string) ? "#ab0a0a" : "#e0b8b8"}
            size={30}
            className="cursor-pointer"
            onClick={handleLike}
          />
        </div>
      </div>
      <h1 className="text-xl mb-4 underline">{description}</h1>
      <div>
        <h3 className="flex flex-wrap gap-2 mb-4">
          {menu.map((a) =>
            <Link
              key={a}
              href={{
                pathname: `/tag`,
                query: { q: `${a}` }
              }}
            >
              <Badge className="text-md cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700"  variant="secondary">
                {a}
              </Badge>
            </Link>)}
        </h3>
      </div>
      <div>
        <h3 className="flex gap-2">
          <div><AiOutlinePhone /></div>
          <div>{phoneNumber}</div>
        </h3>
      </div>
      <div>
        <h3 className="flex gap-2">
          <div><MdOutlineOtherHouses /></div>
          <div>{address}</div>
        </h3>
      </div>
      <div className="flex gap-2">
        <DatePicker
          description={description}
          title={title}
          mainImage={mainImage}
          currentUser={currentUser}
          postId={postId}
        />
      </div>
    </div>
  )
}

export default MarketInfo
