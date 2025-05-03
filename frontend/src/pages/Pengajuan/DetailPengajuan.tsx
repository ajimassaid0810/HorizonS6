import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Badge from "../../components/ui/badge/Badge";

interface Pengajuan {
  id: string;
  nama: string;
  nik: string;
  alamat: string;
  statusTanah: string;

  tanggal: string;
  status: "pending" | "approved" | "rejected";
}

export default function DetailPengajuan() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pengajuan, setPengajuan] = useState<Pengajuan | null>(null);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("dataPengajuan") || "[]");
    const found = savedData.map((item: any, index: number) => ({
      id: item._id,
      nama: item.nama,
      nik: item.nik,
      alamat: item.alamat,
      statusTanah: item.statusTanah,
      tanggal: item.tanggal,
      status: item.status??"pending",
    })).find((item: Pengajuan) => item.id === id || "");

    setPengajuan(found || null);
  }, [id]);

  const getStatusBadge = (status: Pengajuan["status"]) => {
    switch (status) {
      case "pending":
        return <Badge color="warning">Pending</Badge>;
      case "approved":
        return <Badge color="success">Disetujui</Badge>;
      case "rejected":
        return <Badge color="error">Ditolak</Badge>;
    }
  };

  if (!pengajuan) {
    return <div className="p-6 text-center text-gray-500">Data tidak ditemukan.</div>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white dark:bg-gray-900 rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-4">Detail Pengajuan</h1>
      <div className="space-y-3 text-gray-700 dark:text-gray-200">
        <p><strong>Nama:</strong> {pengajuan.nama}</p>
        <p><strong>NIK:</strong> {pengajuan.nik}</p>
        <p><strong>Alamat:</strong> {pengajuan.alamat}</p>
        <p><strong>Status Tanah:</strong> {pengajuan.statusTanah}</p>
        <p><strong>Tanggal Pengajuan:</strong> {pengajuan.tanggal}</p>
        <p><strong>Status:</strong> {getStatusBadge(pengajuan.status)}</p>
      </div>
      <div className="mt-6 text-right">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md"
        >
          Kembali
        </button>
      </div>
    </div>
  );
}
