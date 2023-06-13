"use client";

import { useCallback, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { AiOutlineEdit } from 'react-icons/ai'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import { toast } from "react-hot-toast";

interface CommentUpdateProps {
  content : string
  id : string
}

export function CommentUpate({content, id} : CommentUpdateProps) {
  const [updateComment, setUpdateComment] = useState(content)

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    async (id: string | undefined) => {
      return await axios.put(`/api/comments/${id}`, {
        content: updateComment,
      })
    },
    {
      onError: (error) => {
        if (error) {
          console.log(error);
        }
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["post"])
        toast.custom((t) => (
          <div
            className={`bg-white text-black dark:bg-slate-700 dark:text-white px-6 py-4 shadow-md rounded-full ${
              t.visible ? 'animate-enter' : 'animate-leave'
            }`}
          >
             ✏ 댓글 수정 완료.
          </div>
        ));
      }
    }
  )

  const handleComment = useCallback((id: string) => {
    mutate(id)
  }, [])


  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer hover:bg-slate-200 rounded-full"><AiOutlineEdit /></div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit comment</DialogTitle>
          <DialogDescription>
            댓글을 수정해주세요
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Textarea  
              id="name" 
              value={updateComment} 
              onChange={(e) => setUpdateComment(e.target.value)}
              className="col-span-4" 
            />
          </div>
        </div>
        <DialogFooter>
          <Button disabled={isLoading} onClick={() => handleComment(id)} type="submit"> 
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ""}
            Edit
           </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
