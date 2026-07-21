import api from "@/lib/api";

export async function getReports(token: string) {
    const response = await api.get("/report/", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}

export async function searchReports(
    query: string,
    token: string,
) {

    const response = await api.get(
        `/report/search?q=${encodeURIComponent(query)}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
}

export async function getDashboardStats(
    token: string,
) {

    const response = await api.get(
        "/report/stats",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
}

export async function getReport(
    id: number,
    token: string,
) {
    const response = await api.get(`/report/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}

export async function deleteReport(
    id: number,
    token: string,
) {
    const response = await api.delete(`/report/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}