"use client";

import { Provider } from "react-redux";
import { store } from ".";
import { persistStore } from "redux-persist";


export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  persistStore(store); // to avoid "window is not defined" error during SSR

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}