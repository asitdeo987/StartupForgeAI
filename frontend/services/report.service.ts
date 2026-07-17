import api from "@/lib/api"
import { ReportRequest } from "@/types/report"

export const generateReport = async (
    data: ReportRequest,
    token: string
) => {

    const response = await api.post(
        "/report/generate",
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )

    return response.data
}