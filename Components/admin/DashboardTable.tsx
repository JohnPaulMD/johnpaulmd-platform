import dashboardData from "@/data/dashboardData";

import DashboardRow from "./DashboardRow";

export default function DashboardTable() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-5 text-left">
              Title
            </th>

            <th className="p-5 text-left">
              Software
            </th>

            <th className="p-5 text-left">
              Category
            </th>

            <th className="p-5 text-left">
              Featured
            </th>

            <th className="p-5 text-left">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {dashboardData.map((dashboard) => (

            <DashboardRow
              key={dashboard.id}
              dashboard={dashboard}
            />

          ))}

        </tbody>

      </table>

    </div>
  );
}