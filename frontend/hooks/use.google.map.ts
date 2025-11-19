"use client";

import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
import { useEffect, useRef, useState } from "react";

export type MarkerDef = {
    position: { lat: number; lng: number };
    title?: string;
    label?: string;
};

type useGoogleMapProps = {
    center?: { lat: number; lng: number };
    zoom?: number;
    markers?: MarkerDef[];
};

const useGoogleMap = (opts?: useGoogleMapProps) => {
    const htmlRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<google.maps.Map | null>(null);
    const [ready, setReady] = useState(false);

    const LoadMap = async (options?: useGoogleMapProps) => {
        try {
            setOptions({
                key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
                v: "weekly",
                libraries: ["places"],
            });

            const { Map } = (await importLibrary("maps")) as google.maps.MapsLibrary;

            if (htmlRef.current) {
                const center = options?.center ?? opts?.center ?? { lat: 4.705423793558284, lng: -74.04058494455559 };
                const zoom = options?.zoom ?? opts?.zoom ?? 12;

                const mapInstance: google.maps.Map = new Map(htmlRef.current, {
                    center,
                    zoom,
                });

                // save to ref for synchronous access when adding markers
                mapRef.current = mapInstance;
                setReady(true);

                // if markers were provided via options or initial opts, add them now
                const markers = options?.markers ?? opts?.markers;
                if (markers && markers.length) {
                    markers.forEach((m) => AddMarker(m.position, m.title, m.label));
                }
            }
        } catch (error) {
            console.error("Error loading Google Maps:", error);
        }
    };

    const AddMarker = (position: { lat: number; lng: number }, title?: string, label?: string) => {
        const map = mapRef.current;
        if (!map) {
            // not ready yet — log for debugging; caller can wait for `ready` or call AddMarker after LoadMap
            console.warn("AddMarker called before map was ready");
            return null;
        }

        return new google.maps.Marker({
            map,
            position: position || { lat: 4.659229243151415, lng: -74.06698963463579 },
            title: title || "Cominsur",
            label: {
                text: label || "",
                className: "text-[#222274] bg-white p-2 rounded-[50px] font-bold text-[18px] mt-[73px] shadow-[0px_0px_6px_rgba(0,0,0,0.2)]",
            }
               
        });
    };

    useEffect(() => {
        // If the hook was called with initial options, initialize automatically
        LoadMap();

        setTimeout(() => {
            AddMarker({ lat: 4.659229243151415, lng: -74.06698963463579 }, "Sede 7 de Agosto", "Sede 7 de Agosto");
            AddMarker({ lat: 4.7461350711128585, lng: -74.04027398465932 }, "Sede Tobarín", "Sede Tobarín");
        }, 1000);
        // cleanup
        return () => {
            if (mapRef.current) {
                google.maps.event.clearInstanceListeners(mapRef.current);
                mapRef.current = null;
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        htmlRef,
        loadMap: LoadMap,
        addMarker: AddMarker,
        isReady: ready,
    };
};

export default useGoogleMap;