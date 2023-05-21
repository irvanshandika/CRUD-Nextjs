import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex justify-center text-center mt-10">
        <Link href="/jadwal-pengganti">
          <button className="btn btn-info">Go To Dashboard</button>
        </Link>
      </div>
    </>
  );
}
