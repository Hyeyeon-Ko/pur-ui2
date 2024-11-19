"use client";

import { useState } from "react";
import ManagementHeader from "@/components/ui/molecules/header/ManagementHeader";
import colors from "@/styles/colors";
import { useDarkMode } from "@/context/DarkModeContext";
import Button from "@/components/ui/atoms/button/Button";
import Checkbox from "@/components/ui/atoms/checkbox/Checkbox";
import { equipData, fieldLabel, fields } from "@/lib/equipDatas";
import { RepairRow } from "@/types/equipTypes";
import EditableRender from "@/components/ui/molecules/render/EditableRender";
import PageTitle from "@/components/ui/molecules/titles/PageTitle";

const EquipmentPage = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { isDarkMode } = useDarkMode();
  const [rows, setRows] = useState<RepairRow[]>(equipData);

  const addRow = () => {
    setRows([
      ...rows,
      {
        centerName: "",
        type: "",
        repairDate: null,
        documentNumber: "",
        faultSymptom: "",
        repairContent: "",
        partner: "",
        partNumber: "",
        cost: "",
        warranty: "",
        maintenanceCost: "",
        inspectionCheck: "",
        notes: "",
        isNew: true,
        isSelected: true,
      },
    ]);
    setIsEditing(true);
  };

  const toggleEdit = () => {
    const anyRowSelected = rows.some((row) => row.isSelected);
    if (!anyRowSelected) {
      setIsEditing(false);
    } else {
      setIsEditing(!isEditing);
    }

    if (isEditing) {
      setRows(
        rows.map((row) =>
          row.isSelected ? { ...row, isNew: false } : { ...row }
        )
      );
      setRows(rows.map((row) => ({ ...row, isSelected: false })));
    }
  };

  const handleInputChange = <K extends keyof RepairRow>(
    index: number,
    field: K,
    value: RepairRow[K]
  ) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const handleCheckboxChange = (index: number) => {
    const updatedRows = [...rows];
    updatedRows[index].isSelected = !updatedRows[index].isSelected;
    setRows(updatedRows);

    const anyRowSelected = updatedRows.some((row) => row.isSelected);
    if (!anyRowSelected) {
      setIsEditing(false);
    }
  };

  return (
    <div className="p-12">
      <PageTitle pageTitle="장비관리" mode="xl" fontWeight="bold" />
      <ManagementHeader
        headerTitle="유지보수 관리"
        showButton={false}
        isFullWidth
      />
      <table className="table-auto text-xs text-center text-gray-500 w-full">
        <thead
          className="p-2 text-sm"
          style={{
            backgroundColor: isDarkMode
              ? colors["Grey_Darken-4"]
              : colors.Table_header,
          }}
        >
          <tr>
            <th className="px-4">
              <Checkbox
                mode="sm"
                onChange={() => {
                  const allSelected = rows.every((row) => row.isSelected);
                  setRows(
                    rows.map((row) => ({ ...row, isSelected: !allSelected }))
                  );
                }}
                checked={rows.every((row) => row.isSelected)}
              />
            </th>
            <th className="px-4">NO</th>
            {fields.map((field) => (
              <th key={field} className="px-4 py-2">
                {fieldLabel[field as keyof RepairRow]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={index}
              className="text-center transition duration-150 ease-in-out hover:bg-gray-200 hover:shadow-md"
              style={{
                color: isDarkMode
                  ? colors["Grey_Default"]
                  : colors["Grey_Darken-4"],
                borderBottom: `1px solid ${colors["Grey_Lighten-2"]}`,
              }}
            >
              <td className="px-4 border-b-Grey_Darken_4">
                <Checkbox
                  mode="sm"
                  onChange={() => handleCheckboxChange(index)}
                  checked={row.isSelected}
                />
              </td>
              <td className="py-2 border-b-Grey_Darken_4">{index + 1}</td>
              {isEditing && row.isSelected
                ? Object.keys(row).map((field: keyof RepairRow) =>
                    field !== "isNew" && field !== "isSelected" ? (
                      <td
                        key={field}
                        className="w-[140px] border-b-Grey_Darken_4"
                      >
                        <EditableRender
                          row={row}
                          field={field}
                          index={index}
                          isEditing={isEditing}
                          handleInputChange={handleInputChange}
                        />
                      </td>
                    ) : null
                  )
                : Object.keys(row).map((field: keyof RepairRow) =>
                    field !== "isNew" && field !== "isSelected" ? (
                      <td key={field} className="border-b-Grey_Darken_4">
                        {field === "repairDate"
                          ? row[field]
                            ? new Date(row[field]).toLocaleDateString()
                            : "N/A"
                          : row[field]}
                      </td>
                    ) : null
                  )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center mt-4">
        <Button mode="sm" onClick={addRow} content="추가" color="signature" />
        <Button mode="sm" onClick={toggleEdit} color="Button_Default">
          {isEditing ? "완료" : "수정"}
        </Button>
      </div>
    </div>
  );
};

export default EquipmentPage;
