"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import MarketImage from "@/components/market/MarketImage";
import MarketInfo from "@/components/market/MarketInfo";
import MarketYoutube from "@/components/market/MarketYoutube";
import KakaoMap from "@/components/KaKaoMap";
import Comment from "@/components/market/Comment";
import { User } from "@prisma/client";


interface MarketProps {
  currentUser?: User | null;
} 

const Posts = async (id: string | string[] | undefined) => {
  const response = await axios.get(`/api/post/${id}`)
  return response.data
}

export default function Market({ currentUser }: MarketProps) {

  const params = useParams();
  
  const { data, error, isLoading } = useQuery({
    queryKey: ["post", params?.slug],
    queryFn: () => Posts(params?.slug),
  })
  if (error) return <div>error</div>
  if (isLoading) return <div></div>

  return (
    <div>
      <MarketImage image={data[0].subImages} />
      <div className="mx-auto max-w-[1000px] p-8">
        <MarketInfo
          title={data[0].title}
          description={data[0].description}
          phoneNumber={data[0].phoneNumber}
          address={data[0].address}
          menu={data[0].menu}
        />
        <MarketYoutube
          link={data[0].link}
        />
        <KakaoMap 
          title={data[0].title}
          address={data[0].address}
          longitude={data[0].longitude}
          latitude={data[0].latitude}
        />
        <Comment 
        currentUser={currentUser}
        id={data[0].id}
        comments={data[0].comments}
        /> 
      </div>
    </div>
  )
}