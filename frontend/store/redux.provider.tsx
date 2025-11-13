"use client";

import { Provider } from "react-redux";
import { store } from ".";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { useMemo } from "react";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // create persistor on client only and memoize it so it's stable across renders
  const persistor = useMemo(() => persistStore(store), []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </Provider>
  );
}