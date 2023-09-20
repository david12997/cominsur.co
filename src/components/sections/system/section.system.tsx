import Card1 from "@/components/cards/card.1/card.1"
import Link from "next/link";

const SectionSystem = (props:{sistema:string,dataReferencias:any[]}):JSX.Element => {


    return<>
        <div className="title-section font-bold  text-[22px]  md:text-[24px] w-[90vw] ml-[5vw]  mt-[45px]  md:mt-[60px] text-[#6a6a6a]">
           SISTEMA {props.sistema} <Link href={'/catalogo'} className="cursor-pointer font-extrabold text-[14px]  md:text-[16px] text-[#222274]">Ver referencias</Link>
        </div>
        <section className="flex w-[90vw] ml-[5vw] h-[520px] md:h-[430px] overflow-x-scroll overflow-y-hidden">
            {
                props.dataReferencias.map((referencia:any, index:number)=>{

                    const media = JSON.parse(referencia.media);
                    
                    return<Card1
                        key={index}
                        nombre={referencia.nombre}
                        referencia={referencia.referencia}
                        img1={media.img1}
                        img2={media.img2}
                    />
                })
            }
        </section>
    
    </>

}

export default SectionSystem