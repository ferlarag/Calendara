import { Button } from "./ui/button";
import { UserRoundPlus } from "lucide-react";
import SelectBusiness from "./select-workspace";
import SettingsDropdownMenu from "./settings-dropdown";
import { Workspace } from "@prisma/client";

interface Props {
  workspace: Workspace | undefined;
}

const NavigationHeadline = ({ workspace }: Props) => {
  return (
    <div className="flex h-[76px] w-full items-center justify-between">
      {/* dropdown */}
      <SelectBusiness currentWorkspace={workspace} />

      <div className="flex items-center gap-4">
        <Button variant={"secondaryColor"} className="flex items-center gap-2">
          <UserRoundPlus className="h-5 w-5" />
          <p className="hidden lg:block">Add team member</p>
        </Button>

        <SettingsDropdownMenu />
      </div>
    </div>
  );
};

export default NavigationHeadline;
