"use client";

import React from "react";

import { RiLogoutCircleRLine } from "react-icons/ri";
import Link from "next/link";
import colors from "@/styles/colors";
import Label from "@/components/ui/atoms/label/Label";
import Button from "@/components/ui/atoms/button/Button";

interface UserInfoProps {
  user: { employeeId: string };
  onLogout: () => void;
  isDarkMode?: boolean;
}

const UserInfo: React.FC<UserInfoProps> = ({ user, onLogout, isDarkMode }) => {
  return (
    <div className="flex items-center gap-4">
      <Label
        customStyle={{
          color: isDarkMode ? colors.white : colors["Grey_Darken-5"],
        }}
        content={user.employeeId}
        mode="lg"
      />
      <Link href="/login">
        <Button
          mode="sm"
          color="signature"
          onClick={onLogout}
          customStyle={{
            borderRadius: "25px",
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            alignItems: "center",
            padding: "12px 20px",
            minWidth: "120px",
          }}
        >
          <span>로그아웃</span>
          <RiLogoutCircleRLine className="my-1" />
        </Button>
      </Link>
    </div>
  );
};

export default UserInfo;
