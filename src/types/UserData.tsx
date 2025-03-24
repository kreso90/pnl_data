export interface User{
    id: string,
    email: string,
    password: string,
}

export interface UserData{
    user: User | null,
    loading: boolean,
    error: string | null,
}