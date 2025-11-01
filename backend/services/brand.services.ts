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
      
        return await this.BrandRepository.GetBrandById(Number(brandId));


    }

}
