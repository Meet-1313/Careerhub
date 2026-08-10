import { useState, useEffect } from "react";
import { getMyJobs } from "@/services/jobService";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, Clock } from "lucide-react";
import { getDaysAgo } from "@/utils/dateUtils";
import { Link } from "react-router-dom";
import { deleteJob } from "@/services/jobService";
import Loading from '@/components/shared/Loading';
import { toast } from "sonner";
import DeleteConfirmation from "@/components/shared/DeleteConfirmation";
import Pagination from "@/components/shared/Pagination";
function RecruiterDashboard() {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [jobs, setJobs] = useState([]);
    useEffect(() => {
        const fetchMyJobs = async () => {
            try {
                const token = localStorage.getItem('token');
                const data = await getMyJobs(token, currentPage);
                setJobs(data.jobs);
                setTotalPages(data.totalPages);
            } catch (err) {
                console.error(err);
                toast.error(
                    err.response?.data?.message || "Failed to fetch jobs. Please try again.",
                )
            }
        }
        fetchMyJobs();
    }, [currentPage]);

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await deleteJob(id, token);
            setJobs((prev) =>
            prev.filter((job) => job._id !== id)
        );
            toast.success("Job deleted successfully!");
        } catch (err) {
            console.error(err);
            toast.error(
                err.response?.data?.message || "Failed to delete job. Please try again.",
            )
        }
    };
    if (!jobs) {
        return <Loading />;
    }
    return (
        <div className="max-w-6xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-10">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-bold">
                        Recruiter Dashboard
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Manage all your job postings
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <Link to="/recruiter/jobs/new">
                        <Button className="w-full sm:w-auto">
                            + Post New Job
                        </Button>
                    </Link>
                    <Link to="/recruiter/company/new">
                        <Button className="w-full sm:w-auto">
                            + Create Company
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="space-y-6">

                {jobs.map((job) => (
                    <div
                        key={job._id}
                        className="border rounded-xl p-6 shadow-sm">
                        <div className="flex flex-col md:flex-row md:justify-between gap-4">
                            <div>
                                <h2 className="text-2xl sm:text-2xl font-semibold">
                                    {job.title}
                                </h2>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Building2 className="w-4 h-4" />
                                    <span>{job.company.name}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <MapPin className="w-4 h-4" />
                                    <span>{job.location}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Clock className="w-4 h-4" />
                                    <span>
                                        {getDaysAgo(job.createdAt)}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-4 mt-6">
                            {/* grid grid-cols-2 sm:flex gap-3 mt-6 */}
                            <Link to={`/recruiter/jobs/${job._id}/edit`}>
                                <Button variant="outline">
                                    Edit
                                </Button>
                            </Link>
                            <Link to={`/recruiter/jobs/${job._id}/applicants`}>
                                <Button variant="secondary">
                                    Applicants
                                </Button>
                            </Link>
                            {/* <Button variant="destructive" onClick={() => handleDelete(job._id)}>
                                Delete
                            </Button> */}
                            <Button
                                variant="destructive"
                                onClick={() => {
                                    setSelectedJob(job);
                                    setOpenDeleteDialog(true);
                                }}
                            >
                                Delete
                            </Button>
                            <Link to={`/${job._id}`}>
                                <Button>
                                    View Details
                                </Button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage} />
            <DeleteConfirmation
                open={openDeleteDialog}
                onOpenChange={setOpenDeleteDialog}
                title="Delete Job"
                description={`Are you sure you want to delete "${selectedJob?.title}"? This action cannot be undone.`}
                onConfirm={() => {
                    handleDelete(selectedJob._id);
                    setOpenDeleteDialog(false);
                }}
            />
        </div>
    );
}

export default RecruiterDashboard;