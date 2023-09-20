import Image from "next/image"

const SectionNosotros = (props:{data:any,orientation:string}):JSX.Element => {

    const styleOrientation:any ={
        flexDirection:props.orientation === 'normal' ? 'row' : 'row-reverse',
    }

    return<>
        <div className="title-section font-bold  text-[22px]  md:text-[24px] w-[90vw] ml-[5vw]  mt-[45px]  md:mt-[60px] text-[#6a6a6a]">
           {props.data.title}
        </div>
        <section style={styleOrientation} className="mision-vision mb-4 flex flex-wrap md:justify-between  p-2  md:p-4  h-[690px]  md:h-[360px] w-[90vw] ml-[5vw] bg-white rounded-[8px] shadow-[0px_0px_6px_rgba(0,0,0,0.2)]">
            <div className="block md:hidden mb-4 img-nosotros w-[100%] md:w-[40%]  h-[30%] md:h-[96%] relative">
                <Image
                    src={props.data.img}
                    alt={`${props.data.title} empresa cominsur`}
                    fill
                />
            </div>
            <div className="text-nosotros w-[100%] md:w-[50%]  h-[70%] md:h-[96%]">
                <p className="text-[17px] md:text-[20px] text-[#6e6e6e] font-bold">
                    {props.data.text}
                </p>
            </div>

            <div className="hidden md:block img-nosotros w-[100%] md:w-[40%]  h-[30%] md:h-[96%] relative">
                <Image
                    src={props.data.img}
                    alt={`${props.data.title} empresa cominsur`}
                    fill
                />
            </div>

        </section>
    </>

}

export default SectionNosotros