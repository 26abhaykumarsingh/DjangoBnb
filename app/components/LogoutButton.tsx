'use client';

import { useRouter } from "next/navigation";
import MenuLink from "@/app/components/navbar/MenuLink";
import { resetAuthCookies } from "@/app/lib/actions";

const LogoutButton = () => {
  const router = useRouter();

  const submitLogout = async () => {
    resetAuthCookies();

    router.push('/');
  }

  return (
    <MenuLink label="Log out" onClick={submitLogout} />
  )
}

export default LogoutButton;
