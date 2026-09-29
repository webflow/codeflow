import { createPool } from "./concurrency";

describe("mock API concurrency pool", () => {
  test("allows work up to the configured limit", async () => {
    const pool = createPool(2);

    await expect(pool.acquire()).resolves.toBeUndefined();
    await expect(pool.acquire()).resolves.toBeUndefined();
  });

  test("queues work beyond the limit until a slot is released", async () => {
    const pool = createPool(1);
    await pool.acquire();

    let acquired = false;
    const waiting = pool.acquire().then(() => {
      acquired = true;
    });
    await Promise.resolve();
    expect(acquired).toBe(false);

    pool.release();
    await waiting;
    expect(acquired).toBe(true);
  });

  test("releases queued work in FIFO order", async () => {
    const pool = createPool(1);
    await pool.acquire();
    const order = [];

    const second = pool.acquire().then(() => order.push("second"));
    const third = pool.acquire().then(() => order.push("third"));

    pool.release();
    await second;
    expect(order).toEqual(["second"]);

    pool.release();
    await third;
    expect(order).toEqual(["second", "third"]);
  });
});
