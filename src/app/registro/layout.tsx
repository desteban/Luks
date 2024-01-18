import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Registro",
  description:
    "Crea tu cuenta hoy para conocer un mundo donde tú tienes el control de todo",
};

export default function Layout({ children }: { children: ReactNode }) {
  return <main>{children}</main>;
}
