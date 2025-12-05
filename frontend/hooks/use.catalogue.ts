import Reference from "@/backend/model/reference.model";
import System from "@/backend/model/system.model";
import React from "react";
import { systemsServices } from "../services/systems.services";
import { referencesServices } from "../services/references.services";
import { useAppDispatch, useAppSelector } from "../store";


type UseCatalogueHookProps = {
    systems?: System[] | null;
    references?: Reference[] | null;
    dispatchInjected?: any;

};

const useCatalogueHook = ({ systems, references, dispatchInjected  }: UseCatalogueHookProps) => {

    const dispatch =  useAppDispatch();
    
    const currentReferences = useAppSelector( (state) => state.references.references );
    const currentReference = useAppSelector( (state) => state.references.currentReference );
    const currentSystems = useAppSelector( (state) => state.systems.systems );
    const currentSystem = useAppSelector( (state) => state.systems.currentSystem );
    const currentOffset = useAppSelector( (state) => state.references.offset );
    const currentLimit = useAppSelector( (state) => state.references.limit );
    const currentReferencesLoading = useAppSelector( (state) => state.references.loading );
    const currentScrollDown = useAppSelector( (state) => state.references.scrollDown );
    // Ref to track fetch session: increment when switching systems so in-flight loads can be ignored
    const loadSessionRef = React.useRef<number>(0);
 

    React.useEffect( () => {

        if (currentSystem === "todos") {
            SetAllReferences(references);
        } else if (currentSystem !== null && currentSystem !== "todos") {
            SetReferencesBySystem(currentSystem);
        } else {
            SetAllReferences(references);
        }

        SetAllSystems(systems);
        SetReferencesSearchOptions(0,10);

    }, []);


    const SetCurrentSystem = ( system: string | number | null ) => {
        
        if(system === null) return;
        // mark new load session to ignore stale load-more responses
        loadSessionRef.current = loadSessionRef.current + 1;
        if(system === 'todos' ){
            systemsServices.setCurrentSystem("systems/setCurrentSystem", "todos", dispatch);
            return;
        }
        systemsServices.setCurrentSystem("systems/setCurrentSystem", parseInt(system as string), dispatch);
    };

    const SetReferencesSearchOptions = ( offset: number, limit: number ) => {

        referencesServices.setOffset("references/setOffset", offset, dispatch);
        referencesServices.setLimit("references/setLimit", limit, dispatch);
    };

    const SetAllSystems = (newSystems: System[] | null | undefined) => {
        
        if(newSystems === null || newSystems === undefined) return;
        systemsServices.setAllsystems("systems/setSystems", newSystems as System[], dispatch);
    };

    const SetAllReferences = (newReferences: Reference[] | null | undefined) => {

        if(newReferences === null || newReferences === undefined) return;
        referencesServices.setAllReferences("references/setReferences", newReferences as Reference[], dispatch);
    };

    const SetReferencesBySystem = async ( systemId: number | string ) => {

        const referencesBySystem = await referencesServices.getReferencesBySystem(systemId, currentLimit, 0);
        if(referencesBySystem === null || referencesBySystem === undefined) return;
        
        referencesServices.setAllReferences("references/setReferences", referencesBySystem as Reference[], dispatch);
        SetReferencesSearchOptions(0, currentLimit);
        SetReferencesLoading(false);
    };

    const LoadMoreReferences = async (currentSystem: string | number | null) => {

        if(currentReference !== null) return;
        // capture session at call time
        const sessionAtCall = loadSessionRef.current;
        const moreReferences = await referencesServices.loadMoreReferences(currentLimit, currentOffset+10, currentSystem);
        if(moreReferences === null || moreReferences === undefined) return;
        // If session changed while fetching, ignore these results
        if (sessionAtCall !== loadSessionRef.current) return;
        const updatedReferences = currentReferences ? [...currentReferences, ...moreReferences] : moreReferences;
        SetAllReferences( updatedReferences );
        SetReferencesSearchOptions( currentOffset + 10, currentLimit );
        
        
    };

    const SetReferencesLoading = ( loading: boolean ) => {
        referencesServices.setLoading("references/setLoading", loading, dispatch);
    }

    const SetCurrentReference = ( reference: Reference | null ) => {
        referencesServices.setCurrentReference("references/setCurrentReference", reference, dispatch);
    }

    const SetScrollDown = ( scrollDown: boolean ) => {
        referencesServices.setScrollDown("references/setScrollDown", scrollDown, dispatch);
    }


    
    
    return {
        
        SetCurrentReference,
        SetAllSystems,
        SetAllReferences,
        LoadMoreReferences,
        SetReferencesSearchOptions,
        SetCurrentSystem,
        SetReferencesBySystem,
        SetReferencesLoading,
        SetScrollDown,
        currentReferencesLoading,
        currentReferences,
        currentReference,
        currentSystems,
        currentSystem,
        currentOffset,
        currentLimit,
        currentScrollDown,
    };
}

export default useCatalogueHook;