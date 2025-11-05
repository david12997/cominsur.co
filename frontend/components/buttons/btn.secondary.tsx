"use client";

type BtnSecondaryProps = {
    onClick?: () => void;
    text:string;
    width?: string | number;
    height?: string | number;
    fontSize?: string | number;
};

const BtnSecondary:React.FC<BtnSecondaryProps>  = ({ text, width, height, fontSize, onClick }) => {

    const buttonStyles = {
        width: width || '100%',
        height: height || '50px',
        fontSize: fontSize || '18px',
    };

  return <button onClick={onClick} style={buttonStyles} className="cominsur-btn-secondary min-w-[280px] min-h-[40px] rounded-sm cursor-pointer m-1 ">
    {text}
  </button>;
}

export default BtnSecondary;
