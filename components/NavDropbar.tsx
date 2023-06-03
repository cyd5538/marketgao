"use client";

import {
  LogOut,
  Users,
} from "lucide-react"

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
          <DropdownMenuItem>
            <Users className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          {currentUser?.email ?
            <></> :
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
            <span>Log out</span>
          </DropdownMenuItem>

        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
