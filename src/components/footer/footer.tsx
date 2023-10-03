import Image from "next/image"
import Link from "next/link"

const Footer = ():JSX.Element => {

    return<>
        <footer className="flex items-center justify-center flex-wrap mt-[40px] w-[100%] h-[1000px] md:h-[400px] shadow-[-3px_0px_3px_rgba(0,0,0,0.2)] bg-white">
            
            <div className="p-2 content-1 w-[100%] h-[33%] md:w-[30%] md:h-[100%] ">

                <p className="font-extrabold p-2 w-[100%] h-[50px] flex items-center text-[20px] text-[#000032]">Mapa del sitio</p>
                <Link href={'/'} className="cursor-pointer font-extrabold p-2 w-[100%] h-[50px] flex items-center text-[18px] text-[#6a6a6a]">Inicio</Link>
                <Link href={'/catalogo'} className="cursor-pointer font-extrabold p-2 w-[100%] h-[50px] flex items-center text-[18px] text-[#6a6a6a]">Catálogo</Link>
                <Link href={'/nosotros'} className="cursor-pointer font-extrabold p-2 w-[100%] h-[50px] flex items-center text-[18px] text-[#6a6a6a]">Nosotros</Link>
                <Link href={'/contacto'} className="cursor-pointer font-extrabold p-2 w-[100%] h-[50px] flex items-center text-[18px] text-[#6a6a6a]">Contacto</Link>
                <Link href={'/cotizar'} className="cursor-pointer font-extrabold p-2 w-[100%] h-[50px] flex items-center text-[18px] text-[#4a0083]">Solicitar cotización</Link>

            </div>
            <div className="p-2 content-2 w-[100%] h-[33%] md:w-[30%] md:h-[100%] border-t border-[#e6e6e6] border-b md:border-t-0 md:border-b-0">
                <p className="font-extrabold p-2 w-[100%] h-[50px] flex items-center text-[20px] text-[#000032]">Cominsur</p>
                <p className="font-extrabold p-2 w-[100%] h-[50px] flex items-center text-[18px] text-[#6a6a6a]">Importadores mayoristas</p>
                <p className="font-extrabold p-2 w-[100%] h-[50px] flex items-center text-[18px] text-[#6a6a6a]">Cra 21 69 - 48 Bogotá</p>
                <p className="font-extrabold p-2 w-[100%] h-[50px] flex items-center text-[18px] text-[#6a6a6a]">Calle 166 # 17 - 42 Bogotá</p>
                <p className="font-extrabold p-2 w-[100%] h-[50px] flex items-center text-[18px] text-[#6a6a6a]">ventas@comnisur.co</p>
                <p className="font-extrabold p-2 w-[100%] h-[50px] flex items-center text-[18px] text-[#6a6a6a]">320 914 3090</p>

            </div>
            <div className="content-3 w-[100%] h-[33%] md:w-[30%] md:h-[100%] border-top border-black flex justify-center pt-4">
                <div className="min-w-[260px] min-h-[260px]">
                    <Image
                        src="https://cms.cominsur.co/cominsur/assets/ps0w3u33wdcgockw"
                        alt="logo cominsur"
                        width={260}
                        height={260}
                    />
                </div>

            </div>

        </footer>
        <section className="w-[100%] h-[36px]  bg-[#000032] text-white font-semibold text-[12px]  flex items-center justify-center">
            2023 cominsur.co - Todos los derechos reservados 
        </section>

    </>
}

export default Footer