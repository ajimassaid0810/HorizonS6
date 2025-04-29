import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Array "mo:base/Array";
import Option "mo:base/Option";

actor Landchine {

  // Tipe untuk riwayat perubahan sertifikat
  type CertificateHistory = {
    timestamp: Time.Time;
    description: Text;
    changedBy: Principal;
  };

  // Tipe untuk sertifikat tanah
  type Certificate = {
    id: Nat;
    location: Text;
    addressDetail: Text;
    areaSize: Nat;
    certificateNumber: Text;
    owner: Principal;
    createdAt: Time.Time;
    history: [CertificateHistory];
    cid: Text; // CID untuk dokumen yang diupload
  };

  stable var certificates : [Certificate] = []; // Menyimpan semua sertifikat

  // Fungsi untuk mendapatkan sertifikat berdasarkan ID
  public query func getCertificate(id: Nat) : async ?Certificate {
    Array.find<Certificate>(certificates, func(c) = c.id == id)
  };

  // Fungsi untuk mendapatkan daftar semua sertifikat
  public query func listCertificates() : async [Certificate] {
    certificates
  };

  // Fungsi untuk menambahkan sertifikat baru
  public shared(msg) func addCertificate(
    id: Nat,
    location: Text,
    addressDetail: Text,
    areaSize: Nat,
    certificateNumber: Text,
    cid: Text // CID dokumen sertifikat yang diupload
  ) : async Text {
    let caller = msg.caller;

    if (Array.find<Certificate>(certificates, func (c) = c.id == id) != null) {
      return "Certificate with this ID already exists.";
    };

    let newCert : Certificate = {
      id = id;
      location = location;
      addressDetail = addressDetail;
      areaSize = areaSize;
      certificateNumber = certificateNumber;
      owner = caller;
      createdAt = Time.now();
      history = [{
        timestamp = Time.now();
        description = "Certificate created";
        changedBy = caller;
      }];
      cid = cid; // Menyimpan CID dokumen
    };

    certificates := Array.append<Certificate>(certificates, [newCert]);
    return "Certificate added successfully.";
  };

// Fungsi untuk memperbarui sertifikat, termasuk perubahan pemilik dan dokumen
public shared(msg) func updateCertificate(
  id: Nat,
  location: ?Text,
  addressDetail: ?Text,
  areaSize: ?Nat,
  certificateNumber: ?Text,
  note: Text,
  newOwner: ?Principal, // Pemilik baru (untuk jual beli)
  cid: ?Text // CID baru jika ada dokumen baru
) : async Text {
  let caller = msg.caller;

  var found = false;
  var owner = false;
  var updatedCertificates = Array.map<Certificate, Certificate>(certificates, func(c) {
    if (c.id == id) {
      found := true;
      if (c.owner != caller) {
        return c; // Jika pemiliknya bukan yang mengubah, sertifikat tidak bisa diubah
      };
        owner := true;
      // Menangani perubahan pemilik saat jual beli
      let updatedCert : Certificate = {
        id = c.id;
        location = Option.get(location, c.location); // Gunakan nilai lama jika tidak ada nilai baru
        addressDetail = Option.get(addressDetail, c.addressDetail);
        areaSize = Option.get(areaSize, c.areaSize);
        certificateNumber = Option.get(certificateNumber, c.certificateNumber);
        owner = Option.get(newOwner, c.owner); // Jika ada pemilik baru, ganti dengan pemilik baru
        createdAt = c.createdAt;
        history = Array.append<CertificateHistory>(c.history, [{
          timestamp = Time.now();
          description = note; // Deskripsi transaksi jual beli
          changedBy = caller; // Orang yang melakukan perubahan
        }]);
        cid = Option.get(cid, c.cid); // Ganti CID jika ada dokumen baru
      };
      return updatedCert;
    } else {
      return c; // Kembalikan sertifikat yang tidak diubah
    }
  });

  if( found ){
    certificates := updatedCertificates;
    return "Certificate updated successfully.";
  }else{
    certificates := updatedCertificates;
    return "Certificate updated Failed";
  }

  
};



  // Fungsi untuk mendapatkan riwayat perubahan sertifikat berdasarkan ID
  public query func getHistory(id: Nat) : async ?[CertificateHistory] {
    switch (Array.find<Certificate>(certificates, func (c) = c.id == id)) {
      case (?cert) { return ?cert.history };
      case null { return null };
    }
  };
}
