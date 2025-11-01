import { NewRequests } from "@/helpers/request.data";
import Brand from "../model/brand.model"

export class BrandRepository {


    async GetBrandById(id: number): Promise<Brand | null> {
        // Simulate fetching brand by ID from a data source

        try {

            const [response] = await NewRequests([
                `${process.env.NEXT_PUBLIC_API_URL}/cominsur/items/brand/${id}`

            ], 'GET');

            if (response && typeof response === 'object' && 'data' in response) {
                return response.data as Brand;
                
            }else{
                console.warn("GetBrandById: Unexpected response structure", response);
                return null;
            }

        } catch (error) {
            console.error("Error fetching brand by ID:", error);
        }

        return null;


    }

}

export const MyBrandRepository = new BrandRepository();