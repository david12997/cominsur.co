import { BrandRepository, MyBrandRepository } from "../repositories/brand.respository";

export class BrandService {

    private BrandRepository: BrandRepository;

    constructor() { 

        this.BrandRepository = MyBrandRepository;
    }

    async getBrandById(brandId: string  | number ){

       if (!BrandRepository) throw new Error("BrandRepository is required");
       if (!brandId) throw new Error("Brand ID is required");
       if (isNaN(Number(brandId))) throw new Error("Brand ID must be a valid number");

       let brand = await this.BrandRepository.GetBrandById(Number(brandId));

       //transform colors data media and pages froom string to json when is not null
       if(brand.success && brand.method === 'DB' && brand.data){
            if(brand.data.colors && typeof brand.data.colors === 'string'){
                brand.data.colors = JSON.parse(brand.data.colors);
            }
            if(brand.data.media && typeof brand.data.media === 'string'){
                brand.data.media = JSON.parse(brand.data.media);
            }
            if(brand.data.pages && typeof brand.data.pages === 'string'){
                brand.data.pages = JSON.parse(brand.data.pages);
            }
            if(brand.data.data && typeof brand.data.data === 'string'){
                brand.data.data = JSON.parse(brand.data.data);
            }
       }
       return brand;
    }

}
