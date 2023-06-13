"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { useRouter } from "next/navigation"
import { FcGoogle } from 'react-icons/fc'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"
import { toast } from 'react-hot-toast';
import Github from '@/components/oauth/Github';
import Google from '@/components/oauth/Google';

type FormData = {
  email: string;
  password: string;
};

export default function IndexPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setIsLoading(true);

    signIn('credentials', {
      ...data,
      redirect: false,
    })
      .then((callback) => {
        setIsLoading(false);

        if (callback?.ok) {
          toast.custom((t) => (
            <div
              className={`bg-white text-black dark:bg-slate-700 dark:text-white px-6 py-4 shadow-md rounded-full ${
                t.visible ? 'animate-enter' : 'animate-leave'
              }`}
            >
                ✔ 로그인 성공.
            </div>
          ));
          router.push("/");
        }

        if (callback?.error) {
          toast.error(callback?.error)
        }
      })
  }

  return (
    <div className="w-full md:w-1/2 m-auto mt-10">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">로그인</CardTitle>
          <CardDescription>
            이메일과 비밀번호를 입력해 주세요.
          </CardDescription>
        </CardHeader>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-6 mb-4 mt-4 ml-6 mr-6">
            <Github />
            <Google />
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="grid gap-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder=""
                {...register("email", {
                  required: "이메일을 입력해주세요",
                  
                })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder=""
                {...register("password", {
                  required: "비밀번호를 입력해주세요",
                })}
              />
            </div>
            
          </CardContent>
          <CardFooter>
            <Button 
            disabled={isLoading} 
            type="submit" 
            className="w-full"
            >
              {isLoading ? "Loading..." : "Login"}
            </Button>
          </CardFooter>
          </form>
      </Card>
    </div>
  )
}
