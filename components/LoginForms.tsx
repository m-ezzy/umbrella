"use client";
import { useRef, useState } from 'react'
import { useFormState } from 'react-dom';
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
// import { signIn } from '@/auth';
// import { signIn, signOut, getProviders, SessionProvider, useSession, SignInResponse } from 'next-auth/react'
import { authenticateWithCredentials } from '@/lib/auth'

function CredentialsLoginForm({ setError }: any) {
  const uniqueIdentifierRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  // const [errorMessage, dispatch] = useFormState(authenticateWithCredentials, undefined);
  // if(errorMessage) setError(errorMessage);

  const handleClick = async (e) => {
    e.preventDefault();
    const uniqueIdentifier = uniqueIdentifierRef.current?.value;
    const password = passwordRef.current?.value;

    // error: string | undefined;
    // Will be different error codes, depending on the type of error.
    // status: number
    // HTTP status code, hints the kind of error that happened.
    // ok: boolean
    // `true` if the signin was successful
    // url: string | null
    // `null` if there was an error, otherwise the url the user should have been redirected to.
    
    const res: any = await authenticateWithCredentials({ 'uniqueIdentifier' : uniqueIdentifier, 'password' : password })
    // const res: any = await signIn('credentials', { redirect: true, 'uniqueIdentifier' : uniqueIdentifier, 'password' : password })
    // const res: any = await auth('login', { uniqueIdentifier, password })

    console.log(res)
    if (res.error) {
      setError(res.error)
    } else if(res.success) {
      redirect(res.url || '/')
    }
  }
  return(
    <form className='form border rounded-lg flex flex-col p-2 gap-2'>
      <div className="form-outline w-full">
        <input type="text" name="uniqueIdentifier" className="form-control rounded w-full" placeholder="UserID, Username, Email, Mobile" ref={uniqueIdentifierRef} />
      </div>
      <div className="form-outline w-full text-black">
        <input type="password" name="password" className="form-control rounded w-full" placeholder="Password" ref={passwordRef} />
      </div>
      <div className="form-outline">
        <button type="submit" className="form-control w-full border rounded-lg p-2 text-md font-semibold hover:bg-black" onClick={handleClick}>Login with Credentials</button>
      </div>
    </form>
  );
}
function GoogleLoginForm({ setError }: any) { //GoogleLoginButton
  const handleClick = async () => {
    const res = await signIn('google') //('google', { callbackUrl: '/api/auth/google/callback' })
    if (res?.error) {
      setError(res.error)
    }
  }
  return (
    <button className="w-full border rounded-lg flex justify-center items-center hover:bg-black" onClick={handleClick}>
      <img src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="Google Logo" className='w-14 h-14' />
      <span className="text-md font-semibold">Login with Google</span>
    </button>
  )
}
function GithubLoginForm({ setError }: any) {
  const handleClick = async () => {
    const res = await signIn('github') //('google', { callbackUrl: '/api/auth/callback/github' })
    if (res?.error) {
      setError(res.error)
    }
  }
  return (
    <button className="w-full border rounded-lg flex justify-center items-center p-2 space-x-2 hover:bg-black" onClick={handleClick}>
      <img src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png" alt="Github Logo" className='w-10 h-10 rounded-md' />
      <span className="text-md font-semibold">Login with Github</span>
    </button>
  )
}

export { CredentialsLoginForm, GoogleLoginForm, GithubLoginForm }
