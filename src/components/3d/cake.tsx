"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const CakePreview = ({ loading, generatedImage }: { loading: boolean; generatedImage: string }) => {
  return (
    <AspectRatio
      ratio={16 / 9}
      className="pointer-events-none flex items-center justify-center relative z-50 w-full h-full"
    >
      <div className="relative aspect-[896/1831]">
        {loading ? (
          <div className="text-center text-gray-500">Generating cake preview...</div>
        ) : generatedImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={generatedImage}
            alt="Generated Cake Preview"
            className="w-full h-full object-cover rounded-lg shadow-2xl"
          />
        ) : (
          <div className="text-center text-gray-400">No preview available</div>
        )}
      </div>
    </AspectRatio>
  );
};

export default CakePreview;
