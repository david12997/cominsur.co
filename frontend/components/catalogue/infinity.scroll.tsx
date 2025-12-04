"use client";

import InfiniteScroll from "react-infinite-scroll-component";
import CardReference from "../cards/card.reference";
import Reference from "@/backend/model/reference.model";

import React from "react";
import useCatalogueHook from "@/frontend/hooks/use.catalogue";
import System from "@/backend/model/system.model";

type CardsInfinityScrollProps = {
    systems?: System[] | null | undefined;
    references?: Reference[] | null | undefined;
    offset?: number;
    limit?: number;
};
    
const CardsInfinityScroll: React.FC<CardsInfinityScrollProps> = ({ systems, references, offset = 0, limit = 10 }) => {


    const catalogueHook = useCatalogueHook({ systems, references });

    return<>

        
        <div id="scrollableDiv" className="container-cards w-[100%] md:w-[80%] h-[600px] 2xl:h-[800px] flex flex-wrap overflow-y-scroll justify-center  mt-4 md:mt-0 ">
                    
            <InfiniteScroll
                scrollableTarget="scrollableDiv"
                className='w-[100%] h-[100%] flex flex-wrap justify-center items-center'
                dataLength={ catalogueHook.currentReferences?.length ?? 0} //This is important field to render the next data
                next={() => {
                    // prevent triggering loadMore while a fetch is already in progress
                    if (catalogueHook.currentReferencesLoading) return;
                    // console alert left for debugging; remove in production
                    // alert("Cargando mas referencias del sistema " + catalogueHook?.currentSystem);
                    catalogueHook.LoadMoreReferences(catalogueHook?.currentSystem);
                    
                }}
                hasMore={true}
                loader={<h4 className='w-[100%] h-[60px] flex items-center justify-center font-extrabold text-[#4a0083] mt-2 mb-2'>Cargando...</h4>}
                endMessage={
                    <p className='w-[100%] h-[60px] font-extrabold text-[#4a0083] flex items-center justify-center'>
                        <b>Ups! no hay mas referencias</b>
                    </p>
                }
                
            >
            {
                     !catalogueHook.currentReferencesLoading && catalogueHook.currentReferences !== undefined && catalogueHook.currentReferences !== null ?
                    catalogueHook.currentReferences.map( (reference) => (
                    <CardReference
                        key={reference.id}
                        name={reference.name}
                        reference={reference.data.referencia}
                        color={reference.color}
                        piecePerPackage={reference.piecePerPackage}
                        description={reference.description}
                        imgUrl3d={reference.media.img2 || "https://cms.cominsur.com.co/cominsur/assets/a1q91wg7v280soso"}
                        imgUrlPlane={reference.media.img1 || "https://cms.cominsur.com.co/cominsur/assets/ovburjz6b0g4occc"}
                    />  
                ))
                :
                <div className="w-[100%] mt-[100px] flex items-center justify-center ">
                    <div className="w-[200px] h-[200px] rounded-full animate-spin border-8 border-solid border-[#4a0083] border-t-transparent shadow-md">
                    </div>
                 </div>
                
                
            }
            
            </InfiniteScroll>

                    
        
            
        </div>
    
    </>

}

export default CardsInfinityScroll;