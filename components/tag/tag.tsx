"use client"

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation"

import { PostType } from "@/type";
import Loading from "../ui/Loading";
import TagItem from "./TagItem";

const Posts = async (arr : string) => {
  const response = await axios.get(`/api/post/`);
  const data = response.data.filter((a: PostType) => {
    return a.menu.includes(arr);
  });
  return data;
};

const Tag = () => {
  const params = useSearchParams();
  const q = params?.get("q");

  const { data, error, isLoading } = useQuery<PostType[]>({
    queryFn: () => Posts(q as string),
    queryKey: ["search"],

  })
  if (error) return <div>error</div>
  if (isLoading) return <div className="h-screen w-full flex justify-center items-center">
    <Loading />
  </div>

  return (
    <div className="max-w-[800px] m-auto pt-10 pb-10 flex flex-col gap-10q justify-center">
      <div className="flex w-full justify-start flex-col gap-2 items-start pl-2">
        <h2 className="text-2xl font-bold"># <span className="underline">{q}</span> </h2>
        <h3 className="text-base text-gray-400">총 {data?.length}개</h3>
      </div>
      <div className="grid grid-cols-[1,auto] sm:grid-cols-2 gap-4 p-2 mb-20">
        {data?.map((post) => 
          <TagItem
            key={post.id}
            id={post.id}
            title={post.title}
            address={post.address}
            description={post.description}
            subImages={post.subImages}
            link={post.link}
            menu={post.menu}
          />
        )}
      </div>
    </div>
  )
}

export default Tag
