export const scorePresenceAnimation = {
  initial: {
    y: 50 * -1,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
  exit: {
    y: 50 * -1,
    opacity: 0,
  },
};

export const scoreChangeAnimation = {
  initial: {
    translateX: 20,
    opacity: 0,
    transition: {
      duration: 0.25,
    },
  },
  animate: {
    translateX: 0,
    opacity: 1,
  },
  exit: {
    translateX: 20 * -1,
    opacity: 0,
    transition: {
      duration: 0.25,
    },
  },
};
