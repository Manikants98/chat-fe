export const useTheme = () => {
  if (typeof window !== 'undefined') {
    const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return isDark ? 'dark' : 'light';
  } else {
    return 'dark';
  }
};
