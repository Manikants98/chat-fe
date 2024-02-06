import axio from '@/app/(configs)/axios.config';

export const signInFn = async (reqbody: any) => {
  try {
    const { data } = await axio.post('/signin', reqbody);
    localStorage.setItem('chat_token', data.token);
    console.log(data.message);
    return data;
  } catch (error) {
    console.log({ error });
  }
};
export const signUpFn = async (reqbody: any) => {
  try {
    const { data } = await axio.post('/signup', reqbody);
    localStorage.setItem('chat_token', data.token);
    console.log(data.message);
    return data;
  } catch (error) {
    console.log({ error });
  }
};
