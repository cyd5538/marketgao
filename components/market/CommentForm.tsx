"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useCallback, useState } from "react";
import axios from "axios";
import { User } from "@prisma/client";  

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
        profileImage: currentUser?.image ?  currentUser?.image : ""
      })
    },
    {
      onError: (error) => {
        if (error) {
          console.log(error)
        }
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["post"])
        setComments("")
      },
    }
  )

  const handleComment = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      alert("로그인 해주세요")
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
    >
      {!isLoading ? "Add" : "Loading..."}
    </Button>
  </form>
  )
}

export default CommentForm
