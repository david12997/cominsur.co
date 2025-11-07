
import { MySystemRepository, SystemRepository } from "../repositories/system.repository";

export class SystemService {

    private SystemRepository: SystemRepository;

    constructor() { 

        this.SystemRepository = MySystemRepository;
    }

    async getAllSystems(){
         if (!this.SystemRepository) throw new Error("SystemRepository is required");

         let systems = await this.SystemRepository.GetAllSystems();

         return systems;
    }

}
