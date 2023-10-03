'use client'

import Map from "@/components/map/map"
import { Facebook, Instagram, Location, Mail, Whatsapp } from "@/icons"

const SectionContacto = ():JSX.Element => {

    const handleRedirectRedes = (url:string):void=>{
        window.open(url, '_blank');
    }

    return<>
        <div className="title-section font-bold  text-[22px]  md:text-[24px] w-[90vw] ml-[5vw]  mt-[45px]  md:mt-[60px] text-[#6a6a6a]">
           CONTACTO
        </div>
        <section className="contacto mb-4 flex flex-wrap  p-2  md:p-4  h-[810px]  md:h-[500px] w-[90vw] ml-[5vw] bg-white rounded-[8px] shadow-[0px_0px_6px_rgba(0,0,0,0.2)]">
            <div className="info-contacto w-[100%] h-[45%] md:w-[50%] md:h-[100%] ">

                <div className="info-contacto flex items-center justify-start w-[100%] h-[60px] md:h-[80px]">
                    <Mail /> <span className="ml-2 text-[#6a6a6a] text-[19px] font-extrabold">ventas@cominsur.co</span>
                </div>
                <div className="info-contacto flex items-center justify-start w-[100%] h-[60px] md:h-[80px]">
                    <Whatsapp/><span className="ml-2 text-[#6a6a6a] text-[19px] font-extrabold">320 914 3090</span>
                </div>
                <div onClick={()=>handleRedirectRedes('https://www.facebook.com/cominsur')} className="cursor-pointer info-contacto flex items-center justify-start w-[100%] h-[60px] md:h-[80px]">
                    <Facebook/> <span className="ml-2 text-[#6a6a6a] text-[19px] font-extrabold">@cominsur</span>
                </div> 
                <div onClick={()=>handleRedirectRedes('https://www.instagram.com/cominsur.mayorista')} className="cursor-pointer info-contacto flex items-center justify-start w-[100%] h-[60px] md:h-[80px]">
                    <Instagram/> <span className="ml-2 text-[#6a6a6a] text-[19px] font-extrabold">@cominsur.mayorista</span>
                </div>
                <div className="info-contacto flex items-center justify-start w-[100%] h-[60px] md:h-[80px]">
                    <Location color="#6a6a6a"/><span className="ml-2 text-[#6a6a6a] text-[19px] font-extrabold">Cra 21 # 69 - 48 </span>
                </div>   
                <div className="info-contacto flex items-center justify-start w-[100%] h-[60px] md:h-[80px]">
                    <Location color="#6a6a6a"/><span className="ml-2 text-[#6a6a6a] text-[19px] font-extrabold">Calle 166 # 17 - 42</span>
                </div>                
            </div>
            <div className="mapa  w-[100%] h-[55%] md:w-[50%] md:h-[100%] rounded-[6px] shadow-sm shadow-[#e6e6e6]">
                <Map />
            </div>
        </section>
    </>
}

export default SectionContacto