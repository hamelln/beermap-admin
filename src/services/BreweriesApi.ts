import Brewery from "@/types/Brewery";
import BreweryDetailsProps from "@/types/BreweryDetailsProps";

class BreweriesApi {
  private readonly baseUrl: string =
    (process.env.NEXT_PUBLIC_BASE_URL as string) || "http://localhost:3008";

  async fetchBreweriesByInputText(query: string): Promise<Brewery[]> {
    const breweries: Brewery[] = await fetch(`${this.baseUrl}?q=${query}`, {
      method: "POST",
    }).then((res) => res.json());
    return breweries;
  }

  async fetchBreweryById(breweryId: string): Promise<BreweryDetailsProps> {
    try {
      const brewery: BreweryDetailsProps = await fetch(
        `${this.baseUrl}/${breweryId}`,
        { next: { revalidate: 604800 } }
      ).then((res) => res.json());

      return brewery;
    } catch (e: any) {
      if (e.response.status === 404) {
        throw new Error("찾으시는 브루어리가 없습니다.");
      } else {
        throw new Error(e.response.data.message);
      }
    }
  }
}

export default BreweriesApi;
