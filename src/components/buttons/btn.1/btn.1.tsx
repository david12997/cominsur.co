'use client'

import { useRouter } from "next/navigation";

const Btn1 = (props:{bg:string,color:string,text:string,link?:string}): JSX.Element => {

    const router = useRouter();

    return<>
        <button onClick={()=>props.link !== undefined && router.push(props.link)} style={{background:props.bg,color:props.color}} className="shadow-[3px_3px_6px_rgba(0,0,0,0.3)] font-bold text-[18px] rounded-[5px] w-[100%] h-[54px] ">
            {props.text}
        </button>
    </>
}

export default Btn1