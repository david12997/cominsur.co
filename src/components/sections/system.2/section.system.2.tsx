'use client'

import Btn4 from "@/components/buttons/btn.4/btn.4"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import ModalSystem from "./modal.system"
import { GetData } from "@/services/get.data"
import {  useAppSelector } from "@/store"

const SectionSystem2 = (props:{id:number,nombre:string,imgSystem:string,text1:string,text2:string}):JSX.Element => {

    const [stateSystem, setStateSystem] = useState(false);
    const [references, setReferences] = useState([]);

    const selectorCotizacion = useAppSelector(state => state.cotizacion);
  

    useEffect(() => {

        GetData([
            process.env.NEXT_PUBLIC_DOMAIN as string + `/api/referencias?system=${props.id}&limit=20&offset=0`,
        ]).then(res => {
        
            if(res[0].status === 200 && res[0].data.length > 0){
                setReferences(res[0].data)
            }
        
        }).catch(err => {
            console.error(err)
        
        })

    }, [])

    return<>

        {
            stateSystem
            &&
            <ModalSystem
                stateSystem={stateSystem}
                setStateSystem={setStateSystem}
                references={references}
                imgInit={props.imgSystem}
                nombreSystem={props.nombre}
                reference={references[0]}
                typeModal="sistema"
                busqueda={false}
            />
        }
        <div className="title-section font-bold  text-[22px]  md:text-[24px] w-[90vw] ml-[5vw]  mt-[45px]  md:mt-[60px] text-[#6a6a6a]">
           SISTEMA {props.nombre} <Link href={'/catalogo'} className="cursor-pointer font-extrabold text-[14px]  md:text-[16px] text-[#222274]">Ver referencias</Link>
        </div>
        <section className="about mb-4 flex flex-wrap  p-2  md:p-6  h-[700px]  md:h-[490px] 2xl:h-[660px]  w-[90vw] ml-[5vw] bg-white rounded-[8px] shadow-[0px_0px_6px_rgba(0,0,0,0.2)]">

            <div className="relative flex items-center justify-center  container-img-sistema w-[100%] md:w-[50%] h-[360px]  md:h-[460px] 2xl:h-[550px]">

                <Image
                    src={props.imgSystem}
                    alt={`sistema de perfileria en aluminio ${props.nombre}`}
                    fill
                    className="object-cover cursor-pointer p-4"
                    onClick={() => setStateSystem(!stateSystem)}

                />

            </div>

            <div onClick={()=>setStateSystem(!stateSystem)} className="container-info-sistema cursor-pointer w-[100%] md:w-[50%] h-[230px]  md:h-[370px] overflow-y-scroll">
                <h1 className="w-[100%] h-[50px] font-extrabold text-[#462b72] text-[20px] flex items-center">
                    Sistema {props.nombre}
                </h1>
               
               <h6 className=" font-normal text-[#6e6e6e] text-[18px]">
                   {props.text1}
                </h6>
                <br/>
                <h6 className="font-normal text-[#6e6e6e] text-[18px]">
                   {props.text2}
                </h6>

            </div>

            <div onClick={()=>setStateSystem(!stateSystem)} className="flex items-center justify-center container-button w-[100%]  h-[100px]">
                <Btn4
                    text="Ver referencias"
                />
            </div>

        </section>
    </>
}

export default SectionSystem2