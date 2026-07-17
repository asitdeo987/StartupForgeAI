
export interface RegisterRequest {
    name : string;
    email : string;
    password : string
}

export interface LoginRequest {
    email : string;
    password : string
}

export interface User {
    id : number;
    name : string;
    email : string
}

export interface TokenResponce {
    access_token : string;
    token_type : string
}

