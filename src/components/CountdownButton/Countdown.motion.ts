export const countdownButtonAnimation = (countdown: number) => ({
  initial: {
    backgroundImage:
      "linear-gradient(90deg, var(--tw-orange-500) 100%, var(--tw-orange-400) 100%)",
  },
  animate: {
    backgroundImage:
      "linear-gradient(90deg, var(--tw-orange-500) 0%, var(--tw-orange-400) 0%)",
    transition: {
      type: "tween",
      ease: "linear",
      duration: countdown,
      repeat: 0,
    },
  },
});
