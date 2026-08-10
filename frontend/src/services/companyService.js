import axios from "axios";

const API_URL = axios.create({
    baseURL: "http://localhost:5000/api/companies",
})

export const getMyCompanies = async (token,page=1,limit=10) => {
    const response = await API_URL.get("/my-companies",{
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            page,
            limit
        }
    });
    return response.data;
}

export const createCompany = async (companyData, token) => {

    const response = await API_URL.post(
        "/",
        companyData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

export const deleteCompany = async (id, token) => {

    const response = await API_URL.delete(
        `/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

export const getCompanyById = async (id, token) => {

    const response = await API_URL.get(
        `/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

export const updateCompany = async (
    id,
    companyData,
    token
) => {

    const response = await API_URL.put(
        `/${id}`,
        companyData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};