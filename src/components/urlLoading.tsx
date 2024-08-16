export default function Loading() {
    return (
      <div className="motion-safe:animate-pulse">
        {Array(3) 
          .fill("")
          .map((_, index) => (
            <div
              key={index}
              className="mb-3 flex flex-col md:flex-row justify-between w-full items-center bg-white rounded-xl shadow-lg p-5"
            >
              <div className="flex flex-col md:flex-row gap-5">
                <div className="flex items-center">
                  <div className="bg-gray-300 rounded-sm w-24 h-24"></div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="bg-teal-300 h-6 w-32 rounded"></div>
                  <div className="bg-teal-300 h-4 w-24 rounded mt-2"></div>
                  <div className="bg-teal-300 h-4 w-40 rounded mt-1"></div>
                  <div className="bg-teal-300 h-3 w-20 rounded mt-2"></div>
                </div>
              </div>
              <div className="flex items-center gap-2 md:gap-3 lg:gap-4">
                <div className="bg-teal-300 rounded-full h-6 w-6"></div>
                <div className="bg-teal-300 rounded-full h-6 w-6"></div>
                <div className="bg-teal-300 rounded-full h-6 w-6"></div>
                <div className="bg-teal-300 h-8 w-16 rounded"></div>
              </div>
            </div>
          ))}
      </div>
    );
  }