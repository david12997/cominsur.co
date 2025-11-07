"use client";

import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
import { useEffect, useRef, useState } from "react";


type MapInstance = google.maps.Map | null;

const MapContact: React.FC = () => {

    const [map, setMap] = useState<MapInstance>(null);
    const containerMap = useRef<HTMLDivElement | null>(null);
    

    useEffect(() => {
        let mapInstance: google.maps.Map | null = null;

        const loadMap = async () => {
            try {
                setOptions({
                    key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
                    v: "weekly",
                    libraries: ["places"],
                });

                try {
                    const { Map } = (await importLibrary('maps')) as google.maps.MapsLibrary;

                    if (containerMap.current) {

                        mapInstance = new Map(containerMap.current, {
                            center: { lat: 4.705423793558284, lng: -74.04058494455559 },
                            zoom: 12,
                            
                        });
                        setMap(mapInstance);

                        new google.maps.Marker({
                            map: mapInstance,
                            position: { lat: 4.659229243151415, lng: -74.06698963463579 },
                            title: 'Cominsur',
                            label: {
                                text: 'Sede 7 de Agosto',
                                className: 'text-[#222274] bg-white p-2 rounded-[50px] font-bold text-[18px] mt-[73px] shadow-[0px_0px_6px_rgba(0,0,0,0.2)]',
                            }
                            
                        });

                        new google.maps.Marker({
                            position: { lat:4.7461350711128585, lng: -74.04027398465932 },
                            map: mapInstance,
                            title: 'Cominsur',
                            label: {
                                text: 'Sede toberin',
                                className: 'text-[#222274] bg-white p-2 rounded-[50px] font-bold text-[18px] mt-[73px] shadow-[0px_0px_6px_rgba(0,0,0,0.2)]',
                            }
                            
                        });
                        
                    }


                } catch (importError) {
                    console.error('Error importing Google Maps library:', importError);
                    return;
                }
            } catch (error) {
                console.error('Error loading Google Maps:', error);
            }
        };

        loadMap();

        return () => {
            if (mapInstance) {
                // remove listeners attached to the map instance
                google.maps.event.clearInstanceListeners(mapInstance);
            }
            setMap(null);
        };
    }, []);

    return <>
        <div  className="rounded-md" ref={containerMap} id="map" style={{ height: '100%', width: '100%' }}></div>
    </>;
};

export default MapContact;