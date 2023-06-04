"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import MarketImage from "@/components/market/MarketImage";
import MarketInfo from "@/components/market/MarketInfo";
import MarketYoutube from "@/components/market/MarketYoutube";

const Posts = async (id: string | string[] | undefined) => {
  const response = await axios.get(`/api/post/${id}`)
  return response.data
}

export default function IndexPage() {
  const params = useParams();

  const { data, error, isLoading } = useQuery({
    queryKey: ["post", params?.slug],
    queryFn: () => Posts(params?.slug),
  })
  if (error) return <div>error</div>
  if (isLoading) return <div></div>

  console.log(data[0])
  


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
  </div>
</div>
  )
}
