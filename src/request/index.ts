import { API_ORIGIN } from "../constants";

const BASE_URL = `${API_ORIGIN}`;

type ResponseErr = {
  success: false;
  error: any;
};
type SignInSuccess = {
  success: true;
  data: any;
};
export type ReqParams = {
  path: string;
  payload?: any;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  isFormdata?: boolean;
};

const request = async ({
  path,
  method,
  payload,
  isFormdata,
}: ReqParams): Promise<SignInSuccess | ResponseErr> => {
  try {
    const payloadStr = JSON.stringify(payload);

    const config: RequestInit = {
      method: method || "GET",
      credentials: "include",
    };
    if (isFormdata) {
      const formData = payload as FormData;
      config.body = formData;
      // config.headers = {};
    } else {
      config.headers = {
        "Content-Type": "application/json",
      };
      config.body = payload ? payloadStr : null;
    }
    const response = await fetch(`${BASE_URL}${path}`, {
      ...config,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }
    return {
      success: true,
      data,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export default request;
