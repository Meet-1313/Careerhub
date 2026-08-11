import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

import { useAuth } from "@/context/AuthContext";

const Sidebar = () => {
    const { user, logout } = useAuth();

    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Hamburger */}

            <button
                onClick={() => setOpen(true)}
                className="p-2 rounded-lg hover:bg-muted transition"
            >
                <Menu className="w-6 h-6" />
            </button>

            {/* Overlay */}

            {open && (
                <div
                    className="fixed inset-0 bg-black/40 z-40"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Sidebar */}

            <div
                className={`fixed top-0 left-0 h-full w-72 bg-white dark:bg-zinc-900 shadow-xl z-50 transform transition-transform duration-300
                ${open ? "translate-x-0" : "-translate-x-full"}`}
            >
                {/* Header */}

                <div className="flex items-center justify-between p-5 border-b">

                    <h1 className="text-2xl font-bold">
                        CareerHub
                    </h1>

                    <button
                        onClick={() => setOpen(false)}
                        className="p-2 rounded-lg hover:bg-muted"
                    >
                        <X className="w-5 h-5" />
                    </button>

                </div>

                {/* Navigation */}

                <div className="flex flex-col p-4 gap-2">

                    {user?.role === "jobseeker" ? (

                        <>
                            <Link
                                to="/home"
                                onClick={() => setOpen(false)}
                                className="px-4 py-3 rounded-lg hover:bg-muted transition"
                            >
                                Home
                            </Link>

                            <Link
                                to="/applications"
                                onClick={() => setOpen(false)}
                                className="px-4 py-3 rounded-lg hover:bg-muted transition"
                            >
                                My Applications
                            </Link>

                            <Link
                                to="/profile"
                                onClick={() => setOpen(false)}
                                className="px-4 py-3 rounded-lg hover:bg-muted transition"
                            >
                                Profile
                            </Link>
                        </>

                    ) : (

                        <>
                            <Link
                                to="/recruiter"
                                onClick={() => setOpen(false)}
                                className="px-4 py-3 rounded-lg hover:bg-muted transition"
                            >
                                Dashboard
                            </Link>

                            <Link
                                to="/recruiter/company"
                                onClick={() => setOpen(false)}
                                className="px-4 py-3 rounded-lg hover:bg-muted transition"
                            >
                                Companies
                            </Link>

                            <Link
                                to="/recruiter/jobs/new"
                                onClick={() => setOpen(false)}
                                className="px-4 py-3 rounded-lg hover:bg-muted transition"
                            >
                                Post Job
                            </Link>

                            <Link
                                to="/recruiter/company/new"
                                onClick={() => setOpen(false)}
                                className="px-4 py-3 rounded-lg hover:bg-muted transition"
                            >
                                Create Company
                            </Link>

                            <Link
                                to="/profile"
                                onClick={() => setOpen(false)}
                                className="px-4 py-3 rounded-lg hover:bg-muted transition"
                            >
                                Profile
                            </Link>
                        </>
                    )}

                    <button
                        onClick={() => {
                            setOpen(false);
                            logout();
                        }}
                        className="mt-5 bg-red-700 text-white rounded-4xl  px-2 py-2 hover:bg-red-500 "
                    >
                        Logout
                    </button>

                </div>
            </div>
        </>
    );
};

export default Sidebar;