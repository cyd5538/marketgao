import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

interface IParams {
  slug: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {

  const myComment = await prisma.reservation.findMany({
      where: {
        userId: params.slug,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

  return NextResponse.json(myComment);
}