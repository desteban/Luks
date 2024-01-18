"use client";

import { signIn } from "next-auth/react";
import GoogleIcon from "../../../public/iconos/GoogleIcon";

export default function IniciarConGoogle() {
  return (
    <GoogleIcon
      size={32}
      className="cursor-pointer"
      onClick={() => signIn("google", { callbackUrl: "/inicio" })}
    />
  );
}
