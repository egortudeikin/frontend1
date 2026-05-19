import React, { createContext, useContext, useEffect, useState } from "react"
import { supabaseClient } from "../clients/supabaseClient"


const AuthContext = createContext(null)

export const useAuthContext = () =>  useContext(AuthContext)

export const AuthProvider = ({children}) => {
    const [isFetching, setisFetching] = useState(true)
    const [isError, setisError] = useState(null)
    const [claims, setClaims] = useState(null)

    useEffect(() => {
        supabaseClient.auth.getClaims().then(({data: {claims}}) => {
            setClaims(claims)
        })

        const {data: { subscription }} = supabaseClient.auth.onAuthStateChange(() => {
            supabaseClient.auth.getClaims().then(({data: {claims}}) => {
                setClaims(claims)
                // console.log(claims)
            })
        })

        return () => subscription.unsubscribe()
    }, [])

    const logout = () => {
        supabaseClient.auth.signOut().then(() => window.location.reload())
    }
    

    const login = ({email, password}) => {
        supabaseClient.auth.signInWithPassword({
            email,
            password
          }).then(() => {
            document.location.href = '/'

          })
    }

    const register = ({email, password, firstName, lastName}) => {
        supabaseClient.auth.signUp({
            email,
            password,
            options: {
                data: {
                    firstName,
                    lastName
                }
            }
        }).then(() => {
            document.location.href = '/'
          })
    }

    return (
        <AuthContext value={{
            claims,
            isFetching,
            isError,
            logout,
            login,
            register
        }}>
            {children}
        </AuthContext>
    )
}