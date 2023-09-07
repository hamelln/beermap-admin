import Img from "./Img";
import OfficeHours from "./OfficeHours";

export default interface Brewery {
  id: string;
  breweryName: string;
  breweryType: string;
  images: Img[];
  stateProvince: string;
  city: string;
  address: string;
  postalCode: string;
  longitude: number;
  latitude: number;
  phone: string;
  websiteUrl: string;
  websiteType: string;
  breweryIntro: string;
  breweryDescription: string;
  beerName: string;
  beerDescription: string;
  officeHours: OfficeHours;
  summarizedOfficeHours?: string[][];
}
