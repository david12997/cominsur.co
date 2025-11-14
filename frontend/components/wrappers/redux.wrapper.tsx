"use client";

import Brand from "@/backend/model/brand.model";
import Reference from "@/backend/model/reference.model";
import System from "@/backend/model/system.model";
import { referencesServices } from "@/frontend/services/references.services";
import { systemsServices } from "@/frontend/services/systems.services";
import { useAppDispatch } from "@/frontend/store";
import { useEffect } from "react";

type PropsReduxWrapper = {

    entityType: string;
    entity:Brand [] | System[] | Reference[] | null ;
    actionType: string;
    
};


const ReduxWrapper: React.FC<PropsReduxWrapper> = ({ entityType, entity, actionType  }) => {    

    const appDispatch = useAppDispatch();
    

    useEffect(() => {
        
        if(entityType === 'system' && entity) systemsServices.setAllsystems(actionType, entity as System[], appDispatch);
        if(entityType === 'brand' && entity) {/* implement brand service when needed */ }
        if(entityType === 'reference' && entity) { referencesServices.setAllReferences(actionType, entity as Reference[], appDispatch);  }

        

       
    }, [entityType, entity]);

    return <></>;
}

export default ReduxWrapper;