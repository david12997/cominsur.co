'use client'

import {useState} from "react"
import Image from "next/image"
import Btn2 from "@/components/buttons/btn.2/btn.2";
import ModalSystem from "@/components/sections/system.2/modal.system";

const CardProduct = (props:{referencia:any,referencias:any[]}):JSX.Element=>{

    const media = JSON.parse(props.referencia.media);
    const [imgActive, setImgActive] = useState<string>(media.img1);
    const [modalSystem, setModalSystem] = useState<boolean>(false);

    const handleChangeImg = (urlImg1:string,urlImg2:string,index:number):void=>{

        let thumbs1 = document.getElementById(urlImg1) as HTMLElement;
        let thumbs2 = document.getElementById(urlImg2) as HTMLElement;

        if(index === 1){
            thumbs1.style.border = '4px solid #4a0083';
            thumbs2.style.border = '4px solid #c9c9c9';
            setImgActive(urlImg1);
        }else{
            thumbs2.style.border = '4px solid #4a0083';
            thumbs1.style.border = '4px solid #c9c9c9';
            setImgActive(urlImg2);
        }

    }
    

    return<>
        {
            modalSystem
            &&
            <ModalSystem
                setStateSystem={setModalSystem}
                stateSystem={modalSystem}
                references={props.referencias}
                imgInit={media.img2}
                nombreSystem={props.referencia.sistema_nombre}
                reference={props.referencia}

            />
        }

        <section className="m-2 p-2 min-w-[300px] max-w-[303px] h-[490px] bg-white rounded-[6px]  shadow-[0px_0px_6px_rgba(0,0,0,0.2)] ml-[6px] mr-[20px]">
            <div className="container-img w-[100%] h-[47%] relative">
                <Image
                    src={imgActive}
                    alt="Picture of the author"
                    fill={true}
                    object-fit="cover"
                    className="rounded-[10px]"
                    sizes="100%"
                    
                />
                
            </div>
            <div className="container-thumb w-[100%] h-[13%] border-bottom border-[#9b9b9b] flex items-center justify-center cursor-pointer">

                <Image
                    id={media.img1}
                    src={media.img1}
                    alt="Picture of the author"
                    height={40}
                    width={40}
                    className="border-[4px] border-[#4a0083] rounded-[3px] ml-[5px] mr-[5px]"
                    
                />

                {/*
                    <Image
                        id={media.img2}
                        src={media.img2}
                        alt="Picture of the author"
                        height={40}
                        width={40}
                        className="border-[4px] border-[#c9c9c9] rounded-[3px] ml-[5px] mr-[5px]"
                        onClick={()=>handleChangeImg(media.img1,media.img2,2)}
                    />
                */
                }


            </div>
            <div className="container-info w-[100%] h-[25%] ">
                <p className="name text-[17px] font-extrabold text-[#4a0083] w-[100%] h-[33%] flex items-center">
                   {props.referencia.nombre +' - '+ props.referencia.referencia}
                </p>

                <p className="name text-[16px] font-bold text-[#777777] w-[100%] h-[22%] flex items-center">
                    Referencia: {props.referencia.referencia}
                </p>
                <p className="name text-[16px] font-bold text-[#777777] w-[100%] h-[22%] flex items-center">
                    Color: {props.referencia.color}
                </p>
                <p className="name text-[16px] font-bold text-[#777777] w-[100%] h-[22%] flex items-center">
                    Piezas x Paquete: {props.referencia.piezas_x_paquete}
                </p>

            </div>
            <div onClick={()=>setModalSystem(!modalSystem)} className="container-button w-[100%] h-[15%] flex items-center justify-center">
                <Btn2/>
            </div>
        </section>
    </>
}

export default CardProduct