import * as React from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader } from "@/components";

const authRoutes = ["/signin"];

export default function withAuth<T>(Component: React.ComponentType<T>) {
  const ComponentWithAuth = (props: T) => {
    const router = useRouter();
    const [userInfo, setUserInfo] = React.useState<any>(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [currentPath, setCurrentPath] = React.useState("");

    React.useEffect(() => {
      getSession().then((data) => {
        setUserInfo(data);
        setIsLoading(false);
      });

      setCurrentPath(window.location.pathname);
    }, []);

    React.useEffect(() => {
      if (typeof userInfo !== null && currentPath && !isLoading) {
        const isAuthRoute = authRoutes.includes(currentPath);

        if (!userInfo && !isLoading && !isAuthRoute) {
          router.replace("/signin");
        } else if (userInfo && !isLoading && isAuthRoute) {
          router.replace("/");
        }
      }
    }, [userInfo, currentPath, isLoading, router]);

    if (!isLoading) {
      return <Component {...(props as T)} {...userInfo} />;
    }

    return (
      <div className="flex h-[100vh] flex-col items-center justify-center text-gray-800">
        <Loader />
      </div>
    );
  };

  return ComponentWithAuth;
}
