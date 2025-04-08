"use client"
// pages/register.tsx
import RegistrationForm from '../../components/RegistrationForm';
import Navbar from '@/app/components/Navbar';
import Header from '@/app/components/Header2';
const RegisterPage = () => {
  return (
    <div className="">
        <Navbar />
        <Header />
      <RegistrationForm />
    </div>
  );
};

export default RegisterPage;
