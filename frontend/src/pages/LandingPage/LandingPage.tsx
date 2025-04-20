import { useNavigate } from "react-router";


export default function LandCertificateDAppLanding() {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen  text-gray-800">
     <header className="px-6 py-4 flex justify-between items-center bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
        <div className="text-xl font-bold text-blue-600">LANDCHINE</div>
        <nav className="space-x-4 hidden md:block">
          <a href="#features" className="text-gray-600 hover:text-blue-600">Features</a>
          <a href="#flow" className="text-gray-600 hover:text-blue-600">Flow</a>
          <a href="#contact" className="text-gray-600 hover:text-blue-600">Contact</a>
        </nav>
        <button className="rounded-full px-6 py-2 bg-blue-600 text-white hover:bg-blue-700" onClick={() => navigate("/signin")} >
        
          Launch DApp
        </button>
      </header>
      <section className=" bg-white border-b border-gray-200">
        <div className="flex flex-col md:flex-row items-center justify-between px-10 pt-20">
            <div className="max-w-xl transform transition-all duration-500 ease-in-out">
            <p className="text-lg uppercase tracking-wide text-blue-500 font-semibold">WHAT IS LANDCHINE?</p>
            <h1 className="text-6xl font-bold mt-4 mb-4 text-gray-900">
                Web3 Sertifikat Tanah Digital
            </h1>
            <p className="mb-6 text-xl text-gray-600">
                Ajukan sertifikat tanah Anda secara digital dan aman dengan teknologi blockchain dan smart contract.
            </p>
            <button className="bg-blue-600 text-white rounded-full px-6 py-2 hover:bg-blue-700 flex items-center gap-2">
                Get Started
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>
            </div>

            <img
            src="/images/Hero.png"
            alt="Hero Illustration"
            className=" h-80 max-w-md mt-10 md:mt-0 transform transition-all duration-500 ease-in-out"
            />
        </div>

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="1" d="M0,96L21.8,96C43.6,96,87,96,131,96C174.5,96,218,96,262,117.3C305.5,139,349,181,393,176C436.4,171,480,117,524,128C567.3,139,611,213,655,229.3C698.2,245,742,203,785,186.7C829.1,171,873,181,916,176C960,171,1004,149,1047,154.7C1090.9,160,1135,192,1178,218.7C1221.8,245,1265,267,1309,266.7C1352.7,267,1396,245,1418,234.7L1440,224L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z"></path></svg>
      </section>
     
      <section id="flow" className="bg-white py-20 px-6">
        <h2 className="text-4xl font-bold text-center mb-10 text-gray-900">Alur Pengajuan Sertifikat Tanah</h2>
        <div className="flex justify-center">
          <img
            src="/images/alur.jpg"
            alt="Alur Pengajuan Sertifikat Tanah"
            className="max-w-4xl w-full shadow-lg rounded-xl"
          />
        </div>
      </section>

      <footer className="bg-white mt-12 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-xl font-semibold text-blue-600">LAND3</p>
            <p className="text-lg text-gray-500">Sertifikasi Tanah Berbasis Web3</p>
          </div>

          <div className=" ">
            <div className="text-xl font-semibold text-blue-600 mb-2">
                Subscribe Us on
            </div>
            <div className="flex space-x-8">
                <a href="#" className="text-gray-500 hover:text-blue-600" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.86 7.94 9.8v-6.93H7.1v-2.87h2.84v-2.2c0-2.8 1.67-4.35 4.23-4.35 1.22 0 2.5.22 2.5.22v2.75h-1.41c-1.39 0-1.83.87-1.83 1.76v2.07h3.12l-.5 2.87h-2.62v6.93C18.56 20.86 22 16.84 22 12z"/></svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-blue-600" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-.5a1 1 0 100 2 1 1 0 000-2z"/></svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-blue-600" aria-label="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6.94 6.5c0 .83-.67 1.5-1.5 1.5S3.94 7.33 3.94 6.5 4.61 5 5.44 5s1.5.67 1.5 1.5zM4 9h3v10H4zm5.47 0h2.87v1.28h.04c.4-.75 1.4-1.54 2.88-1.54 3.07 0 3.64 2.02 3.64 4.64V19h-3v-4.39c0-1.05-.02-2.4-1.46-2.4-1.46 0-1.69 1.14-1.69 2.32V19h-3z"/></svg>
                </a>
            </div>
          </div>
        </div>
        <div className="text-center text-sm text-gray-500 py-4 border-t border-gray-200">
          &copy; 2025 LAND3 - All rights reserved.
        </div>
      </footer>
    </div>
  );
}
