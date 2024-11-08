import React from "react";

import Input from "../../atoms/input/Input";
import colors from "@/styles/colors";
import LabelSelect from "../../molecules/selects/LabelSelect";

interface ModalContentProps {
  state: {
    selectedFile: string;
    selectedReason: string;
    otherReason: string;
  };
  dispatch: React.Dispatch<{ type: string; payload?: any }>;
  fileOptions: { value: string; label: string }[];
  reasonOptions: { value: string; label: string }[];
}

const DownModalContent: React.FC<ModalContentProps> = ({
  state,
  dispatch,
  fileOptions,
  reasonOptions,
}) => {
  return (
    <div className="flex flex-col px-8">
      <LabelSelect
        selectMode="sm"
        label="다운로드 파일"
        placeholder="파일다운로드"
        value={state.selectedFile}
        onChange={(e) =>
          dispatch({ type: "SET_FILE", payload: e.target.value })
        }
        options={fileOptions}
        customStyle={{ width: "220px", borderColor: colors.Button_Default }}
      />
      <LabelSelect
        selectMode="sm"
        label="다운로드 사유"
        value={state.selectedReason}
        onChange={(e) =>
          dispatch({ type: "SET_REASON", payload: e.target.value })
        }
        options={reasonOptions}
        placeholder="다운로드 사유"
        customStyle={{ width: "220px", borderColor: colors.Button_Default }}
      />
      {state.selectedReason === "etc" && (
        <Input
          mode="sm"
          color="Button_Default"
          type="text"
          placeholder="사유를 입력하세요"
          value={state.otherReason}
          onChange={(e) =>
            dispatch({ type: "SET_OTHER_REASON", payload: e.target.value })
          }
          customStyle={{ width: "330px" }}
        />
      )}
    </div>
  );
};

export default DownModalContent;
