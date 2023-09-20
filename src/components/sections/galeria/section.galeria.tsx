'use client'

import { Gallery } from "next-gallery"
import { useEffect } from "react"


const SectionGaleria = (props:{img:string[],video:string[]}):JSX.Element => {

    const images:any[] = props.img.map((img:string,index:number)=>{
        if(index === 2) return({src:img,aspect_ratio:16/9})
        if(index === 4) return({src:img,aspect_ratio:16/9})
        if(index === 5) return({src:img,aspect_ratio:9/10})
        if(index === 9) return({src:img,aspect_ratio:16/11})
        return({src:img,aspect_ratio:4/3})
    })
    const widths = [ 500, 1000, 1600,1000,1000,1000, ]
    const ratios = [ 2.2, 8, 6, 8, 6, 8, 9 ]



    useEffect(()=>{

        const LinksDesktop = document.getElementsByClassName('option-nav-desktop') as HTMLCollectionOf<HTMLElement>;

        for(let i = 0; i < LinksDesktop.length; i++){

            if(i === 2){
                    
                LinksDesktop[i].style.color = '#222274';
            }else{
                LinksDesktop[i].style.color = '#8f8f8f';
            }
        }

    },[])


    return<>
        <div className="title-section font-bold  text-[22px]  md:text-[24px] w-[90vw] ml-[5vw]  mt-[45px]  md:mt-[60px] text-[#6a6a6a]">
           GALERIA COMINSUR
        </div>
        <section className="galeria w-[92vw] ml-[4vw]">
            <Gallery {...{images, widths, ratios}} />
        </section>

        <section className="galeria-videos w-[92vw] ml-[4vw] flex flex-wrap justify-around">
            {
                props.video.map((video:string,index:number)=>{

                    return<video key={index} src={video} className="w-[100%] md:w-[300px] m-1" controls>
                        </video>
                })
            }
        </section>
    </>
}

export default SectionGaleria