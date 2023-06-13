"use client"

import { signIn } from 'next-auth/react';
import { Icons } from '../icons';
import { Button } from '../ui/button';

const Github = () => {
  return (
    <Button onClick={() => signIn("github")} variant="outline">
      <Icons.gitHub className="mr-2 h-4 w-4" />
      Github
    </Button>
  )
}

export default Github
