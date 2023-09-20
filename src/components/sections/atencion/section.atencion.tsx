'use client'

import Btn3 from "@/components/buttons/btn.3/btn.3"
import { Whatsapp } from "@/icons"
import Image from "next/image"
import { useEffect } from "react"

const SectionAtencionContacto = ():JSX.Element => {

    useEffect(()=>{

        const LinksDesktop = document.getElementsByClassName('option-nav-desktop') as HTMLCollectionOf<HTMLElement>;

        for(let i = 0; i < LinksDesktop.length; i++){

            if(i === 3){
                    
                LinksDesktop[i].style.color = '#222274';
            }else{
                LinksDesktop[i].style.color = '#8f8f8f';
            }
        }

    },[])

    return<>
        <div className="title-section font-bold  text-[22px]  md:text-[24px] w-[90vw] ml-[5vw]  mt-[45px]  md:mt-[60px] text-[#6a6a6a]">
           ¿NECESITAS ATENCIÓN PERSONALIZADA?
        </div>
        <section className="about mb-4 flex flex-wrap justify-center md:justify-between  p-2  md:p-4  h-[1000px]  md:h-[550px] w-[90vw] ml-[5vw]">

            <div className="md:p-6 md:pt-8 p-2 container-message-atencion w-[100%] h-[430px] md:w-[55%] md:h-[100%]  bg-white rounded-[8px] shadow-[0px_0px_6px_rgba(0,0,0,0.2)]">
                <div className="md:hidden container-img w-[100%] flex items-center justify-center mb-4 mt-2">
                    <Image
                        src="https://cms.cominsur.co/cominsur/assets/6qsbvkv9emsc0g08"
                        alt="métodos contacto"
                        width={500}
                        height={130}
                    />
                </div>
                <p className="text-[19px] text-[#6e6e6e] font-bold">
                    ¿Necesitas <span className="text-[#4a0083]">atención personalizada</span>?  Si deseas realizar una cotización o necesitas mas información
                     de alguno de nuestros productos, déjanos un mensaje, en breve uno de nuestros asesores se comunicara contigo
                </p>

                <div className="mt-3 md:mt-9 w-[100%] h-[50px] flex items-center justify-center text-[17px]  md:text-[19px] text-[#6e6e6e] font-bold">
                    <Whatsapp/> <span className=" ml-3">320 914 3090 - 320 914 3093</span>
                </div>

                <div className="container-img w-[100%] md:flex hidden items-center justify-center md:mt-[30px]">
                    <Image
                        src="https://cms.cominsur.co/cominsur/assets/6qsbvkv9emsc0g08"
                        alt="métodos contacto"
                        width={500}
                        height={130}
                    />
                </div>
            
            </div>
            
            <div className="mt-[36px] md:mt-0 p-2 md:p-6 container-form-atencion w-[100%] h-[530px] md:w-[40%] md:h-[100%]  bg-white rounded-[8px] shadow-[0px_0px_6px_rgba(0,0,0,0.2)]">
                <div className="title-form w-[100%] h-[40px] text-[20px] font-extrabold text-[#222274] flex items-center justify-center">
                    Deja tu mensaje aquí
                </div>
                <form onSubmit={(e)=>e.preventDefault()} className="w-[100%] mt-2 text-[18px] font-bold">
                    <label className="w-[100%] text-[#6e6e6e] ">
                        Nombre:
                    </label>
                    <input className="font-normal mb-4 w-[100%] h-[50px] rounded-[6px] bg-[#e6e6e6]" type="text" placeholder=" Ej: Juan Perez" />

                    <label className="w-[100%] text-[#6e6e6e] ">
                        Correo electrónico:
                    </label>
                    <input className="font-normal mb-4 w-[100%] h-[50px] rounded-[6px] bg-[#e6e6e6]" type="text" placeholder=" Ej: juan@juan.com" />

                    <label className="w-[100%] text-[#6e6e6e] ">
                        Mensaje:
                    </label>
                    <textarea className="mb-6 w-[100%] font-normal h-[120px] rounded-[6px] bg-[#e6e6e6]" placeholder=" Escribe tu mensaje aquí Ej: Quiero más información sobre los perfiles 744"></textarea>

                    <Btn3
                        text="ENVIAR MENSAJE"
                        linear={{
                            color1:'#000032',
                            color2:'#222274',
                            color3:'#dcad01'    
                        }}
                        width="100%"                       
                        height="60px"
                    />

                </form>
            </div>

        </section>
    </>
}

export default SectionAtencionContacto