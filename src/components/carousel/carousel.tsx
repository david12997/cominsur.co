'use client'

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// @ts-ignore
import { Carousel } from 'react-responsive-carousel/lib/js';
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const CarouselHome = (props:{bannersDesktop:string[],bannersMobile:string[]}) => {

    const router = useRouter();

    const handleClickCarousel = (index:number):void => {

        index !== 0 && router.push('/catalogo');
    }

    useEffect(()=>{

        const LinksDesktop = document.getElementsByClassName('option-nav-desktop') as HTMLCollectionOf<HTMLElement>;

        for(let i = 0; i < LinksDesktop.length; i++){

            if(i === 0){
                    
                LinksDesktop[i].style.color = '#222274';
            }else{
                LinksDesktop[i].style.color = '#8f8f8f';
            }
        }

    },[])

    return<>
    
        <div className="container-desktop mt-6 hidden md:block">
            <Carousel autoPlay={true} showThumbs={false} emulateTouch={true} swipeable={true} infiniteLoop={true}>
                {
                    props.bannersDesktop.map((banner:string,index:number)=>{
                        return<div key={index} onClick={()=>handleClickCarousel(index)}>
                            <img src={banner} alt="Cominsur Banner cominsur mayotista de perfileria en aluminio" />
                        </div>
                    })
                }
            </Carousel>
        </div>

        <div className="container-desktop mt-6 block md:hidden">
            <Carousel infiniteLoop={true} autoPlay={true} showThumbs={false} emulateTouch={true} swipeable={false}>
                {
                    props.bannersMobile.map((banner:string,index:number)=>{
                        return<div key={index} onClick={()=>handleClickCarousel(index)}>
                            <img src={banner} alt="Cominsur Banner cominsur mayotista de perfileria en aluminio"/>
                        </div>
                    })
                }
            </Carousel>
        </div>
    
    </>
}

export default CarouselHome