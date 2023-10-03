"use client";

import ReduxProvider from "@/store/redux.provider";
import SectionCatalogoApp from "./section.catalogo";

export default function SectionCatalogoWrapper() {
  return (
    <ReduxProvider>
      <SectionCatalogoApp />
    </ReduxProvider>
  );
}