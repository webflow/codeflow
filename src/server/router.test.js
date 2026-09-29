import { compilePath, matchRoute } from "./router";

const handler = jest.fn();

function route(method, path, routeHandler = handler) {
  return { method, regex: compilePath(path), handler: routeHandler };
}

describe("mock API router", () => {
  beforeEach(() => handler.mockReset());

  test("matches a static route exactly", () => {
    const routes = [route("GET", "/api/items")];

    expect(matchRoute(routes, "GET", "/api/items")).toEqual({ handler, params: {} });
    expect(matchRoute(routes, "GET", "/api/items/1")).toBeNull();
  });

  test("extracts named path parameters", () => {
    const matched = matchRoute(
      [route("GET", "/api/teams/:teamId/items/:itemId")],
      "GET",
      "/api/teams/platform/items/42"
    );

    expect(matched).toEqual({
      handler,
      params: { teamId: "platform", itemId: "42" },
    });
  });

  test("does not match the wrong HTTP method", () => {
    expect(matchRoute([route("POST", "/api/items")], "GET", "/api/items")).toBeNull();
  });

  test("treats regex characters in literal segments as plain text", () => {
    const routes = [route("GET", "/api/releases/v1.0+beta")];

    expect(matchRoute(routes, "GET", "/api/releases/v1.0+beta")).not.toBeNull();
    expect(matchRoute(routes, "GET", "/api/releases/v1x00beta")).toBeNull();
  });

  test("uses the first matching route", () => {
    const first = jest.fn();
    const second = jest.fn();
    const matched = matchRoute(
      [route("GET", "/api/items/:id", first), route("GET", "/api/items/:slug", second)],
      "GET",
      "/api/items/42"
    );

    expect(matched?.handler).toBe(first);
  });
});
