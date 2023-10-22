import Tray from "@/components/tray";

export default function Home({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;
  return (
    <main>
      <Tray page={page} />
    </main>
  );
}
