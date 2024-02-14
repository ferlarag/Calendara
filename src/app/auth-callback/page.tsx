import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

const Page = async () => {
  const { success } = await api.user.validateUser.mutate();
  console.log(success);
  if (success) {
    redirect("/dashboard/w/my-calendar/calendar");
  } else redirect("/");
};

export default Page;
