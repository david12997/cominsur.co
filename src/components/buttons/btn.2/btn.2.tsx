'use client'

import { useRouter } from "next/navigation";

const Btn2 = () :JSX.Element =>{

    const router = useRouter();

    return<>
        <button onClick={()=>router.push('/cotizar')} className="text-[#4a0083] hover:text-white btn-2 w-[100%] h-[50px] rounded-[6px] bg-white hover:bg-[#4a0083] border-[3px] border-[#4a0083]  flex items-center justify-center">
            <p className="text-[18px] font-extrabold ">SOLICITAR COTIZACIÓN</p>
        </button>

    </>
}

export default Btn2