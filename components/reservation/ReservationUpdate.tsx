"use client";

import React, { useCallback, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { addDays, format } from "date-fns"
import { cn } from "@/lib/utils"
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
import { CalendarIcon, Check, Loader2 } from "lucide-react" 

interface ReservationUpdateProps {
  id : string
}

export function ReservationUpdate({id} : ReservationUpdateProps) {
  const [date, setDate] = React.useState<Date | undefined>()
  
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    async (id: string | undefined) => {
      return await axios.put(`/api/reservation/${id}`, {
        date
      })
    },
    {
      onError: (error) => {
        if (error) {
          console.log(error);
        }
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["reservation"])
        alert("수정 완료")
      }
    }
  )

  const handeReserve = useCallback((id: string) => {
    mutate(id)
  }, [])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Check className="mr-2 h-4 w-4" /> 
          수정하기
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit memo</DialogTitle>
          <DialogDescription>
            날짜를 수정해주세요
          </DialogDescription>
        </DialogHeader>
          <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
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
        <DialogFooter>
          <Button disabled={isLoading} onClick={() => handeReserve(id)} type="submit"> 
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ""}
            Edit
           </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
