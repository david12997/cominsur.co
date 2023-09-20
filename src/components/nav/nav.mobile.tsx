import ArrowCloseMenuMobile from "./arrow.left"
import BtnLink from "../buttons/btn.link/btn.link"
import BtnCotizacion from "../buttons/btn.cotizacion/btn.cotizacion"

const NavMobile = ():JSX.Element => {

    return<>
        <section style={{display:'none'}} className="z-[999] nav-menu-mobile bg-white  w-[90vw]  ml-[7vw] fixed h-[100vh] top-0 shadow-[-6px_0_6px_rgba(0,0,0,0.2)]">
            <div className="container-title-arrow w-[100%] h-[50px] relative flex items-center justify-center">
                
                <h1 className="text-[#6a6a6a] font-bold text-[18px]">Menú</h1>
                
                <div className="arrow-left absolute  left-[87%]">
                    <ArrowCloseMenuMobile/>
                </div>
                
            </div>
            <hr className="w-[90%] ml-[5%]" />
            <div className="container-options-nav-mobile w-[80%] ml-[10%] h-[50px] flex items-center justify-center flex-wrap mt-6">
                    <span className="mt-4 mb-4 w-[100%]">
                        <BtnLink
                            bg="#222274"
                            link="/"
                            text="Inicio"
                        />
                    </span>
                    <span className="mt-4 mb-4 w-[100%]">
                        <BtnLink
                            bg="#222274"
                            link="/catalogo"
                            text="Catálogo"
                        />
                    </span>
                    <span className="mt-4 mb-4 w-[100%]">
                        <BtnLink
                            bg="#222274"
                            link="/nosotros"
                            text="Nosotros"
                        />
                    </span>
                    <span className="mt-4 mb-4 w-[100%]">
                        <BtnLink
                            bg="#222274"
                            link="/contacto"
                            text="Contacto"
                        />
                    </span>

                    <span className="mt-4 mb-4 w-[100%]">
                        <BtnLink
                            bg="#222274"
                            link="/cotizar"
                            text="Solicitar cotización"
                        />
                    </span>

            </div>
        </section>
    </>
}

export default NavMobile