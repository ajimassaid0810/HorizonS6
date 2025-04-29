import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // ← Tambahkan ini
import "./index.css";
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";
import App from "./App.tsx";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { LoadingProvider } from "./context/LoadingContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <AppWrapper>
        <LoadingProvider>
          <BrowserRouter> {/* ← Tambahkan ini */}
            <App />
          </BrowserRouter> {/* ← Dan tutup di sini */}
        </LoadingProvider>
      </AppWrapper>
    </ThemeProvider>
  </StrictMode>
);
