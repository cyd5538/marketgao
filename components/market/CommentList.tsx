"use client";

import { useCallback, useEffect, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { useSearchParams } from "next/navigation";

import { Avatar, AvatarImage } from "@/components/ui/avatar"

import { formatDistanceToNowStrict } from 'date-fns';
import { ko } from "date-fns/locale";
import { CommentDeleteAlert } from "./commentDeleteAlert";
import { CommentUpate } from "./commentUpdate";
import { User } from "@prisma/client";
import baseprofile from "@/public/avatar.png"
import { toast } from "react-hot-toast";

interface CommentListProps {
  currentUser?: User | null;
  id: string
  content: string
  name: string
  profileImage: string
  postId: string
  createdAt: string
  userId: string
}

async function commentDelete(id: string | undefined) {
  const response = await axios.delete(`/api/comments/${id}`);
  return response.data
}

const CommentList: React.FC<CommentListProps> = ({
  id,
  content,
  name,
  profileImage,
  postId,
  createdAt,
  currentUser,
  userId
}) => {

  const queryClient = useQueryClient();

  const commentDeleteMutation = useMutation({
    mutationFn: commentDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
      toast.custom((t) => (
        <div
          className={`bg-white text-black dark:bg-slate-700 dark:text-white px-6 py-4 shadow-md rounded-full ${
            t.visible ? 'animate-enter' : 'animate-leave'
          }`}
        >
           🗑 댓글 삭제 완료.
        </div>
      ));
    },
    onError: () => {
    },
  });

  const handleDleteComment = useCallback((id: string) => {
    commentDeleteMutation.mutate(id)
  }, [])

  const formatDate = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    return formatDistanceToNowStrict(date, { locale: ko, addSuffix: true });
  };


  const searchParams = useSearchParams();
  const commentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const scrollTargetId = searchParams?.get("id");
      if (scrollTargetId === id && commentRef.current) {
        commentRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchParams?.get("id")]);

  return (
    <div ref={commentRef} className="border-b-[1px] pb-2 border-red-400">
      <div className="flex items-center gap-2">
        <div className="flex flex-col gap-2 items-center justify-center w-[50px]">
          <div className="text-sm font-bold">
            {name}
          </div>
          <Avatar>
            <AvatarImage src={profileImage ? profileImage : baseprofile.src} alt="@shadcn" />
          </Avatar>

        </div>
        <div className="text-sm w-3/4">
          <div>{content}</div>
        </div>
        {userId === currentUser?.id ?
          <div className="flex  justify-end items-end gap-2 w-1/5">
            <CommentDeleteAlert onClick={handleDleteComment} id={id} />
            <CommentUpate content={content} id={id} />
          </div>
          : <></>}
      </div>
      <span className="text-xs w-full flex justify-end text-gray-500">{formatDate(createdAt)} 댓글</span>
    </div>
  )
}

export default CommentList
