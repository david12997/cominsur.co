import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

// Use local storage in the browser; noop storage on the server
const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

export const persistConfig = {
  key: "root",
  storage,
  // whitelist the reducers you actually have in rootReducer
  whitelist: ["systems"],
};