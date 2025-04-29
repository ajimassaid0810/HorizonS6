// pages/kecamatan/VerifikasiKecamatan.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";
import Button from "../../components/ui/button/Button";
import Alert from "../../components/ui/alert/Alert";
import Loading from "../../components/ui/loading/Loading";
import { Modal } from "../../components/ui/modal/index";

// Interface untuk data kecamatan
interface KecamatanData {
  nama: string;
  alamat: string;
  statusTanah: string;
  statusVerifikasi?: string;
  nik?: string; // jika kamu pakai nik sebagai ID
  [key: string]: any;
}


export default function VerifikasiKecamatan() {
  const navigate = useNavigate();
  const [kecamatanData, setKecamatanData] = useState<KecamatanData[]>([]); // Data kecamatan yang diajukan
  const [loading, setLoading] = useState<boolean>(false); // Status loading untuk verifikasi
  const [alert, setAlert] = useState<string | null>(null); // Notifikasi status verifikasi
  const [showModal, setShowModal] = useState<boolean>(false); // Modal verifikasi detail
  const [selectedKecamatan, setSelectedKecamatan] = useState<KecamatanData | null>(null); // Data kecamatan yang dipilih

  useEffect(() => {
    // Ambil data kecamatan yang telah diajukan dari localStorage
    const dataPengajuan = JSON.parse(localStorage.getItem("dataPengajuan") || "[]");
    setKecamatanData(dataPengajuan);
  }, []);

  const handleVerifikasi = () => {
    if (!selectedKecamatan) return;
    setLoading(true);
  
    setTimeout(() => {
      const existingData: KecamatanData[] = JSON.parse(localStorage.getItem("dataPengajuan") || "[]");
  
      const updatedData = existingData.map((item) =>
        item.nik === selectedKecamatan.nik
          ? { ...item, statusVerifikasi: "Sudah Diverifikasi" }
          : item
      );
  
      localStorage.setItem("dataPengajuan", JSON.stringify(updatedData));
      setKecamatanData(updatedData);
      setLoading(false);
      setAlert("✅ Kecamatan berhasil diverifikasi!");
      setShowModal(false);
    }, 2000);
  };
  
  

  const handleDetailKecamatan = (data: KecamatanData) => {
    setSelectedKecamatan(data);
    setShowModal(true);
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white dark:bg-gray-900 rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
        Verifikasi Kecamatan
      </h1>

      {/* Alert jika ada status */}
      {alert && (
        <Alert 
          variant="success"
          message={alert} 
          onClose={() => setAlert(null)} 
        />
      )}

      {/* Loading Indicator */}
      {loading && <Loading isOpen={loading} />}

      {/* Tabel Daftar Kecamatan */}
      <BasicTableOne
        data={kecamatanData}
        onDetail={handleDetailKecamatan} // Fungsi untuk melihat detail kecamatan
      />

      {/* Modal untuk Verifikasi Detail Kecamatan */}
      {showModal && selectedKecamatan && (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Detail Kecamatan
          </h2>
      
          <div className="space-y-2 text-gray-700 dark:text-gray-200">
            <p><span className="font-semibold">Nama Kecamatan:</span> {selectedKecamatan.nama}</p>
            <p><span className="font-semibold">Alamat:</span> {selectedKecamatan.alamat}</p>
            <p><span className="font-semibold">Status Tanah:</span> {selectedKecamatan.statusTanah}</p>
          </div>
          <div className="pt-4">
                    <button
            onClick={handleVerifikasi}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow disabled:opacity-50"
            disabled={selectedKecamatan.statusVerifikasi === "Sudah Diverifikasi"}
          >
            ✅ Verifikasi data ini
          </button>
          <p>
            <span className="font-semibold">Status Verifikasi:</span>{" "}
            {selectedKecamatan.statusVerifikasi === "Sudah Diverifikasi" ? (
              <span className="text-green-600 font-semibold">✅ Diverifikasi</span>
            ) : (
              <span className="text-red-500 font-semibold">❌ Belum</span>
            )}
          </p>
          </div>
        </div>
      </Modal>      

      )}

      {/* Tombol untuk kembali ke halaman sebelumnya */}
      <Button
        label="Kembali"
        onClick={() => navigate("/")}
        className="mt-4 bg-gray-400 hover:bg-gray-500"
      />
    </div>
  );
}