"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


type Carousel1Props = {
    bannersDesktop ?:string[];
    bannersMobile ?:string[];
};

const Carousel1: React.FC<Carousel1Props> = ({ bannersDesktop, bannersMobile }) => {

    const router = useRouter();
    
    const dataCarousel = {
        bannersDesktop: bannersDesktop ||  [
        "https://cms.cominsur.com.co/cominsur/assets/6odmcysz8n8koks4",
        "https://cms.cominsur.com.co/cominsur/assets/31rcbmwgh1ogo8og",
        "https://cms.cominsur.com.co/cominsur/assets/39km07yu76w4ss84",
        "https://cms.cominsur.com.co/cominsur/assets/tmtuoowh368c8k0c"
        ],
        bannersMobile: bannersMobile || [
        "https://cms.cominsur.com.co/cominsur/assets/9znk34tzs9kcwo48",
        "https://cms.cominsur.com.co/cominsur/assets/ht7u2q0eh7kgw484",
        "https://cms.cominsur.com.co/cominsur/assets/46jp0rom5l0k844s",
        "https://cms.cominsur.com.co/cominsur/assets/mdc5j25ifvkk8c0s"
        ],
    };

    return<>

        <div className="hidden md:block mt-[10px]  ">
            <Carousel 
                autoPlay={true} showThumbs={false} emulateTouch={true} swipeable={true} infiniteLoop={true}
            >
                {dataCarousel.bannersDesktop.map((banner, index) => (
                    <div key={index} onClick={() => router.push('/cotizar')} >
                        <img   src={banner}  alt={`Cominsur importadores mayoristas de perfileria de aluminio`} />
                    </div>
                ))}
            </Carousel>
        </div>

        <div className="block md:hidden mt-[10px]">
            <Carousel 
                autoPlay={true} showThumbs={false} emulateTouch={true} swipeable={true} infiniteLoop={true}
            >
                {dataCarousel.bannersMobile.map((banner, index) => (
                    <div key={index} onClick={() => router.push('/cotizar')}>
                        <Image width={1920} height={600} src={banner} alt={`Cominsur importadores mayoristas de perfileria de aluminio`} />
                    </div>
                ))}
            </Carousel>
        </div>

    </>

};

export default Carousel1;