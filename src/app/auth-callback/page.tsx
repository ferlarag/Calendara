import { api } from "@/trpc/server";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const Page = async () => {
  noStore();
  const { isAuthenticated } = getKindeServerSession();
  const isAuth = await isAuthenticated();

  if (!isAuth)
    redirect("/api/auth/login?post_login_redirect_url=/auth-callback");

  const data = await api.user.validateUser.mutate();

  if (data) {
    redirect("/dashboard");
  } else {
    redirect("/");
  }
};

export default Page;
