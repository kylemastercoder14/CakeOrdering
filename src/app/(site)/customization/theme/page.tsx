"use client";

import React from "react";
import ThemeCard from "@/components/global/theme-card";

const Page = () => {
  const themes = [
    {
      title: "Birthday Cakes for Girls",
      description:
        "Celebrate your little princess's birthday with our collection of cakes. From unicorns to princesses, we have it all.",
      image: "/cakes/girl.jpg",
      color: "pink",
    },
    {
      title: "Birthday Cakes for Boys",
      description:
        "Celebrate your little prince's birthday with our collection of cakes. From superheroes to cars, we have it all.",
      image: "/cakes/boy.jpg",
      color: "blue",
    },
    {
      title: "Birthday Cakes for Women",
      description:
        "Celebrate  your special lady's birthday with our collection of cakes. From elegant designs to floral themes, we have it all.",
      image: "/cakes/woman.jpeg",
      color: "purple",
    },
    {
      title: "Birthday Cakes for Men",
      description:
        "Celebrate your special man's birthday with our collection of cakes. From sports themes to cars, we have it all.",
      image: "/cakes/man.jpg",
      color: "green",
    },
    {
      title: "Bridal Shower Cakes",
      description:
        "Spice up your bridal shower with our collection of cakes. From elegant designs to floral themes, we have it all.",
      image: "/cakes/bridal.jpg",
      color: "yellow",
    },
    {
      title: "Cakes for Gender Reveal",
      description:
        "Celebrate your baby shower with our collection of cakes. From baby animals to baby clothes, we have it all.",
      image: "/cakes/gender.jpg",
      color: "orange",
    },
    {
      title: "Cakes for Christening",
      description:
        "Celebrate your baby's christening or baptism with our collection of cakes. From angels to crosses, we have it all.",
      image: "/cakes/christening.jpg",
      color: "gray",
    },
    {
      title: "Cakes for Wedding",
      description:
        "Celebrate your wedding with our collection of cakes. From elegant designs to floral themes, we have it all.",
      image: "/cakes/wedding.jpg",
      color: "red",
    },
    {
      title: "Cakes for Graduation",
      description:
        "Celebrate your graduation with our collection of cakes. From graduation caps to diplomas, we have it all.",
      image: "/cakes/graduation.jpg",
      color: "indigo",
    },
  ];
  return (
    <div className="w-full bg-[#D0F2B7] p-5 mt-6">
      <h1 className="text-3xl font-bold">Our Customized Cakes</h1>
      <p>
        Browse our varied collections of customized cakes by clicking on the
        categories below:
      </p>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-7 mt-10">
        {themes.map((theme) => (
          <ThemeCard
            key={theme.title}
            title={theme.title}
            description={theme.description}
            image={theme.image}
            color={theme.color}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
