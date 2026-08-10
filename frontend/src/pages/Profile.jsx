import { useEffect, useState } from "react";
import { uploadResume, updateProfile } from "@/services/authService";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import Loading from '@/components/shared/Loading';
import { toast } from "sonner";

function Profile() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
    });
    const [isEditing, setIsEditing] = useState(false);
    const { user, updateUser } = useAuth();

    useEffect(() => {

        if (user) {

            setFormData({
                username: user.username,
                email: user.email,
            });

        }

    }, [user]);
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };
    const handleSave = async () => {

        try {

            const token = localStorage.getItem("token");

            const data = await updateProfile(
                formData,
                token
            );
            updateUser(data.user);

            setFormData({
                username: data.user.username,
                email: data.user.email,
            });
            setIsEditing(false);

            console.log(data);

            toast.success("Profile updated successfully!");

        } catch (err) {

            console.error(err);

        }

    };


    const [resume, setResume] = useState(null);

    const handleFileChange = (e) => {

        setResume(e.target.files[0]);

    };

    const handleUpload = async () => {

        if (!resume) {
            alert("Please select a resume file to upload.");
            return;
        }

        try {

            const token = localStorage.getItem("token");

            const formData = new FormData();

            formData.append("resume", resume);

            const data = await uploadResume(formData, token);
            updateUser({
                resume: data.resume,
            });

            console.log(data);

            toast.success("Resume uploaded successfully!");

        } catch (err) {

            console.error(err);

        }

    };
    if (!user) {
        return <Loading />;
    }

    return (

        <div className="max-w-3xl mx-auto py-10 px-6">

            <h1 className="text-3xl font-bold mb-8">
                My Profile
            </h1>

            <div className="border rounded-xl p-8 shadow-sm space-y-8">

                <div>

                    <Label className="font-semibold">
                        Username
                    </Label>

                    {isEditing ? (

                        <Input
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />

                    ) : (

                        <p className="mt-2 text-muted-foreground">
                            {user?.username}
                        </p>

                    )}

                </div>

                <div>

                    <Label className="font-semibold">
                        Email
                    </Label>
                    
                    {isEditing ? (

                        <Input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                    ) : (

                        <p className="mt-2 text-muted-foreground">
                            {user?.email}
                        </p>

                    )}

                </div>

                <div>

                    <Label className="font-semibold">
                        Role
                    </Label>

                    <p className="mt-2 capitalize text-muted-foreground">
                        {user?.role}
                    </p>

                </div>



                {user?.role === "jobseeker" && (

                    <div className="border-t pt-8">

                        <Label className="font-semibold">
                            Resume
                        </Label>

                        <p className="text-muted-foreground mt-2 mb-4">

                            {user?.resume
                                ? "Resume uploaded."
                                : "No resume uploaded."}

                        </p>

                        {user?.resume && (

                            <a
                                href={user.resume.url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-600 hover:underline block mb-4"
                            >
                                View Current Resume
                            </a>

                        )}

                        <input
                            type="file"
                            accept=".pdf"
                            onChange={handleFileChange}
                        />

                        <Button
                            className="mt-6"
                            onClick={handleUpload}
                        >
                            {user?.resume
                                ? "Replace Resume"
                                : "Upload Resume"}
                        </Button>

                    </div>

                )}
                {/* <Button

                    onClick={handleSave}
                >
                    Save Changes
                </Button> */}
                {isEditing ? (

                    <div className="flex gap-3 mt-8">

                        <Button onClick={handleSave}>
                            Save
                        </Button>

                        <Button
                            variant="outline"
                            onClick={() => {
                                setIsEditing(false);

                                setFormData({
                                    username: user.username,
                                    email: user.email,
                                });
                            }}
                        >
                            Cancel
                        </Button>

                    </div>

                ) : (

                    <Button
                        onClick={() => setIsEditing(true)}
                    >
                        Edit Profile
                    </Button>

                )}
            </div>


        </div>



    );

}

export default Profile;