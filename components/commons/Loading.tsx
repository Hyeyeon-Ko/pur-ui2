import Image from "next/image";
import React from "react";
import Label from "../ui/atoms/label/Label";

const Loading = () => {
  return (
    <div className="flex h-[90%] w-full flex-col items-center justify-center p-20">
      <Label mode="lg" content="잠시만 기다려 주세요!" />
      <div className="flex w-full justify-center">
        <Image
          src="/images/loading.gif"
          alt="로딩중"
          width="180"
          height="180"
          unoptimized
        />
      </div>
    </div>
  );
};

export default Loading;
