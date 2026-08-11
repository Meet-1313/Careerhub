import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

import {
    MapPin,
    Building2,
    BriefcaseBusiness,
} from "lucide-react";

import {
    getMyApplications,
    deleteApplication,
} from "@/services/applicationService";
import Loading from '@/components/shared/Loading';
import { toast } from "sonner";
import Pagination from "@/components/shared/Pagination";
function MyApplications() {

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [applications, setApplications] = useState([]);
    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const token = localStorage.getItem("token");
                const data = await getMyApplications(token, currentPage);
                setApplications(data.applications);
                setTotalPages(data.totalPages);
            } catch (err) {
                console.error(err);
                toast.error(
                    err.response?.data?.message || "Failed to fetch applications. Please try again.",
                )
            }

        };

        fetchApplications();

    }, [currentPage]);

    const handleWithdraw = async (applicationId) => {

        const confirmWithdraw = window.confirm(
            "Are you sure you want to withdraw this application?"
        );

        if (!confirmWithdraw) return;

        try {

            const token = localStorage.getItem("token");

            await deleteApplication(applicationId, token);

            setApplications(
                applications.filter(
                    (application) =>
                        application._id !== applicationId
                )
            );
            toast.success("Application withdrawn successfully!");
        } catch (err) {

            console.error(err);
            toast.error(
                err.response?.data?.message || "Failed to withdraw application. Please try again.",
            )

        }

    };

    const getStatusColor = (status) => {

        switch (status) {

            case "accepted":
                return "bg-green-100 text-green-700";

            case "rejected":
                return "bg-red-100 text-red-700";

            default:
                return "bg-yellow-100 text-yellow-700";
        }

    };
    if (!applications) {
        return <Loading />;
    }

    return (
        <div className="max-w-6xl mx-auto p-8">

            <h1 className="text-3xl font-bold mb-8">
                My Applications
            </h1>

            {applications.length === 0 ? (

                <div className="text-center py-20">

                    <h2 className="text-2xl font-semibold">
                        No Applications Yet
                    </h2>

                    <p className="text-muted-foreground mt-2">
                        Start applying for jobs to see them here.
                    </p>

                </div>

            ) : (

                <div className="space-y-6">

                    {applications.map((application) => (

                        <div
                            key={application._id}
                            className="border rounded-xl p-6 shadow-sm"
                        >

                            <div className="flex justify-between items-start">

                                <div>

                                    <h2 className="text-2xl font-bold">
                                        {application.job?.title || 'Job no longer available'}
                                    </h2>

                                    <div className="flex items-center gap-2 mt-2 text-muted-foreground">

                                        <Building2 className="w-4 h-4" />

                                        {application.job?.company.name || 'Company no longer available'}

                                    </div>

                                    <div className="flex flex-wrap gap-5 mt-5 text-sm text-muted-foreground">

                                        <div className="flex items-center gap-2">

                                            <MapPin className="w-4 h-4" />

                                            {application.job?.location || 'Location not available'}

                                        </div>

                                        <div className="flex items-center gap-2">

                                            <BriefcaseBusiness className="w-4 h-4" />

                                            {application.job?.jobType || 'Job type not available'}

                                        </div>

                                    </div>

                                </div>

                                <span
                                    className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}
                                >
                                    {application.status ? application.status : 'Status not available'}
                                </span>

                            </div>

                            <div className="flex gap-3 mt-6">

                                <Link
                                    to={application.job ? `/${application.job._id}` : "#"}
                                >
                                    <Button>
                                        View Job
                                    </Button>
                                </Link>

                                <Button
                                    variant="destructive"
                                    onClick={() =>
                                        handleWithdraw(application._id)
                                    }
                                >
                                    Withdraw
                                </Button>

                            </div>

                        </div>

                    ))}

                </div>

            )}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />

        </div>
    );
}

export default MyApplications;