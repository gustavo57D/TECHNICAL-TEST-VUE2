export const useTheme = () => {
  const LOCAL_STORAGE_KEY = "darkTheme";

  const initTheme = (): boolean => {
    return !!localStorage.getItem(LOCAL_STORAGE_KEY);
  };

  const toggleTheme = (isDark: boolean): void => {
    localStorage.setItem(LOCAL_STORAGE_KEY, isDark ? "true" : "");
  };

  return {
    initTheme,
    toggleTheme,
  };
};
