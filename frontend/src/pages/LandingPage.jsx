import { Link } from "react-router-dom";
import {
    BriefcaseBusiness,
    Search,
    FileText,
    Building2,
    CheckCircle,
    ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

function LandingPage() {
    return (
        <div className="min-h-dvh flex flex-col bg-background">
            {/* Navbar */}
            <nav className="border-b  top-0 bg-background/95 backdrop-blur z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 shrink-0">
                        <BriefcaseBusiness className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                        <span className="text-xl sm:text-2xl font-bold">
                            CareerHub
                        </span>
                    </Link>

                    <div className="flex items-center gap-2 sm:gap-3">
                        <Link to="/login">
                            <Button variant="ghost" size="sm" className="sm:text-base">
                                Login
                            </Button>
                        </Link>

                        <Link to="/register">
                            <Button size="sm" className="sm:text-base">
                                Get Started
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Main Content Area (flex-1 pushes footer to bottom automatically) */}
            <main className="flex-1">
                {/* Hero Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 md:py-24">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-3xl sm:text-5xl md:text-4xl font-extrabold tracking-tight leading-tight">
                            Find Your{" "}
                            <span className="text-primary">Dream Job</span>{" "}
                            Faster.
                        </h1>

                        <p className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed sm:leading-8 px-2 sm:px-0">
                            CareerHub helps job seekers discover opportunities,apply with ease, and enables recruiters to hire the
                            right talent through a clean and modern recruitment
                            platform.
                        </p>

                        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4 sm:px-0">
                            <Link to="/register" className="w-full sm:w-auto">
                                <Button size="lg" className="w-full sm:w-auto text-base">
                                    Get Started
                                </Button>
                            </Link>

                            <Link to="/login" className="w-full sm:w-auto">
                                <Button variant="outline" size="lg" className="w-full sm:w-auto text-base">
                                    Login
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-12 sm:py-20 bg-muted/30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6">
                        <div className="text-center mb-10 sm:mb-14">
                            <h2 className="text-2xl sm:text-4xl font-bold">
                                Why Choose CareerHub?
                            </h2>
                            <p className="mt-2 sm:mt-4 text-muted-foreground text-sm sm:text-lg max-w-2xl mx-auto">
                                Everything you need whether you're searching for your next
                                opportunity or hiring your next employee.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                            <div className="rounded-2xl border bg-background p-6 sm:p-8 hover:shadow-lg transition-all">
                                <Search className="w-8 h-8 sm:w-10 sm:h-10 text-primary mb-4 sm:mb-5" />
                                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
                                    Search Jobs
                                </h3>
                                <p className="text-sm sm:text-base text-muted-foreground">
                                    Discover jobs using smart search, filters and sorting to quickly find the right opportunity.
                                </p>
                            </div>

                            <div className="rounded-2xl border bg-background p-6 sm:p-8 hover:shadow-lg transition-all">
                                <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-primary mb-4 sm:mb-5" />
                                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
                                    Easy Applications
                                </h3>
                                <p className="text-sm sm:text-base text-muted-foreground">
                                    Upload your resume once and apply to multiple jobs with ease.
                                </p>
                            </div>

                            <div className="rounded-2xl border bg-background p-6 sm:p-8 hover:shadow-lg transition-all">
                                <Building2 className="w-8 h-8 sm:w-10 sm:h-10 text-primary mb-4 sm:mb-5" />
                                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
                                    Recruit Smarter
                                </h3>
                                <p className="text-sm sm:text-base text-muted-foreground">
                                    Recruiters can manage companies, create jobs and review applicants from one dashboard.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Checklist Section */}
                <section className="py-12 sm:py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6">
                        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                            <div>
                                <h2 className="text-2xl sm:text-4xl font-bold">
                                    Built for both Job Seekers & Recruiters
                                </h2>
                                <p className="mt-4 sm:mt-6 text-muted-foreground text-sm sm:text-lg">
                                    CareerHub simplifies the hiring process by providing powerful tools for recruiters while giving job seekers an intuitive platform to discover and apply for jobs.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    "Secure Authentication",
                                    "Resume Upload",
                                    "Job Search & Filters",
                                    "Recruiter Dashboard",
                                    "Application Tracking",
                                    "Responsive Design",
                                ].map((feature, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
                                        <span className="text-sm sm:text-base">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action Section */}
                <section className="py-12 sm:py-20 bg-primary text-primary-foreground">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
                        <h2 className="text-2xl sm:text-4xl font-bold">
                            Ready to Start Your Career?
                        </h2>
                        <p className="mt-3 sm:mt-5 text-sm sm:text-lg opacity-90 max-w-xl mx-auto">
                            Join CareerHub today and connect with companies looking for talent.
                        </p>
                        <Link to="/register" className="inline-block w-full sm:w-auto">
                            <Button variant="secondary" size="lg" className="mt-6 sm:mt-8 w-full sm:w-auto text-base">
                                Create Free Account
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                    </div>
                </section>

            </main>

            {/* Footer with proper mobile padding */}
            <footer className="border-t w-full bg-background mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-12 sm:py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                    <div className="flex items-center gap-2">
                        <BriefcaseBusiness className="w-6 h-6 text-primary" />
                        <span className="font-semibold text-lg">
                            CareerHub
                        </span>
                    </div>

                    <p className="text-xs sm:text-sm text-muted-foreground w-full md:w-auto break-words">
                        © 2026 CareerHub. Built with React, Node.js, Express & MongoDB.
                    </p>
                </div>
            </footer>

        </div>
    );
}
export default LandingPage;