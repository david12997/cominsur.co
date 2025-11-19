import Image from "next/image";
import Link from "next/link";

type FooterV1Props = {

    titleSiteMap?: string;
    siteMap?: { name: string; href: string }[];
    contactInfo?: {
        address1: string;
        address2: string;
        phone: string;
        email: string;
    };
    logo?: {
        src: string;
        alt: string;
        width: number;
        height: number;
    };
    foot?: string;
}

const FooterV1: React.FC<FooterV1Props> = ({titleSiteMap, siteMap, contactInfo, logo, foot}) => {

    const dataFooterV1 = {
        titleSiteMap:  titleSiteMap ?? "Mapa del sitio",
        siteMap: siteMap ?? [
            { name: "Inicio", href: "#" },
            { name: "Catalogo", href: "#" },
            { name: "Nosotros", href: "#" },
            { name: "Contacto", href: "#" },
            { name: "Solicitar cotización", href: "#" },
        ],
        contactInfo: contactInfo ?? {
            address1: "Cra 21 #69 - 48 Bogotá",
            address2: "Calle 166 # 17 - 46  Bogotá",
            phone: "+57 320 914 3090 - 311 276 4163",
            email: "ventas@cominsur.com.co",
        },
        logo: logo ?? {
            src: "https://cms.cominsur.com.co/cominsur/assets/j2mdakepwm0ckgos",
            alt: "Cominsur Logo",
            width: 220,
            height: 220,
        },
        foot: foot ?? "© 2025 Cominsur. All rights reserved.",
    }

    return <>
        <footer className="w-[100%] bg-white shadow-md mt-12 " >
            <div className="content w-[100%] flex flex-wrap justify-around mb-4 text-[17px]">

                <div className="website-map w-[100%] md:w-[30%] mb-4 md:h-[320px] pt-[30px] ">

                    <div className="list-links md:ml-6">
                        <div className="title">
                            <h4 className="text-md font-semibold p-4 color-quaternary flex justify-center md:justify-start   w-[100%]">{dataFooterV1.titleSiteMap}</h4>
                        </div>
                        <ul className="flex flex-col justify-center  md:justify-start items-start p-4">
                            {
                                dataFooterV1.siteMap.map((link, index) => (
                                    <Link 
                                        key={index}
                                        href={link.href}
                                        className={"flex justify-center md:justify-start   w-[100%] mb-2 font-semibold gray-text hover:text-gray-900"}
                                    >{link.name}</Link>
                                ))  
                            }
                        </ul>
                       
                    </div>

                </div>
                <div className="contact-info w-[100%] md:w-[30%] mb-4 md:h-[320px] pt-[30px] ">
                    <div className="title">
                        <h4 className="text-md font-semibold p-4 color-quaternary flex justify-center md:justify-start   w-[100%]">Contacto</h4>
                    </div>
                    <div className="info flex flex-col justify-start items-start p-4 gray-text">
                        
                        <div className="flex justify-center md:justify-start   w-[100%] mb-2 font-semibold ">{dataFooterV1.contactInfo.address1}</div>
                        <div className="flex justify-center md:justify-start   w-[100%] mb-2 font-semibold ">{dataFooterV1.contactInfo.address2}</div>
                        <div className="flex justify-center md:justify-start   w-[100%] mb-2 font-semibold ">{dataFooterV1.contactInfo.phone}</div>
                        <div className="flex justify-center md:justify-start   w-[100%] mb-2 font-semibold ">{dataFooterV1.contactInfo.email}</div>
                    </div>
                </div>
                <div className="logo-footer w-[100%] md:w-[30%] mb-4 md:h-[320px] pt-[30px] md:p-[1px] flex justify-center items-center">
                    <Image
                        src="https://cms.cominsur.com.co/cominsur/assets/j2mdakepwm0ckgos"
                        alt="Cominsur Logo"
                        width={220}
                        height={220}
                        className="object-contain"
                    />  
                </div>

            </div>
            <div className="foot bg-primary text-white w-[100%] p-2">
                <p className="text-center ">{dataFooterV1.foot}</p>
            </div>
        </footer>
    </>
}

export default FooterV1;