import { loginFailure, loginStart } from "@/redux/slices/useAuth";
import { RootState } from "@/redux/store";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

const useAuth = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    
    const { loading, error, user } = useSelector((state: RootState) => state.auth);

    const login = async(email: string, password: string) => {
        dispatch(loginStart());
        
        try {
            const response = await signIn("credentials", { email, password, redirect: false });
            if (response?.error) {
                throw new Error(response.error);
            }
            router.push("/dashboard");
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
            dispatch(loginFailure(errorMessage));
        }
    }

    const logout = async () => {
        await signOut({ redirect: false });
        router.push("login")
    }   

    return { login, logout, loading, error, user };
}

export default useAuth;