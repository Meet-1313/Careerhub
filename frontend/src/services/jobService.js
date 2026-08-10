import axios from "axios";

const API_URL = axios.create({
    baseURL: "http://localhost:5000/api/job",
})

export const getJobs = async (search='',
    location='', jobType='', experience='', sort='',page=1,limit=10
) => {
    const response = await API_URL.get("/",{
        params: {
            search,location,jobType,experience,sort,page,limit
        }
    });
    return response.data;
}

export const getJobById = async (id,token) => {
    const response = await API_URL.get(`/${id}`,{
         headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

export const applyToJob = async (jobId, token) => {
    const response = await API_URL.post(
        `/${jobId}/apply`,{},{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response.data;
}

export const getMyJobs = async (token,page=1,limit=10) => {
    const response = await API_URL.get("/my-jobs",{
        headers: {
            Authorization: `Bearer ${token}`,
        },
         params:{
            page,limit
        }
    });
    return response.data;
}

export const createJob = async (jobData, token) => {
    const response = await API_URL.post("/", jobData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

export const updateJob = async (id, jobData, token) => {

    const response = await API_URL.put(
        `/${id}`,
        jobData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

export const deleteJob = async (id, token) => {
    const response = await API_URL.delete(`/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}