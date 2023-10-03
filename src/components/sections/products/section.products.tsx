import CardProduct from "@/components/cards/card.product/card.product"

const SectionProducts = (props:{referencias:any[]}):JSX.Element => {

    return<>
        <div className="title-section font-bold  text-[22px]  md:text-[24px] w-[90vw] ml-[5vw]  mt-[45px]  md:mt-[60px] text-[#6a6a6a]">
           NUESTROS PRODUCTOS
        </div>
        <section className="section-products flex w-[90vw] ml-[5vw] h-[520px]  overflow-x-scroll overflow-y-hidden">
            
            {
                props.referencias[0].map((referencia:any, index:number)=>{
                    
                    if(index < 2) return<CardProduct
                        key={index}
                        referencia={referencia}
                        referencias={props.referencias}
                       
                    />
                })
            }

            {
                props.referencias[1].map((referencia:any, index:number)=>{
                    
                    if(index < 2) return<CardProduct
                        key={index}
                        referencia={referencia}
                        referencias={props.referencias}
                       
                    />
                })
            }

            {
                props.referencias[2].map((referencia:any, index:number)=>{
                    
                    if(index < 2) return<CardProduct
                        key={index}
                        referencia={referencia}
                        referencias={props.referencias}
                       
                    />
                })
            }

            {
                props.referencias[3].map((referencia:any, index:number)=>{
                    
                    if(index < 2) return<CardProduct
                        key={index}
                        referencia={referencia}
                        referencias={props.referencias}
                       
                    />
                })
            }

            {
                props.referencias[4].map((referencia:any, index:number)=>{
                    
                    if(index < 2) return<CardProduct
                        key={index}
                        referencia={referencia}
                        referencias={props.referencias}
                       
                    />
                })
            }

        </section>
    </>
}

export default SectionProducts