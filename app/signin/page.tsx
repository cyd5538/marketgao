"use client";

import { useState, useEffect } from "react";
import { FcGoogle } from 'react-icons/fc'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation';
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

import { useForm, SubmitHandler } from 'react-hook-form';
import axios from "axios";
// import getCurrentUser from "../actions/getCurrentUser";

type FormData = {
  name: string;
  email: string;
  password: string;
  password2: string;
};

export default async function IndexPage() {
  const router = useRouter();

  // const currentUser = await getCurrentUser();

  // useEffect(() => {
  //   if(currentUser?.email){
  //     router.push('/')
  //   }
  // },[])

  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setIsLoading(true);
    
    if(data.password !== data.password2){
      setIsLoading(false);
      return alert("비밀번호와 비밀번호 확인이 다릅니다.")
    }else{

    axios.post('/api/register', data)
      .then(() => {
        alert("회원가입 성공 로그인 해주세요!")
        router.push("/login")
      })
      .catch((error) => {
        if (error.response && error.response.status === 500) {
          alert("이미 존재하는 이메일입니다.");
        } else {
          console.error(error);
          alert("서버에서 오류가 발생했습니다.");
        }
      })
      .finally(() => {
        setIsLoading(false);
      })
    }
  }

  return (
    <div className="w-full md:w-1/2 m-auto mt-10">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">회원가입</CardTitle>
          <CardDescription>
            계정을 만들려면 아래에 입력사항을 입력해 주세요.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-6">
              <Button variant="outline">
                <Icons.gitHub className="mr-2 h-4 w-4" />
                Github
              </Button>
              <Button variant="outline">
                <FcGoogle className="mr-2 h-4 w-4" />
                Google
              </Button>
            </div>
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
              <Label htmlFor="name">name</Label>
              <Input id="name" type="name" placeholder="홀란드" {...register("name", { required: "이름을 입력해주세요" })} />
              {errors.name && (
                <span className="text-red-500 text-sm">{errors.name.message}</span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="holland@google.com"
                {...register("email", {
                  required: "이메일을 입력해주세요",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,  // 이메일 검사 정규표현식
                    message: "이메일 양식을 지켜주세요",
                  },
                })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email.message}</span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="비밀번호는 6글자 이상 10글자 이하로 부탁드려용"
                {...register("password", {
                  required: "비밀번호를 입력해주세요",
                  minLength: { value: 6, message: "비밀번호는 최소 6글자 이상입니다" },
                  maxLength: { value: 10, message: "비밀번호는 최대 10글자 이하입니다" },
                })}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password.message}</span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password 2</Label>
              <Input
                id="password2"
                type="password"
                placeholder="위에 비밀번호랑 맞춰주세요"
                {...register("password2", {
                  required: "비밀번호2를 입력해주세요",
                  minLength: { value: 6, message: "비밀번호는 최소 6글자 이상입니다" },
                  maxLength: { value: 10, message: "비밀번호는 최대 10글자 이하입니다" },
                })}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password.message}</span>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button 
            disabled={isLoading} 
            type="submit" 
            className="w-full">
              {isLoading ?  "Loading..." : "Create account"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
