import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { register } from "@/services/authService";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
function Register() {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        role: "jobseeker",
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await register(formData);

            toast.success("Account created successfully!");

            navigate("/login");

        } catch (err) {

            console.error(err);

            toast.error(
                err.response?.data?.message ||
                "Failed to create account."
            );

        }

    };

    return (
        <Card className='w-full max-w-md'>
            <CardHeader>
                <CardTitle className='text-2xl text-center'>
                    Create Account
                </CardTitle>
                <CardDescription className='text-center'>
                    Join CareerHub today.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div className='space-y-2'>
                        <Label htmlFor='username'>Username</Label>
                        <Input
                            id='username'
                            type='text'
                            name='username'
                            placeholder='John Doe'
                            value={formData.username}
                            onChange={handleChange}
                            required
                            minLength={3}
                        />
                    </div>

                    <div className='space-y-2'>
                        <Label htmlFor='email'>Email</Label>
                        <Input
                            id='email'
                            type='email'
                            name='email'
                            placeholder='john@example.com'
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className='relative space-y-2'>
                        <Label htmlFor='password'>Password</Label>
                        <Input
                            id='password'
                            type={showPassword ? 'text' : 'password'}
                            className='pr-10'
                            name='password'
                            placeholder='Enter your password'
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength={6}
                        />
                        <button
                            type='button'
                            onClick={() => setShowPassword(!showPassword)}
                            className='mt-1.5 absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground'
                        >
                            {showPassword ? (
                                <EyeOff className="w-5 h-5" />
                            ) : (
                                <Eye className="w-5 h-5" />
                            )}

                        </button>
                    </div>

                    <div className='space-y-2'>
                        <Label className='block'>I am a</Label>
                        <div className='flex flex-col sm:flex-row gap-3 sm:gap-6 pt-1'>
                            <label className='flex items-center gap-2 text-sm cursor-pointer'>
                                <input
                                    type='radio'
                                    name='role'
                                    value='jobseeker'
                                    checked={formData.role === 'jobseeker'}
                                    onChange={handleChange}
                                    className='accent-primary'
                                />
                                Job Seeker
                            </label>

                            <label className='flex items-center gap-2 text-sm cursor-pointer'>
                                <input
                                    type='radio'
                                    name='role'
                                    value='recruiter'
                                    checked={formData.role === 'recruiter'}
                                    onChange={handleChange}
                                    className='accent-primary'
                                />
                                Recruiter
                            </label>
                        </div>
                    </div>

                    <Button type='submit' className='w-full mt-2'>
                        Register
                    </Button>
                </form>

                <div className='mt-4 text-center text-sm text-muted-foreground'>
                    Already have an account?{' '}
                    <Link to='/login' className='text-primary hover:underline font-medium'>
                        Login
                    </Link>
                </div>
            </CardContent>
        </Card>
    );

}

export default Register;