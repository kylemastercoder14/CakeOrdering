import Image from "next/image";
import React from "react";
import Footer from '@/components/global/site/footer';

const Page = () => {
  return (
    <div className="h-screen">
      <div className="h-screen relative w-full">
        <Image
          src="/assets/about.jpg"
          fill
          className="w-full h-full object-cover"
          alt="About"
        />
        <div className="absolute bg-[#D0F2B7]/50 inset-0 w-full h-full"></div>
        <div className="absolute inset-0">
          <div className="flex flex-col lg:px-[400px] px-10 pt-48">
            <h3 className="text-center font-bold text-4xl mb-10">About us</h3>
            <div className="flex items-center justify-center">
              <div className="relative w-[500px] h-[500px]">
                <Image
                  src="/assets/about.jpg"
                  fill
                  className="w-full h-full shadow-lg border border-black rounded-md object-cover"
                  alt="About"
                />
              </div>
              <div className="bg-[#D0F2B7] -ml-20 -mt-20 z-10 border w-[600px] border-black p-5 rounded-md">
                <p>
                  Marian’s Home bakes Shop, we craft custom cakes that make
                  every celebration unforgettable. From birthdays to weddings,
                  we transform your ideas into delicious, one-of-a-kind
                  creations. Using premium ingredients and a passion for
                  artistry, we design cakes that not only look stunning but
                  taste incredible. Every cake is handcrafted with care,
                  tailored to your style, and made to celebrate life’s sweetest
                  moments. Let us turn your vision into a cake worth
                  remembering. Contact us today to bring your dream cake to
                  life!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-screen relative w-full">
        <Image
          src="/assets/about-2.jpg"
          fill
          className="w-full h-full object-cover"
          alt="About"
        />
        <div className="absolute bg-[#D0F2B7]/50 inset-0 w-full h-full"></div>
        <div className="absolute inset-0">
          <div className="flex flex-col lg:px-[400px] px-10 pt-48">
            <h3 className="text-center font-bold text-4xl mb-10">
              At the Core of {"Marian's"} Homebakeshop
            </h3>
            <div className="flex flex-col bg-[#D0F2B7]/70 py-7 px-10 rounded-xl">
              <p className='font-semibold text-2xl'>Mission: </p>
			  <br />
              <p className='ml-10'>
                To craft exceptional, personalized cakes that combine artistry,
                flavor, and premium ingredients. We aim to make every
                celebration sweeter by delivering high-quality, memorable
                creations that reflect our customers’ unique stories.
              </p>
              <p className='font-semibold text-2xl mt-5'>Vision: </p>
			  <br />
              <p className='ml-10'>
                To be the go-to custom cake shop that transforms life’s special
                moments into unforgettable, edible masterpieces, inspiring joy
                and connection through every creation.
              </p>
              <p className='font-semibold text-2xl mt-5'>Core Values: </p>
			  <br />
              <p className='ml-10'>
                <b>Creativity</b> We bring your vision to life with artistic and
                innovative designs.
				<br /><br />
				<b>Quality</b> We use only the finest ingredients
                to ensure every cake is as delicious as it is beautiful.
				<br /><br />
                <b>Customer-Centric</b> Your satisfaction and happiness are at the
                heart of everything we do.
				<br /><br />
				<b>Passion</b> We are driven by a love for
                baking and creating joyful experiences.
				<br /><br />
				<b>Integrity</b> We uphold
                transparency, trust, and excellence in every order we fulfill.
              </p>
            </div>
          </div>
        </div>
      </div>
	  <Footer />
    </div>
  );
};

export default Page;
