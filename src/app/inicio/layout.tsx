import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Inicio",
  description:
    "Inicia sesión para descubrir un mundo donde tú tienes el control",
};

export default function Layout({ children }: { children: ReactNode }) {
  return <main>{children}</main>;
}
