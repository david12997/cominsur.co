import System from "@/backend/model/system.model";
import Reference from "@/backend/model/reference.model";
import CardsInfinityScroll from "../catalogue/infinity.scroll";
import ReduxProvider from "@/frontend/store/redux.provider";
import FiltersCatalogue from "../catalogue/filters";


type SectionCatalogueProps = {
    systems?: System[] | null;
    references?: Reference[] | null;

};

const SectionCatalogue: React.FC<SectionCatalogueProps> = ({ systems,references }) => {
    return<>

        <div className="contaniner-catalogue w-[98%] ml-[1%] md:w-[96%] md:ml-[2%]  mt-2   flex flex-wrap">
            
            <ReduxProvider>
                <FiltersCatalogue systems={systems} references={references} />
                <CardsInfinityScroll systems={systems} references={references} offset={0} limit={10} />

            </ReduxProvider>
            
          
           
            

            
        </div>
    </>

};

export default SectionCatalogue;