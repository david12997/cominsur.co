export interface SectionAbout {
    title: string;
    logo:  Logo;
    texts: Texts;
    btn:   Btn;
}

export interface Btn {
    text: string;
    link: string;
}

export interface Logo {
    src: string;
    alt: string;
}

export interface Texts {
    text1: string;
    text2: string;
    text3: string;
    text4: string;
    text5: string;
    text6: string;
    text7: string;
}
