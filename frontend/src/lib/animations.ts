// lib/animations.ts
export const container = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i = 1) => ({
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2 * i,
    },
  }),
};

export const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120 } },
};
