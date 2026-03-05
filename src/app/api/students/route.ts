import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { name } = await req.json();
  if (!name) return NextResponse.json({ error: "name required" }, { status: 400 });

  const student = await prisma.student.upsert({
    where: { name },
    create: { name },
    update: {},
  });

  return NextResponse.json(student);
}
