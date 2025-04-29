// pages/kecamatan/VerifikasiKecamatan.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";
import Button from "../../components/ui/button/Button";
import Alert from "../../components/ui/alert/Alert";
import Loading from "../../components/ui/loading/Loading";
import { Modal } from "../../components/ui/modal/index"; // Ubah import sesuai lokasi

export default function VerifikasiKecamatan() {
  const navigate = useNavigate();
  const [kecamatanData, setKecamatanData] = useState<any[]>([]); // Data kecamatan yang diajukan
  const [loading, setLoading] = useState<boolean>(false); // Status loading untuk verifikasi
  const [alert, setAlert] = useState<string | null>(null); // Notifikasi status verifikasi
  const [showModal, setShowModal] = useState<boolean>(false); // Modal verifikasi detail
  const [selectedKecamatan, setSelectedKecamatan] = useState<any>(null); // Data kecamatan yang dipilih

  useEffect(() => {
    // Ambil data kecamatan yang telah diajukan dari localStorage
    const dataPengajuan = JSON.parse(localStorage.getItem("dataPengajuan") || "[]");
    setKecamatanData(dataPengajuan);
  }, []);

  const handleVerifikasi = () => {
    setLoading(true);
    // Proses verifikasi, bisa menggunakan API atau logika lainnya
    setTimeout(() => {
      setLoading(false);
      setAlert("Kecamatan berhasil diverifikasi!");
      setShowModal(false);
    }, 2000); // Simulasi loading
  };

  const handleDetailKecamatan = (data: any) => {
    setSelectedKecamatan(data);
    setShowModal(true);
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white dark:bg-gray-900 rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
        Verifikasi Kecamatan
      </h1>

      {/* Alert jika ada status */}
      {alert && <Alert message={alert} onClose={() => setAlert(null)} />}

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
            <h2 className="text-xl font-semibold">Detail Kecamatan</h2>
            <p><strong>Nama Kecamatan:</strong> {selectedKecamatan.nama}</p>
            <p><strong>Alamat:</strong> {selectedKecamatan.alamat}</p>
            <p><strong>Status Tanah:</strong> {selectedKecamatan.statusTanah}</p>
            <Button
              onClick={handleVerifikasi}
              className="mt-4"
            >
              Verifikasi
            </Button>
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
