export interface ILogin {
    email: string;
    password: string;
}

export interface IRegister {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
}

export interface IUser {
    id: string;
    email: string;
}