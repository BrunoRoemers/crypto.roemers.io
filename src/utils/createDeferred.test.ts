import createDeferred from "./createDeferred";

describe("createDeferred", () => {
  let removeEventListenerSpy: jest.SpyInstance;

  beforeEach(() => {
    removeEventListenerSpy = jest.spyOn(document, "removeEventListener");
  });

  it("should resolve", async () => {
    const { promise, resolve } = createDeferred();
    resolve("asdf");
    await expect(promise).resolves.toBe("asdf");
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(1);
  });

  it("should reject", async () => {
    const { promise, reject } = createDeferred();
    reject("haha");
    await expect(promise).rejects.toBe("haha");
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(1);
  });

  it("should not interfere with others", async () => {
    const { promise: promise1, resolve: resolve1 } = createDeferred();
    const { promise: promise2, resolve: resolve2 } = createDeferred();
    const { promise: promise3, reject: reject3 } = createDeferred();

    resolve1("one");
    await expect(promise1).resolves.toBe("one");

    resolve2("two");
    reject3("three");
    await expect(promise2).resolves.toBe("two");
    await expect(promise3).rejects.toBe("three");

    expect(removeEventListenerSpy).toHaveBeenCalledTimes(3);
  });
});
