// pages/pengajuan/FormPengajuan.tsx
import Form from "../../components/form/Form";
import InputField from "../../components/form/input/InputField";
import TextArea from "../../components/form/input/TextArea";
import SelectInput from "../../components/form/form-elements/SelectInputs";
import FileInput from "../../components/form/input/FileInput";
import Checkbox from "../../components/form/input/Checkbox";
import DatePicker from "../../components/form/date-picker";
import Label from "../../components/form/Label";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function FormPengajuan() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<{
    nama: string;
    nik: string;
    alamat: string;
    statusTanah: string;
    berkas: File | null;
    setuju: boolean;
    tanggal: Date | null;
  }>({
    nama: "",
    nik: "",
    alamat: "",
    statusTanah: "",
    berkas: null,
    setuju: false,
    tanggal: null,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Simpan data ke localStorage
    const pengajuanBaru = {
      ...formData,
      tanggal: formData.tanggal?.toISOString() || null,
      berkas: formData.berkas?.name || null, // hanya simpan nama file, karena file nggak bisa disimpan di localStorage
    };

    const existingData = JSON.parse(localStorage.getItem("dataPengajuan") || "[]");
    existingData.push(pengajuanBaru);
    localStorage.setItem("dataPengajuan", JSON.stringify(existingData));

    // Redirect ke halaman riwayat
    navigate("/riwayat-pengajuan");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white dark:bg-gray-900 rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
        Form Pengajuan
      </h1>

      <Form onSubmit={handleSubmit}>
        <InputField
          label="Nama Lengkap"
          id="nama"
          type="text"
          value={formData.nama}
          onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
        />

        <InputField
          label="NIK"
          id="nik"
          type="text"
          value={formData.nik}
          onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
        />

        <TextArea
          label="Alamat Lengkap"
          id="alamat"
          value={formData.alamat}
          onChange={(value) => setFormData({ ...formData, alamat: value })}
        />

        <SelectInput
          label="Status Tanah"
          id="statusTanah"
          options={["Milik Sendiri", "Sewa", "Waris"]}
          value={formData.statusTanah}
          onChange={(value) => setFormData({ ...formData, statusTanah: value })}
        />

        <DatePicker
          id="tanggal"
          label="Tanggal Pengajuan"
          placeholder="Pilih tanggal"
          onChange={([selectedDate]) =>
            setFormData({ ...formData, tanggal: selectedDate })
          }
        />

        <FileInput
          label="Upload Berkas Persyaratan"
          id="berkas"
          onChange={(e) =>
            setFormData({ ...formData, berkas: e.target.files?.[0] || null })
          }
        />

        <Checkbox
          label="Saya menyetujui syarat dan ketentuan"
          id="setuju"
          checked={formData.setuju}
          onChange={(checked) =>
            setFormData({ ...formData, setuju: checked })
          }
        />

        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          Kirim Pengajuan
        </button>
      </Form>
    </div>
  );
}
