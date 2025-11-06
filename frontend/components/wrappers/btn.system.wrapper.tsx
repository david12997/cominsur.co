"use client";

import BtnSecondary from "../buttons/btn.secondary";

type BtnSystemWrapperProps = {
    text?: string;
    width?: number | string;
    height?: number | string;
    fontSize?: number | string;
    color?: string;
    backgroundColor?: string;
    border?: string;
    borderRadius?: string;
    data?: {
        id: number | string;
        name:string;
    };
};

const BtnSystemWrapper: React.FC<BtnSystemWrapperProps> = ({ text, data }) => {
    
    const handleClick = () => {
        
        alert("Button clicked! Redirecting...");
    };
    return <BtnSecondary text={text ?? "VER REFERENCIAS"} onClick={handleClick} />;
};

export default BtnSystemWrapper  ;
