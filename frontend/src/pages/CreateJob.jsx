import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import { getMyCompanies } from "@/services/companyService";
import { useNavigate } from "react-router-dom";
import { createJob } from "@/services/jobService";
import { toast } from "sonner";
function CreateJob() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        jobType: '',
        experience: '',
        salary: '',
        company: '',
    });

    const [companies, setCompanies] = useState([]);
    useEffect(() => {
        const fetchMyCompanies = async () => {
            try {
                const token = localStorage.getItem('token');
                const data = await getMyCompanies(token);
                console.log(data);
                setCompanies(data.companies);
            } catch (err) {
                console.error(err);
                toast.error(
                    err.response?.data?.message || "Failed to fetch companies. Please try again.",
                )
            }
        }
        fetchMyCompanies();
    }, []);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const data = await createJob(formData, token);
            console.log(data);
            toast.success("Job created successfully!");
            navigate("/recruiter");
        } catch (err) {
            console.error(err);
            toast.error(
                err.response?.data?.message || "Failed to create job. Please try again.",
            )
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }
    return (
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-8">

            <h1 className="text-3xl font-bold mb-8">
                Create New Job
            </h1>
            <div className="space-y-2">
                <Label>Job Title</Label>

                <Input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Backend Developer"
                    className="mb-3"
                    required
                />
            </div>
            <div className="space-y-2">
                <Label>Description</Label>

                <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Describe the role..."
                    className="mb-3"
                    required
                />
            </div>

            <div className="space-y-2">
                <Label>Salary</Label>

                <Input
                    type="number"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    placeholder="1800000"
                    className="mb-3"
                    min={0}
                    required
                />
            </div>

            <div className="space-y-2">
                <Label>Location</Label>

                <Input
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="San Francisco"
                    className="mb-3"
                    required
                />
            </div>

            <div className="space-y-2 mb-3">
                <Label>Experience</Label>

                <Select
                    required
                    value={formData.experience}
                    onValueChange={(value) =>
                        setFormData({
                            ...formData,
                            experience: value,

                        })
                    }
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select experience" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="0">0 Years</SelectItem>
                        <SelectItem value="1">1+ Years</SelectItem>
                        <SelectItem value="2">2+ Years</SelectItem>
                        <SelectItem value="3">3+ Years</SelectItem>
                        <SelectItem value="5">5+ Years</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2 mb-3">
                <Label>Job Type</Label>

                <Select required
                    value={formData.jobType}
                    onValueChange={(value) =>
                        setFormData({
                            ...formData,
                            jobType: value,
                        })
                    }
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select job type" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="Full-Time">
                            Full-Time
                        </SelectItem>

                        <SelectItem value="Part-Time">
                            Part-Time
                        </SelectItem>

                        <SelectItem value="Internship">
                            Internship
                        </SelectItem>

                        <SelectItem value="Contract">
                            Contract
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2 mb-3">
                <Label>Company</Label>

                <Select required
                    value={formData.company}
                    onValueChange={(value) =>
                        setFormData({
                            ...formData,
                            company: value,
                        })
                    }
                >
                    <SelectTrigger>
                        <SelectValue>
                            {companies.find(
                                (company) => company._id === formData.company
                            )?.name || "Select company"}
                        </SelectValue>
                    </SelectTrigger>

                    <SelectContent>

                        {companies.map((company) => (
                            <SelectItem
                                key={company._id}
                                value={company._id}
                            >
                                {company.name}
                            </SelectItem>
                        ))}

                    </SelectContent>
                </Select>
            </div>

            <Button type='submit' className="w-full mt-8">
                Create Job
            </Button>

        </form>
    );
}

export default CreateJob;