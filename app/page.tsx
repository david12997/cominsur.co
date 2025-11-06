import Brand from "@/backend/model/brand.model";
import { System } from "@/backend/model/system.model";
import Carousel1 from "@/frontend/components/carousel/carousel1";
import Nav1 from "@/frontend/components/navs/nav1";
import SectionAbout from "@/frontend/components/sections/section.about";
import SectionSystem from "@/frontend/components/sections/section.system";
import { NewRequests } from "@/helpers/request.data";

export default async function Home() {

  // handle brand data fetching and possible errors

  let brand: Brand | null = null;
  let system: System[] | null = null;

  try {
    const dataHome = await NewRequests([
      `${process.env.NEXT_PUBLIC_API_URL}/cominsur/items/brand/1`,
       `${process.env.NEXT_PUBLIC_API_URL}/cominsur/items/system`,
    
    ],'GET')

    brand = dataHome[0].data as Brand;
    system = dataHome[1].data as System[];
    

  } catch (error) {
    console.log("Error fetching brand data:", error);
  }
    


  return<>
   
    <Nav1 
    
    />
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
    

  </>
}