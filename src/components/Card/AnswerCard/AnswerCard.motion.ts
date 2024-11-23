export const howManyAnimation = {
  initial: { y: 25, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.25,
    },
  },
};

export const nextRoundAnimation = {
  initial: {
    y: 25 * -1,
    opacity: 0,
    scale: 0.8,
  },
  animate: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.5,
      type: "spring",
      bounce: 0.5,
    },
  },
};
