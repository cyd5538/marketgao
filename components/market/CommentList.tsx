"use client";

import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { Avatar, AvatarImage } from "@/components/ui/avatar"

import { formatDistanceToNowStrict } from 'date-fns';
import { ko } from "date-fns/locale";
import { CommentDeleteAlert } from "./commentDeleteAlert";
import { CommentUpate } from "./commentUpdate";
import { User } from "@prisma/client";
import baseprofile from "@/public/avatar.png"

interface CommentListProps {
  currentUser?: User | null;
  id : string
  content : string
  name : string
  profileImage : string
  postId : string
  createdAt : string
  userId : string
}

async function commentDelete(id: string | undefined) {
  const response = await axios.delete(`/api/comments/${id}`);
  return response.data
}

const CommentList : React.FC<CommentListProps> = ({
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


  return (
    <div className="border-b-[1px] pb-2 border-red-400">
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
          <CommentDeleteAlert onClick={handleDleteComment} id={id}/>
          <CommentUpate content={content} id={id}/>
        </div>
        :<></>} 
      </div>
      <span className="text-xs w-full flex justify-end text-gray-500">{formatDate(createdAt)} 댓글</span>
    </div>
  )
}

export default CommentList
