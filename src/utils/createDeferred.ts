import { v4 as uuidv4 } from "uuid";

/**
 * Create a promise that can be resolved/rejected with the returned methods.
 */
const createDeferred = () => {
  const uuid = uuidv4();
  const eventName = `deferred_${uuid}`;

  const promise = new Promise((_res, _rej) => {
    const listener = (e: Event) => {
      document.removeEventListener(eventName, listener);

      if (!(e instanceof CustomEvent)) {
        throw new Error(`expected custom event, got: ${e}`);
      }

      const { action, payload } = e.detail;

      if (action === "resolve") {
        _res(payload);
      } else if (action === "reject") {
        _rej(payload);
      } else {
        throw new Error(`expected event with valid action, got: ${e}`);
      }
    };

    document.addEventListener(eventName, listener);
  });

  const dispatch = (action: "resolve" | "reject", payload: any) => {
    document.dispatchEvent(
      new CustomEvent(eventName, {
        detail: {
          action,
          payload,
        },
      })
    );
  };

  return {
    promise,
    resolve: (value: unknown): void => dispatch("resolve", value),
    reject: (reason?: any): void => dispatch("reject", reason),
  };
};

export default createDeferred;
