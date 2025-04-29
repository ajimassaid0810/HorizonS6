import { useState, useEffect } from "react";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "../../components/ui/table";
import Badge from "../../components/ui/badge/Badge";
import { Dialog } from "@headlessui/react";

interface Pengajuan {
  id: number;
  nama: string;
  nik: string;
  alamat: string;
  statusTanah: string;
  tanggal: string;
  status: "pending" | "approved" | "rejected";
}

export default function RiwayatPengajuan() {
  const [dataPengajuan, setDataPengajuan] = useState<Pengajuan[]>([]);
  const [selectedPengajuan, setSelectedPengajuan] = useState<Pengajuan | null>(null);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("dataPengajuan") || "[]");

    // Buat data jadi sesuai dengan interface, misalnya kasih ID dan status default
    const formattedData: Pengajuan[] = savedData.map((item: any, index: number) => ({
      id: index + 1,
      nama: item.nama,
      nik: item.nik,
      alamat: item.alamat,
      statusTanah: item.statusTanah,
      tanggal: item.tanggal,
      status: "pending", // default status
    }));

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
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Riwayat Pengajuan</h1>

      <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-lg shadow">
        <Table className="min-w-full divide-y divide-gray-200">
          <TableHeader>
            <TableRow>
              <TableCell isHeader>No</TableCell>
              <TableCell isHeader>Nama</TableCell>
              <TableCell isHeader>NIK</TableCell>
              <TableCell isHeader>Alamat</TableCell>
              <TableCell isHeader>Status Tanah</TableCell>
              <TableCell isHeader>Tanggal</TableCell>
              <TableCell isHeader>Status</TableCell>
              <TableCell isHeader>Aksi</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataPengajuan.map((pengajuan, index) => (
              <TableRow key={pengajuan.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{pengajuan.nama}</TableCell>
                <TableCell>{pengajuan.nik}</TableCell>
                <TableCell>{pengajuan.alamat}</TableCell>
                <TableCell>{pengajuan.statusTanah}</TableCell>
                <TableCell>{pengajuan.tanggal}</TableCell>
                <TableCell>{getStatusBadge(pengajuan.status)}</TableCell>
                <TableCell>
                  <button
                    onClick={() => setSelectedPengajuan(pengajuan)}
                    className="px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                  >
                    Lihat Detail
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
