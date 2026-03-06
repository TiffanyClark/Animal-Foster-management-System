import { Outlet, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import NavBar from './components/shared/NavBar';
import Footer from './components/shared/Footer';
import ParentRegistration from './components/register/ParentRegistration';
import FosterDashboard from './pages/foster/FosterDashboard';
import FosterPets from './pages/foster/FosterPets';
import FosterStore from './pages/foster/FosterStore';
import EmployeeDashboard from './pages/employee/EmployeeDashboard';
import EmployeeFosterParents from './pages/employee/EmployeeFosterParents';
import EmployeeInventory from './pages/employee/EmployeeInventory';
import EmployeePets from './pages/employee/EmployeePets';
import PetDetailPage from './pages/employee/PetDetailPage';
import FosterHomesPage from './pages/employee/FosterHomesPage';
import FosterParentLoginPage from './pages/FosterParentLoginPage';
import EmployeeLoginPage from './pages/EmployeeLoginPage';
import { useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { getUserByEmail } from './api/user';
import useGlobalContext from './hooks/useGlobalContext';
import AuthLayout from './Layouts/AuthLayout';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY
);

function BasicLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}

export default function App() {
  const { setUser } = useGlobalContext();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      supabase.auth.getClaims().then(async ({ data }) => {
        console.log('Data from getClaims:', data);
        if (data) {
          console.log('Auth state changed, updated claims:', data.claims.email);
          const userData = await getUserByEmail(
            data.claims.email as unknown as string
          );
          console.log('User data:', userData);
          setUser(userData);
        }
      });

      console.log('Auth state changed', subscription);
    });
  }, [setUser]);

  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/foster-page" element={<FosterDashboard />} />
        <Route path="/foster-pets-page" element={<FosterPets />} />
        <Route path="/foster-store-page" element={<FosterStore />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/employee-page" element={<EmployeeDashboard />} />
        <Route
          path="/employee-foster-parents-page"
          element={<EmployeeFosterParents />}
        />
        <Route
          path="/employee-inventory-page"
          element={<EmployeeInventory />}
        />
        <Route path="/employee-pets-page" element={<EmployeePets />} />
        <Route path="/employee-pets-page/:id" element={<PetDetailPage />} />
        <Route
          path="/employee-foster-homes-page/"
          element={<FosterHomesPage />}
        />
      </Route>
      <Route element={<BasicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/parent-registration" element={<ParentRegistration />} />
        <Route path="/foster-login" element={<FosterParentLoginPage />} />
        <Route path="/employee-login" element={<EmployeeLoginPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

function ErrorPage() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}
