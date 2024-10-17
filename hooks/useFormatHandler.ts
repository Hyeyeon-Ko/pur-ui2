const useFormatHandler = () => {
  const formatCenterData = (centers: string[]) => {
    if (!centers || centers.length === 0) return "";
    const count = centers.length;

    if (count === 1) return centers[0];
    return `${centers[0]} 외 ${count - 1}개`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = String(date.getFullYear()).slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  const formatCurrency = (amount: string | number) => {
    return amount.toLocaleString("ko-KR", {
      style: "currency",
      currency: "KRW",
    });
  };

  return {
    formatCenterData,
    formatDate,
    formatCurrency,
  };
};

export default useFormatHandler;
