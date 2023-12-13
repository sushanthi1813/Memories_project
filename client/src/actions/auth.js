import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';
import axios from "axios"


export const signin = (formData, router) => async (dispatch) =>  {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: "AUTH", data });

    router("/");
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    // const { data } = await api.signUp(formData);
    const {data} = await axios.post("http://localhost:4000/user/signup", formData)
    console.log("Hii");
    dispatch({ type: AUTH, data });

    router("/")
  } catch (error) {
    console.log(error);
  }
};