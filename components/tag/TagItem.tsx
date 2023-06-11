"use client";

import Link from "next/link";
import TagImage from "./TagImage";
import { Badge } from "../ui/badge";

interface TagItemProps {
  id : string
  address : string
  title : string
  description : string
  menu : string[]
  subImages : string[] 
  link : string
}

const TagItem:React.FC<TagItemProps> = ({
  id,
  title,
  description,
  menu,
  subImages,
  address
}) => {
  return (
    <div className="p-2 flex h-[200px] sm:h-[500px] flex-row sm:flex-col gap-2 rounded-md shadow-md ">
      <div className="w-[150px] h-[200px] sm:h-60 sm:w-full m-auto">
        <TagImage image={subImages}/>
      </div>
      <div className="flex-grow">
        <Link href={`/market/${id}`}>
          <h2 className="text-md sm:text-2xl font-bold mt-4 hover:underline cursor-pointer">{title}</h2>
        </Link>
        <h3 className="text-sm sm:text-base text-gray-500 mt-2">{description}</h3>
        <h4 className="flex flex-wrap gap-2 mb-4 mt-2">
        {menu.map((a) =>
          <Link
            key={a}
            href={{
              pathname: `/tag`,
              query: { q: `${a}` }
            }}
          >
            <Badge className="text-sm cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700" variant="secondary">
              {a}
            </Badge>
          </Link>)}
        </h4>
        <p className="mt-2 text-sm">{address}</p>
      </div>
    </div>
  )
}

export default TagItem
