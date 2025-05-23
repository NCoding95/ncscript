"use server"

import { seedDatabase } from "@/scripts/seed-database"

export async function seedDatabaseAction() {
  try {
    const result = await seedDatabase()
    return result
  } catch (error) {
    console.error("Error in seed action:", error)
    return { success: false, error: String(error) }
  }
}
