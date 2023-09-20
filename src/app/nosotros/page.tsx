export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

import BreadCrumb from "@/components/breadcrumb/breadcrumb";
import SectionGaleria from "@/components/sections/galeria/section.galeria";
import SectionNosotros from "@/components/sections/nosotros/section.nosotros";
import { GetData } from "@/services/get.data";
import Image from "next/image";


export default async function Nosotros():Promise<JSX.Element> {

    const dataNosotrosPage = await GetData([
        process.env.NEXT_PUBLIC_DOMAIN as string + '/api/pages?page=nosotros',
    ]).then(res=>res as any);

    // dataNosotrosPage[0] is a page nosotros data, filed Data in pages cms collection
    const parseDataNosotros = JSON.parse(dataNosotrosPage[0].data[0].data);

    return (
        <main>
            <BreadCrumb/>
            <section className="banners-nosotros w-screen  relative mt-2">
                <Image
                    src={parseDataNosotros.banners.desktop}
                    alt="banner-nosotros"
                    width={1920}
                    height={300}
                    className="md:block hidden"
                />
                <Image
                    src={parseDataNosotros.banners.mobile}
                    alt="banner-nosotros"
                    width={480}
                    height={571}
                    className="md:hidden block"
                />
            </section>
            <SectionNosotros 
                data={parseDataNosotros.mision} 
                orientation={'normal'} 
            />
            <SectionNosotros 
                data={parseDataNosotros.vision} 
                orientation={'reverse'} 
            />
            <SectionGaleria
                img={parseDataNosotros.galeria_img}
                video={parseDataNosotros.galeria_video}
            />
        </main>
    )
}
  