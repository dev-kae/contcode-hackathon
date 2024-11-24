import React, { useEffect } from "react";
import { useRouter } from "next/router";

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("token");

    router.push("/signIn");
  }, [router]);

  return null;
};

export default Logout;
