import { NextResponse } from "next/server";

import prisma from "@/lib/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { id, title, createdAt, updatedAt, localName, koreanName, latitude, longitude,
    address, description, phoneNumber, mainImage, link, menu, subImages
  } = body;

  const newPost = await prisma.post.create({
    data: {
      id,
      title,
      createdAt,
      updatedAt,
      localName,
      koreanName,
      latitude,
      longitude,
      address,
      description,
      phoneNumber,
      mainImage,
      link,
      menu,
      subImages,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(newPost);
}

export async function GET(request: Request) {

  const posts = await prisma.post.findMany({
      include: {
        user: true,
        comments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

  return NextResponse.json(posts);
}