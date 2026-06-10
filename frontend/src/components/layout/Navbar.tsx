export default function Navbar() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div>
          <h1 className="text-xl font-bold text-blue-600">
            HamroBBA
          </h1>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="/"
            className="text-sm font-medium text-gray-700 hover:text-blue-600"
          >
            Home
          </a>

          <a
            href="/semesters"
            className="text-sm font-medium text-gray-700 hover:text-blue-600"
          >
            Semesters
          </a>

          <a
            href="/resources"
            className="text-sm font-medium text-gray-700 hover:text-blue-600"
          >
            Resources
          </a>
        </nav>
      </div>
    </header>
  );
}