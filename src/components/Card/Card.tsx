import estilos from "./estilos.module.css";
import { ReactNode } from "react";

interface props {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className }: props) {
  return (
    <div className={`${estilos.sombra} ${className ?? ""}`}>{children}</div>
  );
}
