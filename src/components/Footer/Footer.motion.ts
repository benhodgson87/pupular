export const coffeeLinkAnimation = {
  initial: {
    y: 50,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 2,
      type: "spring",
      bounce: 0.75,
    },
  },
  exit: {
    y: 50,
    opacity: 0,
  },
};
