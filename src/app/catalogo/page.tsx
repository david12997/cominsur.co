export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

import BreadCrumb from "@/components/breadcrumb/breadcrumb";
import SectionCatalogoApp from "@/components/sections/catalogo/section.catalogo";
import SectionCatalogoWrapper from "@/components/sections/catalogo/section.catalogo.wrapper";

export default function Catalogo() {
    return (
      <main>
        <BreadCrumb/>
        <SectionCatalogoWrapper/>
      </main>
    )
  }
  