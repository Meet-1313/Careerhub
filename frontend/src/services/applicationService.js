import axios  from "axios";

const API_URL = axios.create({
    baseURL: "http://localhost:5000/api/application",
})

export const getApplicants = async (jobId, token,page=1,limit=10) => {
    const response = await API_URL.get(`/job/${jobId}`, {
        headers: {  
            Authorization: `Bearer ${token}`,
        },
        params:{
            page,limit
        }
    });
    return response.data;
}

export const getMyApplications = async (token,page=1,limit=10) => {
    const response = await API_URL.get("/me", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params:{
            page,limit
        }
    });
    return response.data;
}

export const updateApplicationStatus = async (applicationId, status, token) => {
    const response = await API_URL.put(
        `/${applicationId}`,{
            status
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
}

export const deleteApplication = async (applicationId, token) => {

    const response = await API_URL.delete(
        `/${applicationId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

export const getApplicationById = async (applicationId, token) => {

    const response = await API_URL.get(
        `/${applicationId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;

};