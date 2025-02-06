"use client"

import React from 'react'
import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
    useUser
  } from '@clerk/nextjs'
  
const Profile = () => {
    const {isLoaded , isSignedIn , user} = useUser()
  return (
    <div>
        <div className=" rounded-full cursor-pointer   ">
          <SignedOut >
           
            <SignInButton />
          </SignedOut>
          <SignedIn>

           

            <UserButton />

          </SignedIn>
          </div>

    </div>
  )
}

export default Profile
