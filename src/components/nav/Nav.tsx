"use client";

import {
  SessionContextValue,
  signIn,
  signOut,
  useSession,
} from "next-auth/react";
import Link from "next/link";
import { UserIcon } from "../../../public/iconos/UserIcon";
import { useEffect, useState } from "react";
import { Session } from "next-auth";

export function Nav() {
  const { data } = useSession();
  const [session, setSession] = useState<Session | undefined>();

  useEffect(() => {
    setSession(data as Session);
  }, [data]);

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
      <div>
        <button
          onClick={() => signIn()}
          className="bg-sky-400 px-3 py-2 rounded-md"
        >
          Iniciar sesión
        </button>

        <Link href={"/registro"}>Crea tu cuenta</Link>

        <button
          onClick={() => signIn("google")}
          className="bg-blue-700 py-3 px-5 rounded-full"
        >
          G
        </button>
      </div>
    );
  };

  const HandleInicio = () => {
    if (session) {
      return <Link href="/inicio">Inicio</Link>;
    }

    return <Link href="/">Inicio</Link>;
  };

  return (
    <nav className="bg-slate-900 flex justify-between px-24 py-3 text-white items-center">
      <HandleInicio />

      <IniciarSession />
    </nav>
  );
}
