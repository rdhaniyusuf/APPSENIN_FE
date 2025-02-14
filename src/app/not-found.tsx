export default function NotFound() {
    return (
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold">404 - Halaman Tidak Di temukan</h1>
        <p className="text-gray-500 mt-2">Palingan dalam pengembangan.</p>
        <a href="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">Go Home</a>
      </div>
    );
  }