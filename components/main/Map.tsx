"use client";

import { useState } from "react";

import Mapdata from "./Mapdata"
import {AiTwotoneHeart} from 'react-icons/ai'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

function Map() {
  const [hoveredText, setHoveredText] = useState("");

  const handleMouseEnter = (text:string) => {
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
          className="cursor-pointer hover:fill-red-700 fill-zinc-900" 
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
      <div className="w-full md:w-[450px] h-[460px] shadow-md dark:border-[1px] dark:border-zinc-500 rounded-md overscroll-y-auto flex flex-col pt-4 pl-2 pr-2 gap-2">
        <Card className="bg-gradient-to-r from-red-500 to-red-300 shadow-md hover:translate-y-[1px] hover:translate-x-[1px] ease-linear duration-75 transition-all cursor-pointer flex flex-col justify-end pt-6 ">
          <CardContent className="grid gap-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="/avatars/01.png" />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">Sofia Davis</p>
                  <p className="text-sm text-muted-foreground">m@example.com</p>
                  <div className="text-sm text-muted-foreground flex gap-2">
                    <Badge variant="secondary" className="cursor-pointer">태그</Badge>
                    <Badge variant="secondary" className="cursor-pointer">태그</Badge>
                    <Badge variant="secondary" className="cursor-pointer">태그</Badge>
                  </div>
                </div>
              </div>
              <div className="curor-pointer">
                <AiTwotoneHeart size={25} fill="#ff2402"/>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
 
    </div>
  )
}

export default Map
