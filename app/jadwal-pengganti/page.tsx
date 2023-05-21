import TambahJadwal from "./addJadwal";
import DeleteJadwal from "./deleteJadwal";
import UpdateJadwal from "./updateJadwal";

type Jadwal = {
  id: number;
  hari: string;
  waktu: string;
  mataKuliah: string;
  ruangan: string;
};

async function getJadwal() {
  const res = await fetch("http://localhost:5000/jadwal", { next: { revalidate: 10 } });
  return res.json();
}

export default async function JadwalData() {
  const jadwal: Jadwal[] = await getJadwal();
  return (
    <div className="px-10 py-10">
      <div className="py-2">
        <TambahJadwal />
      </div>
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            <th>Hari</th>
            <th>Waktu</th>
            <th>Mata Kuliah</th>
            <th>Ruangan</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {jadwal.map((jadwal) => (
            <tr key={jadwal.id}>
              <th>{jadwal.hari}</th>
              <td>{jadwal.waktu}</td>
              <td>{jadwal.mataKuliah}</td>
              <td>{jadwal.ruangan}</td>
              <td>
                <UpdateJadwal {...jadwal} /> |
                <DeleteJadwal {...jadwal} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
