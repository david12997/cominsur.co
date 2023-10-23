import Btn1 from "@/components/buttons/btn.1/btn.1"
import Image from "next/image"
import { SectionAbout } from "./section.about.type"

const SectionAbout = (props:SectionAbout):JSX.Element => {

    return<>
        <div className="title-section font-bold  text-[22px]  md:text-[24px] w-[90vw] ml-[5vw]  mt-[45px]  md:mt-[60px] text-[#6a6a6a]">
           {props.title}
        </div>
        <section className="about mb-4 flex flex-wrap  p-2  md:p-4  h-[560px]  md:h-[280px] w-[90vw] ml-[5vw] bg-white rounded-[8px] shadow-[0px_0px_6px_rgba(0,0,0,0.2)]">
            <div className="logo  w-[100%]  md:w-[30%] md:h-[100%] h-[230px] flex items-center justify-center">
                <Image
                    src={props.logo.src}
                    alt={"Cominsur Perfilaría en Aluminio "+props.logo.alt}
                    height={196}
                    width={205}

                />
            </div>

            <div className="info-about  w-[100%]  md:w-[70%]">

                <div className="text-about-cominsur md:p-4">
                    <h1 className="text-[#6a6a6a] font-bold text-[18px] md:text-[20px] leading-8  md:leading-10">
                        {props.texts.text1} 
                        <span className="bg-[#ffca08] p-1 text-[#222274]">{props.texts.text2}</span>
                        {props.texts.text3}
                        <span className="bg-[#ffca08] p-1 text-[#222274]">{props.texts.text4}</span>
                        {props.texts.text5}
                    </h1>
                    <p  className="text-[#6a6a6a] font-bold text-[18px]  md:text-[20px]  leading-8  md:leading-10 mt-2 md:mt-6">
                       {props.texts.text6} <span className="text-[#222274]">{props.texts.text7}</span>
                    </p>
                    <div className="container-btn1 w-[100%] md:w-[360px]">
                        <Btn1
                            bg="#FDC809"
                            color="#000032"
                            text={props.btn.text}
                            link="/catalogo"
                        />
                    </div>
                </div>
            </div>
        </section>
    </>
}

export default SectionAbout