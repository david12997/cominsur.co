
type SystemData = {
    desc:{
        text2: string;
    }
};


type SystemMedia = {
    ventana: string;
};

export interface System {
    id: number;
    status: 'draft' | 'published' | 'deleted';
    owner: number;
    created_on: string; 
    id_catalogue: number;
    name: string;
    state: string;
    description: string;
    data: SystemData;
    media: SystemMedia;
}