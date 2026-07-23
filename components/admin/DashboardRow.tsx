import { Dashboard } from "@/types/dashboards";

type Props = {
  dashboard: Dashboard;
};

export default function DashboardRow({
  dashboard,
}: Props) {
  return (
    <tr className="border-t">
      <td className="p-5">
        {dashboard.title}
      </td>

      <td className="p-5">
        {dashboard.software}
      </td>

      <td className="p-5">
        {dashboard.category}
      </td>

      <td className="p-5">
        {dashboard.featured ? "⭐" : "-"}
      </td>

      <td className="space-x-3 p-5">
        <button className="text-blue-600 hover:underline">
          Edit
        </button>

        <button className="text-red-600 hover:underline">
          Delete
        </button>
      </td>
    </tr>
  );
}