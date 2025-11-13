import System from "@/backend/model/system.model";
import CardReference from "../cards/card.reference";
import Reference from "@/backend/model/reference.model";

type SectionCatalogueProps = {
    systems?: System[] | null;
    references?: Reference[] | null;

};

const SectionCatalogue: React.FC<SectionCatalogueProps> = ({ systems,references }) => {
    return<>

        <div className="contaniner-catalogue w-[98%] ml-[1%] md:w-[96%] md:ml-[2%]  mt-2  border flex flex-wrap">

            <div className="container-filters w-[100%] md:w-[20%] h-[100px] md:h-[600px]  2xl:h-[800px] border  bg-white shadow-sm flex ">

                <div className="select-systems">
                    <label htmlFor="systems" className="">Sistemas</label>
                    <select id="systems" className="w-[90%] h-[40px] border rounded-sm p-2 ">
                        <option value="">Seleccione un sistema</option>
                        {systems && systems.map((system) => (
                            <option key={system.id} value={system.id}>{system.name}</option>
                        ))}
                    </select>
                </div>

                <div className="select-references">
                    <label htmlFor="references" className="">Referencias</label>
                    <select id="references" className="w-[90%] h-[40px] border rounded-sm p-2 ">
                        <option value="">Seleccione una referencia</option>
                        {references && references.map((reference) => (
                            <option key={reference.id} value={reference.id}>{reference.name}</option>
                        ))}
                    </select>
                </div>

                <div className="buscador">
                    <label htmlFor="search" className="">Buscar</label>
                    <input id="search" type="text" placeholder="Buscar..." className="w-[90%] h-[40px] border rounded-sm p-2 " />
                </div>


                
            </div>        
            

             <div className="container-cards w-[100%] md:w-[80%] h-[600px] 2xl:h-[800px] flex flex-wrap overflow-y-scroll justify-center border mt-2">

                {
                    references && references.map( (reference) => (
                        <CardReference
                            key={reference.id}
                            imgUrl3d={reference.media.img2 || "https://cms.cominsur.com.co/cominsur/assets/a1q91wg7v280soso"}
                            imgUrlPlane={reference.media.img1 || "https://cms.cominsur.com.co/cominsur/assets/ovburjz6b0g4occc"}
                        />  
                    ))
                }
              
                
            </div>
        

            
        </div>
    </>

};

export default SectionCatalogue;