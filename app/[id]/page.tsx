import React from "react";
import BreweriesApi from "@/services/BreweryService";
import BreweryEditForm from "@/components/BreweryEditForm";
import Brewery from "@/types/Brewery";

interface Props {
  params: { id: string };
}

export default async function BreweryDetails({ params }: Props) {
  const breweriesApi = new BreweriesApi();
  const id = params.id;
  const brewery: Brewery = await breweriesApi.fetchBreweryById(id);
  return <BreweryEditForm brewery={brewery} />;
}
