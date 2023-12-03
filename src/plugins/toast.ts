import { toast, type ToastOptions } from "vue3-toastify";

class toastService {
  default(message: string) {
    toast(message, {
      autoClose: 2000,
      position: toast.POSITION.TOP_RIGHT,
      theme: "dark",
    } as ToastOptions);
  }
  
  success(message: string) {
    toast.success(message, {
      autoClose: 2000,
      position: toast.POSITION.TOP_RIGHT,
      theme: "dark",
    } as ToastOptions);
  }
  error(message: string) {
    toast.error(message, {
      autoClose: 2000,
      position: toast.POSITION.TOP_RIGHT,
      theme: "dark",

    } as ToastOptions);
  }

  info(message: string) {
    toast.info(message, {
      autoClose: 2000,
      position: toast.POSITION.TOP_RIGHT,
      theme: "dark",

    } as ToastOptions);
  }
  warning(message: string) {
    toast.warning(message, {
      autoClose: 2000,
      position: toast.POSITION.TOP_RIGHT,
      theme: "dark",
    } as ToastOptions);
  }
}

export default new toastService();
