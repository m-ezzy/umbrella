// "use client";

// import { useState, Suspense } from 'react';
// import Image from 'next/image';
// import { redirect } from 'next/navigation';
// import { SessionProvider, useSession } from 'next-auth/react';
// import { auth } from '@/auth';
import { authenticateWithCredentials } from '@/actions/auth';
import CredentialsLoginForm from '@/components/auth/CredentialsLoginForm';
// import GoogleLoginForm from '@/components/auth/GoogleLoginForm';
// import GithubLoginForm from '@/components/auth/GithubLoginForm';

export default async function Login() {
  // const session: any = await auth();
  // if(session.user) {
  //   redirect('/dashboard');
  // }

  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);

  // let styles = {
  //   backgroundImage: "url(/asests/images/umbrella-transparent.png)",
  // }
  let imagePath = "/assets/images/umbrella-transparent.png";

  return(
    <main style={{ backgroundImage: `url(${imagePath})`, backgroundSize: "140px 140px" }} className='bg-violet-200 min-h-full flex items-center'>
      <title>Login</title>

      {/* <Image src={imagePath} alt="Umbrella Logo" fill={true} className="w-32 h-32 mx-auto mt-8" /> */}
      <div className="bg-white text-black border border-black rounded-lg mx-auto flex flex-col p-2 gap-2">
        <div className="p-16 text-6xl text-center">Umbrella</div>
        <CredentialsLoginForm serverAction={authenticateWithCredentials} /> {/* setError={setError} */}
        {/* <GoogleLoginForm setError={setError} /> */}
        {/* <GithubLoginForm setError={setError} /> */}
        {/* {error && <div className="text-red-500">{error}</div>} */}
      </div>
    </main >
  );
}
