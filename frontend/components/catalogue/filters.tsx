"use client";

import React from "react";
import Reference from "@/backend/model/reference.model";
import System from "@/backend/model/system.model";
import useCatalogueHook from "@/frontend/hooks/use.catalogue";


type FiltersCatalogueProps = {
    systems?: System[] | null;
    references?: Reference[] | null;

};

const FiltersCatalogue: React.FC<FiltersCatalogueProps> = ({ systems, references }) => {

    const catalogueHook = useCatalogueHook({ systems: systems, references: references });

    // To avoid hydration mismatch: render using server-provided props on first paint (so server/client match).
    // After mount, if the redux store has data and props were not provided, adopt store data.
    const [displaySystems, setDisplaySystems] = React.useState<System[] | null>(systems ?? null);
    const [displayReferences, setDisplayReferences] = React.useState<Reference[] | null>(references ?? null);

    React.useEffect(() => {
        // If server didn't provide systems but the hook/store has them, adopt hook data after mount
        if ((displaySystems === null || displaySystems.length === 0) && catalogueHook?.currentSystems && catalogueHook.currentSystems.length > 0) {
            setDisplaySystems(catalogueHook.currentSystems);
        }

        if ((displayReferences === null || displayReferences.length === 0) && catalogueHook?.currentReferences && catalogueHook.currentReferences.length > 0) {
            setDisplayReferences(catalogueHook.currentReferences);
        }

        // run once after mount to avoid hydration mismatch
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // update displayed references whenever the store's references change
    React.useEffect(() => {
        if (catalogueHook?.currentReferences) {
            setDisplayReferences(catalogueHook.currentReferences);
        }
    }, [catalogueHook?.currentReferences]);

    // update displayed systems whenever the store's systems change
    React.useEffect(() => {
        if (catalogueHook?.currentSystems) {
            setDisplaySystems(catalogueHook.currentSystems);
        }
    }, [catalogueHook?.currentSystems]);
 

    const handleSystemChange = ( event: React.ChangeEvent<HTMLSelectElement> ) => {
        catalogueHook.SetReferencesLoading(true);
        const selectedSystem = event.target.value;
        // clear displayed references while the new ones load to avoid showing stale options
        setDisplayReferences(null);
        catalogueHook.SetCurrentSystem( selectedSystem );
        catalogueHook.SetReferencesBySystem( selectedSystem );
    };

    const handleReferenceChange = ( event: React.ChangeEvent<HTMLSelectElement> ) => {
        const selectedReference = event.target.value;
        //look upfor the reference in store by id selectedReference and then update store to show only that reference
        const reference = catalogueHook.currentReferences?.find( (ref) => ref.id === parseInt(selectedReference) );
        console.log("Referencia seleccionada:", reference);

    };

    return<>
    

    <div className="container-filters w-[96%] ml-[2%] md:w-[20%] md:ml-[0px] h-[100px] md:h-[600px]  2xl:h-[800px]  rounded bg-white shadow-sm p-2 flex flex-wrap overflow-x-scroll flex-col gap-4 md:mt-2">

                <div className="select-systems w-[94%] ml-[3%] md:mt-4   ">
                    <label htmlFor="systems" className="text-[16px] font-semibold color-quaternary">Sistemas</label>
                    <select value={catalogueHook.currentSystem  || "todos"} onChange={handleSystemChange} id="systems" className="w-[100%] h-[40px] bg-gray-200 rounded-sm p-2 text-gray-600  ">
                        <option value="todos">Seleccione un sistema</option>
                        <option value="todos">Todos  </option>
                        {displaySystems && displaySystems.map((system) => (
                            <option key={system.id} value={system.id}>{system.name}</option>
                        ))}
                    </select>
                </div>

                <div className="select-references w-[94%] ml-[3%] md:mt-4">
                    <label htmlFor="references" className="text-[16px] font-semibold color-quaternary">Referencias</label>
                    <select onChange={handleReferenceChange} id="references" className="w-[100%] h-[40px]  rounded-sm p-2 bg-gray-200 text-gray-600 ">
                        <option value="todos">Seleccione una referencia</option>
                         <option value="todos">Todas  </option>
                            {displayReferences && displayReferences.map((reference) => (
                                <option key={reference.id} value={reference.id}>{reference.name}</option>
                            ))}
                    </select>
                </div>

                <div className="buscador w-[94%] ml-[3%] md:mt-4">
                    <label htmlFor="search" className="text-[16px] font-semibold color-quaternary">Buscar</label>
                    <input id="search" type="text" placeholder="Buscar..." className="w-[100%] h-[40px]  rounded-sm p-2 bg-gray-200 text-gray-600 " />
                </div>


                
            </div>    
    </>


}

export default FiltersCatalogue;

