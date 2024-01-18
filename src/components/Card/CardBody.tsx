import { ReactNode } from "react";

interface props {
  children: ReactNode;
}

export default function CardBody({ children }: props) {
  return <div className="card-body">{children}</div>;
}
