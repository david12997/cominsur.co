'use client'

import Btn3 from "@/components/buttons/btn.3/btn.3"
import { Whatsapp } from "@/icons"
import { SendMessage } from "@/services/send.message"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

const SectionAtencionContacto = ():JSX.Element => {

    const [message,setMessage]=useState<string>("Deja tu mensaje aquí");

    const loaderRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const handleSendMessage = (e:any):void =>{
        
        e.preventDefault();

        const form = e.target;
        
        //select inputs
        const nombre = form.nombre;
        const telefono = form.telefono;
        const message = form.message;


        if(nombre.value === '' || telefono.value === '' || message.value === ''){

            setMessage('Todos los campos son obligatorios');
            setTimeout(()=>setMessage('Deja tu mensaje aquí'),3000);
        }else{

            loaderRef.current?.classList.remove('hidden');
            formRef.current?.classList.add('hidden');
            setMessage('Enviando mensaje...');

            SendMessage([
                process.env.NEXT_PUBLIC_DOMAIN + '/api/email/message',
                process.env.NEXT_PUBLIC_DOMAIN + '/api/notifications/message',

            ],nombre.value,telefono.value,message.value)
            .then(res=>{
               
                loaderRef.current?.classList.add('hidden');
                formRef.current?.classList.remove('hidden');

                if(res[0].status === 200){
                    setMessage('Mensaje enviado con éxito');
                    form.reset();

                }else{
                    setMessage('Error al enviar mensaje');
                    form.reset();
                }

                setTimeout(()=>setMessage('Deja tu mensaje aquí'),3000);

            }).catch(err=>{
                console.log(err);
                loaderRef.current?.classList.add('hidden');
                formRef.current?.classList.remove('hidden');
                setMessage('Error al enviar mensaje');
                setTimeout(()=>setMessage('Deja tu mensaje aquí'),3000);
            })
        }



    }

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
                    <Whatsapp/> <span className=" ml-3">320 914 3090</span>
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
                    {message}
                </div>
                <form ref={formRef} onSubmit={(e)=>handleSendMessage(e)} className="w-[100%] mt-2 text-[18px] font-bold ">
                    <label className="w-[100%] text-[#6e6e6e] ">
                        Nombre:
                    </label>
                    <input required name="nombre" className="font-normal mb-4 w-[100%] h-[50px] rounded-[6px] bg-[#e6e6e6]" type="text" placeholder=" Ej: Juan Perez" />

                    <label className="w-[100%] text-[#6e6e6e] ">
                        Celular:
                    </label>
                    <input required name="telefono" className="font-normal mb-4 w-[100%] h-[50px] rounded-[6px] bg-[#e6e6e6]" type="tel" pattern="[0-9]{10}" placeholder=" Ej: 310 241 1111" />

                    <label className="w-[100%] text-[#6e6e6e] ">
                        Mensaje:
                    </label>
                    <textarea required name="message" className="mb-6 w-[100%] font-normal h-[120px] rounded-[6px] bg-[#e6e6e6]" placeholder=" Escribe tu mensaje aquí Ej: Quiero más información sobre los perfiles 744"></textarea>

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

                <div  ref={loaderRef} className="loader w-[100%] h-[100%] hidden">
                    <div className="w-[100%] h-[100%] flex items-center justify-center">
                        <div className="w-[200px] h-[200px] rounded-full animate-spin border-8 border-solid border-[#4a0083] border-t-transparent shadow-md">
                        </div>
                    </div>
                </div>

            </div>

        </section>
    </>
}

export default SectionAtencionContacto