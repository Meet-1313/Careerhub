import { Navigate,Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Loading from '@/components/shared/Loading';

function ProtectedRoute({ allowedRoles }) {
    const { user,loading } = useAuth();
    if (loading) {
        return <Loading />;
    }
    if (!user) {
        return <Navigate to="/login" replace />;
    }
     if (
        allowedRoles &&
        !allowedRoles.includes(user.role)
    ) {
        return <Navigate to="/" replace />;
    }
    return <Outlet />;
}

export default ProtectedRoute;