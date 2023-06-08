
import React from 'react'
import { BsFillBalloonHeartFill } from 'react-icons/bs'
import { AiOutlinePhone } from 'react-icons/ai'
import { MdOutlineOtherHouses } from "react-icons/md";

import { Badge } from "@/components/ui/badge"
import { DatePicker } from './Date';
import { User } from '@prisma/client';

interface MarketInfoProps {
  currentUser? : User | null
  mainImage : string
  postId : string;
  title: string;
  description: string;
  phoneNumber: string;
  address: string;
  menu: string[];
}

const MarketInfo: React.FC<MarketInfoProps> = ({
  title,
  description,
  phoneNumber,
  address,
  menu,
  postId,
  mainImage,
  currentUser
}) => {
  return (
    <div>
      <div className='flex justify-between w-full items-center'>
        <h1 className="text-3xl font-bold mb-4">
          {title}
        </h1>
        <div className='cursor-pointer'>
          <BsFillBalloonHeartFill size={40} color={"#f0f"} />
        </div>
      </div>
      <h1 className="text-xl mb-4 underline">{description}</h1>
      <div>
        <h3 className="flex flex-wrap gap-2 mb-4">
          {menu.map((a) => <Badge className="text-md cursor-pointer" key={a} variant="secondary">{a}</Badge>)}
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
