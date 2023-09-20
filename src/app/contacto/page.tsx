export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

import BreadCrumb from "@/components/breadcrumb/breadcrumb";
import SectionAtencionContacto from "@/components/sections/atencion/section.atencion";
import SectionContacto from "@/components/sections/contacto/section.contacto";
import { GetData } from "@/services/get.data";
import Image from "next/image";

export default async function Contacto():Promise<JSX.Element> {

    const dataContactoPage = await GetData([
        process.env.NEXT_PUBLIC_DOMAIN as string + '/api/pages?page=contacto',
    ]).then(res=>res as any);

    // dataContactoPage[0] is a page nosotros data, filed Data in pages cms collection
    const parseDataContacto = JSON.parse(dataContactoPage[0].data[0].data);

    return (
      <main>
            <BreadCrumb/>
            <section className="banners-nosotros w-screen  relative mt-2">
                <Image
                    src={parseDataContacto.banners.desktop}
                    alt="banner-nosotros"
                    width={1920}
                    height={300}
                    className="md:block hidden"
                />
                <Image
                    src={parseDataContacto.banners.mobile}
                    alt="banner-nosotros"
                    width={480}
                    height={571}
                    className="md:hidden block"
                />
            </section>
            <SectionAtencionContacto/>
            <SectionContacto/>
      </main>
    )
}