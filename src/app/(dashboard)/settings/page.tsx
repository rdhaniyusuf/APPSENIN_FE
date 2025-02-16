import { GeneralSetComp } from "@/components/dashboard/settings/SettingsComp";
import React from "react";

const PresencePage: React.FC = () => {
  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6 max-h-screen">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Pengaturan Umum
        </h3>
        <div className="space-y-6 gap-3">
          <GeneralSetComp />
        </div>
      </div>
    </div>
  );
};

export default PresencePage;
