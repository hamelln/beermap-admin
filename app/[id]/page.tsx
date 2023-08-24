import React from "react";
import BreweriesApi from "@/services/BreweriesApi";
import BreweryForm from "./brewery_edit_form";
import Brewery from "@/types/Brewery";

interface Props {
  params: { id: string };
}

export default async function BreweryDetails({ params }: Props) {
  const breweriesApi = new BreweriesApi();
  const id = params.id;
  const breweryInfo: Brewery = await breweriesApi.fetchBreweryById(id);
  return <BreweryForm breweryData={breweryInfo} />;
}
