import api from "@/lib/api";

export async function generatePitch(
    reportId: number,
    token: string
) {
    const response = await api.post(
        `/pitch/generate/${reportId}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
}

export async function getPitch(
    reportId: number,
    token: string
) {
    const response = await api.get(
        `/pitch/${reportId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
}

export async function getAllPitches(
    token: string
) {
    const response = await api.get(
        "/pitch",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
}

export async function downloadPitchPPT(
    reportId: number,
    token: string
) {
    const response = await api.get(
        `/pitch/${reportId}/ppt`,
        {
            responseType: "blob",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
}