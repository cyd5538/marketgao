import * as React from "react"
import Link from "next/link"
import { RiShip2Fill } from "react-icons/ri";

export function MainNav() {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <h1 className="font-bold text-2xl hidden md:block">님아 그 시장을 가오</h1>
        <RiShip2Fill size={30}/>
      </Link>
    </div>
  )
}
