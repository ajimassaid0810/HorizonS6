import { SetStateAction, useState } from "react";
import { Link } from "react-router";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [role, setRole] = useState("pemohon");  // Default to 'petugas_kecamatan'
  const [instansi, setInstansi] = useState(""); // Instansi input field
  const [nip, setNip] = useState(""); // NIP field for roles that need it
  const [fullName, setFullName] = useState(""); // Full name field combining first and last names
  const [nik, setNik] = useState(""); 

  const handleRoleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setRole(e.target.value);
    if (e.target.value === "pemohon") {
      setNip(""); // Clear NIP if role is pemohon
    }
  };

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      <div className="w-full max-w-md mx-auto mb-5 sm:pt-10">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon className="size-5" />
          Back to dashboard
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign Up
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your details to sign up!
            </p>
          </div>
          <div>
            <form>
              <div className="space-y-5">
                 {/* Full Name */}
                 <div>
                  <Label>
                    NIK<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="nik"
                    name="nik"
                    value={nik}
                    onChange={(e) => setNik(e.target.value)}
                    placeholder="Enter your NIK"
                  />
                </div>
                {/* Full Name */}
                <div>
                  <Label>
                    Full Name<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="full_name"
                    name="full_name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <Label>
                    Email<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                  />
                </div>

                {/* Password */}
                <div>
                  <Label>
                    Password<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      placeholder="Enter your password"
                      type={showPassword ? "text" : "password"}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>

                {/* Role selection */}
                <div>
                  <Label>
                    Role<span className="text-error-500">*</span>
                  </Label>
                  <select
                    id="role"
                    name="role"
                    value={role}
                    onChange={handleRoleChange}
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg"
                  >
                    <option value="pemohon">Pemohon</option>
                    <option value="petugas_desa">Petugas Desa</option>
                    <option value="petugas_kecamatan">Petugas Kecamatan</option>
                    <option value="petugas_bpn_loket">Petugas BPN Loket</option>
                    <option value="petugas_bpn_berkas">Petugas BPN Berkas</option>
                    <option value="petugas_bpn_pengukuran">Petugas BPN Pengukuran</option>
                    <option value="kepala_seksi">Kepala Seksi</option>
                    <option value="kepala_kantor">Kepala Kantor</option>
                    <option value="verifikator_smartcontract">Verifikator Smart Contract</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                {/* NIP field, only visible if role is not 'pemohon' */}
                {role !== "pemohon" && (
                  <div>
                    <Label>
                      NIP<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="nip"
                      name="nip"
                      value={nip}
                      onChange={(e) => setNip(e.target.value)}
                      placeholder="Enter your NIP"
                    />
                  </div>
                )}

                {/* Instansi (institution) */}
                <div>
                  <Label>
                    Instansi<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="instansi"
                    name="instansi"
                    value={instansi}
                    onChange={(e) => setInstansi(e.target.value)}
                    placeholder="Enter your Instansi"
                  />
                </div>

                {/* Checkbox */}
                <div className="flex items-center gap-3">
                  <Checkbox
                    className="w-5 h-5"
                    checked={isChecked}
                    onChange={setIsChecked}
                  />
                  <p className="inline-block font-normal text-gray-500 dark:text-gray-400">
                    By creating an account means you agree to the{" "}
                    <span className="text-gray-800 dark:text-white/90">
                      Terms and Conditions,
                    </span>{" "}
                    and our{" "}
                    <span className="text-gray-800 dark:text-white">
                      Privacy Policy
                    </span>
                  </p>
                </div>
                {/* Button */}
                <div>
                  <button className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600">
                    Sign Up
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Already have an account? {""}
                <Link
                  to="/signin"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
