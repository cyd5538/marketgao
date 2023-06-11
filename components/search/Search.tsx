"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { PostType } from "@/type";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import Cards from "../main/Card";
import Loading from "../ui/Loading";

const Posts = async (arr: string) => {
  const response = await axios.get(`/api/post/`);
  const data = response.data.filter((a: PostType) => {
    return a.menu.some((item) => item.indexOf(arr) !== -1) || a.title.indexOf(arr) !== -1;
  });
  return data;
};

const Search = () => {

  const [search, setSearch] = useState("")
  const [searchBoolean, setSearchBoolean] = useState(false)
  const [searchData, setSearchData] = useState<PostType[]>([])

  const { data, error, isLoading } = useQuery<PostType[]>({
    queryFn: () => Posts(search),
    queryKey: ["search"],
    enabled: !!searchBoolean,
    onSuccess: (data) => {
      setSearchData(data)
      setSearchBoolean(false)
    }
  })
  if (error) return <div>error</div>

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Posts(search)
    setSearchBoolean(true)
  }

  useEffect(() => {
    setSearchBoolean(false)
  },[])

  return (
    <div className="max-w-[1000px] m-auto">
      <div className="mt-10 flex justify-center w-full">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="mb-4 text-2xl font-bold
        ">메뉴나 식당 이름을 검색하세요</Label>
          <form onSubmit={handleSubmit} className="flex w-full max-w-sm items-center space-x-2">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search"
            />
            <Button disabled={searchBoolean} className="w-36" type="submit">
              {searchBoolean ? <Loading /> : ""}
              {searchBoolean ? "Loading..." : "Search"}
            </Button>
          </form>
        </div>
      </div>
      <div className="gap-6 mb-10 mt-10 flex flex-col p-2">
        {data?.length === 0 && searchBoolean === false ? <>데이터가 없습니다 </> : <>
          {searchData?.map((post) =>
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
          )}
        </>}
      </div>
    </div>
  )
}

export default Search
