import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { FaHamburger } from "react-icons/fa";
import { AiOutlineLogin } from "react-icons/ai";
import { BsFillSignIntersectionFill } from "react-icons/bs";
import Link from "next/link";

export function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button><FaHamburger size={24}/></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
          <Users className="mr-2 h-4 w-4" />
          <span>Profile</span>
          </DropdownMenuItem>
          <Link href="/login">
            <DropdownMenuItem>
              <AiOutlineLogin className="mr-2 h-4 w-4"/>
                Login
            </DropdownMenuItem>
          </Link>
          <Link href="/signin">
            <DropdownMenuItem>
              <BsFillSignIntersectionFill className="mr-2 h-4 w-4"/>
              Sign in
            </DropdownMenuItem> 
          </Link>
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>

        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
