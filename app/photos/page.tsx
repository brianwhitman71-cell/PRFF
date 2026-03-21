export default function PhotosPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">📸 Photos</h1>
      <p className="text-gray-400">
        Memories from PRFF events, draft days, and celebrations.
      </p>

      {/* Placeholder grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square bg-gray-900 border border-gray-800 rounded-xl flex items-center justify-center text-gray-700 text-sm"
          >
            Photo {i + 1}
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-600 text-center">
        Add your photos to the{" "}
        <code className="bg-gray-800 px-1 rounded">public/photos</code> folder
        and update this page to display them.
      </p>
    </div>
  );
}
