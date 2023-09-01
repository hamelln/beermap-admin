import Brewery from "@/types/Brewery";

class BreweriesApi {
  // private readonly baseUrl: string =
  //   (process.env.NEXT_PUBLIC_BASE_URL as string) || "http://localhost:3008";

  private readonly baseUrl: string = "http://localhost:3008";

  async fetchBreweriesByInputText(query: string): Promise<Brewery[]> {
    const breweries: Brewery[] = await fetch(`${this.baseUrl}?q=${query}`, {
      method: "POST",
    }).then((res) => res.json());

    return breweries;
  }

  async fetchBreweryById(breweryId: string): Promise<Brewery> {
    try {
      const brewery: Brewery = await fetch(`${this.baseUrl}/${breweryId}`, {
        cache: "no-store",
      }).then((res) => res.json());
      return brewery;
    } catch (e: any) {
      if (e.response.status === 404) {
        throw new Error("찾으시는 브루어리가 없습니다.");
      } else {
        throw new Error(e.response.data.message);
      }
    }
  }

  async createBrewery(newBrewery: Partial<Brewery>) {
    const response = await fetch(`${this.baseUrl}/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBrewery),
    });
    const data = await response.json();
    return data;
  }

  async updateBrewery(updatedBrewery: Brewery) {
    const response = await fetch(`${this.baseUrl}/${updatedBrewery.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBrewery),
    });
    const data = await response.json();
    return data;
  }

  async deleteBrewery(breweryId: string) {
    await fetch(`${this.baseUrl}/${breweryId}`, { method: "DELETE" });
  }
}

export default BreweriesApi;
