import * as superagent from "superagent";

const DEFAULT_BASE_URL = "https://api.content.tripadvisor.com/api/v1/location";

type Config = { key: string; baseUrl?: string };

export default class Client {
  private key: string;
  private baseUrl: string;

  constructor(private config: Config) {
    this.key = config.key;
    this.baseUrl = config.baseUrl || DEFAULT_BASE_URL;
  }

  public async findSearch(params: {
    searchQuery: string;
    category?: "hotels" | "attractions" | "restaurants" | "geos";
    phone?: string;
    address?: string;
    latLong?: string;
    radius?: string;
    radiusUnit?: "km" | "mi" | "m";
    language?: string;
  }) {
    const paramString = new URLSearchParams({
      key: this.key,
      ...params,
    });
    const url = this.baseUrl + "/search?" + paramString.toString();

    const response = await superagent(url);

    return response.body;
  }
}
