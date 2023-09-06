"use client";

import React, { ChangeEvent, useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Brewery from "@/types/Brewery";
import MouseClick from "@/types/MouseClick";
import {
  loadBreweries,
  loadKeyword,
  loadScrollPosition,
} from "@/utils/search-result-cacher";
import BreweryService from "@/services/BreweryService";
import BreweryList from "./brewery-list/BreweryList";
import SearchBar from "./search-bar/SearchBar";

const Search = () => {
  const [inputText, setInputText] = useState<string>("");
  const [breweries, setbreweries] = useState<Brewery[]>([]);
  const [isPending, startTransition] = useTransition();
  const breweryService = new BreweryService();
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handlebreweries = async () => {
    const newBreweries = await breweryService.fetchBreweriesByInputText(
      inputText
    );
    setbreweries(newBreweries);
  };

  const restoreScroll = (y: number) => {
    if (y === 0 || window.scrollY !== 0) return;
    requestAnimationFrame(() => {
      scrollTo(0, y);
      restoreScroll(y);
    });
  };

  useEffect(() => {
    if (sessionStorage.length > 0) {
      setInputText(loadKeyword());
      setbreweries(loadBreweries());
      restoreScroll(loadScrollPosition());
    }
  }, []);

  useEffect(() => {
    startTransition(() => {
      handlebreweries();
    });
  }, [inputText]);

  const handleClick = (e: MouseClick) => {
    e.preventDefault();
    router.push(`/new`);
  };

  return (
    <>
      <SearchBar inputText={inputText} handleChange={handleChange} />
      <BreweryList inputText={inputText} breweries={breweries} />
      <button
        style={{
          backgroundColor: "yellow",
          position: "fixed",
          bottom: "10vh",
          left: "2vw",
          zIndex: "9999",
        }}
        onClick={handleClick}
      >
        새 브루어리 작성
      </button>
    </>
  );
};

export default Search;
