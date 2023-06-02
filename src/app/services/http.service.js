/* eslint-disable indent */
import axios from "axios";
// import logger from "./log.service";
import { toast } from "react-toastify";
import configFile from "../config.json";

axios.defaults.baseURL = configFile.apiEndpoint;

axios.interceptors.request.use(
  function (config) {
    if (configFile.isFirebase) {
      const containSlash = /\/$/gi.test(config.url);
      config.url =
        (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
    }
    // console.log(config.url);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

function transformData(data) {
  return data
    ? Object.keys(data).map((key) => ({
        ...data[key]
      }))
    : [];
}

axios.interceptors.response.use(
  (response) => {
    if (configFile.isFirebase) {
      response.data = { content: transformData(response.data) };
    }
    return response;
  },
  function (error) {
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status <= 500;

    if (!expectedErrors) {
      // logger.log(error);
      console.log(error);
      toast.error("Somthing was wrong. Try it later");
      // toast("Unexpected error");
    }
    return Promise.reject(error);
  }
);

const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};

export default httpService;
