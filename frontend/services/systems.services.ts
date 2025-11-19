import System from "@/backend/model/system.model";

class SystemsServices {

    setAllsystems(actionType:string, entity:System[], appDispatch:any): void {
        
        appDispatch({ type: actionType, payload: entity });
    }
    setCurrentSystem(actionType:string, system:string | number, appDispatch:any): void {
        
        appDispatch({ type: actionType, payload: system });
    }
}
export const systemsServices = new SystemsServices();