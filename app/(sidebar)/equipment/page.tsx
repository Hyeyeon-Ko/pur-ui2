"use client";

import { useEffect, useState } from "react";
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
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // 데이터 로드 (여기서는 더미 데이터를 사용)
        // 실제 API 호출이 필요할 경우, 아래 주석을 해제하고 URL을 변경하세요
        // const response = await fetch("/api/equipData");
        // const data: RepairRow[] = await response.json();

        // 더미 데이터 사용
        const data: RepairRow[] = equipData; // 더미 데이터로 초기화
        setRows(data);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false); // 데이터 로드 완료 후 로딩 상태 변경
      }
    };

    loadData();
  }, []);

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
    const anyRowSelected = rows.some(row => row.isSelected);
    if (!anyRowSelected) {
      setIsEditing(false);
    } else {
      setIsEditing(!isEditing);
    }

    if (isEditing) {
      setRows(
        rows.map(row =>
          row.isSelected ? { ...row, isNew: false } : { ...row },
        ),
      );
      setRows(rows.map(row => ({ ...row, isSelected: false })));
    }
  };

  const handleInputChange = <K extends keyof RepairRow>(
    index: number,
    field: K,
    value: RepairRow[K],
  ) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const handleCheckboxChange = (index: number) => {
    const updatedRows = [...rows];
    updatedRows[index].isSelected = !updatedRows[index].isSelected;
    setRows(updatedRows);

    const anyRowSelected = updatedRows.some(row => row.isSelected);
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
      <table className="text-gray-500 w-full table-auto text-center text-xs">
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
                  const allSelected = rows.every(row => row.isSelected);
                  setRows(
                    rows.map(row => ({ ...row, isSelected: !allSelected })),
                  );
                }}
                checked={rows.every(row => row.isSelected)}
              />
            </th>
            <th className="px-4">NO</th>
            {fields.map(field => (
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
              className="hover:bg-gray-200 text-center transition duration-150 ease-in-out hover:shadow-md"
              style={{
                color: isDarkMode
                  ? colors["Grey_Default"]
                  : colors["Grey_Darken-4"],
                borderBottom: `1px solid ${colors["Grey_Lighten-2"]}`,
              }}
            >
              <td className="border-b-Grey_Darken_4 px-4">
                <Checkbox
                  mode="sm"
                  onChange={() => handleCheckboxChange(index)}
                  checked={row.isSelected}
                />
              </td>
              <td className="border-b-Grey_Darken_4 py-2">{index + 1}</td>
              {isEditing && row.isSelected
                ? (Object.keys(row) as (keyof RepairRow)[]).map(field =>
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
                    ) : null,
                  )
                : (Object.keys(row) as (keyof RepairRow)[]).map(field =>
                    field !== "isNew" && field !== "isSelected" ? (
                      <td key={field} className="border-b-Grey_Darken_4">
                        {field === "repairDate"
                          ? row[field]
                            ? new Date(
                                row[field] as string,
                              ).toLocaleDateString()
                            : "N/A"
                          : row[field]}
                      </td>
                    ) : null,
                  )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex items-center">
        <Button mode="sm" onClick={addRow} content="추가" color="signature" />
        <Button mode="sm" onClick={toggleEdit} color="Button_Default">
          {isEditing ? "완료" : "수정"}
        </Button>
      </div>
    </div>
  );
};

export default EquipmentPage;
