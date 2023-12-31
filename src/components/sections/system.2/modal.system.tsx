'use client'

import { CloseTimes } from "@/icons"
import { useAppDispatch } from "@/store"
import { setReferencias, setSistema, setState } from "@/store/cotizacion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

const ModalSystem = (props:{setStateSystem:any,stateSystem:boolean,references:any[],imgInit:string,nombreSystem:string,reference:any,typeModal:string,busqueda:boolean}):JSX.Element=>{

    const dispatch = useAppDispatch();
    const router = useRouter();


    const [imgRef, setImgRef] = useState(props.imgInit);
    const [totalPaquetes, setTotalPaquetes] = useState(0);
    const [myrefs, setMyrefs] = useState<any[]>(props.references);
    const [currentRef,setCurrentRef] = useState<any>(props.reference);
    const [typeModal,setTypeModal] = useState(props.typeModal);

    const selectRef = useRef<Array<HTMLSelectElement | null>>([]);

    const quantityPaquetesAllowed  = ():number[]=>{

        const arr:any[] = [];
        for(let i=0; i< 61; i++){
            arr.push(i);
        }
        return arr;
    }

    const handleClickReferencia = (referencia:any,idRef:string,idSpan1:string,idspan2:string)=>{

        const elementsRef = document.querySelectorAll('.reference-option-list') as NodeListOf<HTMLElement>
        const spans1 = document.querySelectorAll('.title-reference-option') as NodeListOf<HTMLElement>
        const spans2 = document.querySelectorAll('.name-reference-option') as NodeListOf<HTMLElement>
       
        const elementRef = document.getElementById(idRef) as HTMLElement
        const span1 = document.getElementById(idSpan1) as HTMLElement
        const span2 = document.getElementById(idspan2) as HTMLElement

        

        for(let i=0; i< elementsRef.length; i++){
            elementsRef[i].style.background = 'white'
            elementsRef[i].style.color = '#6e6e6e'
            spans1[i].style.color = '#4a0083'
            spans2[i].style.color = '#6e6e6e'

        
        }

        elementRef.style.background = '#4a0083'
        span1.style.color = 'yellow'
        span2.style.color = 'white'
        elementRef.style.color = 'white'
    
        
       setImgRef(JSON.parse(referencia.media).img2);
       

        
    }

    const handleChangeSelect = ()=>{

        let total:number = 0;

        for(let i=0; i< selectRef.current.length; i++){

            const value = selectRef.current[i] as HTMLSelectElement;
            if(value !== undefined && value !== null){

                total += parseInt(value.value);
            }
        }
        setTotalPaquetes(total);
    }
    const handleChangeImg = (urlImg1:string,urlImg2:string,index:number):void=>{

        let thumbs1 = document.getElementById(urlImg1) as HTMLElement;
        let thumbs2 = document.getElementById(urlImg2) as HTMLElement;

        if(index === 1){
            thumbs1.style.border = '4px solid #4a0083';
            thumbs2.style.border = '4px solid #c9c9c9';
            setImgRef(urlImg1);
        }else{
            thumbs2.style.border = '4px solid #4a0083';
            thumbs1.style.border = '4px solid #c9c9c9';
            setImgRef(urlImg2);
        }
    }

    const handleSetSistema =(newTypeModal:string)=>{

        if(!props.busqueda){
            setTypeModal(newTypeModal);
            const elementsRef = document.querySelectorAll('.reference-option-list') as NodeListOf<HTMLElement>
            const spans1 = document.querySelectorAll('.title-reference-option') as NodeListOf<HTMLElement>
            const spans2 = document.querySelectorAll('.name-reference-option') as NodeListOf<HTMLElement>
    
            for(let i=0; i< elementsRef.length; i++){
                elementsRef[i].style.background = 'white'
                elementsRef[i].style.color = '#6e6e6e'
                spans1[i].style.color = '#4a0083'
                spans2[i].style.color = '#6e6e6e'
    
            
            }
        }


    } 

    useEffect(() => {
        
        dispatch(setState('empty'));
        dispatch(setSistema(""));
        dispatch(setReferencias([]));

        if(typeModal === 'sistema'){

        }

        if(typeModal === 'referencia'){

            const filterReferences = myrefs.filter(ref => props.reference.id !== ref.id && ref);
            const newReferences = [props.reference, ...filterReferences];
            setMyrefs(newReferences);
            setTimeout(()=>{
                handleClickReferencia(props.reference,`referencia-${props.reference.id}-${props.reference.referencia}`,`title-${props.reference.id}`,`name-${props.reference.referencia}`)
    
            },300)
    
        }

    }, [])

    return<>
        <div className="screen-system w-[100vw] h-[103vh] fixed z-[999] top-[0px] left-[0px] bg-[#0000008d] flex items-center justify-center">

            <div className="relative w-[90%] h-[90%] bg-white rounded-[8px] flex flex-wrap ">

                <div onClick={()=>handleSetSistema('sistema')} className="close-scree-system w-[100%] h-[7%] relative flex items-center justify-center border-b-2 border-[#e6e6e6]"> 
                    <h1  className="text-[22px] font-extrabold text-[#000032] cursor-pointer"> {!props.busqueda ? 'SISTEMA '+props.nombreSystem : 'BUSQUEDA LIBRE'}</h1>
                    <span onClick={()=>props.setStateSystem(!props.stateSystem)} className="absolute right-0 p-2 cursor-pointer">
                        <CloseTimes
                            width="20"
                            color="#4a0083"
                        />
                    </span>
                </div>

                <div className="relative container-animation-system w-[100%] h-[39%] md:w-[50%] md:h-[93%] border-b-2 md:border-b-0   md:border-r-2 border-[#e6e6e6]">
                    <Image
                        src={ typeModal === 'referencia'? imgRef : props.reference.sistema_img }
                        alt="sistema-2"
                        fill
                        className="object-cover cursor-pointer p-3"

                    />
                    <div style={ typeModal === 'sistema' ? {display:'none'} : {display:'flex'}} className="title-ref-img text-[15px] p-2 font-extrabold text-[#4a0083] absolute top-[0px] left-[5px]">
                       Ref:  {currentRef.referencia} - {currentRef.sistema_nombre}
                    </div>
                    <div style={ typeModal === 'sistema' ? {display:'none'} : {display:'flex'}} className="container-thumb top-[83%] absolute w-[100%] h-[13%] border-bottom border-[#9b9b9b]  items-center justify-center cursor-pointer">

                        <Image
                            id={JSON.parse(currentRef.media).img2}
                            src={JSON.parse(currentRef.media).img2}
                            alt="Picture of the author"
                            height={40}
                            width={40}
                            className="border-[4px] border-[#4a0083] rounded-[3px] ml-[5px] mr-[5px]"
                            onClick={()=>handleChangeImg(JSON.parse(currentRef.media).img1,JSON.parse(currentRef.media).img2,2)}
                            
                        />

                    
                        <Image
                            id={JSON.parse(currentRef.media).img1}
                            src={JSON.parse(currentRef.media).img1}
                            alt="Picture of the author"
                            height={40}
                            width={40}
                            className="border-[4px] border-[#c9c9c9] rounded-[3px] ml-[5px] mr-[5px]"
                            onClick={()=>handleChangeImg(JSON.parse(currentRef.media).img1,JSON.parse(currentRef.media).img2,1)}
                            
                        />
                        

                    </div>
                </div>

                <div className=" container-animation-system w-[100%] h-[50%] md:w-[50%] md:h-[90%]  p-2 md:p-4 overflow-y-scroll mb-[400px]">
                    <h1 onClick={()=>handleSetSistema('sistema')}
                        className="cursor-pointer border-b-2 border-[#e6e6e6] w-[100%] h-[40px] flex items-center justify-center font-extrabold text-[19px] text-[#4a0083]"
                    >
                        LISTADO REFERENCIAS
                    </h1>
                    {
                        myrefs.map((ref:any,index:number)=>{

                            
                            if(ref.status === 'published')return<div id={`referencia-${ref.id}-${ref.referencia}`} 
                                onClick={()=>{
                                    handleChangeImg(JSON.parse(currentRef.media).img1,JSON.parse(currentRef.media).img2,2)
                                    setCurrentRef(ref);
                                    handleClickReferencia(ref,`referencia-${ref.id}-${ref.referencia}`,`title-${ref.id}`,`name-${ref.referencia}`)
                                    setTypeModal('referencia');
                                }} 
                                className="text-[#6e6e6e] text-[18px] reference-option-list pl-2 mt-2 mb-2 w-[100%] h-[160px] flex flex-wrap items-center border-b-2 boder-[#6e6e6e] cursor-pointer" 
                                key={index}
                                style={{background:'white'}}
                                >
                                    <div className="container-all-reference-option flex flex-wrap w-[100%]">
                                        <div className="w-[100%]">
                                            <span id={`title-${ref.id}`} className=" title-reference-option font-extrabold text-[#4a0083]">
                                                Ref {ref.referencia}:
                                            </span> 
                                            <span id={`name-${ref.referencia}`} className="name-reference-option font-extrabold text-[#6e6e6e]">{ ` `+ref.nombre}</span>
                                        </div>
                                        <div className="w-[100%] font-extrabold   h-[30px] flex items-center">Piezas x paquete: {ref.piezas_x_paquete}</div>
                                        <div className="w-[100%] font-extrabold mt-1 mb-1 flex">
                                            Cantidad de paquetes: 
                                            <form onSubmit={(e)=>e.preventDefault()}>
                                                <select ref={elem=>selectRef.current[index] = elem} 
                                                    onChange={()=>handleChangeSelect()} 
                                                    className="rounded-[6px] ml-2 pl-4 bg-[#e6e6e6] text-black w-[63px] h-[27px]"
                                                >
                                                    {
                                                        quantityPaquetesAllowed().map((quantity,index)=>(
                                                            <option key={index} value={quantity}>{quantity}</option>
                                                        ))
                                                    }
                                                   
                                                </select>
                  
                                            </form> 
                                        </div>
                                        <div className="w-[100%] font-extrabold  mt-1 mb-1">
                                            Color: {ref.color}
                                            
                                        </div>
                                    </div>

                                
                                </div>
                            ;
                            else return<span key={index} className="w-[px] h-[0px]"></span>
                        
                        })
                    }
                    <div className="h-[100px] text-[white]"></div>
                    <div className="top-[78%] absolute w-[96%] md:w-[48%] h-[22%] bg-white z-[9999] flex flex-wrap items-center justify-center pb-[20px]">
                        {
                            totalPaquetes === 0
                            ?
                            <div className="w-[100%] mt-3 font-extrabold text-[#2a8a21] text-[15px]">Agrega al menos 1 paquete para cotizar</div>
                            :
                            <div className="w-[100%] font-extrabold text-[#2a8a21] text-[21px]">Total paquetes: {totalPaquetes}</div>
                        }
                        <button onClick={()=>{

                                if(totalPaquetes === 0) return alert('Agrega al menos 1 paquete para cotizar');

                                dispatch(setState('cotizando'));
                                dispatch(setSistema(props.nombreSystem));

                                const refsCotizacion:any[] = [];
                                (selectRef.current as HTMLSelectElement[]).forEach((select:HTMLSelectElement,index:number)=>{   
                                    
                                    if(select !== undefined && select !== null && select.value !== "0"){
                                        refsCotizacion.push({
                                            ...myrefs[index],
                                            cantidad_paquetes:select.value
                                        })
                                    }
    
                                    
                                })
                                dispatch(setReferencias(refsCotizacion));
                                router.push('/cotizar');
                            }} 
                            style={totalPaquetes !== 0 ? {background:"#4a0083",color:"white"}:{background:"#e6e6e6",color:"#6e6e6e"}} 
                            className=" w-[96%] h-[60px] rounded-[6px] mt-2 font-extrabold text-[20px]"
                        >
                            Solicitar cotización
                        </button>
                    </div>
   
                    
                </div>



            </div>

        </div>
    
    </>
}

export default ModalSystem