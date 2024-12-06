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
    // 입력값을 숫자로 변환
    const validAmount = Number(amount);

    // 숫자로 변환한 값이 유효한지 확인
    if (isNaN(validAmount)) {
      return "유효하지 않은 금액";
    }

    // 유효한 숫자일 경우 원화 형식으로 포맷팅
    return validAmount.toLocaleString("ko-KR", {
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
