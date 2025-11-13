
import { MySystemRepository, SystemRepository } from "../repositories/system.repository";

export class SystemService {

    private SystemRepository: SystemRepository;

    constructor() { 

        this.SystemRepository = MySystemRepository;
    }

    async getAllSystems(){
         if (!this.SystemRepository) throw new Error("SystemRepository is required");

         let systems = await this.SystemRepository.GetAllSystems();

         // trasnfor data and media from string to json when is not null
         if(systems && systems.data){
            systems.data = systems.data.map((sys:any) => {
                if(sys.data){
                    sys.data = JSON.parse(sys.data);
                }
                if(sys.media){
                    sys.media = JSON.parse(sys.media);
                }
                return sys;
            });
         }

         return systems;
    }

}
