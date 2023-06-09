"use client"

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from 'axios';

import { User } from "@prisma/client";
import MycommentCard from "./MycommentCard";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";
import Loading from "../ui/Loading";
import { Loader, Loader2 } from "lucide-react";

interface MycommentProps {
  currentUser: User | null;
}

const myPosts = async (id: string | undefined) => {
  const response = await axios.get(`/api/mycomments/${id}`)
  return response.data
}


const Mycomment: React.FC<MycommentProps> = ({ currentUser }) => {

  useEffect(() => {
    if (!currentUser) {
      redirect("/")
    }
  }, [])

  const { data, error, isLoading } = useQuery({
    queryFn: () => myPosts(currentUser?.id),
    queryKey: ["post", "comment"],
  })
  if (error) return <div>error</div>

  const [currentPage, setCurrentPage] = useState(1);
  const [displayedComments, setDisplayedComments] = useState([]);

  const itemsPerPage = 3; // 페이지 당 아이템 수
  const maxPageNumbers = 5; // 표시할 최대 페이지 번호 수

  // 전체 댓글, 전체 페이지
  const totalItems = data?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // 페이지 시작과, 끝
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    setDisplayedComments(data?.slice(startIndex, endIndex));
  }, [currentUser, currentPage, data]);

  const goToPage = (page: number) => {
    setCurrentPage(page); // page 번호로 이동
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1); // 현재 페이지 이전 페이지로
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1); // 현재 페이지 다음 페이지로
  };

  // 페이지 번호 표시 범위 계산
  const getPageNumbers = () => {
    const halfMaxPageNumbers = Math.floor(maxPageNumbers / 2);
    let startPage = currentPage - halfMaxPageNumbers;
    let endPage = currentPage + halfMaxPageNumbers;

    if (startPage <= 0) {
      startPage = 1;
      endPage = Math.min(maxPageNumbers, totalPages);
    }

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, totalPages - maxPageNumbers + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  };

  return (
    <div className="md:w-[500px] w-full m-auto pt-10 pb-10">
      {isLoading ? 
      <div className="w-full h-screen flex items-center justify-center">
        <Loader2 className="mr-2 h-6 w-6 animate-spin" />
      </div> : 
      <>
      <h2 className="font-bold text-xl mb-6 pl-4">댓글 {totalItems} 개</h2>
      <div className="flex flex-col gap-2 pl-2 pr-2 h-[450px]">
        {displayedComments?.map((a: any) => (
          <MycommentCard
            key={a.id}
            id={a.id}
            postId={a.postId}
            name={a.name}
            createdAt={a.createdAt.toString()}
            content={a.content}
          />
        ))}
      </div>
      {displayedComments?.length !== 0 ?
        <div className="flex items-center justify-center mt-4 gap-4">
          <Button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="px-2 pl-2 pr-2 py-1 rounded-md bg-red-500 hover:bg-red-600 disabled:bg-red-200 disabled:cursor-not-allowed"
          >
            prev
          </Button>
          <div>
            {getPageNumbers().map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => goToPage(pageNumber)}
                className={`px-2 py-1 rounded-md mx-1 focus:outline-none text-white ${currentPage === pageNumber ? "bg-red-500 text-white" : "bg-red-200 hover:bg-red-700"
                  }`}
              >
                {pageNumber}
              </button>
            ))}
          </div>
          <Button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="px-2 pl-2 pr-2 py-1 rounded-md bg-red-500 hover:bg-red-600 disabled:bg-red-200 disabled:cursor-not-allowe"
          >
            next
          </Button>
        </div>
        :
        <></>
      }
      </>}
    </div>
  );
};

export default Mycomment;
