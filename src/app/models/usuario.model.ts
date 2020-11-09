export class Usuario {

    constructor(
        public names: string,
        public email: string,
        public password: string,
        public surnames?: string,
        public img?: string,
        public role?: string,
        public google?:boolean,
        public esstado?: boolean,
        public _id?: string,
    ){}

}