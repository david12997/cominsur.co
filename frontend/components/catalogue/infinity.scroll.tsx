"use client";

import InfiniteScroll from "react-infinite-scroll-component";
import CardReference from "../cards/card.reference";
import Reference from "@/backend/model/reference.model";
import { useAppDispatch, useAppSelector } from "@/frontend/store";
import React from "react";
import { referencesServices } from "@/frontend/services/references.services";

type CardsInfinityScrollProps = {
    references?: Reference[] | null | undefined;
    offset?: number;
    limit?: number;
};
    
const CardsInfinityScroll: React.FC<CardsInfinityScrollProps> = ({ references, offset = 0, limit = 10 }) => {

    const[ currnentReferences, setCurrentReferences ] = React.useState<Reference[] | null | undefined>(references);

    const appDispatch = useAppDispatch();
    const referencesFromStore = useAppSelector((state) => state.references.references);

    React.useEffect(() => {
        
        if(referencesFromStore && referencesFromStore.length > 0) {
            setCurrentReferences(referencesFromStore);
        } else {
            referencesServices.setAllReferences("references/setReferences", references as Reference[], appDispatch)
        }


    }, [referencesFromStore]);





    return<>

        
        <div id="scrollableDiv" className="container-cards w-[100%] md:w-[80%] h-[600px] 2xl:h-[800px] flex flex-wrap overflow-y-scroll justify-center  mt-4 md:mt-0 ">
                    
            <InfiniteScroll
                scrollableTarget="scrollableDiv"
                className='w-[100%] h-[100%] flex flex-wrap justify-center items-center'
                dataLength={currnentReferences ? currnentReferences.length : 0} //This is important field to render the next data
                next={() => {

                    setCurrentReferences(null);
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
                currnentReferences!== undefined && currnentReferences !== null ?
                currnentReferences.map( (reference) => (
                    <CardReference
                        key={reference.id}
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