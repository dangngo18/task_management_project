export default function Home() {

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-white">
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
              <p className="mt-1 text-sm text-gray-600">
                Organize your tasks efficiently
              </p>
            </div>
            <div className="text-4xl">✅</div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">

      </main>
    </div>
  );
}
