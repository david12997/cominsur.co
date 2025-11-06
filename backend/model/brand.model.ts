
type BrandColors = {
    primary: string;
    secondary: string;
    tertiary: string;
    quaternary: string;
};

type BrandData = {
    name: string;
    logo_dark: string;
    logo_light: string;
    about: string;
    about2: string;
    short_description: string;
    description: string;
    phone1: string;
    phone2: string;
    email: string;
    address1: string;
    address2: string;
    facebook: string;
    instagram: string;
    tik_tok: string;
};

type BrandMedia = {
    banners:{
        desktop: string[];
        mobile: string[];
    };

}

type BrandPages = {
    links: Array<{
        label: string;
        href: string;
    }>;
}


export interface Brand {
    id: number;
    staus: 'draft' | 'published' | 'deleted';
    owner: number;
    created_on: Date;
    name: string;
    colors: BrandColors | null;
    data: BrandData | null;
    pages: BrandPages | null;
    media: BrandMedia | null ;

}

export default Brand;