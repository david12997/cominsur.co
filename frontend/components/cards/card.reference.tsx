"use client";

import Image from "next/image";
import React from "react";
import BtnSecondary from "../buttons/btn.secondary";

type CardReferenceProps = {

    name?: string;
    description?: string;
    piecePerPackage?: number;
    price?: number;
    color?: string;
    reference?: string;
    systemName?: string;
    systemImgUrl?: string;
    imgUrl3d?: string;
    imgUrlPlane?: string;
};

const CardReference: React.FC<CardReferenceProps> = ({ name,reference, color, piecePerPackage, imgUrl3d, imgUrlPlane }) => {

    const [imgSelected, setImgSelected] = React.useState<string | undefined>( imgUrl3d || undefined );
    const [typeImgSelected, setTypeImgSelected] = React.useState<"3d" | "plane">("3d");

    const handleImgSelected = (url: string | undefined, type: "3d" | "plane" ) => {
        setImgSelected(url);
        setTypeImgSelected(type);
    }

    const dataCardReference = {
        name: name || "Pisavidrio 3831 - 177",
        reference: reference || "177",
        color: color || "Mate y Negro",
        piecePerPackage: piecePerPackage || 10,
        images:[
            {
                type: "3d",
                url: imgUrl3d || "https://cms.cominsur.com.co/cominsur/assets/a1q91wg7v280soso"
            },
            {
                type: "plane",
                url: imgUrlPlane || "https://cms.cominsur.com.co/cominsur/assets/ovburjz6b0g4occc"
            }
        ]
    };


    return <>
        <div className="card-reference min-w-[290px] max-w-[309px] h-[490px] bg-white rounded-sm shadow-md m-2 flex flex-wrap justify-center ">

            <div className="container-image w-[98%] h-[50%] relative ">

                <Image
                    src={imgSelected || "https://cms.cominsur.com.co/cominsur/assets/a1q91wg7v280soso"}
                    alt={"System Image"}
                    fill
                    style={{ objectFit: 'contain' }}
                />

                <div className="container-thumbls absolute flex justify-center gap-4 bottom-[-10px] left-0 w-full h-[50px] bg-white ">
                    {
                        dataCardReference.images.map( (img, index) => (
                            <div key={index} onClick={()=>handleImgSelected(img.url, img.type as "3d" | "plane")} className={`thumbl-${img.type} w-[45px] h-[45px] relative bg-website cursor-pointer`} >
                                <Image
                                    src={img.url}
                                    alt={"System Image"}
                                    fill
                                    style={{ objectFit: 'contain', border: typeImgSelected === img.type ? '4px solid #4A0083' : '4px solid #cececeff',borderRadius: '4px' }}
                                />
                            </div>
                        ) )
                    }
                </div>

            </div>

            <div className="container-info w-[98%] h-[30%] relative  p-2">

                <div className="name-reference color-quaternary">
                    <h2 className="text-[18px] font-bold  mt-1 mb-4">{dataCardReference.name}</h2>
                </div>

                <div className="reference gray-text">
                    <h3 className="text-[16px] font-semibold  ">Referencia: {dataCardReference.reference}</h3>
                </div>
                <div className="color-reference gray-text">
                    <h3 className="text-[16px] font-semibold  ">Color: {dataCardReference.color}</h3>
                </div>
                <div className="piecesxpackage gray-text">
                    <h3 className="text-[16px] font-semibold  ">Piezas por paquete: {dataCardReference.piecePerPackage}</h3>
                </div>

                


            </div>

            <div className="container-btn w-[96%] h-[15%] relative  flex justify-center items-center">
                <BtnSecondary text="SOLICITAR COTIZACION" height="60px" />
            </div>

        </div>
    </>

};

export default CardReference;