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
import ReduxWrapper from "@/frontend/components/wrappers/redux.wrapper";
import ReduxProvider from "@/frontend/store/redux.provider";
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

    brand = dataHome[0].data as Brand;
    system = dataHome[1].data as System[];
    

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

    <ReduxProvider>
      <ReduxWrapper
        entityType="system"
        actionType="systems/setSystems"
        entity={system}
      />  
    </ReduxProvider>

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