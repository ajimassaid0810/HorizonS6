// pages/kecamatan/VerifikasiKecamatan.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  [key: string]: any; // Untuk properti tambahan yang mungkin ada
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
      // Ambil data lama
      const existingData = JSON.parse(localStorage.getItem("dataPengajuan") || "[]");
  
      // Update status dari pengajuan yang cocok
      const updatedData = existingData.map((item: KecamatanData) =>
        item.nik === selectedKecamatan.nik ? { ...item, statusVerifikasi: "Sudah Diverifikasi" } : item
      );
  
      // Simpan ulang ke localStorage
      localStorage.setItem("dataPengajuan", JSON.stringify(updatedData));
      setKecamatanData(updatedData); // Update state
  
      setLoading(false);
      setAlert("Kecamatan berhasil diverifikasi!");
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
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Detail Kecamatan
          </h2>
          <p><strong>Nama Kecamatan:</strong> {selectedKecamatan.nama}</p>
          <p><strong>Alamat:</strong> {selectedKecamatan.alamat}</p>
          <p><strong>Status Tanah:</strong> {selectedKecamatan.statusTanah}</p>

          <div className="mt-6">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">
              Verifikasi data ini?
            </p>
            <Button
              label="Verifikasi Sekarang"
              onClick={handleVerifikasi}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
            />
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