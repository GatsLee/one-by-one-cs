import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { studentId, topic, mode, questionsCount, correctCount, durationSec } = body;

  if (!studentId || !topic || !mode) {
    return NextResponse.json({ error: "missing fields" }, { status: 400 });
  }

  const session = await prisma.studySession.create({
    data: {
      studentId,
      topic,
      mode,
      questionsCount: questionsCount || 0,
      correctCount: correctCount || 0,
      durationSec: durationSec || 0,
    },
  });

  return NextResponse.json(session);
}

export async function GET(req: NextRequest) {
  const studentId = req.nextUrl.searchParams.get("studentId");
  if (!studentId) return NextResponse.json({ error: "studentId required" }, { status: 400 });

  const sessions = await prisma.studySession.findMany({
    where: { studentId },
    orderBy: { timestamp: "desc" },
    take: 50,
  });

  return NextResponse.json(sessions);
}
