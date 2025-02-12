"use client";

import { BottomTable, TopCardComp, BottomActivity } from "@/components/dashboard/MainComp";

export default function HomePage() {

  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4">
        {/* Top Card */}
        <div className="col-span-1 md:col-span-full">
         <TopCardComp/>
          {/* Mobile version is circular */}
        </div>
        {/* end of Top Card */}

        {/* Bottom Left Card */}
        <div className="bg-white col-span-8 shadow rounded p-4">
          <BottomTable/>
        </div>
        {/* end of Bottom Left Card */}

        {/* Bottom Right Card */}
        <div className="bg-white col-span-4 shadow rounded p-3 min-w-[calc(100%-1rem)]">
          <BottomActivity/>
        </div>
        {/* end of Bottom Right Card */}
      </section>
    </>
  );
}
