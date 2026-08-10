import React from 'react'
import { Globe, MapPin } from "lucide-react";
import { useState, useEffect } from 'react';
import { getMyCompanies } from "@/services/companyService";
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";
import { deleteCompany } from "@/services/companyService";
import Loading from '@/components/shared/Loading';
import { toast } from "sonner";
import Pagination from "@/components/shared/Pagination";
import DeleteConfirmation from '@/components/shared/DeleteConfirmation';
const Companies = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [companies, setCompanies] = useState([]);
    useEffect(() => {
        const fetchMyCompanies = async () => {
            try {
                const token = localStorage.getItem('token');
                const data = await getMyCompanies(token, currentPage);
                console.log(data);
                setCompanies(data.companies);
                setTotalPages(data.totalPages);
            } catch (err) {
                console.error(err);
                toast.error(
                    err.response?.data?.message || "Failed to fetch companies"
                )
            }
        }
        fetchMyCompanies();
    }, [currentPage]);

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await deleteCompany(id, token);
            setCompanies((prev) =>
                prev.filter((company) => company._id !== id)
            );
        } catch (err) {
            console.error(err);
            toast.error(
                err.response?.data?.message || "Failed to delete company"
            );
        }

    };
    if (!companies) {
        return <Loading />;
    }
    return (
        <div className="max-w-6xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
                <h1 className="text-3xl sm:text-3xl font-bold">
                    My Companies
                </h1>
                <Link to="/recruiter/company/new">
                    <Button className="w-full md:w-auto">
                        + Create Company
                    </Button>
                </Link>
            </div>

            {companies.length === 0 ? (
                <div className="text-center py-20">
                    <h2 className="text-2xl font-semibold">
                        No companies yet
                    </h2>
                    <p className="text-muted-foreground mt-2">
                        Create your first company to start posting jobs.
                    </p>
                </div>
            ) : (
                <div className="space-y-6">
                    {companies.map((company) => (
                        <div key={company._id} className="border rounded-xl p-6 shadow-sm">
                            <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-start">
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-bold">
                                        <Building2 className="w-5 h-5 inline-block mr-2" />
                                        {company.name}
                                    </h2>
                                    <p className="text-muted-foreground mt-2">
                                        {company.description}
                                    </p>
                                    <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4" />
                                            {company.location}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Globe className="w-4 h-4" />
                                            <a href={company.website} target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline">
                                                Visit Website
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">

                                <Link to={`/recruiter/company/${company._id}/edit`}>
                                    <Button variant="outline">
                                        Edit
                                    </Button>
                                </Link>
                                {/* <Button variant="destructive"
                                    onClick={() =>handleDelete(company._id)}>
                                    Delete
                                </Button> */}
                                <Button
                                    variant="destructive"
                                    onClick={() => {
                                        setSelectedCompany(company);
                                        setOpenDeleteDialog(true);
                                    }}
                                >
                                    Delete
                                </Button>

                            </div>
                        </div>
                    ))}
                </div>
            )}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage} />
            <DeleteConfirmation
                open={openDeleteDialog}
                onOpenChange={setOpenDeleteDialog}
                title="Delete Company"
                description={`Are you sure you want to delete "${selectedCompany?.name}"? This action cannot be undone.`}
                onConfirm={() => {
                    handleDelete(selectedCompany._id);
                    setOpenDeleteDialog(false);
                }}
            />
        </div>
    );
}

export default Companies
