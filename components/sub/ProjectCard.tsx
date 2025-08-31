import Image from "next/image";
import React from "react";

interface Props {
  src: string;
  title: string;
  description: string;
}

const ProjectCard = ({ src, title, description }: Props) => {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg border border-gray-200 bg-white">
      <Image
        src={src}
        alt={title}
        width={1000}
        height={1000}
        className="w-full object-contain"
      />

<div className="relative p-4">
  <h1 className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-teal-500 text-transparent bg-clip-text">
    {title}
  </h1>
  <p className="mt-2 text-gray-600">{description}</p>
</div>


    </div>
  );
};

export default ProjectCard;
