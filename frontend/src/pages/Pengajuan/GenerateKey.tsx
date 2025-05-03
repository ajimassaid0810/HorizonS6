import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import sha256 from "crypto-js/sha256";
import Base64 from "crypto-js/enc-base64";
import Badge from "../../components/ui/badge/Badge";
import { HttpAgent, Actor } from "@dfinity/agent";
import { idlFactory } from "../../declarations/canister_backend/service.did.js"; // path sesuai lokasi kamu

const canisterId = "3z2ve-waaaa-aaaab-qacmq-cai"; 

const agent = new HttpAgent({ host: "https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io" });

// OPTIONAL: untuk local development
// await agent.fetchRootKey();

const canister = Actor.createActor(idlFactory, {
  agent,
  canisterId,
});

interface Pengajuan {
  _id: string;
  nama: string;
  nik: string;
  alamat: string;
  statusTanah: string;
  tanggal: string;
  status: "pending" | "approved" | "rejected";
  isGenerate: boolean;
}

export default function GenerateKey() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pengajuan, setPengajuan] = useState<Pengajuan | null>(null);
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("dataPengajuan") || "[]") as Pengajuan[];
    const found = savedData.find(item => item._id === id || "");

    if (found) {
      setPengajuan(found);
      setIsGenerated(found.isGenerate ?? false);
    }
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

  const generateKeys = async () => {
    try {
        const rawPrivate =
        typeof window !== "undefined" && window.crypto?.randomUUID
          ? window.crypto.randomUUID() + Date.now()
          : Math.random().toString(36).substring(2) + Date.now();
      
      const rawPublic = sha256(rawPrivate).toString(Base64);

      setPrivateKey(rawPrivate);
      setPublicKey(rawPublic);
      console.log(rawPublic,
        rawPrivate,
        [], // Karena ?Nat harus dikirim sebagai `[]` atau `[value]`
        pengajuan?.nama,
       "https://ecotown.id/wp-content/uploads/2024/09/Informasi-Dasar-Sertifikat.webp");
      const result = await canister.addCertificate(
        rawPublic,
        rawPrivate,
        [], // Karena ?Nat harus dikirim sebagai `[]` atau `[value]`
        pengajuan?.nama,
       "https://ecotown.id/wp-content/uploads/2024/09/Informasi-Dasar-Sertifikat.webp"
      );
    
     
      


      const updatedData = (JSON.parse(localStorage.getItem("dataPengajuan") || "[]") as Pengajuan[]).map(item =>
        item._id === pengajuan?._id ? { ...item, isGenerate: true } : item
      );

      localStorage.setItem("dataPengajuan", JSON.stringify(updatedData));
      setIsGenerated(true);

    } catch (error) {
      console.error("Error:", error);
      alert("Gagal generate atau kirim key ke ICP.");
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Disalin ke clipboard!");
    } catch {
      alert("Gagal menyalin.");
    }
  };

  if (!pengajuan) {
    return <div className="p-6 text-center text-gray-500">Data tidak ditemukan.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white dark:bg-gray-900 rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Data Sertifikat</h1>
      <div className="space-y-3 text-gray-700 dark:text-gray-200">
        <p><strong>Nama:</strong> {pengajuan.nama}</p>
        <p><strong>NIK:</strong> {pengajuan.nik}</p>
        <p><strong>Alamat:</strong> {pengajuan.alamat}</p>
        <p><strong>Status Tanah:</strong> {pengajuan.statusTanah}</p>
        <p><strong>Tanggal Pengajuan:</strong> {pengajuan.tanggal}</p>
        <p><strong>Status:</strong> {getStatusBadge(pengajuan.status)}</p>
      </div>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Generate Sertifikat Key</h2>

      <p className="mb-4 text-gray-700 dark:text-gray-300">
        Halaman ini akan membuat <strong>SHA Private Key</strong> dan <strong>SHA Public Key</strong> untuk keperluan
        pengajuan sertifikat. Simpan baik-baik <strong>Private Key</strong>, karena:
      </p>
      <ul className="list-disc pl-6 mb-4 text-sm text-gray-600 dark:text-gray-400">
        <li><strong>SHA Private Key</strong> hanya ditampilkan sekali dan digunakan untuk memperbarui atau memvalidasi data.</li>
        <li><strong>SHA Public Key</strong> digunakan untuk mengecek keaslian sertifikat.</li>
        <li>Sertifikat disimpan secara permanen dan tidak bisa diubah (simulasi on-chain).</li>
      </ul>

      {!isGenerated ? (
        <button
          onClick={generateKeys}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
        >
          Generate Key dan Submit Sertifikat
        </button>
      ) : (
        <div className="space-y-4 mt-6">
          <div>
            <label className="font-medium text-gray-800 dark:text-gray-200">SHA Private Key:</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={privateKey}
                className="w-full mt-1 px-3 py-2 border rounded bg-gray-100 dark:bg-gray-800 text-sm"
              />
              <button
                onClick={() => copyToClipboard(privateKey)}
                className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded"
              >
                Salin
              </button>
            </div>
            <p className="text-red-600 text-xs mt-1">
              ⚠️ Simpan ini dengan aman. Jangan dibagikan ke orang lain.
            </p>
          </div>

          <div>
            <label className="font-medium text-gray-800 dark:text-gray-200">SHA Public Key:</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={publicKey}
                className="w-full mt-1 px-3 py-2 border rounded bg-gray-100 dark:bg-gray-800 text-sm"
              />
              <button
                onClick={() => copyToClipboard(publicKey)}
                className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded"
              >
                Salin
              </button>
            </div>
          </div>

          <button
            onClick={() => navigate("/riwayat-pengajuan")}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition"
          >
            Selesai
          </button>
        </div>
      )}
    </div>
  );
}
