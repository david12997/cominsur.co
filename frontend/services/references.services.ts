import Reference from "@/backend/model/reference.model";
class ReferencesServices {

    setAllReferences(actionType:string, entity:Reference[], appDispatch:any): void {
        
        appDispatch({ type: actionType, payload: entity });
    }

    setOffset(actionType:string, offset:number,  appDispatch:any): void {
        
        appDispatch({ type: actionType, payload: offset });
    }

    setLimit(actionType:string, limit:number,  appDispatch:any): void {
        
        appDispatch({ type: actionType, payload: limit });
    }

    



}
export const referencesServices = new ReferencesServices();