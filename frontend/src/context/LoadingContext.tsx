// context/LoadingContext.tsx
import  { createContext, useContext, useState, ReactNode } from "react";

// Tipe data untuk context
interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

// Membuat Context dengan nilai default
const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

// Membuat Provider untuk memberikan akses ke context
export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

// Hook untuk mengakses context
export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
