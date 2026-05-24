const messages = [
  "Champions are built in the off-season.",
  "Every touch counts. Make them quality.",
  "The difference between good and great is one more rep.",
  "Train like you're second. Play like you're first.",
  "Your future self will thank you for today's work.",
  "The ball doesn't care how tired you are. Control it anyway.",
  "Consistency beats talent when talent doesn't work hard.",
  "Great defenders are made, not born. Keep building.",
  "1000 touches today. 1000 touches closer to your dream.",
  "The player who trains alone is never really alone — discipline is your teammate.",
  "Every pro started where you are right now.",
  "Be the player that coaches can't leave out.",
  "Your weak foot is your secret weapon waiting to unlock.",
  "Scan, decide, execute. Repeat. That's how you dominate.",
  "Recovery is part of training. Rest hard, train harder.",
  "The best ability is availability. Take care of your body.",
  "Play with your head up. See the game before it happens.",
  "Pressure is a privilege. Embrace it.",
  "The best players never stop learning.",
  "You're not just training your feet. You're training your brain.",
  "One more rep. One more touch. One more day closer.",
  "The grind is the glory.",
  "Trust the process. The results will come.",
  "Be the hardest worker on the pitch. Every single time.",
  "Your position demands excellence. Train for it.",
];

export function getMotivationalMessage(dayNumber: number): string {
  return messages[dayNumber % messages.length];
}

export function getRandomMessage(): string {
  return messages[Math.floor(Math.random() * messages.length)];
}
