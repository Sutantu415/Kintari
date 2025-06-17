'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "SupabaseClient";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [session, setSession] = useState();
    
    const signUp = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password
            });

            if (error) {
                console.error(error);
                return { success: false, error };
            }
            return { success: true, data };
        } catch (err) {
            console.error("Unexpected error during signUp:", err);
            return { success: false, error: err };
        }
    }

    const signIn = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            });

            if (error) {
                console.error(error);
                return { success: false, error };
            }
            return { success: true, data };
        } catch (err) {
            console.error("Unexpected error during signIn:", err);
            return { success: false, error: err };
        }
    }

    const signOut = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error(error);
            }
        } catch (err) {
            console.error("Unexpected error during signOut:", err);
        }
    }

    useEffect(() => {
        supabase.auth.getSession().then(({ data, error }) => setSession(data.session))
        
        supabase.auth.onAuthStateChange((event, session) => {
            setSession(session);
        });
    }, []);

    return (
        <AuthContext.Provider value={{ session, signUp, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const userAuth = () => useContext(AuthContext);