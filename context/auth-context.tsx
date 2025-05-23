"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { getSupabaseBrowserClient } from "@/lib/supabase"
import { useToast } from "@/components/ui/use-toast"

type User = {
  id: string
  name: string
  email: string
  avatar_url?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  // Get a fresh client on each render to avoid stale references
  const supabase = getSupabaseBrowserClient()

  // Check for existing session on initial load
  useEffect(() => {
    const checkSession = async () => {
      setIsLoading(true)

      try {
        // Get session from Supabase
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session) {
          console.log("Found existing session:", session.user.id)

          // Get user profile data
          const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single()

          if (profileError) {
            console.error("Error fetching profile:", profileError)
            // Try to create profile if it doesn't exist
            if (profileError.code === "PGRST116") {
              const { error: insertError } = await supabase.from("profiles").insert({
                id: session.user.id,
                full_name: session.user.user_metadata.full_name || session.user.email?.split("@")[0] || "",
                email: session.user.email,
              })

              if (insertError) {
                console.error("Error creating profile:", insertError)
              } else {
                setUser({
                  id: session.user.id,
                  name: session.user.user_metadata.full_name || session.user.email?.split("@")[0] || "",
                  email: session.user.email || "",
                })
              }
            }
          } else if (profile) {
            setUser({
              id: session.user.id,
              name: profile.full_name || session.user.email?.split("@")[0] || "",
              email: session.user.email || "",
              avatar_url: profile.avatar_url,
            })
          }
        }
      } catch (error) {
        console.error("Error checking session:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()

    // Set up auth state change listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.id)

      if (event === "SIGNED_IN" && session) {
        setIsLoading(true)
        try {
          // Get user profile data
          const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single()

          if (profileError) {
            console.error("Error fetching profile after sign in:", profileError)
            // Try to create profile if it doesn't exist
            if (profileError.code === "PGRST116") {
              const { error: insertError } = await supabase.from("profiles").insert({
                id: session.user.id,
                full_name: session.user.user_metadata.full_name || session.user.email?.split("@")[0] || "",
                email: session.user.email,
              })

              if (insertError) {
                console.error("Error creating profile after sign in:", insertError)
              } else {
                setUser({
                  id: session.user.id,
                  name: session.user.user_metadata.full_name || session.user.email?.split("@")[0] || "",
                  email: session.user.email || "",
                })
              }
            }
          } else if (profile) {
            setUser({
              id: session.user.id,
              name: profile.full_name || session.user.email?.split("@")[0] || "",
              email: session.user.email || "",
              avatar_url: profile.avatar_url,
            })
          }
        } catch (error) {
          console.error("Error handling sign in:", error)
        } finally {
          setIsLoading(false)
        }
      } else if (event === "SIGNED_OUT") {
        setUser(null)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    try {
      console.log("Attempting login with:", email)
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error("Login error:", error)
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive",
        })
        return false
      }

      console.log("Login successful:", data.user?.id)
      toast({
        title: "Login successful",
        description: "Welcome back!",
        variant: "success",
      })

      return true
    } catch (error) {
      console.error("Login error:", error)
      toast({
        title: "Login failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    try {
      console.log("Attempting signup with:", email, name)

      // First, check if the user already exists
      const { data: existingUser, error: checkError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (existingUser?.user) {
        toast({
          title: "Signup failed",
          description: "An account with this email already exists. Please log in instead.",
          variant: "destructive",
        })
        return false
      }

      // Sign up the user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      })

      if (error) {
        console.error("Signup error:", error)
        toast({
          title: "Signup failed",
          description: error.message,
          variant: "destructive",
        })
        return false
      }

      if (!data.user) {
        console.error("Signup error: No user returned")
        toast({
          title: "Signup failed",
          description: "No user was created",
          variant: "destructive",
        })
        return false
      }

      console.log("Signup successful:", data.user.id)

      // Manually create profile
      try {
        const { error: profileError } = await supabase.from("profiles").insert({
          id: data.user.id,
          full_name: name,
          email: email,
        })

        if (profileError) {
          console.error("Error creating profile during signup:", profileError)
          // Don't fail the signup if profile creation fails
        }
      } catch (profileErr) {
        console.error("Unexpected error creating profile:", profileErr)
      }

      toast({
        title: "Account created",
        description: "Your account has been created successfully!",
        variant: "success",
      })

      return true
    } catch (error) {
      console.error("Signup error:", error)
      toast({
        title: "Signup failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
        variant: "success",
      })
    } catch (error) {
      console.error("Logout error:", error)
      toast({
        title: "Logout failed",
        description: "An error occurred while logging out",
        variant: "destructive",
      })
    }
  }

  return <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
