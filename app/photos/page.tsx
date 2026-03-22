export default function PhotosPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-green-400 mb-1">
          Gallery
        </p>
        <h1 className="text-3xl font-bold text-white">📸 Media</h1>
        <p className="text-gray-500 mt-1">
          Memories from PRFF events, draft days, and celebrations.
        </p>
      </div>

      {/* Placeholder grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-gray-700 text-sm hover:border-white/20 transition-colors"
          >
            Photo {i + 1}
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-700 text-center">
        Add your photos to the{" "}
        <code className="bg-white/5 px-1.5 py-0.5 rounded text-gray-500">
          public/photos
        </code>{" "}
        folder and update this page to display them.
      </p>
    </div>
  );
}
