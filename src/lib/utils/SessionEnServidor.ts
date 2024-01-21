import { Session, getServerSession } from "next-auth";

export default async function SessionEnServidor(): Promise<Session | null> {
  const session = await getServerSession();

  return session;
}
