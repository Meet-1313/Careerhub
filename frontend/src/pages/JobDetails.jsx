import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getJobById } from "@/services/jobService";
import { Button } from "@/components/ui/button";
import { applyToJob } from "@/services/jobService";
import { useAuth } from "@/context/AuthContext";
import Loading from '@/components/shared/Loading';
import { toast } from "sonner";
function JobDetails() {
    const { id } = useParams();
    const { user } = useAuth();
    console.log(id);
    const [job, setJob] = useState(null);
    const [applied, setApplied] = useState(false);
    useEffect(() => {
        const fetchJob = async () => {
            try {
                const token = localStorage.getItem('token');
                const data = await getJobById(id, token);
                console.log(data);
                setJob(data.job);
                setApplied(data.alreadyApplied);
            } catch (err) {
                console.error(err);
                toast.error(
                    err.response?.data?.message || "Failed to fetch job. Please try again.",
                )
            }
        }
        fetchJob();
    }, [id]);
    if (!job) {
        return <Loading />;
    }
    const handleApply = async () => {
        try {
            const token = localStorage.getItem('token');
            const data = await applyToJob(job._id, token);
            console.log(data);
            setApplied(true);
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div className="max-w-5xl mx-auto p-8">

            <div className='space-y-4 border-b pb-8'>
                <h1 className="text-4xl font-bold">
                    {job.title}
                </h1>
                <p className="text-xl text-muted-foreground">
                    {job.company.name}
                </p>
                <div className="flex gap-3 flex-wrap">
                    <span className="rounded-full bg-muted px-3 py-1">
                        {job.location}
                    </span>

                    <span className="rounded-full bg-muted px-3 py-1">
                        {job.jobType}
                    </span>

                    <span className="rounded-full bg-muted px-3 py-1">
                        {job.experience}+ Years
                    </span>

                    <span className="rounded-full bg-muted px-3 py-1">
                        ₹ {(job.salary / 100000).toFixed(1)} LPA
                    </span>
                </div>
            </div>

            <div className="mt-10">

                <h2 className="text-2xl font-semibold mb-4">
                    Job Description
                </h2>

                <p className="leading-8 text-muted-foreground">
                    {job.description}
                </p>

            </div>

            <div className="mt-10">

                <h2 className="text-2xl font-semibold mb-4">
                    Company
                </h2>

                <div className="rounded-lg border p-6 space-y-3">

                    <h3 className="text-xl font-semibold">
                        {job.company.name}
                    </h3>

                    <p>
                        📍 {job.company.location}
                    </p>

                    <a
                        href={job.company.website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline"
                    >
                        Visit Website
                    </a>

                </div>

            </div>

            <div className="mt-10">

                {/* <Button size="lg" onClick={handleApply} disabled={applied}>
                    {applied ? "Applied" : "Apply Now"}
                </Button> */}
                {user?.role === "jobseeker" && (
                    <div className="mt-10">

                        <Button
                            size="lg"
                            onClick={handleApply}
                            disabled={applied}
                        >
                            {applied ? "Applied" : "Apply Now"}
                        </Button>

                    </div>
                )}

            </div>
        </div>
    );
}

export default JobDetails;