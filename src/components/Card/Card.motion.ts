export const playCardEnterAnimation = {
  initial: {
    opacity: 0,
    translateX: 320 * -1,
    translateY: 50,
    rotate: 22.5 * -1,
    transition: {
      duration: 0.75,
    },
  },
  animate: {
    opacity: 1,
    translateX: 0,
    translateY: 0,
    rotate: 0,
  },
  exit: {
    opacity: 0,
    translateX: 320,
    translateY: 50,
    rotate: 22.5,
    transition: {
      duration: 0.25,
    },
  },
};

export const answerCardAnimation = {
  initial: {
    scale: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
  },
};
