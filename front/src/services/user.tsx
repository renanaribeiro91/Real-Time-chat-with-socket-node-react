/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosRequestConfig } from "axios";
import { request } from "../adapters/RequisicaoAdapter";
import headersEndpoints from "../consts/headerEnponit";
import { IUser } from '../pages/SingUp/interfaces';


const headers: AxiosRequestConfig["headers"] = {
  ...headersEndpoints,
};

class UserService {
  static async createUser(data: any): Promise<any> {

    const requestOptions= {
      url: "/users",
      method: "POST",
      headers,
      data
    }


    return request(requestOptions).then((response) => {
      return response.data;
    });
  }

}

export default UserService;
