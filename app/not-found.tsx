"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/atoms/button/Button";
import colors from "@/styles/colors";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFoundPage = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div
      style={{ backgroundColor: colors.signature, color: colors.white }}
      className="flex h-screen flex-col items-center justify-center gap-4"
    >
      <FaExclamationTriangle size={36} style={{ color: colors.warning }} />
      <h1 className="text-4xl font-bold text-white">
        페이지를 찾을 수 없습니다!
      </h1>
      <p className="mb-4">요청하신 페이지가 존재하지 않습니다.</p>
      <Button
        mode="md"
        content="이전 페이지로 돌아가기"
        onClick={handleGoBack}
        color="sub"
        customStyle={{ color: colors.signature }}
      />
    </div>
  );
};

export default NotFoundPage;
