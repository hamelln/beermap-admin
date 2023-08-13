export default function recognizeTheme() {
  const theme: string = localStorage.getItem("theme") ?? "light";
  document.body.setAttribute("data-theme", theme);

  const isDarkMode = navigator.userAgent.includes("{isDark property}");
  if (isDarkMode) {
    document.body.setAttribute("data-theme", "dark");
  }

  if (matchMedia("(prefers-color-scheme: dark)").matches) {
    document.body.setAttribute("data-theme", "dark");
  }

  const mediaQueryList = matchMedia("(prefers-color-scheme: dark)");
  mediaQueryList.addEventListener("change", (e) => {
    if (e.matches) {
      document.body.setAttribute("data-theme", "dark");
    } else {
      document.body.setAttribute("data-theme", "light");
    }
  });

  return theme;
}
