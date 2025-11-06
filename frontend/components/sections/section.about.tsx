import Image from "next/image";
import ButtonPrimary from "../buttons/button.primary";


type SectionAboutProps = {
    title?: string;
    description?: string;
    description2?: string;
    logoUrl?: string;
    catalogLink?: string;
    catalogButtonText?: string;
};

const SectionAbout: React.FC<SectionAboutProps> = ({ title, description, description2,logoUrl, catalogLink, catalogButtonText }) => {

    const dataSectionAbout = {
        title: title || "SOBRE COMINSUR",
        description: description || "Empresa importadora de aluminio , ofrecemos una amplia variedad de sistemas de perfileria arquitectónica e industrial. ",
        description2: description2 || "Somos importadores MAYORISTAS",
        logoUrl: logoUrl || "https://cms.cominsur.com.co/cominsur/assets/j2mdakepwm0ckgos",
        catalogLink: catalogLink || "/catalogo",
        catalogButtonText: catalogButtonText || "Ver Catalogo",
    };

    return<>

        <section className="w-[90%] ml-[5%] min-h-[400px] max-[500px] p-2  relative mt-[60px]">
            <div className="tittle text-[24px] font-bold gray-text">{dataSectionAbout.title}</div>
            <div className="content bg-white w-[100%] flex flex-wrap justify-center md:justify-between p-2 rounded-md shadow-md ">
                <div className="logo h-[250px] w-[90%] md:w-[30%] flex justify-center items-center">
                    <Image
                        src={dataSectionAbout.logoUrl}
                        alt="Cominsur Logo"
                        width={220}
                        height={220}
                    />
                </div>
                <div className="about-text w-[90%] md:w-[70%] md:p-2 md:pt-[30px]">

                    <p className=" md:w-[80%] md:ml-[10%] mb-4 text-justify gray-text text-[18px] font-semibold">
                        {dataSectionAbout.description}

                    </p>
                    <br/>
                    <p className="color-quaternary d:w-[80%] md:ml-[10%] mb-4 text-[18px] font-semibold">
                        {dataSectionAbout.description2}
                    </p>

                    <div className="container-button md:w-[400px] w-[96%]  md:ml-[10%] mb-2">
                        <ButtonPrimary border="#FDC809" color="#000032" backgroundColor="#FDC809" redirectTo={dataSectionAbout.catalogLink}>
                            <strong>{dataSectionAbout.catalogButtonText}</strong>
                        </ButtonPrimary>
                    </div>
                    
                </div>
            </div>
        </section>

    </>
};

export default SectionAbout;