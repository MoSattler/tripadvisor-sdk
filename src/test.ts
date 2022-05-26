import * as nock from "nock";
import { findSearchMockResponse } from "./fixtures";

import Client from "./index";

beforeAll(() => {
  nock.disableNetConnect();
});

test("sends correct request", async () => {
  const baseUrl = "https://www.mybase.url";
  const key = "some-key";

  const params = {
    searchQuery: "some-query",
    category: "restaurants" as const,
    phone: "1234567890",
    address: "some-address",
    latLong: "42,-2",
    radius: "10",
    radiusUnit: "km" as const,
    language: "en",
  };

  nock(baseUrl)
    .get("/search")
    .query({ ...params, key })
    .reply(200, findSearchMockResponse);

  const client = new Client({ key, baseUrl });

  const response = await client.findSearch(params);

  expect(response).toEqual(findSearchMockResponse);
});
