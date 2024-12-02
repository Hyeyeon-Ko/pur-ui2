"use client";

import colors from "@/styles/colors";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import Toast, { ToastType } from "@/components/commons/Toast";
import { useDarkMode } from "@/context/DarkModeContext";
import Label from "@/components/ui/atoms/label/Label";
import LabelInput from "@/components/ui/molecules/inputs/LabelInput";
import Button from "@/components/ui/atoms/button/Button";

const LoginBody = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { isDarkMode } = useDarkMode();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 입력 값 검증
    if (!employeeId || !password) {
      Toast.notify("사원번호와 비밀번호를 입력하세요.", ToastType.ERROR);
      return;
    }

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: employeeId, userPw: password }),
      });

      const data = await response.json();
      console.log("data:", data.message);

      // 응답 상태 확인
      if (data.message === "성공") {
        // 로그인 성공 처리
        localStorage.setItem(
          "user",
          JSON.stringify({ userId: employeeId, token: data.token }),
        );
        Toast.notify("로그인에 성공했습니다!", ToastType.SUCCESS);
        router.push("/main"); // 로그인 성공 후 메인 페이지로 이동
      } else {
        // 로그인 실패 처리
        Toast.notify("아이디와 비밀번호를 확인하세요.", ToastType.ERROR);
      }
    } catch (error) {
      console.error("로그인 요청 처리 중 오류:", error);
      Toast.notify("서버 오류가 발생했습니다.", ToastType.ERROR);
    }
  };

  return (
    <div
      style={{ backgroundColor: colors.signature }}
      className="flex h-screen items-center justify-center shadow-lg"
    >
      <form
        onSubmit={handleSubmit}
        className="w-96 space-y-4 rounded-3xl px-6 py-12"
        style={{ backgroundColor: colors.white }}
      >
        <div
          className="mx-auto flex w-[70%] justify-center rounded-3xl border shadow-lg"
          style={{ backgroundColor: colors.signature }}
        >
          <Label
            mode="lg"
            content="PURCHASE LOGIN"
            customStyle={{ color: colors.white, padding: "8px" }}
          />
        </div>
        <div className="flex flex-col py-16">
          <div>
            <LabelInput
              labelMode="sm"
              labelContent="사원번호"
              labelColor="signature"
              labelFontWeight="bold"
              inputMode="sm"
              inputColor="Button_Default"
              inputType="text"
              placeholder="사원번호를 입력하세요"
              value={employeeId}
              onChange={e => setEmployeeId(e.target.value)}
              customStyle={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                color: isDarkMode ? colors.signature : colors.signature,
              }}
            />
          </div>
          <div>
            <LabelInput
              labelMode="sm"
              labelContent="비밀번호"
              labelColor="signature"
              labelFontWeight="bold"
              inputMode="sm"
              inputColor="Button_Default"
              inputType="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={e => setPassword(e.target.value)}
              customStyle={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                color: isDarkMode ? colors.signature : colors.signature,
              }}
            />
          </div>
        </div>
        <div className="flex justify-center pb-10">
          <Button
            mode="md"
            content="로그인"
            color="signature"
            type="submit"
            customStyle={{ borderRadius: "25px", width: "160px" }}
          />
        </div>
      </form>
    </div>
  );
};

export default LoginBody;
