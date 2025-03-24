export interface User {
    id?: string; // Make optional
    name: string; // Make optional
    email: string;
    password?: string; // Make optional
}

export interface UserData{
    user: User | null,
    loading: boolean,
    error: string | null,
}