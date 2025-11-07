import { EnvelopeIcon, FacebookIcon, InstagramIcon, LocationIcon, WhatsappIcon } from "../icons";
import MapContact from "../map/map";

type SectionContactProps = {
 
};

const SectionContact: React.FC<SectionContactProps> = ({ }) => {

    const dataSectionContact = {
       
    };

    return<>

        <section className="w-[90%] ml-[5%] min-h-[400px] max-[500px] p-2  relative mt-[60px]">
            <div className="tittle text-[24px] font-bold gray-text">CONTACTO</div>
            <div className="content bg-white w-[100%] flex flex-wrap justify-center md:justify-between p-2 rounded-md shadow-md p-2 md:p-6">

                <div className="contaoner-info w-[100%] md:w-[45%] flex flex-col gap-4 p-2 text-[16px] md:text-[18px] text-[#6A6A6A] font-bold">
                    <div className="contact-method flex justify-start items-center ">
                        <div className="icon">
                            <EnvelopeIcon fill="#6A6A6A" width="24" height="23" />
                        </div>
                        <div className="info ml-2">
                            ventas@cominsur.com.co
                        </div>

                    </div>

                    <div className="contact-method flex mt-2">
                        <div className="icon">
                            <WhatsappIcon fill="#6A6A6A" width="24" height="24" />
                        </div>
                        <div className="info ml-2">
                            320 914 3090
                        </div>

                    </div>

                    <div className="contact-method flex mt-2">
                        <div className="icon">
                            <FacebookIcon fill="#6A6A6A" width="26" height="26" />
                        </div>
                        <div className="info ml-2">
                            @cominsur
                        </div>

                    </div>

                    <div className="contact-method flex mt-2">
                        <div className="icon">
                            <InstagramIcon fill="#6A6A6A" width="24" height="24" />
                        </div>
                        <div className="info ml-2">
                            @cominsur.mayorista
                        </div>

                    </div>

                     <div className="contact-method flex mt-2">
                        <div className="icon">
                            <LocationIcon fill="#6A6A6A" width="28" height="28" />
                        </div>
                        <div className="info ml-2">
                            Cra 21 # 69 - 48
                        </div>

                    </div>

                    <div className="contact-method flex mt-2">
                        <div className="icon">
                            <LocationIcon fill="#6A6A6A" width="28" height="28"  />
                        </div>
                        <div className="info ml-2">
                            Calle 166 # 17 - 42
                        </div>

                    </div>


                </div>

                <div className="container-map w-[100%] md:w-[50%] h-[360px] mt-4 md:mt-0">
                    <MapContact />
                </div>
              
            </div>
        </section>

    </>
};

export default SectionContact;