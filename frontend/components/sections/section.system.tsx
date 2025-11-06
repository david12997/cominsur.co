import Image from "next/image";
import Link from "next/link";
import BtnSecondary from "../buttons/btn.secondary";
import BtnSytemWrapper from "@/frontend/components/wrappers/btn.system.wrapper";



type  SectionSystemProps= {

    id?:number | string;
    title?:string;
    description?:string;
    imgUrl?:string;


};

const SectionSystem: React.FC<SectionSystemProps> = ({ title, description, imgUrl }) => {

    const dataSectionSystem = {
        title: title || " 3831",
        description: description || "El sistema 3831 es un conjunto de perfiles de aluminio diseñados para la fabricación de ventanas proyectantes y/o basculantes. Estos perfiles incluyen componentes como sillares, jambas, pisavidrios y otros elementos necesarios para crear ventanas de este tipo. Sus beneficios incluyen acusticidad, hermeticidad y estanqueidad.",
        imgUrl: imgUrl || "https://cms.cominsur.com.co/cominsur/assets/nsnucnko4tckcgsg",
    };
   
    return<>

        <section className="w-[90%] ml-[5%] min-h-[400px]  p-2  relative mt-[30px] md:mt-[10px] mb-[50px] ">
            <div className="tittle text-[24px] font-bold gray-text">SISTEMA {dataSectionSystem.title}<Link  className="text-[15px] color-quaternary" href="" > Ver Referencias </Link></div>
            <div className="content bg-white w-[100%] flex flex-wrap justify-center md:justify-between p-2 rounded-md shadow-md ">
                <div className="img-system w-[100%] md:w-[50%] flex justify-center items-center">
                    <Image
                        src={dataSectionSystem.imgUrl}
                        alt="Sistema 3831 Cominsur"
                        width={600}
                        height={600}
                    />
                </div>

                <div className="about-system w-[100%] md:w-[50%] md:p-[50px] md:pt-[100px]">
                    <div className="title-system color-quaternary font-semibold text-[20px]">Sistema {dataSectionSystem.title}</div>
                    <div className="description-system gray-text text-justify mt-4 text-[18px] h-[180px] md:h-auto overflow-y-scroll p-2 md:p-0">
                        {dataSectionSystem.description}
                    </div>
                    <div className="container-button  w-[97%] md:w-[100%]  md:ml-[0%] mt-6 md:mt-10">
                       <BtnSytemWrapper text="VER REFERENCIAS" />
                    </div>
                </div>
               
            </div>
        </section>

    </>
};

export default SectionSystem;