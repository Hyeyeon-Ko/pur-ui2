"use client";

import Button from "@/components/ui/Button";
import React from "react";

const MainPage = () => {
  const handleClick = () => {
    console.log("Button Clicked");
  };

  return (
    <div>
      <Button
        mode="xs"
        content="xs버튼"
        customStyle={{ margin: "10px" }}
        onClick={handleClick}
      />
      <Button
        mode="sm"
        content="sm버튼"
        customStyle={{ margin: "10px" }}
        onClick={handleClick}
      />
      <Button
        mode="md"
        content="md버튼"
        customStyle={{ margin: "10px" }}
        onClick={handleClick}
      />
      <Button
        mode="lg"
        content="lg버튼"
        customStyle={{ margin: "10px" }}
        onClick={handleClick}
      />
    </div>
  );
};

export default MainPage;
