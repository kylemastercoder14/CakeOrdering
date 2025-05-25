import Image from "next/image";
import React from "react";

const BlogCard = ({
  image,
  title,
  description,
  datePosted,
}: {
  image: string;
  title: string;
  description: string;
  datePosted: string;
}) => {
  return (
    <div>
      <div className="relative w-full h-[30vh]">
        <Image
          src={image}
          alt={title}
          fill
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <h3 className="text-xl font-semibold line-clamp-2 mt-2">{title}</h3>
      <div className="flex text-sm items-center gap-2">
        <p>{datePosted} • </p>
        <p>By Admin</p>
      </div>
      <p className="mt-3 line-clamp-3 text-sm">{description}</p>
    </div>
  );
};

export default BlogCard;
