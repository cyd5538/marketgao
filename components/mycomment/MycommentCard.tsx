"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link";

import { formatDistanceToNowStrict } from 'date-fns';
import { ko } from "date-fns/locale";

interface MycommentCardProps {
  id : string
  postId : string
  name : string
  content: string
  createdAt : string
}


const MycommentCard:React.FC<MycommentCardProps> = ({
  id,
  postId,
  name,
  createdAt,
  content
}) => {

  const formatDate = (dateString: string | Date) => {
    const now = new Date();
    const date = new Date(dateString);
    return formatDistanceToNowStrict(date, { locale: ko, addSuffix: true });
  };

  return (
    <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">

    </CardHeader>
    <CardContent>
      <Link href={`/market/${postId}`}>
        <div className="text-xl font-bold underline mb-2 cursor-pointer">{content}</div>
      </Link>
      <p className="text-sm font-bold">
        {name}
      </p>
      <p className="text-xs text-muted-foreground">
        {formatDate(createdAt)} 전
      </p>
    </CardContent>
  </Card>
  )
}

export default MycommentCard
