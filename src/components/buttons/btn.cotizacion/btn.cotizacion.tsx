import Link from "next/link"
import { BtnCotizarType } from "./btn.cotizar.type"

const BtnCotizacion = (props:BtnCotizarType):JSX.Element => {

    return <>
        <Link style={{width:props.width,height:props.height, background:`linear-gradient(90deg,${props.linear.color1},${props.linear.color2},${props.linear.color3})`}} 
            href={props.link} 
            className="rounded-[6px]  btn-cotizacion w-[230px] h-[40px] flex items-center justify-center"
        >
            <p className="font-extrabold text-[17px] text-white">
               {props.text}
            </p>
        </Link>
    </>
}

export default BtnCotizacion