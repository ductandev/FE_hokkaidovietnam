import axios from "axios";

//setup hằng số
export const DOMAIN = "https://hokkaido.ductandev.io.vn";
export const TOKEN = "accessToken";
export const USER_LOGIN = "hk_tk_access";

export const { getStoreJson, setStoreJson, getStore, setStore, clearStorage } = {
  getStoreJson: (name: string): any => {
    if (localStorage.getItem(name)) {
      const strResult: string | null | any = localStorage.getItem(name);
      return JSON.parse(strResult);
    }
    return undefined;
  },
  setStoreJson: (name: string, data: any): void => {
    const strJSON = JSON.stringify(data);
    localStorage.setItem(name, strJSON);
  },
  getStore: (name: string): string | null => {
    return localStorage.getItem(name);
  },
  setStore: (name: string, data: string): void => {
    localStorage.setItem(name, data);
  },
  clearStorage: (name: string) => {
    localStorage.removeItem(name);
  },
};

//interceptor
export const http = axios.create({
  baseURL: DOMAIN,
  timeout: 30000,
});

export const httpNonAuth = axios.create({
  baseURL: DOMAIN,
  timeout: 30000,
});

httpNonAuth.interceptors.request.use(
  (config: any) => {
    config.baseURL = DOMAIN;
    config.headers = { ...config.headers };
    return config;
  },
  (err: any) => {
    return Promise.reject(err);
  }
);

http.interceptors.request.use(
  (config: any) => {
    config.headers = { ...config.headers };
    let token = getStore(USER_LOGIN);
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (err: any) => {
    return Promise.reject(err);
  }
);


//Cấu hình cho response (kết quả trả về từ api)
http.interceptors.response.use(
  (res: any) => {
    return res;
  },
  (err: any) => {
    console.log(err);
    console.log(err.response?.status);

    if (err.response?.status === 401) {
      // alert("Đăng nhập để vào trang này !");

      return Promise.reject(err);
    }
    if (err.response?.status === 403) {
      alert("Không đủ quyền truy cập vào trang này !");

      return Promise.reject(err);
    }
    return Promise.reject(err);
  }
);

/* statusCode thông dụng : 
    200: Dữ liệu gửi đi và nhận về kết quả thành công (OK)
    201: Dữ liệu khởi tạo thành công (Created)
    400: Bad request (lỗi không tìm thấy item trên backend)
    404: Not found (không tìm thấy link backend)
    500: Error in server (Lỗi xảy ra tại server - có thể do dữ liệu frontend gửi lên xử lý bị lỗi backend không catch trường hợp này thì ra 500 hoặc là backend code bị lỗi) => Xác định lỗi => mở post man request thử với data đúng thì có được hay không nếu vẫn lỗi thì báo backend fix
    401: UnAuthorize (Lỗi khi không có quyền truy cập vào api này (phải token hợp lệ ...))
    403: Forbiden ( Lỗi chưa đủ quyền truy cập vào api )
*/
