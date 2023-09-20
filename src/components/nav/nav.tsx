import Image from "next/image"
import Link from "next/link"
import BtnCotizacion from "../buttons/btn.cotizacion/btn.cotizacion"
import HamburgerNavMobile from "./hamburguer"
import NavMobile from "./nav.mobile"


const Nav = ():JSX.Element=>{


    return<>
        <nav className="w-screen h-[50px] bg-white shadow-[0px_3px_3px_rgba(0,0,0,0.2)] relative">
            <div className="main-container w-[94vw] ml-[3vw] flex items-center justify-between">
                <div className="contaner-logo flex items-center justify-center  min-w-[200px] h-[50px]">
                    <Link href={'/'}>
                        <Image
                            src={'https://cms.cominsur.co/cominsur/assets/g7y7rumo0i88skg4'}
                            alt="Cominsur logo"
                            height={35}
                            width={192}
                            priority={true}
                        />
                    </Link>
                </div>

                <div className="icon-menu-mobile flex md:hidden ">
                   <HamburgerNavMobile/>
                </div>

                <NavMobile/>

                <div className="options-nav-desktop hidden  md:flex  h-[50px] items-center"> 
                    <ul className="flex items-center justify-around w-[400px] h-[50px] text-[#8f8f8f]">
                        <li className="option-nav-desktop font-bold text-[18px]">
                            <Link href={'/'}>Inicio</Link>
                        </li>
                        <li className="option-nav-desktop font-bold text-[18px]">
                            <Link href={'/catalogo'}>Catálogo</Link>
                        </li>
                        <li className="option-nav-desktop font-bold text-[18px]">
                            <Link href={'/nosotros'}>Nosotros</Link>
                        </li>
                        <li className="option-nav-desktop font-bold text-[18px]">
                            <Link href={'/contacto'}>Contacto</Link>
                        </li>
                    </ul>

                    <BtnCotizacion
                        link="/cotizar"
                        text="SOLICITAR COTIZACIÓN"
                        linear={{
                            color1:'#000032',
                            color2:'#222274',
                            color3:'#dcad01'    
                        }}
                        width="230px"                       
                        height="40px"
                    />

                </div>

            </div>
        </nav>
    
    </>
}

export default Nav