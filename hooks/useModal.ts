import { useState, useCallback } from "react";

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [otherReason, setOtherReason] = useState("");

  const openModal = useCallback(() => {
    setSelectedValue("");
    setOtherReason("");
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedValue("");
    setOtherReason("");
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    openModal,
    closeModal,
    selectedValue,
    setSelectedValue,
    otherReason,
    setOtherReason,
  };
};

export default useModal;
