import PageTitle from "@/components/page-title";
import CreateScheduleModal from "@/components/create-schedule";

const Page = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <PageTitle>Schedules</PageTitle>
        <CreateScheduleModal />
      </div>
    </>
  );
};

export default Page;
