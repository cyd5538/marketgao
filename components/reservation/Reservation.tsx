"use client";

import { useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import axios from 'axios';

import { User } from "@prisma/client";
import { ReservationCard } from "./ReservationCard";
import { redirect } from 'next/navigation'
import { Loader2 } from 'lucide-react';

interface ParticeProps {
  currentUser?: User | null
}

const myPosts = async (id: string | undefined) => {
  const response = await axios.get(`/api/myreservation/${id}`)
  return response.data
}

const Reservation: React.FC<ParticeProps> = ({ currentUser }) => {

  useEffect(() => {
    if (!currentUser) {
      redirect("/")
    }
  }, [])

  const { data, error, isLoading } = useQuery({
    queryFn: () => myPosts(currentUser?.id),
    queryKey: ["reservation"],
  })
  if (error) return <div>error</div>

  return (
    <div className="max-w-[800px] m-auto pt-10 flex justify-center">
      {isLoading ?
        <div className="w-full h-screen flex items-center justify-center">
          <Loader2 className="mr-2 h-6 w-6 animate-spin" />
        </div> :
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center items-center">
          {data?.map((i: {
            id: string;
            date: Date;
            description: string;
            mainImage: string;
            postId: string;
            title: string;
          }) => {
            return <ReservationCard
              key={i.id}
              id={i.id}
              date={i.date}
              description={i.description}
              mainImage={i.mainImage}
              postId={i.postId}
              title={i.title}
            />
          })}
        </div>
      }
    </div>
  )
}

export default Reservation
