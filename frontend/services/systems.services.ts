import System from "@/backend/model/system.model";

class SystemsServices {

    setAllsystems(actionType:string, entity:System[], appDispatch:any): void {
        
        appDispatch({ type: actionType, payload: entity });
    }
}
export const systemsServices = new SystemsServices();