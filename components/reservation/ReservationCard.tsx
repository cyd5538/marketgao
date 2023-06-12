"use client";

import Image from 'next/image';

import { useCallback, useEffect, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { BellRing, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link';
import { ReservationDeleteAlert } from './ReservationDeleteAlert';
import { ReservationUpdate } from './ReservationUpdate';
import { toast } from 'react-hot-toast';
 
type CardProps = React.ComponentProps<typeof Card>
 
interface ReservationCardProps {
  id : string
  date : Date
  description : string
  mainImage : string
  postId : string
  title : string
}

async function commentDelete(id: string | undefined) {
  const response = await axios.delete(`/api/reservation/${id}`);
  return response.data
}

export function ReservationCard({ 
  id,
  className, 
  date, 
  description, 
  mainImage, 
  postId, 
  title,
  ...props
}: CardProps & ReservationCardProps) {

  function calculateDday(today: Date, selectedDate: Date): number {
    const oneDay = 24 * 60 * 60 * 1000; // 1일을 밀리초로 나타냄
    const todayTimestamp = today.getTime(); // 오늘 날짜를 밀리초로 변환
    const selectedDateTimestamp = selectedDate.getTime(); // 선택한 날짜를 밀리초로 변환
  
    // 두 날짜의 차이를 계산하고 D-day를 구함
    const diffDays = Math.round((selectedDateTimestamp - todayTimestamp) / oneDay);
  
    return diffDays;
  }
  
  const today = new Date(); // 현재 날짜와 시간
  const selectedDate = new Date(date); // 선택한 날짜와 시간
  
  const dday = calculateDday(today, selectedDate);

  const dates = new Date(date);
  const options = { year: 'numeric', month: 'long', day: 'numeric' } as const;
  const formattedDate = dates?.toLocaleDateString('ko-KR', options);

  const queryClient = useQueryClient();
  
  const ReservDeleteMutation = useMutation({
    mutationFn: commentDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reservation"] });
      toast.custom((t) => (
        <div
          className={`bg-white text-black dark:bg-slate-700 dark:text-white px-6 py-4 shadow-md rounded-full ${
            t.visible ? 'animate-enter' : 'animate-leave'
          }`}
        >
            ✔ 삭제 완료
        </div>
      ))
    },
    onError: () => {
    },
  });

  const handleDleteReserv = useCallback((id: string) => {
    ReservDeleteMutation.mutate(id)
  }, [])

  return (
    <Card className={cn("w-[400px] h-[420px]", className)} {...props}>
      <CardHeader>
        <CardTitle>D-{dday + 1}</CardTitle>
        <CardDescription>방문 예정일 {formattedDate}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Link className='cursor-pointer' href={`market/${postId}`}>
          <div className=" flex items-center space-x-4 rounded-md border p-4 justify-center">
            <Image className='hover:scale-110 transition-all' src={mainImage} width={100} height={50} alt={title} />
          </div>
        </Link>
        <div>
            <div
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {title}
                </p>
                <p className="text-sm text-muted-foreground h-[50px]">
                  {description}
                </p>
              </div>
            </div>
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <ReservationUpdate id={id}/>
        <ReservationDeleteAlert onClick={handleDleteReserv} id={id}/>
      </CardFooter>
    </Card>
  )
}