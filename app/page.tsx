import Brand from "@/backend/model/brand.model";
import Carousel1 from "@/frontend/components/carousel/carousel1";
import Nav1 from "@/frontend/components/navs/nav1";
import SectionAbout from "@/frontend/components/sections/section.about";
import { NewRequests } from "@/helpers/request.data";

export default async function Home() {

  // handle brand data fetching and possible errors

  let brand: Brand | null = null;

  try {
    const brandData = await NewRequests([`${process.env.NEXT_PUBLIC_API_URL}/cominsur/items/brand/1`],'GET')
    
    type BrandResponseShape = { data?: unknown };

    function extractBrand(item: unknown): Brand | null {
      if (!item || typeof item !== "object") return null;
      const candidate = item as BrandResponseShape;
      if (!candidate.data || typeof candidate.data !== "object") return null;
      return candidate.data as Brand;
    }

    brand = Array.isArray(brandData) && brandData.length > 0
      ? extractBrand(brandData[0])
      : null;

  } catch (error) {
    console.error("Error fetching brand data:", error);
    brand = null;
  }

  return<>
    <main>
      <Nav1 
      
      />
      <Carousel1 
        bannersDesktop={brand?.media?.banners.desktop || []} 
        bannersMobile={brand?.media?.banners.mobile || []} 
      />
      <SectionAbout />
    </main>
  </>
}