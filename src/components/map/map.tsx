'use client'

import { Loader } from "@googlemaps/js-api-loader"
import { useEffect } from "react"

const Map = ():JSX.Element => {

    const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        version: "weekly",
        libraries: ["places"]
    });

    const mapOptions = {
        center: { lat: 4.659229243151415, lng: -74.06698963463579 },
        zoom: 16,
    }

    useEffect(()=>{

        loader
        .importLibrary('maps')
        .then(({Map}) => {
          const map = new Map(document.getElementById("map") as HTMLElement, mapOptions);

            const marker = new google.maps.Marker({
                position: { lat: 4.659229243151415, lng: -74.06698963463579 },
                map: map,
                title: 'Cominsur',
                label: {
                    text: 'Cominsur Mayorista de Aluminio',
                    className: 'text-[#222274] bg-white p-2 rounded-[50px] font-bold text-[18px] mt-[73px] shadow-[0px_0px_6px_rgba(0,0,0,0.2)]',
                }
                
            });

        })
        .catch((e) => {
          // do something
        });

    },[])

    return<>
        <div className=" rounded-[6px] w-[100%] h-[100%] shadow-sm shadow-[#e6e6e6]" id="map"></div>
    </>
}

export default Map