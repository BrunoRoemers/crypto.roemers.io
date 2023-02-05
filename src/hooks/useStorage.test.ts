import { renderHook, waitFor } from "@testing-library/react";
import localforage from "localforage";
import { act } from "react-dom/test-utils";
import createDeferred from "../utils/createDeferred";
import useStorage from "./useStorage";

describe("useStorage", () => {
  const KEY = "test-key-123";
  const PERSISTED_STR = "persisted value 123";
  const DEFAULT_STR = "default value 123";

  afterEach(async () => {
    jest.restoreAllMocks();
    await localforage.clear();
  });

  describe("reading/initializing", () => {
    describe("localforage empty", () => {
      describe("hook with default value", () => {
        it("should return undefined, then switch to the default value", async () => {
          const { result } = renderHook(() => useStorage(KEY, DEFAULT_STR));

          expect(result.current[0]).toBe(undefined);
          expect(result.current[2]).toBe(undefined);

          await waitFor(() => expect(result.current[0]).toBe(DEFAULT_STR));
          await waitFor(() => expect(result.current[2]).toBe(undefined));
        });
      });

      describe("hook without default value", () => {
        it("should return undefined", async () => {
          const { result } = renderHook(() => useStorage(KEY));

          expect(result.current[0]).toBe(undefined);
          expect(result.current[2]).toBe(undefined);
        });
      });
    });

    describe("localforage contains null", () => {
      beforeEach(async () => {
        await localforage.setItem(KEY, null);
      });

      describe("hook with default value", () => {
        it("should return undefined, then switch to the default value", async () => {
          const { result } = renderHook(() => useStorage(KEY, DEFAULT_STR));

          expect(result.current[0]).toBe(undefined);
          expect(result.current[2]).toBe(undefined);

          await waitFor(() => expect(result.current[0]).toBe(DEFAULT_STR));
          await waitFor(() => expect(result.current[2]).toBe(undefined));
        });
      });

      describe("hook without default value", () => {
        it("should return undefined", async () => {
          const { result } = renderHook(() => useStorage(KEY));

          expect(result.current[0]).toBe(undefined);
          expect(result.current[2]).toBe(undefined);
        });
      });
    });

    describe("localforage contains undefined", () => {
      beforeEach(async () => {
        await localforage.setItem(KEY, undefined);
      });

      describe("hook with default value", () => {
        it("should return undefined, then switch to the default value", async () => {
          const { result } = renderHook(() => useStorage(KEY, DEFAULT_STR));

          expect(result.current[0]).toBe(undefined);
          expect(result.current[2]).toBe(undefined);

          await waitFor(() => expect(result.current[0]).toBe(DEFAULT_STR));
          await waitFor(() => expect(result.current[2]).toBe(undefined));
        });
      });

      describe("hook without default value", () => {
        it("should return undefined", async () => {
          const { result } = renderHook(() => useStorage(KEY));

          expect(result.current[0]).toBe(undefined);
          expect(result.current[2]).toBe(undefined);
        });
      });
    });

    describe("localforage contains false", () => {
      beforeEach(async () => {
        await localforage.setItem(KEY, false);
      });

      describe("hook with default value", () => {
        it("should return undefined, then switch to false", async () => {
          const { result } = renderHook(() => useStorage(KEY, DEFAULT_STR));

          expect(result.current[0]).toBe(undefined);
          expect(result.current[2]).toBe(undefined);

          await waitFor(() => expect(result.current[0]).toBe(false));
          await waitFor(() => expect(result.current[2]).toBe(undefined));
        });
      });

      describe("hook without default value", () => {
        it("should return undefined, then switch to false", async () => {
          const { result } = renderHook(() => useStorage(KEY));

          expect(result.current[0]).toBe(undefined);
          expect(result.current[2]).toBe(undefined);

          await waitFor(() => expect(result.current[0]).toBe(false));
          await waitFor(() => expect(result.current[2]).toBe(undefined));
        });
      });
    });

    describe("localforage contains true", () => {
      beforeEach(async () => {
        await localforage.setItem(KEY, true);
      });

      describe("hook with default value", () => {
        it("should return undefined, then switch to true", async () => {
          const { result } = renderHook(() => useStorage(KEY, DEFAULT_STR));

          expect(result.current[0]).toBe(undefined);
          expect(result.current[2]).toBe(undefined);

          await waitFor(() => expect(result.current[0]).toBe(true));
          await waitFor(() => expect(result.current[2]).toBe(undefined));
        });
      });

      describe("hook without default value", () => {
        it("should return undefined", async () => {
          const { result } = renderHook(() => useStorage(KEY));

          expect(result.current[0]).toBe(undefined);
          expect(result.current[2]).toBe(undefined);

          await waitFor(() => expect(result.current[0]).toBe(true));
          await waitFor(() => expect(result.current[2]).toBe(undefined));
        });
      });
    });

    describe("localforage contains string", () => {
      beforeEach(async () => {
        await localforage.setItem(KEY, PERSISTED_STR);
      });

      describe("hook with default value", () => {
        it("should return undefined, then switch to the persisted value", async () => {
          const { result } = renderHook(() => useStorage(KEY, DEFAULT_STR));

          expect(result.current[0]).toBe(undefined);
          expect(result.current[2]).toBe(undefined);

          await waitFor(() => expect(result.current[0]).toBe(PERSISTED_STR));
          await waitFor(() => expect(result.current[2]).toBe(undefined));
        });
      });

      describe("hook without default value", () => {
        it("should return undefined, then switch to the persisted value", async () => {
          const { result } = renderHook(() => useStorage(KEY));

          expect(result.current[0]).toBe(undefined);
          expect(result.current[2]).toBe(undefined);

          await waitFor(() => expect(result.current[0]).toBe(PERSISTED_STR));
          await waitFor(() => expect(result.current[2]).toBe(undefined));
        });
      });
    });
  });

  describe("reading/initializing (mocked)", () => {
    it("should not override new data", async () => {
      const { promise, resolve } = createDeferred();

      jest
        .spyOn(localforage, "getItem")
        .mockReturnValueOnce(promise)
        .mockRejectedValue("too many calls");

      const { result } = renderHook(() => useStorage(KEY));

      expect(result.current[0]).toBe(undefined);
      expect(result.current[2]).toBe(undefined);

      act(() => result.current[1]("fresh value"));

      await waitFor(() => expect(result.current[0]).toBe("fresh value"));
      await waitFor(() => expect(result.current[2]).toBe(undefined));

      act(() => resolve("stale value"));

      await waitFor(() => expect(promise).resolves.toBe("stale value"));

      await waitFor(() => expect(result.current[0]).toBe("fresh value"));
      await waitFor(() => expect(result.current[2]).toBe(undefined));
    });
  });

  // describe("writing", () => {
  //   // TODO with/without default value
  //   // TODO functional updates properly supported?

  //   it("TODO", async () => {
  //     const { result } = renderHook(() => useStorage(KEY));

  //     await waitFor(() => expect(result.current[0]).toBe(undefined));
  //     await waitFor(() => expect(result.current[2]).toBe(undefined));

  //     act(() => result.current[1]("new value"));

  //     await waitFor(() => expect(result.current[0]).toBe("new value"));
  //     await waitFor(() => expect(result.current[2]).toBe(undefined));
  //     await expect(localforage.getItem(KEY)).resolves.toBe("new value");
  //   });
  // });

  // describe("writing (mocked)", () => {
  //   // TODO error correctly stored and cleared?
  //   // TODO optimistic set (and revert) works?
  // });
});
