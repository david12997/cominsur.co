"use client";

import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
import { useEffect, useRef, useState } from "react";

type useGoogleMapProps = {
    
    center?: { lat: number; lng: number };
    zoom?: number;
    markers?: Array<{
        position: { lat: number; lng: number };
        title?: string;
    }>;
};

const useGoogleMap = () => {
 
    const htmlRef = useRef<HTMLDivElement | null>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);

    return{
        htmlRef,
        map,

    }
};

export default useGoogleMap;