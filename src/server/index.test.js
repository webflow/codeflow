jest.mock("@/server/concurrency", () => require("./concurrency"), { virtual: true });
jest.mock("@/server/router", () => require("./router"), { virtual: true });
jest.mock("@/server/serviceWorkerController", () => ({
  ensureController: jest.fn().mockResolvedValue(undefined),
}), { virtual: true });

describe("mock API server", () => {
  let messageListener;
  let server;
  let logSpy;

  beforeAll(async () => {
    jest.useFakeTimers();
    logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    Object.defineProperty(navigator, "serviceWorker", {
      configurable: true,
      value: {
        addEventListener: jest.fn((type, listener) => {
          if (type === "message") messageListener = listener;
        }),
      },
    });

    server = require("./index");
    await server.initServer;
  });

  afterAll(() => {
    logSpy.mockRestore();
    jest.useRealTimers();
  });

  function request(data) {
    const postMessage = jest.fn();
    const completion = messageListener({ data, ports: [{ postMessage }] });
    return { postMessage, completion };
  }

  test("passes params, query, and body to a matching handler", async () => {
    const handler = jest.fn().mockResolvedValue({ saved: true });
    await server.setupRoutes([
      { method: "POST", path: "/api/items/:id", handler },
    ]);

    const { postMessage, completion } = request({
      type: "mock-api-request",
      method: "POST",
      url: "/api/items/42?draft=true",
      body: { name: "Example" },
    });
    await Promise.resolve();
    jest.runOnlyPendingTimers();
    await completion;

    expect(handler).toHaveBeenCalledWith({
      params: { id: "42" },
      query: { draft: "true" },
      body: { name: "Example" },
    });
    expect(postMessage).toHaveBeenCalledWith({ status: 200, body: { saved: true } });
  });

  test("returns 404 when no route matches", async () => {
    await server.setupRoutes([]);
    const { postMessage, completion } = request({
      type: "mock-api-request",
      method: "GET",
      url: "/api/missing",
    });
    await completion;

    expect(postMessage).toHaveBeenCalledWith({
      status: 404,
      body: { error: "No handler for GET /api/missing" },
    });
  });

  test("returns 500 when a route handler throws", async () => {
    await server.setupRoutes([
      {
        method: "GET",
        path: "/api/failure",
        handler: jest.fn().mockRejectedValue(new Error("boom")),
      },
    ]);
    const { postMessage, completion } = request({
      type: "mock-api-request",
      method: "GET",
      url: "/api/failure",
    });
    await Promise.resolve();
    jest.runOnlyPendingTimers();
    await completion;

    expect(postMessage).toHaveBeenCalledWith({
      status: 500,
      body: { error: "Error: boom" },
    });
  });

  test("ignores unrelated service worker messages", async () => {
    const postMessage = jest.fn();
    await messageListener({ data: { type: "other" }, ports: [{ postMessage }] });

    expect(postMessage).not.toHaveBeenCalled();
  });
});
