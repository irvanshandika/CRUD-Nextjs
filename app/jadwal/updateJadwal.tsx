"use client";
import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";

type Jadwal = {
  id: number;
  hari: string;
  waktu: string;
  mataKuliah: string;
  ruangan: string;
};

export default function UpdateJadwal(jadwal: Jadwal) {
  const [hari, setHari] = useState(jadwal.hari);
  const [waktu, setWaktu] = useState(jadwal.waktu);
  const [mataKuliah, setMataKuliah] = useState(jadwal.mataKuliah);
  const [ruangan, setRuangan] = useState(jadwal.ruangan);
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleUpdate(e: SyntheticEvent) {
    e.preventDefault();
    setIsMutating(true);
    await fetch(`http://localhost:5000/jadwal/${jadwal.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hari: hari,
        waktu: waktu,
        mataKuliah: mataKuliah,
        ruangan: ruangan,
      }),
    });

    setIsMutating(false);

    router.refresh();
    setModal(false);
  }
  function handleChange() {
    setModal(!modal);
  }
  return (
    <>
      <button className="btn btn-info btn-sm" onClick={handleChange}>
        Edit Jadwal
      </button>
      <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h1 className="font-medium text-lg">Edit Jadwal Hari " {jadwal.hari} "</h1>
          <form onSubmit={handleUpdate}>
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
                  Update
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Updating...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
