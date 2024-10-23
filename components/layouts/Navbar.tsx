import { useEffect, useState } from "react";
import Button from "../ui/atoms/button/Button";
import Link from "next/link";
import Label from "../ui/atoms/label/Label";
import { RiLogoutCircleRLine } from "react-icons/ri";
import ThemeToggle from "../ui/molecules/buttons/ThemeToggle";

const Navbar = () => {
  const [user, setUser] = useState(null);

  // 클라이언트에서만 실행되는 코드
  useEffect(() => {
    // 컴포넌트가 마운트될 때 로컬 스토리지에서 사용자 정보를 가져옴
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    // 로컬스토리지에서 사용자 정보 삭제
    localStorage.removeItem("user");
    // 사용자 상태 업데이트
    setUser(null);
  };

  return (
    <nav className="p-1 mx-4 flex justify-end items-center">
      {user ? (
        <div className="flex gap-4 items-center">
          <Label content={user.employeeId} mode="lg" />
          <Link href="/login">
            <Button
              mode="sm"
              color="signature"
              onClick={handleLogout}
              customStyle={{
                borderRadius: "25px",
                display: "flex",
                gap: "4px",
                alignItems: "center",
                marginRight: "12px",
              }}
            >
              <span>로그아웃</span>
              <RiLogoutCircleRLine className="my-1" />
            </Button>
          </Link>
        </div>
      ) : (
        <Link href="/login">
          <Button
            mode="xs"
            content="로그인"
            color="signature"
            customStyle={{
              borderRadius: "25px",
              display: "flex",
              gap: "4px",
              alignItems: "center",
            }}
          />
        </Link>
      )}
      <ThemeToggle />
    </nav>
  );
};

export default Navbar;
