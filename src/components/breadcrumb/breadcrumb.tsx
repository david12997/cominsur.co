'use client'

import { usePathname, useRouter } from 'next/navigation'

const BreadCrumb = ():JSX.Element=>{

    const pathname = usePathname();
   const router = useRouter();

    return<>
        <section className=" flex breadcrumb w-[92vw] ml-[4vw] h-[25px] mt-1 mb-1 p-1 font-medium text-[#6e6e6e]">
            {
                pathname.split('/').map((item:string, index:number)=>{

                    return<span className='cursor-pointer' key={index} onClick={()=>router.push(`/${item}`)}>
                        {
                            item === '' ? 'Inicio > ' : ' '+item.charAt(0).toUpperCase() + item.slice(1) + ' > '
                        }   
                        
                    </span>
                })
            }
        </section>
    
    </>

}

export default BreadCrumb;