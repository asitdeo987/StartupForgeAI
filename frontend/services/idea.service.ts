import api from "@/lib/api";
import { IdeaRequest, IdeaResponse } from "@/types/idea";

export const refineIdea = async(
    data: IdeaRequest, token: string
): Promise<IdeaResponse> => {
    const response = await api.post("/ideas/refine", data,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}