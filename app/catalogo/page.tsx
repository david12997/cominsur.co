import Brand from "@/backend/model/brand.model";
import Reference from "@/backend/model/reference.model";
import  System  from "@/backend/model/system.model";


import FooterV1 from "@/frontend/components/footers/footer.v1";
import BreadCrumb from "@/frontend/components/navs/breadcrumb";
import Nav1 from "@/frontend/components/navs/nav1";
import SectionCatalogue from "@/frontend/components/sections/section.catalogue";

import { NewRequests } from "@/helpers/request.data";


export default async function Catalogo() {

  // handle brand data fetching and possible errors

  let brand: Brand | null = null;
  let system: System[] | null = null;
  let reference: Reference[] | null = null;

  try {
    const dataHome = await NewRequests([
      `${process.env.NEXT_PUBLIC_COMINSIR_API}/brand/1`,
       `${process.env.NEXT_PUBLIC_COMINSIR_API}/systems`,
       `${process.env.NEXT_PUBLIC_COMINSIR_API}/references?limit=10&offset=0`

    ],'GET')

    brand = dataHome[0].data as Brand;
    system = dataHome[1].data as System[];
    reference = dataHome[2].data as Reference[];

  } catch (error) {
    console.log("Error fetching brand data:", error);
  }
    


  return<>
   
    <Nav1 
    
    />
    <BreadCrumb />
    <SectionCatalogue
    systems={system}
    references={reference}

    />

    <FooterV1 

    />

  </>
}