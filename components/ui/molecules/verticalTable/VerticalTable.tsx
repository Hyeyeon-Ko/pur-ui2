import colors from "@/styles/colors";
import React, { useState } from "react";
import Input from "../../atoms/input/Input";
import SelectBox from "../../atoms/selectBox/Select";
import Chip from "../../atoms/chip/Chip";

interface VerticalTableProps {
  data: Array<{
    id: number;
    title: string;
    contents: string | string[] | React.ReactNode;
  }>;
}

const VerticalTable: React.FC<VerticalTableProps> = ({ data }) => {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [isNationalChecked, setIsNationalChecked] = useState(false);

  const handleChipClick = (label: string) => {
    setCheckedItems((prev) => {
      const newCheckedItems = {
        ...prev,
        [label]: !prev[label],
      };

      if (label === "전국") {
        const isChecked = !prev[label];
        setIsNationalChecked(isChecked);
        Object.keys(newCheckedItems).forEach((key) => {
          if (key !== "전국") {
            newCheckedItems[key] = false;
          }
        });
      } else {
        if (isNationalChecked) {
          newCheckedItems["전국"] = false;
          setIsNationalChecked(false);
        }

        if (!newCheckedItems[label]) {
          newCheckedItems["전국"] = true;
          setIsNationalChecked(true);
        }
      }

      return newCheckedItems;
    });
  };

  const renderContent = (row: {
    title: string;
    contents: string | string[] | React.ReactNode;
  }) => {
    if (Array.isArray(row.contents)) {
      return (
        <div className="flex space-x-2">
          {row.contents.map((content: string, index: number) => {
            return (
              <div key={index}>
                <Chip
                  mode="xs"
                  content={content}
                  variant={checkedItems[content] ? "inline" : "outline"}
                  onClick={() => handleChipClick(content)}
                />
              </div>
            );
          })}
        </div>
      );
    } else if (typeof row.contents === "string") {
      if (
        row.title === "입찰명" ||
        row.title === "입찰번호" ||
        row.title === "낙찰기준가" ||
        row.title === "입찰품의번호"
      ) {
        return (
          <Input
            mode="sm"
            color="transparent"
            placeholder={`${row.title}`}
            customStyle={{
              padding: 0,
              margin: 0,
              border: "none",
              outline: "none",
              boxShadow: "none",
              width: "100%",
            }}
          />
        );
      } else if (row.title === "공고구분") {
        return (
          <SelectBox
            mode="xs"
            color="transparent"
            options={[
              { value: "본공고", label: "본공고" },
              { value: "재공고", label: "재공고" },
            ]}
            placeholder="공고구분"
          />
        );
      }
    } else if (React.isValidElement(row.contents)) {
      return <div>{row.contents}</div>;
    }
  };

  return (
    <div className="m-5 rounded-lg shadow-lg">
      <table className="table-auto w-full">
        <tbody className="divide-x">
          {data.map((row) => (
            <tr
              key={row.id}
              style={{ borderBottom: `1px solid ${colors["Grey_Lighten-4"]}` }}
            >
              <th
                style={{
                  backgroundColor: colors["Blue_C_Lighten-6"],
                  color: colors["Grey_Darken-3"],
                  borderBottom: `1px solid ${colors["Grey_Lighten-4"]}`,
                  borderLeft: "1px solid transparent",
                }}
                className="text-xs uppercase text-center"
              >
                {row.title}
              </th>
              <td className="px-4 py-2 text-xs">{renderContent(row)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VerticalTable;
