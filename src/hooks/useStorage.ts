import localforage from "localforage";
import { useEffect, useState } from "react";

const useStorage = <T>(
  key: string,
  defaultValue?: T
): [
  T | undefined,
  React.Dispatch<React.SetStateAction<T | undefined>>,
  Error | undefined
] => {
  // NOTE: data is always undefined during the first cycle (=> loading state)
  //       default value will only be set if no value exists in localforage
  const [data, setData] = useState<T>();
  const [error, setError] = useState<Error>();

  // read localforage on load
  useEffect(() => {
    (async () => {
      const value = (await localforage.getItem(key)) as T;
      setData(value === null ? defaultValue : value);
    })();
  }, [key, defaultValue]);

  // // read localforage on load
  // useEffect(() => {
  //   (async () => {
  //     const value = (await localforage.getItem(key)) as T;
  //     setData((prevData) => {
  //       if (prevData !== undefined) {
  //         // data has already been set...
  //         return prevData;
  //       }

  //       return value === null ? defaultValue : value;
  //     });
  //   })();
  // }, [key, defaultValue]);

  // TODO >>>>>>>>>>>>>

  // const wrappedSetData = (value: React.SetStateAction<T | undefined>): void => {
  //   setError(undefined);
  //   setData((prevData) => {
  //     // support "functional updates" (cf. https://reactjs.org/docs/hooks-reference.html#functional-updates)
  //     const simpleValue = value instanceof Function ? value(prevData) : value;

  //     // try to store value
  //     localforage.setItem(key, simpleValue).catch((e) => {
  //       console.error(e);
  //       setError(e); // store the error
  //       setData(prevData); // undo optimistic update
  //       // TODO make sure that this cannot override a later, valid value
  //     });

  //     // optimistic update
  //     return simpleValue;
  //   });
  // };

  // return [data, wrappedSetData, error];
  return [data, setData, error];
};

export default useStorage;
