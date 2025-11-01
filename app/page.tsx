import Brand from "@/backend/model/brand.model";
import TestComponents from "@/frontend/components/test.components";
import { NewRequests } from "@/helpers/request.data";

export default async function Home() {

    const brandData = await NewRequests([`${process.env.NEXT_PUBLIC_API_URL}/cominsur/items/brand/1`],'GET')
    const brand: Brand | null = brandData && brandData[0] && typeof brandData[0] === 'object' && 'data' in brandData[0] ? brandData[0].data as Brand : null;

  return<>
    <main>
     
      <TestComponents />
    </main>
  </>
}