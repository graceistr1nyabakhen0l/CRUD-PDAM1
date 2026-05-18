import { Bill } from "@/app/types"
import { get, post } from "@/lib/action"


const token = process.env.NEXT_PUBLIC_TOKEN || `accessToken`;
const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL || `http://localhost:3000`


export const getBillsByCustomer = async (params?: { [key: string]: string | number | undefined }): Promise<{ counts: number, bills: Bill[] }> => {
    try {
        const queryParams: string = params ? Object.keys(params).filter(key => typeof params[key] !== `undefined`).map(key => `${key}=${params[key]}`).join(`&`) : ``
        const url = `${BASE_API_URL}/bills/me?${queryParams}`


        const { data } = await get(url, token)
        if (data?.success == true) {
            return {
                counts: data.count,
                bills: [...data.data]
            }
        }
        return { counts: 0, bills: [] }
    } catch (error) {
        console.log(error);
        return { counts: 0, bills: [] }
    }
}


export const getBillById = async (id: number) => {
    const url = `${BASE_API_URL}/bills/me/${id}`


    const res = await get(url, token)


    if (!res || !res.data) {
        throw new Error("Failed to fetch bill")
    }


    return res.data.data
}


export const addPayment = async (payload: FormData):
    Promise<Record<string, never>> => {
    const url = `${BASE_API_URL}/payments`
    const { data } = await post(url, payload, token)
    return data;
}
