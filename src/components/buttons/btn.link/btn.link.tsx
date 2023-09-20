'use client'

import { handleToggleMenuMobile } from "@/components/nav/hamburguer"
import Link from "next/link"
import { usePathname } from "next/navigation"

const BtnLink = (props:{bg:string,link:string,text:string}):JSX.Element => {

    const pathname = usePathname();

    return <>
        <Link style={{background:props.bg}} href={props.link} 
            className="rounded-[6px] btn-link-menu-mobile  w-[100%] h-[52px] flex items-center justify-center  text-white"
            onClick={()=>handleToggleMenuMobile(pathname)}
        >
            <p className="font-extrabold text-[17px]">
              {props.text}
            </p>
        </Link>
    </>
}

export default BtnLink