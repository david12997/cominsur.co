'use client'

import CardProduct from '@/components/cards/card.product/card.product';
import { GetData } from '@/services/get.data';
import { useAppSelector } from '@/store';
import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';


const SectionCatalogoApp = ():JSX.Element=>{

    const selectorState = useAppSelector(state => state.cotizacion);

    const [typeFetchMore, setTypeFetchMore] = useState<string>('all');
    const [idCurrentSystem, setIdCurrentSystem] = useState<number>(0);

    const [stateOffset, setStateOffset] = useState<number>(0);
    const [needMoreReferences, setNeedMoreReferences] = useState<boolean>(true);

    const [resetAll, setResetAll] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('VER TODO');

    const [referencias, setReferencias] = useState<any[]>([]);
    const [stateReferencias, setStateReferencias] = useState<string>('loading');

    const [sistemas, setSistemas] = useState<any[]>([]);
    const [stateSistemas, setStateSistemas] = useState<string>('loading');

    const [referenciasSistema, setReferenciasSistema] = useState<any[]>([]);
    const [stateReferenciasSistema, setStateReferenciasSistema] = useState<string>('loading');

    const verifyResponse = (res:any,setEntity:any,setStateEntity:any,index:number):void=>{

        if(res[index].status === 200 && res[0].data.length > 0){
            setStateEntity('success');
            setEntity(res[index].data);
           
        }

        if(res[index].status === 200 && res[0].data.length === 0){
            setStateEntity('not-found');
            setEntity([]);
          
        }

        if(res[index].status !== 200){
            setStateEntity('error');
            setEntity([]);
        
        }
    }

    const handleSelectSistema = (e:any):void=>{

        setNeedMoreReferences(false);
        setStateOffset(0);
        
        if(e.target.value !== 'none' && e.target.value !== 'cargando' && e.target.value !== 'error'){
            
            // reset referencias 
            setStateReferencias('loading');
            setReferencias([]);
            setIdCurrentSystem(e.target.value);
            // reset select referencias
            let selectReferencias = document.getElementById('select-referencia') as HTMLSelectElement;
            selectReferencias.selectedIndex = 0;

            // reset title
            let selectSistema = document.getElementById('select-sistema') as HTMLSelectElement;
            setTitle(selectSistema.options[selectSistema.selectedIndex].text.toUpperCase());

            GetData([
                process.env.NEXT_PUBLIC_DOMAIN as string + `/api/referencias?system=${e.target.value}&limit=20&offset=0`,
                process.env.NEXT_PUBLIC_DOMAIN as string + `/api/referencias?system=${e.target.value}&limit=9&offset=0`

            ]).then((res:any)=>{

                // verify response referencias sistema
                verifyResponse(res,setReferenciasSistema,setStateReferenciasSistema,0);

                // verify response referencias
                verifyResponse(res,setReferencias,setStateReferencias,1);

                // set type fetch more
                setTypeFetchMore('system');

                // set need more references
                setNeedMoreReferences(true);
               

            }).catch((err:any)=>{
                console.log(err)
            });
        
        }

        if(e.target.value === 'none'){
            setTitle('VER TODO');
            setStateReferenciasSistema('loading');
            setReferenciasSistema([]);
            setReferencias([]);
            setStateReferencias('loading');
            setNeedMoreReferences(true);
            setResetAll(!resetAll);
        }

    }

    const handleSelectReferencia = (e:any):void=>{


        if(e.target.value !== 'none' && e.target.value !== 'cargando' && e.target.value !== 'error'){
            // reset referencias 
            setStateReferencias('loading');
            setReferencias([]);

            // reset title
            let selectReferencias = document.getElementById('select-referencia') as HTMLSelectElement;
            setTitle( title+'-'+selectReferencias.options[selectReferencias.selectedIndex].text.toUpperCase());

            
            GetData([
                process.env.NEXT_PUBLIC_DOMAIN as string + `/api/referencias/id?idRef=${e.target.value}`,

            ]).then((res:any)=>{

                // verify response referencias
                verifyResponse(res,setReferencias,setStateReferencias,0);

                // set need more references
                setNeedMoreReferences(false);
               

            }).catch((err:any)=>{
                console.log(err)
            });
        }

        if(e.target.value === 'none'){
            setTitle('VER TODO');
            setStateReferenciasSistema('loading');
            setReferenciasSistema([]);
            setReferencias([]);
            setStateReferencias('loading');
            setResetAll(!resetAll);
            setNeedMoreReferences(true);

            // reset select referencias
            let selectSistema = document.getElementById('select-sistema') as HTMLSelectElement;
            selectSistema.selectedIndex = 0;
        }
    }

    const handleSubmintSearch = (e:any):void=>{

        e.preventDefault();
        let input = document.getElementById('input-search-referencia') as HTMLInputElement;

        if(input.value !== '' && input.value !== ' ' && input.value !== null && input.value !== undefined && input.value.length >= 3){
            // reset referencias 
            setStateReferencias('loading');
            setReferencias([]);

            //reset title
            setTitle('BUSQUEDA: '+input.value.toUpperCase());
            
            GetData([
                process.env.NEXT_PUBLIC_DOMAIN as string + `/api/referencias/search?search=${input.value}&limit=20&offset=0`,

            ]).then((res:any)=>{

                // verify response referencias
                verifyResponse(res,setReferencias,setStateReferencias,0);

                //clean input
                input.value = '';
               

            }).catch((err:any)=>{
                console.log(err)
            });
        }
    }

    const FetchMoreAll = (offset:number):void=>{

        GetData([
            process.env.NEXT_PUBLIC_DOMAIN as string + `/api/referencias/all?limit=9&offset=${offset}`,

        ]).then((res:any)=>{

            // verify response referencias
            if(res[0].status === 200 && res[0].data.length > 0){

                setStateReferencias('success');
                setReferencias(referencias.concat(res[0].data));
                setStateOffset(offset);
            }else{
                setNeedMoreReferences(false);
                
            }

        }).catch((err:any)=>{
            console.log(err)
        });


    }

    const FetchMoreAllBySystem = (offset:number,idSystem:number):void=>{

        GetData([
            process.env.NEXT_PUBLIC_DOMAIN as string + `/api/referencias?system=${idSystem}&limit=9&offset=${offset}`,

        ]).then((res:any)=>{

            // verify response referencias
            if(res[0].status === 200 && res[0].data.length > 0){

                setStateReferencias('success');
                setReferencias(referencias.concat(res[0].data));
                setStateOffset(offset);
            }else{
                setNeedMoreReferences(false);
                
            }

        }).catch((err:any)=>{
            console.log(err)
        });


    }


    useEffect(() => {

        setStateOffset(0);
        setNeedMoreReferences(true);

        GetData([

            process.env.NEXT_PUBLIC_DOMAIN as string + '/api/referencias/all?limit=9&offset='+stateOffset,
            process.env.NEXT_PUBLIC_DOMAIN as string + '/api/sistemas/all',

        ]).then((res:any)=>{

            // verify response referencias
            verifyResponse(res,setReferencias,setStateReferencias,0);
            
            // verify response sistemas
            verifyResponse(res,setSistemas,setStateSistemas,1);

            // set type fetch more
            setTypeFetchMore('all');

           
        })
        .catch((err:any)=>{
            console.log(err)
        })


        // reset links nav desktop
        const LinksDesktop = document.getElementsByClassName('option-nav-desktop') as HTMLCollectionOf<HTMLElement>;

        for(let i = 0; i < LinksDesktop.length; i++){

            if(i === 1){
                    
                LinksDesktop[i].style.color = '#222274';
            }else{
                LinksDesktop[i].style.color = '#8f8f8f';
            }
        }


    }, [resetAll])
    
    return<>
        <section className="catalogo-app w-[94vw] ml-[3vw] md:h-[550px] ">
            <div className="text-[18px] font-extrabold text-[#6e6e6e] title-catalogo-app w-[100%] h-[35px] flex items-center justify-center">
                <li>{title}</li>
            </div>

            <div className="container-app-catalogo w-[100%] md:h-[90%] flex flex-wrap justify-between">

                <div className="p-2 md:pt-6 flex md:flex-wrap  buscador-catalogo overflow-x-scroll md:overflow-x-hidden  w-[100%] md:w-[21%] h-[140px] md:h-[100%] bg-white rounded-[6px] shadow-[0px_0px_6px_rgba(0,0,0,0.2)]">
                    
                    <div className='filtros ml-2 mr-2 md:ml-0 md:mr-0 min-w-[270px] md:min-w-[100%] h-[110px] '>
                        
                        <label className='p-1 w-[100%] h-[30px] text-[17px] font-bold text-[#222274]'>Elige un sistema</label>
                        <select id='select-sistema' onChange={(e)=>handleSelectSistema(e)} className='w-[100%] h-[50px] bg-[#e6e6e6] rounded-[6px] font-bold text-[#6e6e6e] text-[17px] '>
                            <option value={'none'}>Elige un sistema</option>
                            {
                                (stateSistemas === 'loading' && sistemas.length === 0)
                                ?
                                <option value={'cargando'}>Cargando...</option>
                                :
                                (stateSistemas === 'success' && sistemas.length > 0)
                                ?
                                sistemas.map((sistema:any, index:number)=>{
                                    return<option value={sistema.id} key={index}>{'Sistema '+sistema.nombre}</option>
                                })
                                :
                                <option value={'error'}>No hay sistemas</option>
                            }
                        </select>
                    </div>

                    <div className='filtros ml-2 mr-2 md:ml-0 md:mr-0  min-w-[270px] md:min-w-[100%] h-[110px] '>
                        
                        <label className='p-1 w-[100%] h-[30px] text-[17px] font-bold text-[#222274]'>Elige una referencia</label>
                        <select id='select-referencia' onChange={(e)=>handleSelectReferencia(e)} className='w-[100%] h-[50px] bg-[#e6e6e6] rounded-[6px] font-bold text-[#6e6e6e] text-[17px]'>
                            <option value={'none'}>Elige una referencia</option>
                            {
                                (stateReferenciasSistema === 'loading' && referenciasSistema.length === 0)
                                ?
                                <option value={'cargando'}>Primero elige un sistema...</option>
                                :
                                (stateReferenciasSistema === 'success' && referenciasSistema.length > 0)
                                ?
                                referenciasSistema.map((ref:any, index:number)=>{
                                    return<option value={ref.id} key={index}>{ref.referencia}</option>
                                })
                                :
                                <option value={'error'}>No hay referencias</option>

                            }
                        </select>
                    </div>

                    <div className='busqueda-libre min-w-[270px] md:min-w-[100%] h-[110px] '>
                        <form onSubmit={(e)=>{handleSubmintSearch(e)}}>
                            <label className='p-1 w-[100%] h-[30px] text-[17px] font-bold text-[#222274]'>Buscar referencia</label>
                            <input id='input-search-referencia' className='w-[100%] h-[50px] bg-[#e6e6e6] rounded-[6px] font-bold text-[#6e6e6e] text-[17px]' type='text' placeholder=' Ej: sistema 744 traslape'/>
                        </form>
                    </div>


                </div>

                <div id='scrollable-div' className=" container-cards-catalogo mt-4 md:mt-0 flex flex-wrap justify-center items-center w-[100%] md:w-[78%] min-h-[300px] md:h-[100%] md:overflow-y-scroll overflw-x-hidden"> 
                    {
                        window.innerWidth > 768
                        ?
                        <InfiniteScroll
                            scrollableTarget="scrollable-div"
                            className='w-[100%] h-[100%] flex flex-wrap justify-center items-center'
                            dataLength={referencias.length}
                            next={()=>{ typeFetchMore === 'all'? FetchMoreAll(stateOffset+9): FetchMoreAllBySystem(stateOffset+9,idCurrentSystem) }}
                            hasMore={needMoreReferences}
                            loader={<h4 className='w-[100%] h-[60px] flex items-center justify-center font-extrabold text-[#4a0083] mt-2 mb-2'>Cargando...</h4>}
                            endMessage={
                                <p className='w-[100%] h-[60px] font-extrabold text-[#4a0083] flex items-center justify-center'>
                                    <b>Ups! no hay mas referencias</b>
                                </p>
                            }
                        >
                            {
                                (stateReferencias === 'loading' && referencias.length === 0)
                                ?
                                <div className="w-[100%] h-[100%] flex items-center justify-center">
                                    <div className="w-[200px] h-[200px] rounded-full animate-spin border-8 border-solid border-[#4a0083] border-t-transparent shadow-md">
                                    </div>
                                </div>
                                :
                                (stateReferencias === 'success' && referencias.length > 0)
                                ?
                                referencias.map((ref:any, index:number)=>{
                                
                                    if(ref.status === 'published'){
                                        return<CardProduct key={index} referencia={ref} referencias={referencias}/>
                                    }

                                })
                                :
                                <div className="w-[100%] h-[100%] flex items-center justify-center font-extrabold text-[16px] text-[#6e6e6e]">
                                    <li>No hay productos, intentalo más tarde</li>
                                </div> 
                            }
                            
                        </InfiniteScroll>
                        :
                        <InfiniteScroll
                            className='w-[100%] h-[100%] flex flex-wrap justify-center items-center'
                            dataLength={referencias.length}
                            next={()=>{typeFetchMore === 'all'? FetchMoreAll(stateOffset+9): FetchMoreAllBySystem(stateOffset+9,idCurrentSystem)}}
                            hasMore={needMoreReferences}
                            loader={<h4 className='w-[100%] h-[60px] flex items-center justify-center font-extrabold text-[#4a0083] mt-2 mb-2'>Cargando...</h4>}
                            endMessage={
                                <p className='w-[100%] h-[60px] font-extrabold text-[#4a0083] flex items-center justify-center'>
                                    <b>Ups! no hay mas referencias</b>
                                </p>
                            }
                        >
                            {
                                (stateReferencias === 'loading' && referencias.length === 0)
                                ?
                                <div className="w-[100%] h-[100%] flex items-center justify-center">
                                    <div className="w-[200px] h-[200px] rounded-full animate-spin border-8 border-solid border-[#4a0083] border-t-transparent shadow-md">
                                    </div>
                                </div>
                                :
                                (stateReferencias === 'success' && referencias.length > 0)
                                ?
                                referencias.map((ref:any, index:number)=>{
                                
                                    if(ref.status === 'published'){
                                        return<CardProduct key={index} referencia={ref} referencias={referencias}/>
                                    }
                                    

                                })
                                :
                                <div className="w-[100%] h-[100%] flex items-center justify-center font-extrabold text-[16px] text-[#6e6e6e]">
                                    <li>No hay productos, intentalo más tarde</li>
                                </div> 
                            }
                            
                        </InfiniteScroll>

                    }
                    


                </div>

                

            </div>

        </section>
    </>
}

export default SectionCatalogoApp;