'use client'

import { ArrowLeft } from "@/icons"
import { handleToggleMenuMobile } from "./hamburguer"
import { usePathname } from "next/navigation"

const ArrowCloseMenuMobile = ():JSX.Element => {

    const pathname = usePathname();

    return<>
        <span className="cursor-pointer"  onClick={()=>handleToggleMenuMobile(pathname)}>
            <ArrowLeft/>
        </span>
    </>
}

export default ArrowCloseMenuMobile