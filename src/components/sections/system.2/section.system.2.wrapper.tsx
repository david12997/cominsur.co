"use client";

import ReduxProvider from "@/store/redux.provider";
import SectionSystem2 from "./section.system.2";


export default function SectionSystem2oWrapper(props:{id:number,nombre:string,imgSystem:string,text1:string,text2:string}) {
  return (
    <ReduxProvider>
      <SectionSystem2
        id={props.id}
        nombre={props.nombre}
        imgSystem={props.imgSystem}
        text1={props.text1}
        text2={props.text2}
      />
    </ReduxProvider>
  );
}