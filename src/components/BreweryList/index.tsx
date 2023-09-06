import React from "react";
import Brewery from "@/types/Brewery";
import {
  saveBreweries,
  saveKeyword,
  saveScrollPosition,
} from "@/utils/search-result-cacher";
import BreweryCard from "./BreweryCard";

interface Props {
  inputText: string;
  breweries: Brewery[];
}

const BreweryList = ({ inputText, breweries }: Props) => {
  const saveSearchInfo = () => {
    saveKeyword(inputText);
    saveBreweries(breweries);
    saveScrollPosition(window.scrollY);
  };

  return (
    <section style={{ marginTop: "48px", height: "100%", width: "100vw" }}>
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "0 4vw",
        }}
        data-testid="searchResult"
      >
        {breweries.map((brewery: Brewery) => {
          return (
            <BreweryCard
              key={brewery.id}
              brewery={brewery}
              saveSearchInfo={saveSearchInfo}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default BreweryList;
