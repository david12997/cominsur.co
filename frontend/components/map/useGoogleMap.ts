"use client";

import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
import { useEffect, useRef, useState } from "react";

type useGoogleMapProps = {
    htmlRef: React.RefObject<HTMLDivElement>;
    center?: { lat: number; lng: number };
    zoom?: number;
    markers?: Array<{
        position: { lat: number; lng: number };
        title?: string;
    }>;
};

const useGoogleMap = ({htmlRef, center, zoom, markers}: useGoogleMapProps) => {
 
};

export default useGoogleMap;