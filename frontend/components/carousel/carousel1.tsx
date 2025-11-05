"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


type Carousel1Props = {
    bannersDesktop :string[];
    bannersMobile :string[];
};

const Carousel1: React.FC<Carousel1Props> = ({ bannersDesktop, bannersMobile }) => {

    const router = useRouter();

    return<>

        <div className="hidden md:block mt-[90px]  ">
            <Carousel 
                autoPlay={true} showThumbs={false} emulateTouch={true} swipeable={true} infiniteLoop={true}
            >
                {bannersDesktop.map((banner, index) => (
                    <div key={index} onClick={() => router.push('/cotizar')} >
                        <img   src={banner}  alt={`Cominsur importadores mayoristas de perfileria de aluminio`} />
                    </div>
                ))}
            </Carousel>
        </div>

        <div className="block md:hidden mt-[90px]">
            <Carousel 
                autoPlay={true} showThumbs={false} emulateTouch={true} swipeable={true} infiniteLoop={true}
            >
                {bannersMobile.map((banner, index) => (
                    <div key={index} onClick={() => router.push('/cotizar')}>
                        <Image width={1920} height={600} src={banner} alt={`Cominsur importadores mayoristas de perfileria de aluminio`} />
                    </div>
                ))}
            </Carousel>
        </div>

    </>

};

export default Carousel1;