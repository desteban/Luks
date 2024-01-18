"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { UserIcon } from "../../../public/iconos/UserIcon";

export function Nav() {
  const { data: session } = useSession();
  console.log("datos session", session);

  const IniciarSession = () => {
    if (session) {
      return (
        <div className="flex gap-3 items-center">
          <p>{session.user?.name}</p>
          {session.user?.image ? (
            <img
              src={session.user?.image ?? ""}
              alt={`Imagen de ${session.user?.name}`}
              className="rounded-full h-10"
            />
          ) : (
            <UserIcon />
          )}

          <button onClick={() => signOut({ callbackUrl: "/" })}>Salir</button>
        </div>
      );
    }

    return (
      <>
        <button
          onClick={() => signIn()}
          className="bg-sky-400 px-3 py-4 rounded-md"
        >
          Iniciar sesión
        </button>

        <button
          onClick={() => signIn("google")}
          className="bg-blue-700 py-3 px-5 rounded-full"
        >
          G
        </button>
      </>
    );
  };

  return (
    <nav className="bg-slate-900 flex justify-between px-24 py-3 text-white items-center">
      <Link href="/">Inicio</Link>

      <IniciarSession />
    </nav>
  );
}
