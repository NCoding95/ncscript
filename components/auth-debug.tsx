"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/context/auth-context"
import { getSupabaseBrowserClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"

export function AuthDebug() {
  const { user } = useAuth()
  const [sessionInfo, setSessionInfo] = useState<any>(null)
  const [profileInfo, setProfileInfo] = useState<any>(null)
  const [showDebug, setShowDebug] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const checkSession = async () => {
    try {
      setError(null)
      const supabase = getSupabaseBrowserClient()
      const { data, error } = await supabase.auth.getSession()

      if (error) {
        setError(`Session error: ${error.message}`)
        return
      }

      setSessionInfo(data)

      // If we have a session, also check the profile
      if (data.session?.user?.id) {
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", data.session.user.id)
          .single()

        if (profileError) {
          setError(`Profile error: ${profileError.message}`)
        } else {
          setProfileInfo(profile)
        }
      }
    } catch (err) {
      setError(`Unexpected error: ${err}`)
    }
  }

  // Check session on mount if debug is shown
  useEffect(() => {
    if (showDebug) {
      checkSession()
    }
  }, [showDebug])

  if (!showDebug) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          variant="outline"
          size="sm"
          className="bg-black/80 border-hw-border text-white hover:bg-hw-card-hover"
          onClick={() => setShowDebug(true)}
        >
          Debug Auth
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 bg-black/90 border border-hw-border rounded-lg p-4 text-white text-xs overflow-auto max-h-96">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold">Auth Debug</h3>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 text-gray-400 hover:text-white"
          onClick={() => setShowDebug(false)}
        >
          ×
        </Button>
      </div>
      <div className="space-y-2">
        <div>
          <p className="text-gray-400">User State from Context:</p>
          <pre className="bg-hw-darker p-2 rounded overflow-auto">
            {user ? JSON.stringify(user, null, 2) : "Not logged in"}
          </pre>
        </div>

        {error && (
          <div className="bg-red-900/30 border border-red-800 text-red-400 px-2 py-1 rounded text-xs">{error}</div>
        )}

        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-hw-border text-white hover:bg-hw-card-hover"
            onClick={checkSession}
          >
            Check Session
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-hw-border text-white hover:bg-hw-card-hover"
            onClick={() => {
              const supabase = getSupabaseBrowserClient()
              console.log("Supabase client:", supabase)
              console.log("Environment variables:", {
                NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
                NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "exists" : "missing",
              })
            }}
          >
            Log Client
          </Button>
        </div>

        {sessionInfo && (
          <div>
            <p className="text-gray-400">Session Info:</p>
            <pre className="bg-hw-darker p-2 rounded overflow-auto">{JSON.stringify(sessionInfo, null, 2)}</pre>
          </div>
        )}

        {profileInfo && (
          <div>
            <p className="text-gray-400">Profile Info:</p>
            <pre className="bg-hw-darker p-2 rounded overflow-auto">{JSON.stringify(profileInfo, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  )
}
