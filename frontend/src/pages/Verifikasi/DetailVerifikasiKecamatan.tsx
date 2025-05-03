// pages/kecamatan/DetailVerifikasiKecamatanPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Button from "../../components/ui/button/Button";

interface KecamatanData {
  nama: string;
  alamat: string;
  statusTanah: string;
  status?: "pending" | "approved" | "rejected";
  nik?: string;
  [key: string]: any;
}

export default function DetailVerifikasiKecamatanPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<KecamatanData | null>(null);

  useEffect(() => {
    const allData: KecamatanData[] = JSON.parse(localStorage.getItem("dataPengajuan") || "[]");
    console.log(data)
    const detail = allData.find((item) => item._id === id);
    if (detail) {
      setData(detail);
    }
  }, [id]);

  const handleVerifikasi = () => {
    if (!data) return;

    const updatedData = JSON.parse(localStorage.getItem("dataPengajuan") || "[]").map((item: KecamatanData) =>
      item._id === data._id ? { ...item, status: "approved" } : item
    );

    localStorage.setItem("dataPengajuan", JSON.stringify(updatedData));
    setData((prev) => prev && { ...prev, status: "approved" });
  };

  if (!data) {
    return <p className="text-center mt-10">Data tidak ditemukan.</p>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Detail Verifikasi Kecamatan</h1>

      <div className="space-y-3 text-gray-700 dark:text-gray-200">
        <p><span className="font-semibold">Nama Kecamatan:</span> {data.nama}</p>
        <p><span className="font-semibold">Alamat:</span> {data.alamat}</p>
        <p><span className="font-semibold">Status Tanah:</span> {data.statusTanah}</p>
        <p>
          <span className="font-semibold">Status Verifikasi:</span>{" "}
          {data.status === "approved" ? (
            <span className="text-green-600 font-semibold">✅ Diverifikasi</span>
          ) : (
            <span className="text-red-500 font-semibold">❌ Belum</span>
          )}
        </p>
      </div>

      <div className="mt-6 space-y-4">
        <button
          onClick={handleVerifikasi}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow disabled:opacity-50"
          disabled={data.statusVerifikasi === "Sudah Diverifikasi"}
        >
          ✅ Verifikasi data ini
        </button>

        <button  className="text-white bg-blue-600  py-2 px-4 rounded" onClick={() => navigate("/verifikasi-kecamatan")} >
        ⬅ Kembali
        </button>
      </div>
    </div>
  );
}
