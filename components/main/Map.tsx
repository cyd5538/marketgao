"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Mapdata from "./Mapdata"
import { Badge } from "@/components/ui/badge"
import axios from "axios";
import Cards from "./Card";
import { PostType } from "@/type";

const Posts = async () => {
  const response = await axios.get(`/api/post/`)
  return response.data
}

function Map() {
  const [hoveredText, setHoveredText] = useState("");


  const { data, error, isLoading } = useQuery<PostType[]>({
    queryFn: Posts,
    queryKey: ["posts"],
  })
  if (error) return <div>error</div>
  if (isLoading) return <div>Loading...</div>

  const handleMouseEnter = (text: string) => {
    setHoveredText(text);
  };

  const handleMouseLeave = () => {
    setHoveredText("");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full pt-2 md:flex-row">
      <svg
        className="hidden md:block"
        style={{ width: "500px", height: "500px" }}
        xmlns="../../public/south-korea.svg"
        viewBox="0 0 524 631"
      >
        {Mapdata.map((path) => (
          <path
            className="cursor-pointer hover:fill-red-700 fill-zinc-900 hover:stroke-slate-300 transition-all"
            key={path.ko}
            d={path.d}
            onMouseEnter={() => handleMouseEnter(path.ko)}
            onMouseLeave={handleMouseLeave}
          ></path>
        ))}
      </svg>
      {/* md일땐 이거로 */}
      <div className="w-full md:w-[450px] p-2 block md:hidden">
        {Mapdata.map((path) => (
          <Badge variant="outline" className="cursor-pointer hover:bg-slate-100 dark:hover:bg-zinc-700" key={path.d}>
            {path.ko}
          </Badge>
        ))}
      </div>

      <div className="w-full md:w-[450px] h-[500px]">
        <div className="hidden md:block h-10">
          {hoveredText && (
            <h2 className="text-red-700 font-bold text-2xl">
              {hoveredText}
            </h2>
          )}
        </div>
        <div className="w-full overflow-y-auto md:w-[450px] h-[460px] shadow-md dark:border-[1px] dark:border-zinc-500 rounded-md overscroll-y-auto flex flex-col pt-4 pl-2 pr-2 gap-2">
          {data?.map((post) => (
            <Cards
              key={post.id}
              title={post.title}
              localName={post.localName}
              koreanName={post.koreanName}
              latitude={post.latitude}
              longitude={post.longitude}
              address={post.address}
              description={post.description}
              phoneNumber={post.phoneNumber}
              mainImage={post.mainImage}
              subImages={post.subImages}
              link={post.link}
              menu={post.menu}
              comments={post.comments}
            />
          ))}
        </div>
      </div>

    </div>
  )
}

export default Map
