'use client'

import React, { useEffect } from "react";
import Select from "react-select";
import {GetData} from "../../../services/get.data";
import { useState } from "react";
import Btn3 from "@/components/buttons/btn.3/btn.3";


const SectionCotizar = ():JSX.Element => {

    const [typeCotizar,setTypeCotizar] = useState<string>('telefono');

    const [optionsReferencias,setOptionsReferencias] = useState<any[]>([]);
    const [stateOptionsReferencias,setStateOptionsReferencias] = useState<string>('loading');

    const [options2,setOptions2] = useState<any[]>([]);

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
            minHeight: '70px',
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
            height:'60px',
            width: '100%',
            backgroundColor: '#e6e6e6',
            color: '#6e6e6e',
            fontWeight:"bold",
            
        }),
    
    }

   

    useEffect(()=>{
        const options2:{value:any,label:any}[] = [];
        for(let i=0;i<50;i++){
            options2.push({value:i+1,label:`${i+1} paquete${i !== 0 ? 's' : ''}`});
        }
        options2.push({value:'+50',label:`Mas de 50 paquetes`});
        setOptions2(options2);

        GetData([
            process.env.NEXT_PUBLIC_DOMAIN as string + '/api/referencias/all?limit=20&offset=0',
            process.env.NEXT_PUBLIC_DOMAIN as string + '/api/referencias/all?limit=20&offset=20',
            process.env.NEXT_PUBLIC_DOMAIN as string + '/api/referencias/all?limit=20&offset=40'

        ]).then((res:any)=>{
        
            if(res[0].status === 200 && res[1].status === 200 && res[2].status === 200){
                
                const options:{value:any,label:any}[] =res[0].data.concat(res[1].data,res[2].data)
                .map((item:any)=>{
                    
                    return{
                        value: {id:item.id, nombre:item.nombre, referencia:item.referencia, sistema_nombre:item.sistema_nombre}, 
                        label: 'Sistema '+item.sistema_nombre+' - Ref '+item.referencia
                    }
                });

                setOptionsReferencias(options);
            
            }else{
                setStateOptionsReferencias('error');
            }

        }).catch((err:any)=>{
            console.log(err);
        
        });

        const LinksDesktop = document.getElementsByClassName('option-nav-desktop') as HTMLCollectionOf<HTMLElement>;

        for(let i = 0; i < LinksDesktop.length; i++){

            LinksDesktop[i].style.color = '#8f8f8f';
            
        }

        
    },[typeCotizar]);

    return<>
        
        <section className="mt-2 p-2 md:p-6 cotizar ml-[4vw]  w-[92vw] h-[790px]  bg-white rounded-[8px] shadow-[0px_0px_6px_rgba(0,0,0,0.2)]">
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
            
            <form onSubmit={(e)=>e.preventDefault()} className="md:mt-6 mt-4  w-[100%] md:w-[50%] md:ml-[25%] h-[84%] border-4 border-[#d9d9d9] p-2 md:p-4 rounded-[6px]">
                <div className="font-extrabold w-[100%] h-[40px] flex items-center justify-center mb-1 text-[17px] md:text-[19px] text-[#6e6e6e]">
                    Cotizar referencias
                </div>
                <div className="container-option-form w-[100%]">
                    <label className="w-[100%] text-[#222274] font-extrabold">Elige las referencias:</label>
                    <Select
                        id="referencias-sistema"
                        instanceId={"referencias-sistema"}
                        styles={stylesSelect}
                        placeholder="Selecciona las referencias"
                        name="referencias"
                        isMulti
                        className="w-[100%] mt-2"
                        options={optionsReferencias}
                    />
                </div>

                <div className="container-option-form w-[100%] mt-6">
                    <label className="w-[100%] text-[#222274] font-extrabold">Paquetes por referencia:</label>
                    <Select
                        id="paquetes-ref"
                        instanceId={"paquetes-ref"}
                        styles={stylesSelect2}
                        placeholder="Cantidad de paquetes"
                        name="paquetes-ref"
                        className="w-[100%] mt-2"
                        options={options2}
                    />
                </div>

                <div className="container-option-form w-[100%] mt-6">
                    <label className="w-[100%] text-[#222274] font-extrabold">Nombre:</label>
                    <input placeholder=" Ej: Juan Perez" type="text" className="w-[100%] h-[60px] rounded-[6px] bg-[#e6e6e6] mt-1" />
                </div>

                {
                    typeCotizar === 'telefono' 
                    ?
                    <div className="container-option-form w-[100%] mt-6 mb-8">
                        <label className="w-[100%] text-[#222274] font-extrabold">Telefono de contacto:</label>
                        <input placeholder=" Ej: 310 123 4567" type="number" className="w-[100%] h-[60px] rounded-[6px] bg-[#e6e6e6] mt-1" />
                    </div>
                    :
                    <div className="container-option-form w-[100%] mt-6 mb-8">
                        <label className="w-[100%] text-[#222274] font-extrabold">Correo electronico:</label>
                        <input type="text" placeholder=" Ej:  juan@perez.com" className="w-[100%] h-[60px] rounded-[6px] bg-[#e6e6e6] mt-1" />
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
                />
              

            </form>

        </section>
    </>
}

export default SectionCotizar;