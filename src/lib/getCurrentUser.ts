"use server";
import { currentUser } from '@clerk/nextjs/server'

export default async function getCurrentUser() {
  const user = await currentUser()
  return user
}