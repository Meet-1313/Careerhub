import { Routes, Route } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import JobDetails from "@/pages/JobDetails";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import CreateJob from "./pages/CreateJob";
import Applicants from "./pages/Applicants";
import EditJob from "./pages/EditJob";
import CreateCompany from "./pages/CreateCompany";
import Company from "./pages/Companies";
import EditCompany from "./pages/EditCompany";
import MyApplications from "./pages/MyApplications";
import Profile from "@/pages/Profile";
import ApplicantDetails from "@/pages/ApplicantDetails";
import LandingPage from "@/pages/LandingPage";

function App() {
  return (
    <Routes>

      {/* ---------- Public ---------- */}

      <Route element={<AuthLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>


      {/* ---------- Shared (Both roles) ---------- */}

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
        <Route path="/:id" element={<JobDetails />} />
          <Route
            path="/profile"
            element={<Profile />}
          />
        </Route>
      </Route>


      {/* ---------- Job Seeker ---------- */}

      <Route
        element={
          <ProtectedRoute
            allowedRoles={["jobseeker"]}
          />
        }
      >
        <Route element={<MainLayout />}>
         <Route path="/home" element={<Home />} />

          <Route
            path="/applications"
            element={<MyApplications />}
          />

        </Route>
      </Route>


      {/* ---------- Recruiter ---------- */}

      <Route
        element={
          <ProtectedRoute
            allowedRoles={["recruiter"]}
          />
        }
      >
        <Route element={<MainLayout />}>

          <Route
            path="/recruiter"
            element={<RecruiterDashboard />}
          />

          <Route
            path="/recruiter/jobs/new"
            element={<CreateJob />}
          />

          <Route
            path="/recruiter/jobs/:id/edit"
            element={<EditJob />}
          />

          <Route
            path="/recruiter/company"
            element={<Company />}
          />

          <Route
            path="/recruiter/company/new"
            element={<CreateCompany />}
          />

          <Route
            path="/recruiter/company/:id/edit"
            element={<EditCompany />}
          />

          <Route
            path="/recruiter/jobs/:jobId/applicants"
            element={<Applicants />}
          />

          <Route
            path="/recruiter/applications/:applicationId"
            element={<ApplicantDetails />}
          />

        </Route>
      </Route>

    </Routes>
  );
}

export default App;