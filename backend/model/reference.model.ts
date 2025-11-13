
type ReferenceData = {
    referencia: string;
    sistema_nombre: string;
    sistema_img: string;
};

type ReferenceMedia = {
    img1: string;
    img2: string;
};

export interface Reference {
    id: number;
    status: 'draft' | 'published' | 'deleted';
    owner: number;
    created_on: string;
    id_catalogue: number;
    name: string;
    state : string;
    description: string;
    data: ReferenceData;
    media: ReferenceMedia;
}

export default Reference;