import Brand from "@/backend/model/brand.model";
import System from "@/backend/model/system.model";
import { SystemforntendProps } from "../store/slices/systems";

class SystemsServices {

    setAllsystems(actionType:string, entity:System[], appDispatch:any): void {
        
        const systems = entity ;
        const systemEntity: SystemforntendProps[] = systems
            .filter((sys) => !!sys) // skip falsy entries
            .map((sys) => {
            
                return {
                    id: sys.id,
                    id_catalogue: sys.id_catalogue,
                    owner: sys.owner,
                    name: sys.name,
                    description: sys.description,
                    status: sys.status,
                    state: sys.state,
                    media: {
                        ventana: sys?.media?.ventana ,
                    },
                    data: {
                        desc: {
                            text2: sys?.data?.desc?.text2 ,
                        },
                    },
                } as SystemforntendProps;
        });
        
        appDispatch({ type: actionType, payload: systemEntity });
    }
}
export const systemsServices = new SystemsServices();