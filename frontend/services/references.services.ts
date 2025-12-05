import Reference from "@/backend/model/reference.model";
import { NewRequests } from "@/helpers/request.data";
class ReferencesServices {

    setAllReferences(actionType:string, entity:Reference[], appDispatch:any): void {
        
        appDispatch({ type: actionType, payload: entity });
    }

    setCurrentReference(actionType:string, reference:Reference | null, appDispatch:any): void {
        
        appDispatch({ type: actionType, payload: reference });
    }

    setOffset(actionType:string, offset:number,  appDispatch:any): void {
        
        appDispatch({ type: actionType, payload: offset });
    }

    setLimit(actionType:string, limit:number,  appDispatch:any): void {
        
        appDispatch({ type: actionType, payload: limit });
    }

    setLoading(actionType:string, loading:boolean,  appDispatch:any): void {
        
        appDispatch({ type: actionType, payload: loading });
    }

    setError(actionType:string, error:string | null,  appDispatch:any): void {
        
        appDispatch({ type: actionType, payload: error });
    }

    setScrollDown(actionType:string, scrollDown:boolean,  appDispatch:any): void {
        
        appDispatch({ type: actionType, payload: scrollDown });
    }

    async loadMoreReferences(limit: number, offset: number, system: string | number | null): Promise<Reference[]> {
    
        if(system === "todos"){

            const newReferencesBySystem = await  NewRequests([
                `${process.env.NEXT_PUBLIC_COMINSIR_API}/references?limit=${limit}&offset=${offset}`   
            ],'GET')
            return newReferencesBySystem[0].data as Reference[];
        }
        else if(system !== null){
            const newReferences = await  NewRequests([
                `${process.env.NEXT_PUBLIC_COMINSIR_API}/references?system=${system}&limit=${limit}&offset=${offset}`   
            ],'GET')
            return newReferences[0].data as Reference[];
        }
        return [];
 
       
    }

    async getReferencesBySystem(systemId: number | string, limit: number = 10, offset: number = 0): Promise<Reference[]> {
        const newReferences = await  NewRequests([
            `${process.env.NEXT_PUBLIC_COMINSIR_API}/references?system=${systemId}&limit=${limit}&offset=${offset}`   
        ],'GET')
        return newReferences[0].data as Reference[];
    }

    async getReferencesById(referenceId: number): Promise<Reference >{
        
        const newReferences = await  NewRequests([
            `${process.env.NEXT_PUBLIC_COMINSIR_API}/references?id=${referenceId}`,
        ],'GET')
        return newReferences[0].data as Reference;
    }




}
export const referencesServices = new ReferencesServices();