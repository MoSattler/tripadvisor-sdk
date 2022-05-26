import superagent from "superagent";

const DEFAULT_BASE_URL = "https://api.content.tripadvisor.com/api/v1/location";

type Response<Data> = { data: Data };

type FindSearchResult = {
  location_id: string;
  name: string;
  address_obj: {
    street1: string;
    street2: string;
    city: string;
    country: string;
    postalcode: string;
    address_string: string;
  };
};

type Config = { key: string; baseUrl?: string };

export default class Client {
  private key: string;
  private baseUrl: string;

  constructor(private config: Config) {
    this.key = config.key;
    this.baseUrl = config.baseUrl || DEFAULT_BASE_URL;
  }

  private async request(endpoint: string, params?: Record<string, string>) {
    const paramString = new URLSearchParams({
      key: this.key,
      ...params,
    });
    const url = this.baseUrl + endpoint + "?" + paramString.toString();

    const response = await superagent(url);

    return response.body;
  }

  public findSearch = async (params: {
    searchQuery: string;
    category?: "hotels" | "attractions" | "restaurants" | "geos";
    phone?: string;
    address?: string;
    latLong?: string;
    radius?: string;
    radiusUnit?: "km" | "mi" | "m";
    language?: string;
  }): Promise<Response<Array<FindSearchResult>>> =>
    this.request("/search", params);

  public locationDetails = async (
    locationId: string,
    params?: {
      language?: string;
      currency?: string;
    }
  ) => this.request(`/${locationId}/details`, params);
}
