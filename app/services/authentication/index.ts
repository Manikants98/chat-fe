import axio from "@/axios.config";

export const signInFn = async (reqbody: any): Promise<any> => {
  try {
    const { data } = await axio.post("/signin", reqbody);
    localStorage.setItem("chat_token", data.token);
    return data;
  } catch (error) {
    throw error;
  }
};

export const signUpFn = async (reqbody: any): Promise<any> => {
  try {
    const { data } = await axio.post("/signup", reqbody);
    localStorage.setItem("chat_token", data.token);
    return data;
  } catch (error) {
    throw error;
  }
};
