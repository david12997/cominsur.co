export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

import BreadCrumb from "@/components/breadcrumb/breadcrumb";
import SectionCatalogoApp from "@/components/sections/catalogo/section.catalogo";

export default function Catalogo() {
    return (
      <main>
        <BreadCrumb/>
        <SectionCatalogoApp/>
      </main>
    )
  }
  