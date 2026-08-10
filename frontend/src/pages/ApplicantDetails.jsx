import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import  Loading  from "@/components/shared/Loading";
import { Button } from "@/components/ui/button";

import {
    User,
    Mail,
    BriefcaseBusiness,
    Building2,
    FileText,
} from "lucide-react";

import {
    getApplicationById,
    updateApplicationStatus,
} from "@/services/applicationService";
import { toast } from "sonner";

function ApplicantDetails() {

    const { applicationId } = useParams();

    const [application, setApplication] = useState(null);

    useEffect(() => {

        const fetchApplication = async () => {

            try {
                const token = localStorage.getItem("token");
                const data = await getApplicationById(
                    applicationId,
                    token
                );
                setApplication(data.application);
            } catch (err) {

                console.error(err);
                toast.error(
                    err.response?.data?.message ||
                    "Failed to fetch application details"
                );
            }
        };
        fetchApplication();
    }, [applicationId]);

    const handleStatus = async (status) => {

        try {

            const token = localStorage.getItem("token");

            await updateApplicationStatus(
                application._id,
                status,
                token
            );

            setApplication({
                ...application,
                status,
            });

        } catch (err) {

            console.error(err);
            toast.error(
                err.response?.data?.message ||
                "Failed to update application status"
            );

        }

    };

    if (!application) {

        return (<Loading />);

    }

    return (

        <div className="max-w-4xl mx-auto  py-6 sm:py-10 px-4 sm:px-6">
            <h1 className="text-3xl sm:text-3xl font-bold mb-6 sm:mb-8">
                Applicant Details
            </h1>
            <div className="border rounded-xl p-5 sm:p-8 shadow-sm space-y-8">
                <div>
                    <h2 className="text-xl sm:text-xl font-semibold mb-4">
                        Applicant
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <User className="w-5 h-5" />
                            <span>
                                {application.applicant.username}
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5" />
                            <span>
                                {application.applicant.email}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="border-t pt-8">
                    <h2 className="text-xl font-semibold mb-4">
                        Job
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <BriefcaseBusiness className="w-5 h-5" />
                            <span>
                                {application.job.title}
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Building2 className="w-5 h-5" />
                            <span>
                                {application.job.company.name}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="border-t pt-8">
                    <h2 className="text-xl font-semibold mb-4">
                        Application Status
                    </h2>
                    <span
                        className={`px-4 py-2 rounded-full text-sm font-medium ${application.status === "Accepted"
                                ? "bg-green-100 text-green-700"
                                : application.status === "Rejected"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-yellow-100 text-yellow-700"
                            }`}>
                        {application.status}
                    </span>
                </div>
                <div className="border-t pt-8">
                    <h2 className="text-xl font-semibold mb-4">
                        Resume
                    </h2>
                    {application.applicant.resume ? (
                        <a
                            href={application.applicant.resume.url}
                            target="_blank"
                            rel="noreferrer">
                            <Button variant="outline">
                                <FileText className="w-4 h-4 mr-2" />
                                View Resume
                            </Button>
                        </a>
                    ) : (
                        <p className="text-red-500">
                            Resume not uploaded.
                        </p>
                    )}
                </div>
                <div className="border-t pt-8 flex gap-4">
                    <Button
                        disabled={application.status === "Accepted"}
                        onClick={() => handleStatus("Accepted")}>
                        {application.status === "Accepted"
                            ? "Accepted"
                            : "Accept"}
                    </Button>
                    <Button
                        variant="destructive"
                        disabled={application.status === "Rejected"}
                        onClick={() => handleStatus("Rejected")}>
                        {application.status === "Rejected"
                            ? "Rejected"
                            : "Reject"}
                    </Button>
                </div>
            </div>
        </div>
    );

}

export default ApplicantDetails;