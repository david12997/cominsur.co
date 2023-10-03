export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

import BreadCrumb from "@/components/breadcrumb/breadcrumb";
import CotizarWrapper from "@/components/sections/cotizar/cotizar.wrapper";

export default function  CotizarPage() {
    return(
        <main>
        
            <BreadCrumb/>
            <CotizarWrapper/>
           

        </main>
    )
}
