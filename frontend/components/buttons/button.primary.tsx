"use client";

import { useRouter } from "next/navigation";
import { JSX } from "react";

type ButtonPrimaryProps = {
    onClick?: () => void;
    children: JSX.Element | string;
    disabled?: boolean;
    backgroundColor?: string;
    color?: string;
    width?: string | number;
    height?: string | number;
    border?: string;
    redirectTo?: string;

};

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({ onClick, children, disabled, backgroundColor, color, width, height, border, redirectTo }) => {

    const router = useRouter();

    const btnPrimaryStyle ={
        backgroundColor:  backgroundColor || '#4A0083',
        color: color || '#ffffff',
        width:  width || '100%',
        height:  height || '50px',
        border: border || '1px solid #4A0083',
        
    }

    const btnPrimaryMethods = {
        onclick: redirectTo ? () => router.push(redirectTo) : onClick,
    }

    return<>
        <button style={btnPrimaryStyle} className="min-w-[250px] min-h-[40px] rounded-sm cursor-pointer m-1 shadow-[0_2px_10px_rgba(0,0,0,0.3)]"  onClick={btnPrimaryMethods.onclick} disabled={disabled}>
            { children}
        </button>

    </>

};

export default ButtonPrimary;
