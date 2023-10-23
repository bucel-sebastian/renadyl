import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";

export default async function ClientDashboard({ params: { locale } }) {
  const session = await getServerSession(options);

  console.log(session);
  return (
    <>
      page
      <br />
      atutentificat ca si {session?.user?.role}
    </>
  );
}
