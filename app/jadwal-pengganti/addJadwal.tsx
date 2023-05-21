"use client";
import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function TambahJadwal() {
  const [hari, setHari] = useState("");
  const [waktu, setWaktu] = useState("");
  const [mataKuliah, setMataKuliah] = useState("");
  const [ruangan, setRuangan] = useState("");
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    setIsMutating(true);
    await fetch("http://localhost:5000/jadwal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hari: hari,
        waktu: waktu,
        mataKuliah: mataKuliah,
        ruangan: ruangan,
      }),
    });

    setIsMutating(false);

    setHari("");
    setWaktu("");
    setMataKuliah("");
    setRuangan("");
    router.refresh();
    setModal(false);
  }
  function handleChange() {
    setModal(!modal);
  }
  return (
    <>
      <button className="btn" onClick={handleChange}>
        Input Jadwal Pengganti
      </button>
      <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h1 className="font-medium text-lg">Input Jadwal Pengganti</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label font-medium">Hari</label>
              <input type="text" value={hari} onChange={(e) => setHari(e.target.value)} className="input w-full input-bordered" />
              <label className="label font-medium">Waktu</label>
              <input type="time" value={waktu} onChange={(e) => setWaktu(e.target.value)} className="input w-full input-bordered" />
              <label className="label font-medium">Mata Kuliah</label>
              <input type="text" value={mataKuliah} onChange={(e) => setMataKuliah(e.target.value)} className="input w-full input-bordered" />
              <label className="label font-medium">Ruangan</label>
              <input type="text" value={ruangan} onChange={(e) => setRuangan(e.target.value)} className="input w-full input-bordered" />
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Close
              </button>
              {!isMutating ? (
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Menyimpan...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
