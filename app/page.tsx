export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'


import Brand from "@/backend/model/brand.model";
import { System } from "@/backend/model/system.model";
import Carousel1 from "@/frontend/components/carousel/carousel1";
import FooterV1 from "@/frontend/components/footers/footer.v1";
import BreadCrumb from "@/frontend/components/navs/breadcrumb";
import Nav1 from "@/frontend/components/navs/nav1";
import SectionAbout from "@/frontend/components/sections/section.about";
import SectionContact from "@/frontend/components/sections/section.contact";
import SectionSystem from "@/frontend/components/sections/section.system";
import { NewRequests } from "@/helpers/request.data";

export default async function Home() {

  // handle brand data fetching and possible errors

  let brand: Brand | null = null;
  let system: System[] | null = null;

  try {
    const dataHome = await NewRequests([
      `${process.env.NEXT_PUBLIC_COMINSIR_API}/brand/1`,
       `${process.env.NEXT_PUBLIC_COMINSIR_API}/systems`,

    ],'GET')
    // guard against failed fetches — NewRequests returns null for failed entries
    const brandResp = dataHome[0] ?? null;
    const systemsResp = dataHome[1] ?? null;

    brand = brandResp && brandResp.data ? (brandResp.data as Brand) : null;
    system = systemsResp && systemsResp.data ? (systemsResp.data as System[]) : null;
    

  } catch (error) {
    console.log("Error fetching brand data:", error);
  }
    


  return<>
   
    <Nav1 
    
    />
    <BreadCrumb />
    <Carousel1 
      
    />
    <SectionAbout 

    />

    {
      system 
      &&
      system.map((sys) => (
        <SectionSystem
          id={sys.id}
          key={sys.id}
          title={sys.name}
          description={sys.description}
          imgUrl={sys.media.ventana}
        />
      ))
    }
    

    <SectionContact 
    
    />
    <FooterV1 

    />

  </>
}