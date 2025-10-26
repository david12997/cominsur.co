import { JSX } from "react";

type ButtonPrimaryProps = {
    onClick: () => void;
    children: JSX.Element | string;
    disabled?: boolean;
    backgroundColor?: string;
    color?: string;

};

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  onClick,
  children,
  disabled,
  backgroundColor,
  color


}) => {

    const btPrimaryStyle ={
        backgroundColor:  backgroundColor || '#007bff',
        color: color || '#ffffff',
    }

  return<>
    
    <button style={btPrimaryStyle} className="w-[300px] h-[50px] rounded-sm"  onClick={onClick} disabled={disabled}>
      {children}
    </button>

  </>

};

export default ButtonPrimary;
