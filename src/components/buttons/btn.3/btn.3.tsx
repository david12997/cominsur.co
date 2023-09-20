'use client'

import { Btn3Types } from "./btn.3.type"

const Btn3 = (props:Btn3Types):JSX.Element => {

    return <>
        <button style={{width:props.width,height:props.height, background:`linear-gradient(90deg,${props.linear.color1},${props.linear.color2},${props.linear.color3})`}} 

            className="rounded-[6px]  btn-cotizacion w-[230px] h-[40px] flex items-center justify-center"
        >
            <p className="font-extrabold text-[17px] text-white">
               {props.text}
            </p>
        </button>
    </>
}

export default Btn3