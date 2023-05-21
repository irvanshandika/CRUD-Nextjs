"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Jadwal = {
  id: number;
  hari: string;
  waktu: string;
  mataKuliah: string;
  ruangan: string;
};

export default function DeleteJadwal(jadwal: Jadwal) {
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleDelete(jadwalId: number) {
    setIsMutating(true);
    await fetch(`http://localhost:5000/jadwal/${jadwalId}`, {
      method: "DELETE",
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
      <button className="btn btn-error btn-sm" onClick={handleChange}>
        Hapus Data
      </button>
      <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h1 className="font-medium text-lg">Apakah Kamu Yakin Menghapus " {jadwal.mataKuliah} "</h1>
          <div className="modal-action">
            <button type="button" className="btn" onClick={handleChange}>
              Close
            </button>
            {!isMutating ? (
              <button type="button" onClick={() => handleDelete(jadwal.id)} className="btn btn-primary">
                Delete
              </button>
            ) : (
              <button type="button" className="btn loading">
                Menghapus...
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
