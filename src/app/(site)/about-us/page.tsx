/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import React from "react";
import Footer from "@/components/global/site/footer";
import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Page = () => {
  return (
    <div className="min-h-screen w-full mt-20 overflow-x-hidden bg-white">
      {/* Hero Section */}
      <section className="relative w-full min-h-[calc(100vh-5rem)] md:min-h-screen bg-white">
        <div className="absolute inset-0 flex items-center justify-center pt-10 md:pt-0 pb-20 md:pb-0">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-20">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
              <div className="relative w-full lg:w-1/2 aspect-square max-w-[600px]">
                <Image
                  src="/assets/cart.jpg"
                  fill
                  className="w-full h-full shadow-lg border border-black rounded-md object-cover"
                  alt="About"
                />
              </div>
              <div className="bg-[#D0F2B7] lg:-ml-20 lg:-mt-20 z-10 border border-black p-6 rounded-md w-full lg:w-1/2 max-w-[600px]">
                <h3 className="text-center font-bold text-3xl sm:text-4xl mb-6">
                  About us
                </h3>
                <p className="text-center text-sm sm:text-base">
                  Marian's Home bakes Shop, we craft custom cakes that make
                  every celebration unforgettable. From birthdays to weddings,
                  we transform your ideas into delicious, one-of-a-kind
                  creations. <br /> Using premium ingredients and a passion for
                  artistry, we design cakes that not only look stunning but
                  taste incredible. Every cake is handcrafted with care,
                  tailored to your style, and made to celebrate life's sweetest
                  moments. Let us turn your vision into a cake worth
                  remembering. Contact us today to bring your dream cake to
                  life!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="relative w-full min-h-[calc(100vh-5rem)] md:min-h-screen bg-white">
        <div className="absolute inset-0 flex items-center justify-center pt-10 md:pt-0 pb-20 md:pb-0">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-20">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-center font-bold text-3xl sm:text-4xl mb-10">
                Core of Marian's Homebakeshop
              </h3>
              <div className="flex flex-col bg-[#D0F2B7]/70 py-7 px-6 sm:px-10 rounded-xl backdrop-blur-sm">
                <div className="mb-6">
                  <p className="font-semibold text-xl sm:text-2xl">Mission:</p>
                  <p className="mt-2 ml-4 sm:ml-10 text-sm sm:text-base">
                    To craft exceptional, personalized cakes that combine
                    artistry, flavor, and premium ingredients. We aim to make
                    every celebration sweeter by delivering high-quality,
                    memorable creations that reflect our customers' unique
                    stories.
                  </p>
                </div>

                <div className="mb-6">
                  <p className="font-semibold text-xl sm:text-2xl">Vision:</p>
                  <p className="mt-2 ml-4 sm:ml-10 text-sm sm:text-base">
                    To be the go-to custom cake shop that transforms life's
                    special moments into unforgettable, edible masterpieces,
                    inspiring joy and connection through every creation.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-xl sm:text-2xl">
                    Core Values:
                  </p>
                  <div className="mt-2 ml-4 sm:ml-10 space-y-4 text-sm sm:text-base">
                    <p>
                      <b>Creativity</b> - We bring your vision to life with
                      artistic and innovative designs.
                    </p>
                    <p>
                      <b>Quality</b> - We use only the finest ingredients to
                      ensure every cake is as delicious as it is beautiful.
                    </p>
                    <p>
                      <b>Customer-Centric</b> - Your satisfaction and happiness
                      are at the heart of everything we do.
                    </p>
                    <p>
                      <b>Passion</b> - We are driven by a love for baking and
                      creating joyful experiences.
                    </p>
                    <p>
                      <b>Integrity</b> - We uphold transparency, trust, and
                      excellence in every order we fulfill.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative w-full bg-white pb-32 md:pb-0">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h3 className="text-center font-bold text-3xl sm:text-4xl mb-10">
            Customers Feedback
          </h3>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-0">
              {[
                {
                  id: 1,
                  image: "/customers/1.png",
                  text: "Thankyou Marian Homebakes for making Yohann's birthday party extra special! Will definitely order for our future celebrations. Thankyou for the patience as well hehe kahit ang kulit ko sa schedule. Kudos!",
                },
                {
                  id: 2,
                  image: "/customers/2.jpg",
                  text: "super sarap, affordable, and ganda po maam! happy si mama sa money pulling cake ganda ganda!! thank you po!",
                },
                {
                  id: 3,
                  image: "/customers/3.png",
                  text: "Thank you do much Marian HomeBakes for my Mom's birthday cake. Gandang ganda si nanay sabi nya kung maganda sa picture mas maganda daw in person. Masarap and affordable pa! salamat din for accomodating all my requests especially sa flavors and boxes kahit medyo last minute na. Satisfied customer here!",
                },
                {
                  id: 4,
                  image: "/customers/4.jpg",
                  text: "Thankyou Marian Homebakes for making Yohann's birthday party extra special! Will definitely order for our future celebrations. Thankyou for the patience as well hehe kahit ang kulit ko sa schedule. Kudos!",
                },
                {
                  id: 5,
                  image: "/customers/5.png",
                  text: "super sarap, affordable, and ganda po maam! happy si mama sa money pulling cake ganda ganda!! thank you po!",
                },
                {
                  id: 6,
                  image: "/customers/6.jpg",
                  text: "Thank you do much Marian HomeBakes for my Mom's birthday cake. Gandang ganda si nanay sabi nya kung maganda sa picture mas maganda daw in person. Masarap and affordable pa! salamat din for accomodating all my requests especially sa flavors and boxes kahit medyo last minute na. Satisfied customer here!",
                },
              ].map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="flex flex-col items-center"
                >
                  <Avatar className="size-16 sm:size-20">
                    <AvatarImage
                      src={testimonial.image}
                      className="object-cover"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="bg-[#452E1973] mt-5 rounded-lg p-4 w-full min-h-[200px] flex flex-col">
                    <p className="line-clamp-4 flex-grow text-sm sm:text-base">
                      {testimonial.text}
                    </p>
                    <div className="flex mt-3 items-center justify-center gap-2">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="bg-[#C9F199] size-4 sm:size-5 rounded-md flex items-center justify-center"
                        >
                          <StarIcon
                            className="size-2 sm:size-3"
                            fill="#47301B"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Page;
