import { useState, useEffect } from "react";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "../../components/ui/table";
import Badge from "../../components/ui/badge/Badge";
import { Dialog } from "@headlessui/react";
import { Link } from "react-router";

interface Pengajuan {
  _id: number;
  nama: string;
  nik: string;
  alamat: string;
  statusTanah: string;
  tanggal: string;
  status: "pending" | "approved" | "rejected";
  isGenerate: boolean;
}

export default function RiwayatPengajuan() {
  
  const [dataPengajuan, setDataPengajuan] = useState<Pengajuan[]>([]);
  const [selectedPengajuan, setSelectedPengajuan] = useState<Pengajuan | null>(null);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("dataPengajuan") || "[]");

    // Buat data jadi sesuai dengan interface, misalnya kasih ID dan status default
    const formattedData: Pengajuan[] = savedData.map((item: any, index: number) => ({
      _id: item._id,
      nama: item.nama,
      nik: item.nik,
      alamat: item.alamat,
      statusTanah: item.statusTanah,
      tanggal: item.tanggal,
      status: item.status??"Pending", // default status
      isGenerate:item.isGenerate??false
      
    }));
    console.log(formattedData)

    setDataPengajuan(formattedData);
  }, []);

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

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white dark:bg-gray-900 rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-4">Riwayat Pengajuan</h1>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
  <div className="max-w-full overflow-x-auto">
    <Table className="min-w-full divide-y divide-gray-100 dark:divide-white/[0.05]">
      <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
        <TableRow>
          <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">No</TableCell>
          <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Nama</TableCell>
          <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">NIK</TableCell>
          <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Alamat</TableCell>
          <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Status Tanah</TableCell>
          <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Tanggal</TableCell>
          <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Status</TableCell>
          <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 w-[250px]">Aksi</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dataPengajuan.length > 0 ? (
          dataPengajuan.map((pengajuan, index) => (
            <TableRow key={pengajuan._id}>
              <TableCell className="px-5 py-4 sm:px-6 text-start">{index + 1}</TableCell>
              <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{pengajuan.nama}</TableCell>
              <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{pengajuan.nik}</TableCell>
              <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{pengajuan.alamat}</TableCell>
              <TableCell className="px-4 py-3 text-start">
                <Badge
                  size="sm"
                  color={
                    pengajuan.statusTanah === "Tersertifikasi"
                      ? "success"
                      : pengajuan.statusTanah === "Proses"
                      ? "warning"
                      : "info"
                  }
                >
                  {pengajuan.statusTanah}
                </Badge>
              </TableCell>
              <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{pengajuan.tanggal}</TableCell>
              <TableCell className="px-4 py-3 text-start">
                {pengajuan.status === "approved" ? (
                  <span className="text-green-600 font-semibold flex items-center gap-1">✅ Disetujui</span>
                ) : pengajuan.status === "rejected" ? (
                  <span className="text-red-500 font-semibold flex items-center gap-1">❌ Ditolak</span>
                ) : (
                  <span className="text-yellow-500 font-semibold flex items-center gap-1">⏳ Menunggu</span>
                )}
              </TableCell>
              <TableCell className="px-4 py-3 text-start">
              <Link
  to={`/pengajuan/${pengajuan._id}`}
  className="px-3 py-1 text-sm text-blue-600 hover:text-white hover:bg-blue-600 dark:text-blue-400 rounded border border-blue-600 mr-2 dark:hover:text-blue-300"
>
  Lihat Detail
</Link>
{pengajuan.status === "approved" && !pengajuan.isGenerate &&(
  <Link
    to={`/generate-key/${pengajuan._id}`}
    className="px-3 py-1 text-sm text-orange-600 hover:text-white hover:bg-orange-600 dark:text-orange-400 dark:hover:text-orange-300 border border-orange-500 rounded"
  >
    Generate key
  </Link>
)}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={8} className="px-4 py-3 text-center text-gray-500 text-theme-sm dark:text-gray-400">
              Tidak ada data pengajuan
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </div>
</div>


      {/* Modal Detail Pengajuan */}
      <Dialog
        open={!!selectedPengajuan}
        onClose={() => setSelectedPengajuan(null)}
        className="fixed z-50 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen px-4">
          <Dialog.Panel className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full">
            <Dialog.Title className="text-xl font-semibold mb-4">Detail Pengajuan</Dialog.Title>
            {selectedPengajuan && (
              <div className="space-y-2">
                <p><strong>Nama:</strong> {selectedPengajuan.nama}</p>
                <p><strong>NIK:</strong> {selectedPengajuan.nik}</p>
                <p><strong>Alamat:</strong> {selectedPengajuan.alamat}</p>
                <p><strong>Status Tanah:</strong> {selectedPengajuan.statusTanah}</p>
                <p><strong>Tanggal Pengajuan:</strong> {selectedPengajuan.tanggal}</p>
                <p><strong>Status:</strong> {getStatusBadge(selectedPengajuan.status)}</p>
              </div>
            )}
            <div className="mt-6 text-right">
              <button
                onClick={() => setSelectedPengajuan(null)}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md"
              >
                Tutup
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
