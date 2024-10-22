import { useEffect, useState } from "react";
import Button from "../ui/atoms/button/Button";
import Link from "next/link";
import Label from "../ui/atoms/label/Label";
import { RiLogoutCircleRLine } from "react-icons/ri";

const Navbar = () => {
  const [user, setUser] = useState(null);

  // 클라이언트에서만 실행되는 코드
  useEffect(() => {
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
          <Button
            mode="sm"
            color="signature"
            onClick={handleLogout}
            customStyle={{
              borderRadius: "25px",
              marginRight: "20px",
              display: "flex",
              gap: "4px",
              alignItems: "center",
            }}
          >
            <span>로그아웃</span>
            <RiLogoutCircleRLine className="my-1" />
          </Button>
        </div>
      ) : (
        <Link href="/login">
          <Button mode="xs" content="로그인" color="signature" />
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
