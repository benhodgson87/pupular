export const countdownButtonAnimation = (countdown: number) => {
  const isDarkMode =
    window &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const baseColor = isDarkMode
    ? "var(--tw-orange-700)"
    : "var(--tw-orange-500)";

  const timerColor = isDarkMode
    ? "var(--tw-orange-600)"
    : "var(--tw-orange-400)";

  return {
    initial: {
      backgroundImage: `linear-gradient(90deg, ${timerColor} 100%, ${baseColor} 100%)`,
    },
    animate: {
      backgroundImage: `linear-gradient(90deg, ${timerColor} 0%, ${baseColor} 0%)`,
      transition: {
        type: "tween",
        ease: "linear",
        duration: countdown,
        repeat: 0,
      },
    },
  };
};
