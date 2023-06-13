"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { User } from "@prisma/client"
import { Loader2 } from "lucide-react"
import { toast } from "react-hot-toast"

interface DatePickerProps {
  currentUser? : User | null
  postId? : string
  description? : string
  title? : string
  mainImage? : string
}

export function DatePicker({postId, currentUser, description, title, mainImage} : DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>()
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation(
    async (id: string | undefined) => {
      return await axios.post(`/api/reservation/${currentUser?.id}`, {
        description, 
        postId, 
        userId : currentUser?.id,  
        id : currentUser?.id,  
        title, 
        mainImage, 
        date
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
        toast.custom((t) => (
          <div
            className={`bg-white text-black dark:bg-slate-700 dark:text-white px-6 py-4 shadow-md rounded-full ${
              t.visible ? 'animate-enter' : 'animate-leave'
            }`}
          >
              ✔ 추가 완료
          </div>
        ))
      },
    }
  )



  const handleComment = React.useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      return alert("로그인 해주세요")
    }

    mutate(currentUser?.id)
    
  }, [])


  return (
    <form onSubmit={handleComment} className="mt-4 mb-4 flex gap-2 items-center text-base md:text-sm">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>방문할 날짜 선택</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
          <Select
            onValueChange={(value:any) =>
              setDate(addDays(new Date(), parseInt(value)))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="0">Today</SelectItem>
              <SelectItem value="1">Tomorrow</SelectItem>
              <SelectItem value="3">In 3 days</SelectItem>
              <SelectItem value="7">In a week</SelectItem>
            </SelectContent>
          </Select>
          <div className="rounded-md border">
            <Calendar mode="single" selected={date} onSelect={setDate} />
          </div>
        </PopoverContent>
      </Popover>
      <Button disabled={isLoading || !date} type="submit">
        {isLoading ? <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <span>waiting...</span>
        </>
        :
        <>
          <span>방문할 날짜</span>
        </>
      }
      </Button>
    </form>
  )
}
