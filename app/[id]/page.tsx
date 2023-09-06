import React from "react";
import BreweryDetailsProps from "@/types/BreweryDetailsProps";
import BreweriesApi from "@/services/BreweryService";
import BreweryEditForm from "@/components/BreweryEditForm";

interface Props {
  params: { id: string };
}

export default async function BreweryDetails({ params }: Props) {
  const breweriesApi = new BreweriesApi();
  const id = params.id;
  const brewery: BreweryDetailsProps = await breweriesApi.fetchBreweryById(id);
  return <BreweryEditForm brewery={brewery} />;
}
