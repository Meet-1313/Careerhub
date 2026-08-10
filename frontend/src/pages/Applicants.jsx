import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getApplicants } from "@/services/applicationService";
import {
    User,
    Mail,
    CircleCheck,
    CircleX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { updateApplicationStatus } from "@/services/applicationService";
import Loading from "@/components/shared/Loading";
import { toast } from "sonner";
import Pagination from "@/components/shared/Pagination";
function Applicants() {
    const { jobId } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [applications, setApplications] = useState([]);
    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const token = localStorage.getItem('token');
                const data = await getApplicants(jobId, token,currentPage);
                console.log(data);
                setApplications(data.applications);
                setTotalPages(data.totalPages);
            } catch (err) {
                console.error(err);
                toast.error(
                    err.response?.data?.message || "Failed to fetch applicants"
                );
            }
        }
        fetchApplicants();
    }, [currentPage]);

    const handleStatusChange = async (applicationId, status) => {
        try {
            const token = localStorage.getItem('token');
            await updateApplicationStatus(applicationId, status, token);
            setApplications(
                applications.map((application) =>
                    application._id === applicationId
                        ? { ...application, status }
                        : application
                )
            );
        } catch (err) {
            console.error(err);
            toast.error(
                err.response?.data?.message || "Failed to update application status"
            );
        }
    }
    if (!applications) {
        return <Loading />;
    }
    return (
    <div className="max-w-5xl mx-auto py-10 px-6">

        <h1 className="text-3xl font-bold mb-8">
            Applicants
        </h1>

        {applications.length === 0 ? (

            <div className="text-center py-20">

                <h2 className="text-2xl font-semibold">
                    No applicants yet
                </h2>

                <p className="text-muted-foreground mt-2">
                    Applications will appear here once people apply.
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

                                <div className="flex items-center gap-2 mb-3">

                                    <User className="w-5 h-5 text-muted-foreground" />

                                    <h2 className="text-xl font-semibold">
                                        {application.applicant.username}
                                    </h2>

                                </div>

                                <div className="flex items-center gap-2 text-muted-foreground">

                                    <Mail className="w-4 h-4" />

                                    <span>
                                        {application.applicant.email}
                                    </span>

                                </div>

                            </div>

                            <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    application.status === "Accepted"
                                        ? "bg-green-100 text-green-700"
                                        : application.status === "Rejected"
                                        ? "bg-red-100 text-red-700"
                                        : "bg-yellow-100 text-yellow-700"
                                }`}
                            >
                                {application.status}
                            </span>

                        </div>

                        <div className="mt-6">

                            <Link
                                to={`/recruiter/applications/${application._id}`}
                            >
                                <Button>
                                    View Details
                                </Button>
                            </Link>

                        </div>

                    </div>

                ))}

            </div>

        )}
        <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}/>
    </div>
);
}

export default Applicants;