"use client";
import { ClerkProvider, useAuth } from '@clerk/nextjs'
import React from 'react'

function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user = useAuth();
    console.log(user)
    return (
        <ClerkProvider>
            {children}
        </ClerkProvider>
    )
}

export default Layout