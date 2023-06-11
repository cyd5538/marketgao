"use client"
import { Loader2 } from 'lucide-react'
import React from 'react'

const Loading = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <Loader2 className="mr-2 h-12 w-12 sm:w-4 sm:h-4 animate-spin" />
    </div>
  )
}

export default Loading
