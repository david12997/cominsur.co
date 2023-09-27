'use client'

import { useRef, useState } from "react"

export const System3831 = (props: { width: string; height: string }): JSX.Element => {
  
    const [state173, setState173] = useState(false);

    const ref173 = useRef(null);
  
    const handleMouseEnter = (ref: JSX.IntrinsicElements["path"],stateRef:boolean,setStateRef:any) => {
      if (ref !== undefined && ref.style !== undefined) {
        ref.style.fill = "#ffb700";
        setStateRef(!stateRef);
      }
    };
  
    const handleMouseLeave = (ref: JSX.IntrinsicElements["path"],stateRef:boolean,setStateRef:any) => {
      if (ref !== undefined && ref.style !== undefined) {
        ref.style.fill = "#4a0083";
        setStateRef(!stateRef);
      }
    };

  
    return (
      <>
        <svg className="w-[100%] h-[100%]" width={props.width} height={props.height} viewBox="0 0 732 444" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                ref={ref173}
                onTouchStart={() => handleMouseEnter(ref173.current as any,state173,setState173)}
                onTouchEnd={() => handleMouseLeave(ref173.current as any,state173,setState173)}
                onMouseEnter={() => handleMouseEnter(ref173.current as any,state173,setState173)}
                onMouseLeave={() => handleMouseLeave(ref173.current as any,state173,setState173)}
                d="M27.5801 99.3201V76.0301L528.33 18.6001V41.7701L27.5801 99.3201Z"
                fill="#4a0083"
            />
            {
                state173
                &&
                <text x={90} y={40} fill="#000000" fontSize="24" fontWeight="bold">
                    Sillar Cabezal 173
                </text>

            }

            <path d="M27.5801 102.23L54.5601 99.3198V385.35L27.5801 387.36V102.23Z" fill="#4a0083"/>
            <path d="M497.77 72.6698L518.92 70.3198L525.19 78.1598V233.32L503.25 235.67L497.77 230.18V72.6698Z" fill="#4a0083"/>
            <path d="M497.77 263.66L525.19 259.4L524.41 333.63L497.77 336.65V263.66Z" fill="#4a0083"/>
            <path d="M308.91 92.2598V333.63L336.34 331.27L334.77 107.94L319.21 92.2598H308.91Z" fill="#4a0083"/>
            <path d="M308.91 336.65L495.41 315.6V333.63L308.91 355.46V336.65Z" fill="#4a0083"/>
            <path d="M473.47 247.42V315.6L495.41 313.36V265.45L473.47 247.42Z" fill="#4a0083"/>
            <path d="M473.47 74.6899V205.5L495.41 226.04V72.6699L473.47 74.6899Z" fill="#4a0083"/>
            <path d="M57.3599 118.91V361.05L83.2199 357.92V116.56L57.3599 118.91Z" fill="#4a0083"/>
            <path d="M57.3599 97.9499V117.59L277.95 93.4999V74.6899L57.3599 97.9499Z" fill="#4a0083"/>
            <path d="M250.02 99.3201L277.95 96.1401L277.23 336.65L250.02 340.34V99.3201Z" fill="#4a0083"/>
            <path d="M57.3599 363.85V385.18L277.95 360.66V338.5L57.3599 363.85Z" fill="#4a0083"/>
            <path d="M308.91 81.29V91.03H318.14L308.91 81.29Z" fill="#4a0083"/>
            <path d="M27.5801 390.83V415.68L524.41 358.7V336.65L27.5801 390.83Z" fill="#4a0083"/>
            <path d="M27.5801 76.0303V136.57L54.5601 133.71V99.3203L94.6301 94.0203V68.3403L27.5801 76.0303Z" fill="#4a0083"/>
            <path d="M465.15 25.8501L528.33 18.6001L525.19 92.2601L497.77 91.0301L500.12 45.0201L465.15 49.0401V25.8501Z" fill="#4a0083"/>
            <path d="M524.82 294.28L524.41 358.7L463.85 365.65L461.46 343.51L500.12 338.5L497.77 294.28H524.82Z" fill="#4a0083"/>
            <path d="M27.5801 358.86V415.68L88.3101 408.72V384.21L55.0001 388L54.5601 358.86H27.5801Z" fill="#4a0083"/>
            <path d="M303.42 71.1101L320.27 89.5201L547.53 64.4401L530.29 45.6401L303.42 71.1101Z" fill="#4a0083"/>
            <path d="M322.23 91.4801L353.58 88.3501L500.12 236.45L473.47 242.28L322.23 91.4801Z" fill="#4a0083"/>
            <path d="M475.04 243.51L495.41 262.31L713.27 230.97L695.24 212.16L475.04 243.51Z" fill="#4a0083"/>
            <path d="M522.06 69.5401L549.71 67.5801L691.32 209.03L663.11 212.16L522.06 69.5401Z" fill="#4a0083"/>
            <path d="M279.91 72.6699V361.05L306.56 358.7L305.77 77.3699L300.29 71.1099L279.91 72.6699Z" fill="#4a0083"/>
        </svg>
  
      </>
    );
  };