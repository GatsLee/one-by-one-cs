import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  const studentId = req.nextUrl.searchParams.get("studentId");
  const due = req.nextUrl.searchParams.get("due");

  if (!studentId) return NextResponse.json({ error: "studentId required" }, { status: 400 });

  const where: Record<string, unknown> = { studentId };
  if (due === "true") {
    where.nextReview = { lte: new Date() };
  }

  const cards = await prisma.flashcard.findMany({
    where,
    orderBy: { nextReview: "asc" },
    take: 20,
  });

  return NextResponse.json(cards);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { studentId, topic, question, answer } = body;

  if (!studentId || !question || !answer) {
    return NextResponse.json({ error: "missing fields" }, { status: 400 });
  }

  const card = await prisma.flashcard.create({
    data: { studentId, topic: topic || "", question, answer },
  });

  return NextResponse.json(card);
}
