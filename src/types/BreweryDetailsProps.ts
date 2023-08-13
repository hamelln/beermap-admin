import Brewery from "./Brewery";

export default interface BreweryDetailsProps extends Brewery {
  summarizedOfficeHours: string[][];
}
