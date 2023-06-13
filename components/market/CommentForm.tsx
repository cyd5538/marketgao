"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useCallback, useState } from "react";
import axios from "axios";
import { User } from "@prisma/client";  
import { toast } from "react-hot-toast";

interface CommentFormProps {
  currentUser?: User | null;
  id: string | undefined
}

const CommentForm:React.FC<CommentFormProps> = ({ currentUser, id }) => {
  const [comments, setComments] = useState("")
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation(
    async (id: string | undefined) => {
      return await axios.post(`/api/comments/${id}`, {
        postId: id,
        content: comments,
        userId: currentUser?.id,
        name: currentUser?.name,
        profileImage: currentUser?.image ?  currentUser?.image : "",
      })
    },
    {
      onError: (error) => {
        if (error) {
          console.log(error)
        }
      },
      onSuccess: (data) => {
        toast.custom((t) => (
          <div
            className={`bg-white text-black dark:bg-slate-700 dark:text-white px-6 py-4 shadow-md rounded-full ${
              t.visible ? 'animate-enter' : 'animate-leave'
            }`}
          >
             👍 댓글 등록.
          </div>
        ));
        queryClient.invalidateQueries(["post"])
        setComments("")
      },
    }
  )

  const handleComment = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      return toast.custom((t) => (
      <div
        className={`bg-white text-black dark:bg-slate-700 dark:text-white px-6 py-4 shadow-md rounded-full ${
          t.visible ? 'animate-enter' : 'animate-leave'
        }`}
      >
          💨 로그인 해주세요.
      </div>
      ));
    }
    mutate(id)
  }, [])
  return (
    <form onSubmit={handleComment} className="flex gap-2 items-center">
    <Textarea
      value={comments}
      onChange={(e) => setComments(e.target.value)}
      placeholder="Type your review here."
    />
    
    <Button 
      disabled={isLoading}
      type="submit" 
      variant="secondary"
      className="w-16 md:w-24 text-xs md:text-sm"
    >
      {!isLoading ? "Add" : "Loading..."}
    </Button>
  </form>
  )
}

export default CommentForm
