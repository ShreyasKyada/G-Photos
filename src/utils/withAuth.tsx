"use client";
import * as React from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const authRoutes = ["/signin"];

export default function withAuth<T>(Component: React.ComponentType<T>) {
  const ComponentWithAuth = (props: T) => {
    const router = useRouter();
    const [userInfo, setUserInfo] = React.useState<any>(null);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
      getSession().then((data) => {
        setUserInfo(data);
        setIsLoading(false);
      });
    }, []);

    if (typeof userInfo !== null) {
      const isAuthRoutes =
        authRoutes.includes(window ? window?.location?.pathname : "") || false;

      if (!userInfo && !isLoading && !isAuthRoutes) {
        router.push("/signin");
      } else if (userInfo && !isLoading && isAuthRoutes) {
        router.push("/dashboard");
      } else if (!isLoading) {
        return <Component {...(props as T)} {...userInfo} />;
      }
    }

    return (
      <div className="flex min-h-screen flex-col items-center justify-center text-gray-800">
        <p>Loading...</p>
      </div>
    );
  };

  return ComponentWithAuth;
}
