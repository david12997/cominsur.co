"use client";

import useGoogleMap from "@/frontend/hooks/use.google.map";



const MapContact: React.FC = () => {


    const { htmlRef } = useGoogleMap();

    return <>
        <div  className="rounded-md" ref={htmlRef} id="map" style={{ height: '100%', width: '100%' }}></div>
    </>;
};

export default MapContact;