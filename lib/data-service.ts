
import axios from "axios";

export class DataService {
    static async fetch<T>(serverUrl:string,endpoint:string):Promise<T | null> {
        try {
            const res = await axios.get<T>(`${serverUrl}/api/${endpoint}`);
            return res.data;
        } catch (error) {
            return this.handleAxiosError(error);
        }
    }

    static async post<TRequest, TResponse>(serverUrl:string,endpoint: string, data: TRequest): Promise<TResponse | null> {
        try {
            const res = await axios.post<TResponse>(`${serverUrl}/api/${endpoint}`, data);
            return res.data;
        } catch (error) {
            return this.handleAxiosError(error);
        }
    }

    static async put <TRequest, TResponse>(serverUrl:string,endpoint: string, data: TRequest): Promise<TResponse | null> {
        try {
            const res = await axios.put<TResponse>(`${serverUrl}/api/${endpoint}`, data);
            return res.data;
        } catch (error) {
            return this.handleAxiosError(error);
        }
    }

    static async delete<TResponse>(serverUrl: string,endpoint: string, data?: FormData): Promise<TResponse | null> {
        try {
            const res = await axios.delete<TResponse>(`${serverUrl}/api/${endpoint}`, {
            data,
            headers: data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {},
        });
            return res.data;
        } catch (error) {
            return this.handleAxiosError(error);
            
        }
    }

    static handleAxiosError(error: unknown) {
        if (axios.isAxiosError(error)) {
            console.log("Axios Error:", error.response?.data || error.message);
            return error.response?.data
        } else {
            console.log("Unexpected Error:", error);
            return null;
        }
    }
}
