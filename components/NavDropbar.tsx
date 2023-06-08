"use client";

import {
  LogOut,
} from "lucide-react"

import { AiOutlineComment } from "react-icons/ai"
import { CiMemoPad } from "react-icons/ci"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { FaHamburger } from "react-icons/fa";
import { AiOutlineLogin } from "react-icons/ai";
import { BsFillSignIntersectionFill } from "react-icons/bs";
import { User } from "@prisma/client";
import { signOut } from 'next-auth/react';
import Link from "next/link";

interface DropDownProps {
  currentUser?: User | null;
}

export function DropdownMenuDemo({ currentUser }: DropDownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button><FaHamburger size={24} /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuSeparator />
        <DropdownMenuGroup>

          {currentUser?.email ?
            <>
              <Link href="/comment">
                <DropdownMenuItem>
                  <AiOutlineComment className="mr-2 h-4 w-4" />
                  <span>내 댓글</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/reservation">
                <DropdownMenuItem>
                  <CiMemoPad className="mr-2 h-4 w-4" />
                  <span>내 메모</span>
                </DropdownMenuItem>
              </Link>
            </> :
            <>
              <Link href="/login">
                <DropdownMenuItem>
                  <AiOutlineLogin className="mr-2 h-4 w-4" />
                  Login
                </DropdownMenuItem>
              </Link>
              <Link href="/signin">
                <DropdownMenuItem>
                  <BsFillSignIntersectionFill className="mr-2 h-4 w-4" />
                  Sign in
                </DropdownMenuItem>
              </Link>
            </>}
          <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            <span>로그아웃</span>
          </DropdownMenuItem>
          <Link href="/post">
            <DropdownMenuItem className="cursor-pointer">
              <span>POST</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
