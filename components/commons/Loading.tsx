import Image from "next/image";
import React from "react";
import Label from "../ui/atoms/label/Label";

const Loading = () => {
  return (
    <div className="flex flex-col w-full h-[90%] justify-center items-center p-20">
      <Label mode="lg" content="잠시만 기다려 주세요!" />
      <div className="w-full flex justify-center">
        <Image
          src="/images/loading.gif"
          alt="로딩중"
          width="180"
          height="180"
        />
      </div>
    </div>
  );
};

export default Loading;
