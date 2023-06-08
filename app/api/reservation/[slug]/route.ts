import { NextResponse } from "next/server";

import prisma from "@/lib/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  postId?: string;
  slug: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  
  const body = await request.json();
  const { description, postId, userId, title, mainImage, date } = body
  

  const reservation = await prisma.reservation.create({
    data : {
      postId,
      description,
      title,
      mainImage,
      userId,
      date
    }
  });

  return NextResponse.json(reservation);
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const reservation = await prisma.reservation.findUnique({ where: { id:params.slug } });

  await prisma.reservation.delete({ where: { id:params.slug } });

  return NextResponse.json(reservation);
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  const body = await request.json();
  const { date } = body
  
  const updatedreservation = await prisma.reservation.update({
    where: { id : params.slug },
    data: {
      date,
    }
  });

  return NextResponse.json(updatedreservation);
}