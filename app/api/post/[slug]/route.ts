import { NextResponse } from "next/server";

import prisma from "@/lib/prismadb";

interface IParams {
  postId?: string;
  slug: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {

  const listing = await prisma.post.findMany({
    where: {
      id: params.slug,
    },
    include: {
      user: true,
      comments: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(listing);
}

