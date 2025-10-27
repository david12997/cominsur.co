
type BtnQuoteProps = {
    onClick?: () => void;
    text:string;
    width?: string | number;
    height?: string | number;
};

const BtnQuote: React.FC<BtnQuoteProps> = ({ text, width,height, onClick }) => {


    const buttonStyle = {
        width: width ? (typeof width === 'number' ? `${width}px` : width) : '100%',
        height: height ? (typeof height === 'number' ? `${height}px` : height) : '40px',
    };

    return<>
        <button onClick={onClick} style={buttonStyle} className="cominsur-btn-quote min-w-[280px] min-h-[40px] rounded-sm cursor-pointer m-1 ">
            {text}
        </button>
    
    </>
}

export default BtnQuote;