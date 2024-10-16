import colors from "@/styles/colors";
import React from "react";

interface VerticalTableProps {
  data: Array<{ title: string; contents: string | number }>;
}

const VerticalTable: React.FC<VerticalTableProps> = ({ data }) => {
  return (
    <div className="mx-5">
      <table className="table-auto w-full border-collapse border border-gray-200">
        <tbody
          style={{ borderBottom: `1px solid ${colors["Grey_Lighten-4"]}` }}
          className="divide-x"
        >
          {data.map((row, index) => (
            <tr key={index} className="border-b border-gray-200">
              <th
                style={{
                  backgroundColor: colors["Blue_C_Lighten-6"],
                  color: colors["Grey_Darken-3"],
                }}
                className="text-xs uppercase text-center"
              >
                {row.title}
              </th>
              <td className="px-4 py-2 text-xs">{row.contents}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VerticalTable;
