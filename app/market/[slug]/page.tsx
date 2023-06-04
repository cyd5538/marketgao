"use client";

import MarketImage from "@/components/market/MarketImage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";


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
      <MarketImage image={data[0].subImages}/>
    </div>
  )
}
