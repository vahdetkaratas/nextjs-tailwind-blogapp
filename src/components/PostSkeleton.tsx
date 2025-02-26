const PostSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
    <div className="space-y-2 mb-4">
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
    <div className="flex flex-wrap gap-2 mb-4">
      {[1, 2].map((i) => (
        <div key={i} className="h-6 bg-gray-200 rounded-full w-16"></div>
      ))}
    </div>
    <div className="flex justify-between items-center">
      <div className="h-4 bg-gray-200 rounded w-24"></div>
      <div className="h-4 bg-gray-200 rounded w-20"></div>
    </div>
  </div>
);

export default PostSkeleton;
