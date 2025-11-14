import System from "@/backend/model/system.model";
import Reference from "@/backend/model/reference.model";
import CardsInfinityScroll from "../catalogue/infinity.scroll";
import ReduxProvider from "@/frontend/store/redux.provider";


type SectionCatalogueProps = {
    systems?: System[] | null;
    references?: Reference[] | null;

};

const SectionCatalogue: React.FC<SectionCatalogueProps> = ({ systems,references }) => {
    return<>

        <div className="contaniner-catalogue w-[98%] ml-[1%] md:w-[96%] md:ml-[2%]  mt-2   flex flex-wrap">

            <div className="container-filters w-[96%] ml-[2%] md:w-[20%] md:ml-[0px] h-[100px] md:h-[600px]  2xl:h-[800px]  rounded bg-white shadow-sm p-2 flex flex-wrap overflow-x-scroll flex-col gap-4 md:mt-2">

                <div className="select-systems w-[94%] ml-[3%] md:mt-4   ">
                    <label htmlFor="systems" className="text-[16px] font-semibold color-quaternary">Sistemas</label>
                    <select id="systems" className="w-[100%] h-[40px] bg-gray-200 rounded-sm p-2 text-gray-600  ">
                        <option value="">Seleccione un sistema</option>
                        <option value="">Todos  </option>
                        {systems && systems.map((system) => (
                            <option key={system.id} value={system.id}>{system.name}</option>
                        ))}
                    </select>
                </div>

                <div className="select-references w-[94%] ml-[3%] md:mt-4">
                    <label htmlFor="references" className="text-[16px] font-semibold color-quaternary">Referencias</label>
                    <select id="references" className="w-[100%] h-[40px]  rounded-sm p-2 bg-gray-200 text-gray-600 ">
                        <option value="">Seleccione una referencia</option>
                         <option value="">Todas  </option>
                        {references && references.map((reference) => (
                            <option key={reference.id} value={reference.id}>{reference.name}</option>
                        ))}
                    </select>
                </div>

                <div className="buscador w-[94%] ml-[3%] md:mt-4">
                    <label htmlFor="search" className="text-[16px] font-semibold color-quaternary">Buscar</label>
                    <input id="search" type="text" placeholder="Buscar..." className="w-[100%] h-[40px]  rounded-sm p-2 bg-gray-200 text-gray-600 " />
                </div>


                
            </div> 
        
            
            <ReduxProvider>
                <CardsInfinityScroll references={references} offset={0} limit={10} />

            </ReduxProvider>
            
          
           
            

            
        </div>
    </>

};

export default SectionCatalogue;