"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Mapdata from "./Mapdata"
import { Badge } from "@/components/ui/badge"
import axios from "axios";
import Cards from "./Card";
import { PostType } from "@/type";
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react";

const Posts = async () => {
  const response = await axios.get(`/api/post/`)
  return response.data
}

function Home() {
  const [hoveredText, setHoveredText] = useState("");
  const [selectedPath, setSelectedPath] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [filteredData, setFilteredData] = useState<PostType[]>([]);

  const { data, error, isLoading } = useQuery<PostType[]>({
    queryFn: Posts,
    queryKey: ["posts"],
  })
  if (error) return <div>error</div>


  const handlePathClick = (pathName: string) => {
    setSelectedPath(pathName);
    setHoveredText(pathName);

    if (!pathName) {
      setFilteredData(data || []);
      setIsSelected(false)
    } else {
      setIsSelected(true)
      const filtered = data?.filter((item) => item.koreanName === pathName) || [];
      setFilteredData(filtered);
    }
  };

  const allContents = () => {
    setIsSelected(false)
    setSelectedPath("");
    setHoveredText("");
  }

  return (
    <div className="flex flex-col justify-center items-center w-full pb-10 pt-10 md:flex-row">
      {isLoading ?
        <div className="w-full h-screen flex items-center justify-center">
          <Loader2 className="mr-2 h-6 w-6 animate-spin" />
        </div>
        : <>
          <svg
            className="hidden md:block"
            style={{ width: "500px", height: "500px" }}
            xmlns="../../public/south-korea.svg"
            viewBox="0 0 524 631"
          >
            {Mapdata.map((path) => (
              <path
                className={`cursor-pointer ${selectedPath === path.ko ? 'fill-red-700' : 'fill-zinc-900'
                  } hover:stroke-slate-300 stroke-2 hover:opacity-95 transition-all`}
                key={path.ko}
                d={path.d}
                onClick={() => handlePathClick(path.ko)}
              ></path>
            ))}
          </svg>

          {/* md일땐 이거로 */}
          <div className="w-full md:w-[600px] p-2 block md:hidden">
            <div className="flex flex-wrap gap-[1px] ">
              <Badge
                onClick={allContents}
                variant="outline"
                className={`cursor-pointer hover:bg-slate-100 dark:hover:bg-zinc-700 ${!isSelected ? 'bg-slate-300 dark:bg-zinc-800' : 'bg-white dark:bg-zinc-600'}`}
              >
                전체
              </Badge>
              {Mapdata.map((path) => (
                <Badge
                  variant="outline"
                  className={`cursor-pointer hover:bg-slate-100 dark:hover:bg-zinc-700 
            ${selectedPath === path.ko ? 'bg-slate-300 dark:bg-zinc-800' : 'bg-white dark:bg-zinc-600'}
            `}
                  key={path.d}
                  onClick={() => handlePathClick(path.ko)}
                >
                  {path.ko}
                </Badge>
              ))}
            </div>
            <div className="mt-4 mb-4"> {!isSelected ?
              <>{data?.length}개의 데이터가 있습니다.</>
              :
              <>{filteredData.length}개의 데이터가 있습니다</>}
            </div>
          </div>

          <div className="w-full md:w-[700px] h-[600px] md:h-[700px]">
            <div className="hidden md:block mt-4 mb-4 top-[-80px] z-10">
              <div className="flex justify-between items-center">
                {!isSelected ?
                  <h2 className="text-red-700 font-bold text-xl w-40">
                    전체 {data?.length}
                  </h2>
                  :
                  <>
                    {hoveredText && (
                      <h2 className="text-red-700 font-bold text-xl w-72">
                        {hoveredText} {filteredData.length}
                      </h2>
                    )}
                  </>
                }
                <div className="text-right w-full mt-2 mb-2">
                  <Button onClick={allContents} variant="outline">전체보기</Button>
                </div>
              </div>
            </div>
            <div className="w-full overflow-y-auto md:w-[700px] pb-10 h-[560px] shadow-md dark:border-[1px] dark:border-zinc-500 rounded-md overscroll-y-auto flex flex-col pt-4 pl-2 pr-2 gap-2">
              {isSelected ? <>
                {filteredData.map((post) => (
                  <Cards
                    key={post.id}
                    id={post.id}
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
              </>
                :
                <>
                  {data?.map((post) => (
                    <Cards
                      key={post.id}
                      id={post.id}
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
                </>
              }
            </div>
          </div>
        </>}
    </div>
  )
}

export default Home
