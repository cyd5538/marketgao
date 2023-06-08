"use client";

import Image from 'next/image';

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
 
type CardProps = React.ComponentProps<typeof Card>
 
interface ReservationCardProps {
  date : Date
  description : string
  mainImage : string
  postId : string
  title : string
}

export function ReservationCard({ 
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

  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      <CardHeader>
        <CardTitle>D-{dday}</CardTitle>
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
                <p className="text-sm text-muted-foreground">
                  {description}
                </p>
              </div>
            </div>
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button className="w-full">
          <Check className="mr-2 h-4 w-4" /> 방문일 수정
        </Button>
        <Button className="w-full">
          <Check className="mr-2 h-4 w-4" /> 삭제
        </Button>
      </CardFooter>
    </Card>
  )
}