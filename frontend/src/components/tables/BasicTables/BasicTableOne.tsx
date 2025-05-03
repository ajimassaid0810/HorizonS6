import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import Badge from "../../ui/badge/Badge";

// Interface untuk data kecamatan
interface KecamatanData {
  _id:string;
  nama: string;
  alamat: string;
  statusTanah: string;
  status?: string;
  [key: string]: any;
}

interface BasicTableOneProps {
  data: KecamatanData[];
  onDetail: (data: KecamatanData) => void;
}

const BasicTableOne: React.FC<BasicTableOneProps> = ({ data, onDetail }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Nama Kecamatan
              </TableCell>
              <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Alamat
              </TableCell>
              <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Status Tanah
              </TableCell>
              <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Status Verifikasi
              </TableCell>
              <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 w-[200px]">
                Aksi
              </TableCell>

            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {data.length > 0 ? (
              data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <span
                      className={`block font-semibold text-theme-sm ${
                        item.statusVerifikasi === "Sudah Diverifikasi"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {item.nama}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {item.alamat}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        item.statusTanah === "Tersertifikasi"
                          ? "success"
                          : item.statusTanah === "Proses"
                          ? "warning"
                          : "info"
                      }
                    >
                      {item.statusTanah}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    {item.status === "approved" ? (
                      <span className="text-green-600 font-semibold flex items-center gap-1">
                        ✅ Diverifikasi
                      </span>
                    ) : (
                      <span className="text-red-500 font-semibold flex items-center gap-1">
                        ❌ Belum
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    <button
                      onClick={() => onDetail(item)}
                      className="px-3 py-1 text-sm text-blue-600 hover:text-white hover:bg-blue-600 dark:text-blue-400 dark:hover:text-blue-300 border border-blue-500 rounded"
                    >
                      Detail
                    </button>
                  
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="px-4 py-3 text-center text-gray-500 text-theme-sm dark:text-gray-400">
                  Tidak ada data kecamatan yang diajukan
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BasicTableOne;
