import { redirect } from "next/navigation";

import { getCurrentSession } from "@/lib/session";
import LoginForm from "@/components/LoginForm";


export default async function LoginPage() {


  const session =
    await getCurrentSession();


  if (session) {

    redirect(
      `/picture/${session.account}`
    );

  }


  return <LoginForm />;

}