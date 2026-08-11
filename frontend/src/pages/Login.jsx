import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { login as loginUser } from '@/services/authService';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Loading from '@/components/shared/Loading';
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
function Login() {
    const { login } = useAuth();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser(formData);
            login(data.user, data.token);
            if (data.user.role === "recruiter") {
                navigate("/recruiter");
            } else {
                navigate("/home");
            }
            toast.success("Login successful!");
            console.log(data.user);
        } catch (err) {
            console.error(err);
            toast.error(
                err.response?.data?.message || "Failed to login. Please try again.",
            )
        }
    }
    if (!login) {
        return <Loading />;
    }
    return (

        <Card className='w-full max-w-md'>
            <CardHeader>
                <CardTitle className='text-2xl  sm:text-3xl text-center'>
                    Login
                </CardTitle>
            </CardHeader>

            <CardContent className="p-5 sm:p-6">
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div className='space-y-2'>
                        <Label>Email</Label>
                        <Input type='email' name='email' placeholder='Enter your email'
                            value={formData.email} onChange={handleChange} required />
                    </div>

                    <div className='relative space-y-2'>
                        <Label>Password</Label>
                        <Input type={showPassword ? 'text' : 'password'} className='pr-10'
                            name='password' placeholder='Enter your password'
                            value={formData.password} onChange={handleChange} required />
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

                    <Button type='submit' className="w-full">
                        Login
                    </Button>

                    <p className='text-sm text-center text-muted-foreground'> 
                        Not registered yet? <a href="/register" className=' text-primary font-medium hover:underline'>Register</a>
                    </p>
                </form>
            </CardContent>
        </Card>
    );
}

export default Login;