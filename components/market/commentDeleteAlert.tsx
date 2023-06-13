"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { AiOutlineDelete } from 'react-icons/ai'

interface deleteAlertProps {
  onClick : (id:string) => void
  id : string
}

export function CommentDeleteAlert({onClick,id} : deleteAlertProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
      <div className="cursor-pointer hover:bg-slate-200 rounded-full"><AiOutlineDelete /></div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>댓글을 삭제하시겠습니까?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>No</AlertDialogCancel>
          <AlertDialogAction onClick={() => onClick(id)}>Yes</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
