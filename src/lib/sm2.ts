export interface SM2Card {
  difficulty: number;
  interval: number;
  repetitions: number;
}

export interface SM2Result extends SM2Card {
  nextReview: Date;
}

export function sm2Update(card: SM2Card, quality: number): SM2Result {
  let { difficulty, interval, repetitions } = card;

  if (quality < 3) {
    repetitions = 0;
    interval = 1;
  } else {
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * difficulty);
    }
    repetitions += 1;
  }

  difficulty = Math.max(
    1.3,
    difficulty + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)
  );

  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + interval);

  return { difficulty, interval, repetitions, nextReview };
}
