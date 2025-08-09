import { useEffect } from "react";
import { useRouter } from "next/router";

export default function DashboardLayoutRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/DashboardHome");
  }, []);
  return null;
}
