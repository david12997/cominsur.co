'use client'

import ReduxProvider from "@/store/redux.provider"
import SectionCotizar from "./cotizar"


export default function CotizarWrapper(){

    return<ReduxProvider>        
        <SectionCotizar/>
    </ReduxProvider>
}