import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { NextPage } from "next";

export default function AuthGuard({ children }: { children: JSX.Element }) {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.push("/");
    },
  });

  console.log(status);
  const loading = status === "loading";

  /* show loading indicator while the auth provider is still loading */
  if (loading) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  // if auth initialized with a valid user show protected page
  if (!loading && session) {
    return <>{children}</>;
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return null;
}
