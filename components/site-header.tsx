"use client";
import Link from "next/link";
import { DropdownMenuDemo } from "@/components/NavDropbar";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { User } from "@prisma/client";
import { usePathname, redirect  } from 'next/navigation';
import { useEffect } from "react";
interface NavbarProps {
  currentUser?: User | null;
} 

export function SiteHeader({ currentUser }: NavbarProps) {
  const pathname = usePathname();
  useEffect(() => {
    if(pathname === "/signin" || pathname === "/login"){
      if(currentUser?.email){
        redirect('/');
      }
    }
  }, [])

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav/>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-1 gap-2">
            <ThemeToggle/>
            <DropdownMenuDemo currentUser={currentUser}/>
          </nav>
        </div>
      </div>
    </header>
  );
}
