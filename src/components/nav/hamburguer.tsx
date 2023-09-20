'use client'

import { NavHamburger } from "@/icons"
import { usePathname } from 'next/navigation'

const ChangeColorLink = (pathname:string):void =>{

    const LinksMenuMobile = document.getElementsByClassName('btn-link-menu-mobile') as  HTMLCollectionOf<HTMLElement>;

    for(let i = 0; i < LinksMenuMobile.length; i++){
        LinksMenuMobile[i].style.background = '#222274';
        LinksMenuMobile[i].style.color = '#fff';
    }

    if(pathname === '/'){
        LinksMenuMobile[0].style.background = '#FFCA08';
        LinksMenuMobile[0].style.color = '#222274';
    }

    if(pathname === '/catalogo'){
        LinksMenuMobile[1].style.background = '#FFCA08';
        LinksMenuMobile[1].style.color = '#222274';
    }

    if(pathname === '/nosotros'){
        LinksMenuMobile[2].style.background = '#FFCA08';
        LinksMenuMobile[2].style.color = '#222274';
    }

    if(pathname === '/contacto'){
        LinksMenuMobile[3].style.background = '#FFCA08';
        LinksMenuMobile[3].style.color = '#222274';
    }

    if(pathname === '/cotizar'){
        LinksMenuMobile[4].style.background = '#FFCA08';
        LinksMenuMobile[4].style.color = '#222274';
    }

}

export const handleToggleMenuMobile = (pathname:string):void => {
        
    //get element menu mobile
    const menuMobile = document.querySelector('.nav-menu-mobile') as HTMLElement

    //know  if menu mobile is open or close by style property display
    const menuMobileIsOpen = menuMobile.style.display !== 'none' ? true : false

    //if menu mobile is open, close menu mobile
    if(menuMobileIsOpen){


        //hide menu mobile
        menuMobile.style.display = 'none'

    }else{



        //show menu mobile
        menuMobile.style.display = 'block'
    }
   
   ChangeColorLink(pathname);
}

const HamburgerNavMobile = ():JSX.Element => {


    const pathname = usePathname();

    return<>
        <span className="cursor-pointer"  onClick={()=>handleToggleMenuMobile(pathname)}>
            <NavHamburger/>
        </span>
    </>
}

export default HamburgerNavMobile