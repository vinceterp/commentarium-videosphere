export function Footer() {
  return (
    <footer className="bg-gray text-gray-400 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-4">
          <p className="text-sm text-center">
            © {new Date().getFullYear()} Commentarium. All rights reserved.
          </p>
          <p className="text-xs text-center">Built with 💜</p>
        </div>
      </div>
    </footer>
  );
}
