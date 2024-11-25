import { toast } from "react-toastify";

export enum ToastType {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
}

const Toast = {
  notify: (message: string, type: ToastType) => {
    switch (type) {
      case ToastType.SUCCESS:
        toast.success(message, {
          position: "top-center",
          autoClose: 1000,
        });
        break;
      case ToastType.ERROR:
        toast.error(message, { position: "top-center", autoClose: 1000 });
        break;
      case ToastType.WARNING:
        toast.warning(message, {
          position: "top-center",
          autoClose: 1000,
        });
        break;
      case ToastType.INFO:
        toast.info(message, { position: "top-center", autoClose: 1000 });
        break;
      default:
        break;
    }
  },

  warningDownNotify: () =>
    Toast.notify("선택된 데이터가 없습니다.", ToastType.WARNING),
  successDownNotify: () =>
    Toast.notify("다운로드가 완료되었습니다.", ToastType.SUCCESS),
  errorDownNotify: () =>
    Toast.notify("다운로드에 실패했습니다.", ToastType.ERROR),
  successSaveNotify: () =>
    Toast.notify("저장이 완료되었습니다.", ToastType.SUCCESS),
  errorSaveNotify: () => Toast.notify("저장에 실패했습니다.", ToastType.ERROR),
  successUploadNotify: () =>
    Toast.notify("업로드가 완료되었습니다.", ToastType.SUCCESS),
  errorUploadNotify: () =>
    Toast.notify("업로드에 실패했습니다.", ToastType.ERROR),
  successModifyNotify: () =>
    Toast.notify("수정이 완료되었습니다.", ToastType.SUCCESS),
  errorModifyNotify: () =>
    Toast.notify("수정에 실패했습니다.", ToastType.ERROR),
  warningUploadNotify: () =>
    Toast.notify("선택된 파일이 없습니다.", ToastType.WARNING),
  successTenderNotify: () =>
    Toast.notify("조회에 성공했습니다.", ToastType.SUCCESS),
  errorTenderNotify: () =>
    Toast.notify(
      "조회에 실패했습니다. 입찰번호를 확인해 주세요.",
      ToastType.ERROR,
    ),
  warningTenderNotify: () =>
    Toast.notify("입찰번호를 입력해 주세요.", ToastType.WARNING),
};

export default Toast;
