import { loginFailure, loginStart, loginSuccess } from "@/redux/slices/AuthSlice";
import { RootState } from "@/redux/store";
import { User } from "@/types/UserData";
import { getSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useAuth = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    
    const { loading, error, user } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        const restoreSession = async () => {
            const session = await getSession();
            if (session?.user) {
                const restoredUser: User = {
                    name: session.user.name || "Unknown",
                    email: session.user.email || "",
                };
                dispatch(loginSuccess(restoredUser));
            }
        };
        restoreSession();
    }, [dispatch]);

    const login = async(email: string, password: string) => {
        dispatch(loginStart());
        
        try {
            const response = await signIn("credentials", { email, password, redirect: false });
            if (response?.error) {
                throw new Error(response.error);
            }
        
            const session = await getSession();
            if (!session?.user) {
                throw new Error("User session not found");
            }
            const loggedInUser: User = {
                name: session.user.name || "Unknown",
                email: session.user.email || "",
            };

            dispatch(loginSuccess(loggedInUser));
            router.push("/dashboard");
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
            dispatch(loginFailure(errorMessage));
        }
    }

    const logout = async () => {
        await signOut({ redirect: false });
        router.push("/login")
    }   

    return { login, logout, loading, error, user };
}

export default useAuth;