import React, { useState, useEffect } from "react";
import { data, useNavigate } from "react-router";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";
import Button from "../../components/ui/button/Button";
import Alert from "../../components/ui/alert/Alert";
import Loading from "../../components/ui/loading/Loading";
import DetailVerifikasiKecamatan from "./DetailVerifikasiKecamatan";

// Interface untuk data kecamatan
interface KecamatanData {
  _id:string;
  nama: string;
  alamat: string;
  statusTanah: string;
  statusVerifikasi?: string;
  nik?: string;
  [key: string]: any;
}

export default function VerifikasiKecamatan() {
  const navigate = useNavigate();
  const [kecamatanData, setKecamatanData] = useState<KecamatanData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<string | null>(null);

  useEffect(() => {
    const dataPengajuan = JSON.parse(localStorage.getItem("dataPengajuan") || "[]");
    console.log("wkwk",dataPengajuan);
    setKecamatanData(dataPengajuan);
  }, []);

 

  const handleDetailKecamatan = (data: KecamatanData) => {
    console.log("WKWK",data)
    navigate(`/kecamatan/detail/${data._id}`);
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white dark:bg-gray-900 rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
        Verifikasi Kecamatan
      </h1>

      {alert && (
        <Alert
          variant="success"
          message={alert}
          onClose={() => setAlert(null)}
        />
      )}

      {loading && <Loading isOpen={loading} />}

      <BasicTableOne data={kecamatanData} onDetail={handleDetailKecamatan} />


      <button
        
        onClick={() => navigate("/")}
        className="mt-4 bg-blue-600 hover:bg-blue-800 p-2 rounded text-white" 
      > Kembali</button>
    </div>
  );
}
