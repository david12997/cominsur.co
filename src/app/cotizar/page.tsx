export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

import BreadCrumb from "@/components/breadcrumb/breadcrumb";
import SectionCotizar from "../../components/sections/cotizar/cotizar";

export default function  CotizarPage() {
    return(
        <main>
        
            <BreadCrumb/>
            <SectionCotizar/>

           

        </main>
    )
}
