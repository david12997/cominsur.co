'use client'

const Btn4 = (props:{text:string}): JSX.Element => {



    return<>
        <button className="mt-0 md:mt-[-200px] border-4 border-[#4a0083] text-[#4a0083] bg-white hover:bg-[#4a0083] hover:text-white  font-extrabold text-[20px] rounded-[5px] w-[100%] md:w-[49%] ml-0 md:ml-[49%] h-[64px]">
            {props.text.toUpperCase()}
        </button>
    </>
}

export default Btn4