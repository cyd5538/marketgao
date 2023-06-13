"use client"

import { signIn } from 'next-auth/react';
import { Button } from '../ui/button';
import { FcGoogle } from 'react-icons/fc';

const Google = () => {
  return (
    <Button onClick={() => signIn("google")} variant="outline">
      <FcGoogle className="mr-2 h-4 w-4" />
      Google
    </Button>
  )
}

export default Google
