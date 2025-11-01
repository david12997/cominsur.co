import Image from "next/image";
import Link from "next/link";
import { IconhamburgerMenu } from "../icons";


type Nav1Props = {
    
    links?: Array<{ href: string; label: string }>;
    logoSrc?: string;
    logoAlt?: string;
    btnGetQuoteLabel?: string;
    btnGetQuoteHref?: string;

};

const Nav1: React.FC<Nav1Props> = async({links, logoSrc, logoAlt, btnGetQuoteLabel, btnGetQuoteHref }) => {


    const dataNav1 = {
        brandLogo: {
            src: logoSrc || 'https://cms.cominsur.com.co/cominsur/assets/g7y7rumo0i88skg4',
            alt: logoAlt || 'Cominsur perfilería en aluminio',
            width: 180,
            height: 70,
        },
        links: links || [
            { href: '/', label: 'Inicio' },
            { href: '/catalogo', label: 'Catalogo' },
            { href: '/nosotros', label: 'Nosotros' },
            { href: '/contacto', label: 'Contacto' },
        ],
        getQuote: {
            href: btnGetQuoteHref || '/cotizar',
            label: btnGetQuoteLabel || 'SOLICITAR COTIZACION',
        },
        iconMenu: {
            fill: '#000032',
        },
    }

  return<>
    <nav className="w-[100%] h-[60px] bg-white grid grid-cols-2 md:grid-cols-4 shadow-sm">

        <div className="brand-logo col-start-1 col-end-1 md:col-end-2 flex items-center pl-2 md:pl-6">
            <Link href="/">
                <Image 
                    src={dataNav1.brandLogo.src} 
                    alt={dataNav1.brandLogo.alt} 
                    width={dataNav1.brandLogo.width} 
                    height={dataNav1.brandLogo.height} 
                    priority
                />
            </Link>
        </div>

        <div className="links hidden md:flex md:col-start-2 md:col-end-4 justify-end items-center space-x-8   md:w-[400px] lg:w-auto">
            {dataNav1.links.map((link, index) => <Link key={index} href={link.href} className="text-gray-500 hover:text-[#4A0083] font-bold text-[16px] lg:text-[18px]">
                    {link.label}
                </Link>
            )}
        </div>

        <div className="get-quote hidden md:flex md:col-start-4 md:col-end-5  justify-end items-center pr-8">
            <Link href={dataNav1.getQuote.href} className="p-4 flex justify-center cominsur-btn-quote shadow-sm px-4 py-2 w-[80%] min-w-[215px] lg:min-w-[240px] h-[45px] hover:w-[82%] hover:h-[48px] rounded-sm text-[16px] lg:text-[18px]">
                {dataNav1.getQuote.label}
            </Link>
        </div>

        <div className="menu-icon  flex md:hidden col-start-2 col-end-3 md:col-start-4 md:col-end-5  justify-end items-center pr-4 md:pr-6">
            <IconhamburgerMenu fill={dataNav1.iconMenu.fill} />

        </div>
    </nav>
        
    </>

};

export default Nav1;