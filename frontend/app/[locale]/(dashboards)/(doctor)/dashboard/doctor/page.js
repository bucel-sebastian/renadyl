import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth/next";

export default async function DoctorDashboard({ params: { locale } }) {
  const session = await getServerSession(authOptions);

  console.log(session);
  return (
    <>
      page
      <br />
      atutentificat ca si {session?.user?.role}
    </>
  );
}
