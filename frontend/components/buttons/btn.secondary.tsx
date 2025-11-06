"use client";

import { useRouter } from "next/navigation";

type BtnSecondaryProps = {
    onClick?: () => void;
    text:string;
    width?: string | number;
    height?: string | number;
    fontSize?: string | number;
    redirectTo?: string;
};

const BtnSecondary:React.FC<BtnSecondaryProps>  = ({ text, width, height, fontSize, onClick, redirectTo }) => {

  const router = useRouter();

  const buttonStyles = {
      width: width || '100%',
      height: height || '50px',
      fontSize: fontSize || '18px',
  };

  const buttonMethods = {
      onClick: redirectTo ? () => router.push(redirectTo) : onClick,
  };

  return <button onClick={buttonMethods.onClick} style={buttonStyles} className="cominsur-btn-secondary min-w-[280px] min-h-[40px] rounded-sm cursor-pointer m-1 ">
    {text}
  </button>;
}

export default BtnSecondary;
