"use server"

import { createClient } from "@supabase/supabase-js"

export async function createUserProfile(userId: string, name: string, email: string) {
  try {
    // Create a server-side Supabase client with admin privileges
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Missing Supabase environment variables")
      return { success: false, message: "Server configuration error" }
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Check if profile already exists
    const { data: existingProfile, error: checkError } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", userId)
      .single()

    if (checkError && checkError.code !== "PGRST116") {
      console.error("Error checking for existing profile:", checkError)
      return { success: false, message: checkError.message }
    }

    if (existingProfile) {
      // Profile already exists, just return success
      return { success: true, message: "Profile already exists" }
    }

    // Create the profile
    const { error } = await supabase.from("profiles").insert({
      id: userId,
      full_name: name,
      email: email,
      created_at: new Date().toISOString(),
    })

    if (error) {
      console.error("Server error creating profile:", error)
      return { success: false, message: error.message }
    }

    return { success: true, message: "Profile created successfully" }
  } catch (error) {
    console.error("Unexpected error in createUserProfile:", error)
    return { success: false, message: "An unexpected error occurred" }
  }
}
