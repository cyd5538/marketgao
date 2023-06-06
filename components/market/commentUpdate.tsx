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
        alert("수정 완료")
      }
    }
  )

  const handleComment = useCallback((id: string) => {
    mutate(id)
  }, [])


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline"><AiOutlineEdit /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit review</DialogTitle>
          <DialogDescription>
            리뷰를 수정해주세요
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
