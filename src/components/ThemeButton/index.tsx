"use client";

import React, { useEffect, useState } from "react";
import SunIcon from "../icons/SunIcon";
import MoonIcon from "../icons/MoonIcon";
import S from "./ThemeButton.module.scss";

const ThemeButton = () => {
  const [isDark, setIsDark] = useState<boolean>(false);

  const changeTheme = (isDark: boolean) => {
    if (isDark) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.removeItem("theme");
    }
  };

  const handleTheme = () => {
    setIsDark(!isDark);
  };

  useEffect(() => {
    const savedTheme: string | null = localStorage.getItem("theme") ?? null;
    if (savedTheme) setIsDark(true);
  }, []);

  useEffect(() => {
    changeTheme(isDark);
  }, [isDark]);

  return (
    <div className={S.main} onClick={handleTheme}>
      <div>{isDark ? <MoonIcon /> : <SunIcon />}</div>
    </div>
  );
};

export default ThemeButton;
