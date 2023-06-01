"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Button from "@/components/Button";

export default function Home() {
  return (
    <main>
      <h1>Home</h1>
      <Button onClick={() => signIn()}>Login</Button>
      <Link href="/register">Register</Link>
      <Button onClick={() => signOut()}>LogOut</Button>
    </main>
  )
}
