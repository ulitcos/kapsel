import { Kapsel } from "./index";

describe("initial", () => {
  test("works correctly", () => {
    const kapsel = new Kapsel("Initial works correctly");
    expect(kapsel.data).toBe("Initial works correctly");
  });
});

describe("scenario with defer and subscribe", () => {
  test("works correctly with ", () => {
    const deferFn = jest.fn(() => Promise.resolve("deferred"));
    const firstCustomer = jest.fn();
    const secondCustomer = jest.fn();
    const kapsel = new Kapsel("init", deferFn);

    kapsel.subscribe(firstCustomer);

    expect(firstCustomer).toBeCalledTimes(0);
    expect(secondCustomer).toBeCalledTimes(0);
    expect(deferFn).toBeCalledTimes(0);
    expect(kapsel.isLoading).toBe(false);
    expect(kapsel.hasError).toBe(false);
    expect(kapsel.prev).toBe(null);

    expect(kapsel.data).toBe("init");
    expect(deferFn).toBeCalledTimes(1);

    expect(firstCustomer).toBeCalledTimes(1);
    expect(secondCustomer).toBeCalledTimes(0);
    expect(kapsel.isLoading).toBe(true);
    expect(kapsel.hasError).toBe(false);
    expect(kapsel.prev).toBe(null);

    kapsel.subscribe(secondCustomer);

    Promise.resolve().then(() => {
      expect(firstCustomer).toBeCalledTimes(2);
      expect(secondCustomer).toBeCalledTimes(1);
      expect(kapsel.isLoading).toBe(false);
      expect(kapsel.hasError).toBe(false);
      expect(kapsel.data).toBe("deferred");
      expect(kapsel.prev).toBe("init");
      expect(deferFn).toBeCalledTimes(1);

      kapsel.unsubscribe(firstCustomer);
      kapsel.data = "set";

      expect(firstCustomer).toBeCalledTimes(2);
      expect(secondCustomer).toBeCalledTimes(2);
      expect(kapsel.isLoading).toBe(false);
      expect(kapsel.hasError).toBe(false);
      expect(kapsel.data).toBe("set");
      expect(kapsel.prev).toBe("deferred");
      expect(deferFn).toBeCalledTimes(1);
    });
  });

  test("ignore correctly when set directly", () => {
    const deferFn = jest.fn(() => Promise.resolve("deferred"));
    const kapsel = new Kapsel("init", deferFn);

    expect(deferFn).toBeCalledTimes(0);
    kapsel.data = "set";
    expect(deferFn).toBeCalledTimes(0);
  });

  test("ignore correctly when invoke fill", () => {
    const deferFn = jest.fn(() => Promise.resolve("deferred"));
    const kapsel = new Kapsel("init", deferFn);

    expect(deferFn).toBeCalledTimes(0);
    kapsel.fill(Promise.resolve("filled"));
    expect(deferFn).toBeCalledTimes(0);
  });
});
