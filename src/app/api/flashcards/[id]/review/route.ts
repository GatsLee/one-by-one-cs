import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sm2Update } from "@/lib/sm2";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { quality } = await req.json();

  if (quality === undefined || quality < 0 || quality > 5) {
    return NextResponse.json({ error: "quality must be 0-5" }, { status: 400 });
  }

  const card = await prisma.flashcard.findUnique({ where: { id: parseInt(id) } });
  if (!card) return NextResponse.json({ error: "not found" }, { status: 404 });

  const result = sm2Update(
    { difficulty: card.difficulty, interval: card.interval, repetitions: card.repetitions },
    quality
  );

  const updated = await prisma.flashcard.update({
    where: { id: parseInt(id) },
    data: {
      difficulty: result.difficulty,
      interval: result.interval,
      repetitions: result.repetitions,
      nextReview: result.nextReview,
    },
  });

  return NextResponse.json(updated);
}
