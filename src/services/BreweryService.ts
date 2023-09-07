import Brewery from "@/types/Brewery";

class BreweryService {
  private readonly baseUrl: string = "http://localhost:3008";

  async fetchBreweriesByInputText(query: string): Promise<Brewery[]> {
    const uri: string = `${this.baseUrl}?q=${query}`;
    const httpOptions: RequestInit = { method: "POST" };
    const breweries: Brewery[] = await fetch(uri, httpOptions).then((res) =>
      res.json()
    );
    return breweries;
  }

  async fetchBreweryById(breweryId: string): Promise<Brewery> {
    const uri: string = `${this.baseUrl}/${breweryId}`;
    const httpOptions: RequestInit = {
      method: "GET",
      cache: "no-store",
    };

    try {
      const brewery: Brewery = await fetch(uri, httpOptions).then((res) =>
        res.json()
      );
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

export default BreweryService;
