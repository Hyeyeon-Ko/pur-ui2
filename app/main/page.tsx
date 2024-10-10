"use client";

import Button from "@/components/ui/atoms/button/Button";
import Input from "@/components/ui/atoms/input/Input";
import Label from "@/components/ui/atoms/label/Label";
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
        color="Blue_B_Default"
        onClick={handleClick}
      />
      <Button
        mode="sm"
        content="sm버튼"
        customStyle={{ margin: "10px" }}
        color="Blue_B_Default"
        onClick={handleClick}
      />
      <Button
        mode="md"
        content="md버튼"
        customStyle={{ margin: "10px" }}
        color="Blue_B_Default"
        onClick={handleClick}
      />
      <Button
        mode="lg"
        content="lg버튼"
        color="Blue_B_Default"
        customStyle={{ margin: "10px" }}
        onClick={handleClick}
      />
      <Input
        mode="xs"
        color="Blue_B_Default"
        customStyle={{ margin: "10px" }}
        placeholder="xs인풋창"
      />
      <Input
        mode="sm"
        color="Blue_B_Default"
        customStyle={{ margin: "10px" }}
        placeholder="sm인풋창"
      />
      <Input
        mode="md"
        color="Blue_B_Default"
        customStyle={{ margin: "10px" }}
        placeholder="md인풋창"
      />
      <Input
        mode="lg"
        color="Blue_B_Default"
        customStyle={{ margin: "10px" }}
        placeholder="lg인풋창"
      />
      <Label mode="xs" content="xs 라벨" />
      <Label mode="sm" content="sm 라벨" />
      <Label mode="md" content="md 라벨" />
      <Label mode="lg" content="lg 라벨" />
    </div>
  );
};

export default MainPage;
