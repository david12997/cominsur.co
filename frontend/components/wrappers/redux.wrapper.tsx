"use client";

import Brand from "@/backend/model/brand.model";
import System from "@/backend/model/system.model";
import { systemsServices } from "@/frontend/services/systems.services";
import { useAppDispatch } from "@/frontend/store";
import { useEffect } from "react";

type PropsReduxWrapper = {

    entityType: string;
    entity:Brand [] | System[] | null ;
    actionType: string;
    
};


const ReduxWrapper: React.FC<PropsReduxWrapper> = ({ entityType, entity, actionType  }) => {    

    const appDispatch = useAppDispatch();
    

    useEffect(() => {
        
        if(entityType === 'system' && entity) systemsServices.setAllsystems(actionType, entity as System[], appDispatch);
        

       
    }, [entityType, entity]);

    return <></>;
}

export default ReduxWrapper;