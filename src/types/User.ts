import Brewery from "./Brewery";

export interface User {
  userName: string;
  email: string;
  likes: Brewery[];
}
