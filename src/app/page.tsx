export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

import CarouselHome from "@/components/carousel/carousel"
import SectionAbout from "@/components/sections/about/section.about"
import SectionContacto from "@/components/sections/contacto/section.contacto"
import SectionSystem2 from "@/components/sections/system.2/section.system.2"
import SectionSystem2oWrapper from "@/components/sections/system.2/section.system.2.wrapper"
import { GetData } from "@/services/get.data"

export default async function HomePage():Promise<JSX.Element> {

  const dataHomePage = await GetData([
    process.env.NEXT_PUBLIC_DOMAIN as string + '/api/pages?page=inicio',
    process.env.NEXT_PUBLIC_DOMAIN as string + '/api/sistemas/all',
    //process.env.NEXT_PUBLIC_DOMAIN as string + '/api/referencias?system=1&limit=4&offset=0',
   // process.env.NEXT_PUBLIC_DOMAIN as string + '/api/referencias?system=2&limit=4&offset=0',
    //process.env.NEXT_PUBLIC_DOMAIN as string + '/api/referencias?system=3&limit=4&offset=0',
    //process.env.NEXT_PUBLIC_DOMAIN as string + '/api/referencias?system=4&limit=4&offset=0',
    //process.env.NEXT_PUBLIC_DOMAIN as string + '/api/referencias?system=5&limit=4&offset=0'
  
  ]).then(res=>res as any)  

  // dataHomePage[0] is a page inicio data, filed Data in pages cms collection

  const parseDataHome = JSON.parse(dataHomePage[0].data[0].data)
 
  // dataHomePage[1] is a sistemas data from cms collection sistemas
  const parseDataSistemas = dataHomePage[1].data
/*
  const parseDataReferencias = [ 
    dataHomePage[2].data, 
    dataHomePage[3].data, 
    dataHomePage[4].data, 
    dataHomePage[5].data, 
    dataHomePage[6].data 
  ];
*/
  return<>
    <main>
      <CarouselHome
        bannersDesktop={parseDataHome.banners.desktop}
        bannersMobile={parseDataHome.banners.mobile}
      />
      <SectionAbout
        title={parseDataHome.section_about.title}
        texts={parseDataHome.section_about.texts}
        btn={parseDataHome.section_about.btn}
        logo={parseDataHome.section_about.logo}
      />


      {       
        parseDataSistemas.map((sistema:any, index:number)=>{
           /*
          return<SectionSystem
                  key={index}
                  sistema={sistema.nombre}
                  dataReferencias={parseDataReferencias[index]}
          />
           */
          if(sistema.status === 'published' ){
            return<SectionSystem2oWrapper
              key={index}
              id={sistema.id}
              nombre={sistema.nombre}
              imgSystem={JSON.parse(sistema.media).ventana}
              text1={sistema.descripcion}
              text2={JSON.parse(sistema.data).desc.text2}
            />
          }else{
            return<span key={index} className="w-[px] h-[0px]"></span>
          } 


        })
       
      }
      <SectionContacto/>
    </main>
      
  </>
}
