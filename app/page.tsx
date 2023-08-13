"use client";

import React, { ChangeEvent, useEffect, useState, useTransition } from "react";
import SearchBar from "./search-bar/SearchBar";
import BreweriesApi from "@/services/BreweriesApi";
import Brewery from "@/types/Brewery";
import {
  loadBreweries,
  loadKeyword,
  loadScrollPosition,
} from "@/utils/search-result-cacher";
import BreweryList from "./brewery-list/BreweryList";

const Search = () => {
  const [inputText, setInputText] = useState<string>("");
  const [breweries, setbreweries] = useState<Brewery[]>([]);
  const [isPending, startTransition] = useTransition();
  const breweriesApi = new BreweriesApi();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handlebreweries = async () => {
    const newBreweries = await breweriesApi.fetchBreweriesByInputText(
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

  return (
    <>
      <SearchBar inputText={inputText} handleChange={handleChange} />
      <BreweryList inputText={inputText} breweries={breweries} />
    </>
  );
};

export default Search;
