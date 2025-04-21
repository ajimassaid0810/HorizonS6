// pages/auth/SignIn.tsx
import { useLoading } from "../../context/LoadingContext"; // Impor useLoading
import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";
import LoadingModal from "../../components/ui/loading/Loading";

export default function SignIn() {
  const { isLoading, setIsLoading } = useLoading(); // Mengambil isLoading dan setIsLoading dari context

  return (
    <>
      <PageMeta
        title="LandChine SignIn Dashboard"
        description="This is LandChine SignIn to Dashboard page User and Admin"
      />
      <AuthLayout>
        <SignInForm setIsLoading={setIsLoading} /> {/* Kirim setIsLoading ke SignInForm */}
      </AuthLayout>
      <LoadingModal isOpen={isLoading} /> {/* Modal akan muncul ketika isLoading true */}
    </>
  );
}
