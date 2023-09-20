import Image from "next/image"
import Link from "next/link"

const Card1 = (props:{nombre:string,referencia:string,img1:string,img2:string}):JSX.Element =>{

    return<Link href={'/catalogo'} className=" min-w-[100%]  md:min-w-[600px] mr-[30px]  md:mr-[44px]">
        <section className="cursor-pointer  mt-1 ml-[6px] mr-[30px]  md:mr-[44px] min-w-[100%]  h-[500px]  md:min-w-[600px] md:max-w-[600px] md:h-[405px] bg-white rounded-[8px]  shadow-[0px_0px_6px_rgba(0,0,0,0.2)]">
            <div className="container-images w-[100%] h-[80%] flex flex-wrap justify-center">
                <div className="img-1 w-[80%] h-[50%] md:w-[50%] md:h-[90%] relative">
                    <Image
                        src={props.img1}
                        alt={props.nombre}
                        fill={true}
                        object-fit="cover"
                        className="rounded-[10px]"
                        sizes="100%"
                    />
                </div>
                <div className="img-1 w-[80%] h-[50%] md:w-[50%] md:h-[90%] relative">
                    <Image
                        src={props.img2}
                        alt={props.nombre}
                        fill={true}
                        object-fit="cover"
                        className="rounded-[10px]"
                        sizes="100%"
                    />
                </div>
            </div>

            <div className="container-name w-[100%] h-[20%] flex items-center justify-center text-[18px] md:text-[20px] text-[#4a0083] font-extrabold">
                {props.nombre.toUpperCase()} REF {props.referencia.toUpperCase()}
            </div>
        </section>
    </Link>
}

export default Card1