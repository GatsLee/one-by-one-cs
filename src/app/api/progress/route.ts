import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  const studentId = req.nextUrl.searchParams.get("studentId");
  if (!studentId) return NextResponse.json({ error: "studentId required" }, { status: 400 });

  const student = await prisma.student.findUnique({ where: { id: studentId } });
  if (!student) return NextResponse.json({ error: "not found" }, { status: 404 });

  const topics = JSON.parse(student.topicsJson || "{}");
  return NextResponse.json({ topics });
}

export async function PATCH(req: NextRequest) {
  const { studentId, docId, completed } = await req.json();
  if (!studentId || !docId) {
    return NextResponse.json({ error: "missing fields" }, { status: 400 });
  }

  const student = await prisma.student.findUnique({ where: { id: studentId } });
  if (!student) return NextResponse.json({ error: "not found" }, { status: 404 });

  const topics = JSON.parse(student.topicsJson || "{}");
  if (completed) {
    topics[docId] = true;
  } else {
    delete topics[docId];
  }

  await prisma.student.update({
    where: { id: studentId },
    data: { topicsJson: JSON.stringify(topics) },
  });

  return NextResponse.json({ topics });
}
