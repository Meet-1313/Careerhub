import { Link } from "react-router-dom";
import Sidebar from "@/components/shared/Sidebar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

function Navbar() {

    const { user, logout } = useAuth();

    return (

        <nav className="border-b bg-background">

            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

                {/* Left */}
                <div className="flex items-center gap-3">

                    {user && <Sidebar />}

                    <Link to="/">
                        <h1 className="text-2xl font-bold">
                            CareerHub
                        </h1>
                    </Link>
                </div>

                {/* Right */}
                <div className="flex items-center gap-4">

                    {user ? (
                        <>
                            <div className="text-right">

                                <p className="font-semibold">
                                    {user.username}
                                </p>

                                <p className="text-sm text-muted-foreground capitalize">
                                    {user.role}
                                </p>

                            </div>
                        </>

                    ) : (
                        <Link to="/login">

                            <Button>
                                Login
                            </Button>

                        </Link>
                    )}
                </div>
            </div>
        </nav>

    );

}

export default Navbar;