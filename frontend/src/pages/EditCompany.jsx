import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCompanyById, updateCompany } from '@/services/companyService';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";    
import { toast } from "sonner";
function EditCompany() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',website: '',location: '',logo: ''
    });
    
    useEffect(() => {
        const fetchCompany = async () => {
            try{
                const token = localStorage.getItem('token');
                const data = await getCompanyById(id, token);
                const company = data.company;
                setFormData({
                    name: company.name,
                    website: company.website,
                    location: company.location,
                    logo: company.logo,
                });
            }catch(err){
                console.error(err);
                toast.error(
                    err.response?.data?.message || "Failed to fetch company. Please try again.",
                )
            }
        }
        fetchCompany();
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const token = localStorage.getItem('token');
            await updateCompany(id, formData, token);
            navigate("/recruiter");
            toast.success("Company updated successfully!");
        }catch(err){
            console.error(err);
            toast.error(
                err.response?.data?.message || "Failed to update company. Please try again.",
            )
        }
    }
    return (
        <div className="max-w-3xl mx-auto p-8">

            <h1 className="text-3xl font-bold mb-8">
                Edit Company
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
                    Edit Company
                </Button>

            </form>

        </div>
    )
}

export default EditCompany;