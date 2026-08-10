import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { createCompany } from "@/services/companyService";
import { toast } from "sonner";

const CreateCompany = () => {
    const [formData, setFormData] = useState({
        name: '', description: '', website: '', location: '', logo: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const data = await createCompany(formData, token);
            console.log(data);
            toast.success("Company created successfully!");
            navigate("/recruiter");
        } catch (err) {
            console.error(err);
            toast.error(
                err.response?.data?.message || "Failed to create company. Please try again.",
            )
        }
    }
    return (
        <div className="max-w-3xl mx-auto p-8">

            <h1 className="text-3xl font-bold mb-8">
                Create Company
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">

                <div className="space-y-2">
                    <Label>Company Name</Label>

                    <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="OpenAI"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label>Description</Label>

                    <Textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Describe your company..."
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label>Website</Label>

                    <Input
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        placeholder="https://company.com"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label>Location</Label>

                    <Input
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="San Francisco, USA"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label>Logo URL</Label>

                    <Input
                        name="logo"
                        value={formData.logo}
                        onChange={handleChange}
                        placeholder="logo.png or https://..."
                        required
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full"
                >
                    Create Company
                </Button>

            </form>

        </div>
    )
}

export default CreateCompany
