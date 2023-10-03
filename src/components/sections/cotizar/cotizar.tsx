'use client'

import React, { CSSProperties, useEffect,useRef } from "react";
import Select from "react-select";
import {GetData} from "../../../services/get.data";
import { useState } from "react";
import Btn3 from "@/components/buttons/btn.3/btn.3";
import { useAppDispatch, useAppSelector } from "@/store";
import { setReferencias, setSistema, setState } from "@/store/cotizacion";
import { MakeCotizacion } from "@/services/make.cotizacion";
import Image from "next/image";
import { useRouter } from "next/navigation";


const SectionCotizar = ():JSX.Element => {

    const selectorCotizacion = useAppSelector(state => state.cotizacion);
    const dispatch = useAppDispatch();
    const router  = useRouter();

    const SelectElementReferences = useRef(null);
    const SelectElementSistema = useRef(null);
    const InputNombre = useRef(null);
    const InputTelefono = useRef(null);
    const InputCorreo = useRef(null);

    const [typeCotizar,setTypeCotizar] = useState<string>('telefono');

    const [optionsSistemas,setOptionsSistemas] = useState<any[]>([]);
    const [stateOptionsSistemas,setStateOptionsSistemas] = useState<string>('loading');

    const [options2,setOptions2] = useState<any[]>([]);

    const [selectedSistema,setSelectedtSistema] = useState<any>(null);
    const [stateCotizacion, setStateCotizacion] = useState<string>('working');

    const stylesTypeCotizar ={
        active:{
            background:'#222274',
            color:'white',
        },
        desactive:{
            background:'#e6e6e6',
            color:'#6e6e6e',
        }
    }

    const stylesSelect ={
        control: (provided:any, state:any) => ({
            ...provided,
            minHeight: '60px',
            maxHeight: '100px',
            width: '100%',
            backgroundColor: '#e6e6e6',
            color: '#6e6e6e',
            fontWeight:"bold",
            
        }),
    
    }
    const stylesSelect2 ={
        control: (provided:any, state:any) => ({
            ...provided,
            minHeight:'60px',
            maxHeight: '500px',
            width: '100%',
            backgroundColor: '#e6e6e6',
            color: '#6e6e6e',
            fontWeight:"bold",
            
        }),
    
    }

    const handleSelectedSistema = (dataSystem:any,stateCotizacion:string):void =>{


        setSelectedtSistema(dataSystem.value);
        if(stateCotizacion === 'empty') SelectElementReferences.current !== null && (SelectElementReferences.current as any).clearValue();

        setOptions2([{value:'none',label:`Cargando referencias`}]);
        GetData([
            process.env.NEXT_PUBLIC_DOMAIN as string + `/api/referencias?system=${dataSystem.value.id}&limit=20&offset=0`,
        ]).then(res => {
        
            if(res[0].status === 200 && res[0].data.length > 0){
                const options:{value:any,label:any}[] =res[0].data
                .map((item:any)=>{
                    
                    return{
                        value: item, 
                        label: `REF ${item.referencia} - ${item.nombre}`
                    }
                });
                setOptions2(options);

            }else{
                setOptions2([{value:'none',label:`No hay referencias`}]);
            }
        
        }).catch(err => {
            console.error(err)
        
        })

    }

    const handleMakecotizacion = (e:React.FormEvent<HTMLFormElement>):void =>{

        e.preventDefault();
        setStateCotizacion('loading');
        const dataCotizacion = {
            sistema:selectedSistema.nombre,
            referencias: (SelectElementReferences.current as any).getValue().map((item:any)=>{
                (item.value.cantidad_paquetes === undefined || item.value.cantidad_paquetes === null) 
                && (item.value.cantidad_paquetes = "No informado");
                
                return item.value;
            }) ,
            cliente: (InputNombre.current as any).value,
            contacto: typeCotizar === 'telefono' ? '57'+(InputTelefono.current as any).value : (InputCorreo.current as any).value,
        }
        
        window.scrollTo(0, 0);
        MakeCotizacion([
            process.env.NEXT_PUBLIC_DOMAIN as string + '/api/notifications',
            process.env.NEXT_PUBLIC_DOMAIN as string + '/api/email'

        ],JSON.stringify(dataCotizacion),process.env.NEXT_PUBLIC_PASSWORD_NOTIFICATION as string)
        .then((res:any)=>{
            if(res[0].status === 200){
                setStateCotizacion('done');
            }
            console.log(res);
        }).catch((err:any)=>{
            console.log(err);
            setStateCotizacion('error');
        });
    }

    useEffect(()=>{
        

        GetData([
            process.env.NEXT_PUBLIC_DOMAIN as string + '/api/sistemas/all'

        ]).then((res:any)=>{
        
            if(res[0].status === 200){
                
                const options:{value:any,label:any}[] =res[0].data
                .map((item:any)=>{
                    
                    return{
                        value: item, 
                        label: 'SISTEMA '+item.nombre
                    }
                });

                setOptionsSistemas(options);

                if(SelectElementSistema.current !== null && selectorCotizacion.state !== 'empty'){
                    
                    let selectedOption = options.filter((item:any)=>item.value.nombre === selectorCotizacion.sistema);
                    (SelectElementSistema.current as any).setValue(selectedOption[0]);
                  
                }
            
            
            }else{
                setStateOptionsSistemas('error');
            }

        }).catch((err:any)=>{
            console.log(err);
        
        });


        const LinksDesktop = document.getElementsByClassName('option-nav-desktop') as HTMLCollectionOf<HTMLElement>;
        for(let i = 0; i < LinksDesktop.length; i++){

            LinksDesktop[i].style.color = '#8f8f8f';
            
        }

    
        if(selectorCotizacion.state === 'empty'){
            setOptions2([{value:'none',label:`Primero elige un sistema`}]);
        }else{

            if(SelectElementReferences.current !== null) 
            (SelectElementReferences.current as any).setValue(selectorCotizacion.referencias.map((item:any)=>{
                return{value:item,label:`REF: ${item.referencia} - ${item.nombre}`}
            }));   
        }

        
    },[typeCotizar]);

    return<>
        
        <section style={stateCotizacion !== "working" ? {display:"none"}:undefined } className=" mt-2 p-2 md:p-6 cotizar ml-[4vw]  w-[92vw]   bg-white rounded-[8px] shadow-[0px_0px_6px_rgba(0,0,0,0.2)]">
            <div className="font-extrabold w-[100%] h-[40px] flex items-center justify-center mb-1 text-[17px] md:text-[19px] text-[#6e6e6e]">
                Elije el un método de contacto
            </div>
            <div className="container-buttons w-[100%] h-[40px] md:h-[50px] flex items-center justify-around md:justify-center">
                
                <div style={typeCotizar === 'telefono' ? stylesTypeCotizar.active : stylesTypeCotizar.desactive } 
                    className="cursor-pointer md:ml-2 md:mr-2 rounded-[6px]  font-bold w-[48%] md:w-[300px] h-[100%] flex items-center justify-center"
                    onClick={()=>{setTypeCotizar('telefono')}}
                >
                   
                   Telefono
                </div>
                <div style={typeCotizar === 'correo' ? stylesTypeCotizar.active : stylesTypeCotizar.desactive } 
                    className="cursor-pointer md:ml-2 md:mr-2 rounded-[6px]  font-bold w-[48%] md:w-[300px] h-[100%] flex items-center justify-center"
                    onClick={()=>{setTypeCotizar('correo')}}
                >
                   Correo
                </div>
                
            </div>
            
            <form onSubmit={(e)=>handleMakecotizacion(e)} className="md:mt-6 mt-4 mb-4  w-[100%] md:w-[50%] md:ml-[25%] border-0 md:border-4 border-[#d9d9d9] p-2 md:p-4 rounded-[6px]">
                <div className="font-extrabold w-[100%] h-[40px] flex items-center justify-center mb-1 text-[17px] md:text-[19px] text-[#6e6e6e]">
                    Cotizar referencias
                </div>
                <div className="container-option-form w-[100%]">
                    <label className="w-[100%] text-[#222274] font-extrabold">Elige el sistema:</label>
                    <Select
                        required
                        ref = {SelectElementSistema}
                        id="referencias-sistema"
                        instanceId={"referencias-sistema"}
                        styles={stylesSelect}
                        placeholder="Selecciona el sistema"
                        name="sistema"
                        className="w-[100%] mt-2"
                        options={optionsSistemas}
                        onChange={(e)=>handleSelectedSistema(e,selectorCotizacion.state)}
                        onMenuClose={()=>{
                            (SelectElementSistema.current as any).onInputChange = (e:any) => {
                                dispatch(setState('empty'));
                                dispatch(setSistema(""));
                                dispatch(setReferencias([]));
                                SelectElementReferences.current !== null && (SelectElementReferences.current as any).clearValue();
                            };
                        }}
                        
                       

                    />
                </div>

                <div className="container-option-form w-[100%] mt-6">
                    <label className="w-[100%] text-[#222274] font-extrabold">Elige las referencias:</label>
      
                        <Select
                            required
                            ref={SelectElementReferences}
                            id="referencias"
                            instanceId={"referencias"}
                            styles={stylesSelect2}
                            placeholder="Selecciona las referencias"
                            isMulti
                            name="referencias"
                            className="w-[100%] mt-2"
                            options={ options2 }
                          
                        
                        />


                </div>

                <div className="container-option-form w-[100%] mt-6">
                    <label className="w-[100%] text-[#222274] font-extrabold">Nombre:</label>
                    <input  
                        required 
                        name="nombre" 
                        placeholder=" Ej: Juan Perez" 
                        type="text" 
                        className="w-[100%] h-[60px] rounded-[6px] bg-[#e6e6e6] mt-1"
                        title="El nombre debe tener solo letras"
                        ref={InputNombre}

                    />
                </div>

                {
                    typeCotizar === 'telefono' 
                    ?
                    <div className="container-option-form w-[100%] mt-6 mb-8">
                        <label className="w-[100%] text-[#222274] font-extrabold">Telefono de contacto:</label>
                        <input 
                            pattern="[0-9]{10}" 
                            required 
                            name="telefono" 
                            placeholder=" Ej: 310 123 4567" 
                            type="tel" 
                            className="w-[100%] h-[60px] rounded-[6px] bg-[#e6e6e6] mt-1" 
                            title="El telefono debe tener 10 digitos"
                            ref={InputTelefono}
                        />
                    </div>
                    :
                    <div className="container-option-form w-[100%] mt-6 mb-8">
                        <label className="w-[100%] text-[#222274] font-extrabold">Correo electronico:</label>
                        <input 
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" 
                            required 
                            name="correo" 
                            type="text" 
                            placeholder=" Ej:  juan@perez.com" 
                            className="w-[100%] h-[60px] rounded-[6px] bg-[#e6e6e6] mt-1" 
                            title="El correo debe tener un formato valido"
                            ref={InputCorreo}
                        />
                    </div>

                }
                <Btn3
                    text="ENVIAR COTIZACIÓN"
                    linear={{
                        color1:'#000032',
                        color2:'#222274',
                        color3:'#dcad01'    
                    }}
                    width="100%"                       
                    height="70px"
                    click={()=>{
                        console.log("click")
                    }}
                    
                />
              

            </form>

        </section>
        <section style={stateCotizacion !== "done" ? {display:"none"}:undefined } className="relative p-2 md:p-6 flex flex-wrap items-center justify-center  bg-white w-[90vw]  md:w-[80vw] ml-[5vw] md:ml-[10vw] h-[500px] rounded-[6px]  shadow-[0px_0px_6px_rgba(0,0,0,0.2)]">
                    
                    <Image
                        src="https://cms.cominsur.co/cominsur/assets/n1b2hu9lnn4swwcc"
                        alt="cotizar"
                        width={200}
                        height={200}
                        className="mt-[-60px]"
                        />
                    <h1 className="mt-[-150px] text-[18px] font-extrabold text-[#6e6e6e] w-[100%] flex items-center justify-center">Cotización Enviada, en breve recibiras toda la información </h1>
                    <div className="absolute w-[90%] md:w-[50%] top-[80%]">                 
                        <Btn3
                            text="VOLVER"
                            linear={{
                                color1:'#000032',
                                color2:'#222274',
                                color3:'#dcad01'    
                            }}
                            width="100%"                       
                            height="70px"
                            click={()=>{
                                dispatch(setState('empty'));
                                dispatch(setSistema(""));
                                dispatch(setReferencias([]));
                                setStateCotizacion('working');
                               router.push('/cotizar');
                            }}
                        />

                    </div>
   
        </section>
        <section style={stateCotizacion !== "loading" ? {display:"none"}:undefined } className="relative p-2 md:p-6 flex flex-wrap items-center justify-center  bg-white w-[90vw]  md:w-[80vw] ml-[5vw] md:ml-[10vw] h-[500px] rounded-[6px]  shadow-[0px_0px_6px_rgba(0,0,0,0.2)]">
            <div className="w-[100%] h-[100%] flex items-center justify-center">
                <div className="w-[200px] h-[200px] rounded-full animate-spin border-8 border-solid border-[#4a0083] border-t-transparent shadow-md">
                </div>
            </div>
        </section>
        <section style={stateCotizacion !== "error" ? {display:"none"}:undefined } className="relative p-2 md:p-6 flex flex-wrap items-center justify-center  bg-white w-[90vw]  md:w-[80vw] ml-[5vw] md:ml-[10vw] h-[500px] rounded-[6px]  shadow-[0px_0px_6px_rgba(0,0,0,0.2)]">
                    
                    <Image
                        src="https://cms.cominsur.co/cominsur/assets/dbog06vm90ggs4c0"
                        alt="cotizar"
                        width={200}
                        height={200}
                        className="mt-[-60px]"
                        />
                    <h1 className="mt-[-150px] text-[18px] font-extrabold text-[#6e6e6e] w-[100%] flex items-center justify-center">Ups no pudimos procesar la cotización intentalo más tarde</h1>
                    <div className="absolute w-[90%] md:w-[50%] top-[80%]">                 
                        <Btn3
                            text="VOLVER"
                            linear={{
                                color1:'#000032',
                                color2:'#222274',
                                color3:'#dcad01'    
                            }}
                            width="100%"                       
                            height="70px"
                            click={()=>{
                                dispatch(setState('empty'));
                                dispatch(setSistema(""));
                                dispatch(setReferencias([]));
                                setStateCotizacion('working');
                               router.push('/cotizar');
                            }}
                        />

                    </div>
   
        </section>
    </>
}

export default SectionCotizar;