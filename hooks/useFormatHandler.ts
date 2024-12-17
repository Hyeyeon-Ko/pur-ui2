const useFormatHandler = () => {
  const formatCenterData = (centers: string[]) => {
    if (!centers || centers.length === 0) return "";
    const count = centers.length;

    if (count === 1) return centers[0];
    return `${centers[0]} 외 ${count - 1}개`;
  };

  const formatDate = (dateString: string | null | undefined): string => {
    if (!dateString || typeof dateString !== "string") {
      return "-"; // 빈 값 또는 잘못된 형식의 경우
    }

    try {
      // ISO 8601 또는 일반 날짜 형식 파싱
      const date = new Date(dateString.trim());
      if (isNaN(date.getTime())) {
        console.warn(`Invalid date format received: ${dateString}`);
        return "-"; // 날짜 변환 실패 시
      }

      // 날짜 형식을 YYYY.MM.DD로 변환
      const year = String(date.getFullYear());
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      return `${year}.${month}.${day}`;
    } catch (error) {
      console.error("Date formatting error:", error, dateString);
      return "-"; // 예외 발생 시
    }
  };

  const formatCurrency = (amount: string | number) => {
    if (!amount || amount === "유효하지 않은 금액") return "-";

    // 문자열이 이미 ₩로 시작하면 그대로 반환
    if (typeof amount === "string" && amount.startsWith("₩")) {
      return amount;
    }

    // 숫자나 문자열을 원화 형식으로 변환
    const validAmount = Number(amount);
    if (!isNaN(validAmount)) {
      return validAmount.toLocaleString("ko-KR", {
        style: "currency",
        currency: "KRW",
      });
    }

    return "-";
  };

  return {
    formatCenterData,
    formatDate,
    formatCurrency,
  };
};

export default useFormatHandler;
