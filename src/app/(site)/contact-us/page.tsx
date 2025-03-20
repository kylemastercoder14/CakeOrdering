import Image from "next/image";
import React from "react";
import ContactForm from "@/components/forms/contact-form";
import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import Footer from '@/components/global/site/footer';

const Page = () => {
  return (
    <div className="h-screen">
      <div className="relative h-[50vh] w-full">
        <Image
          src="/assets/contact.jpg"
          fill
          className="w-full h-full object-cover"
          alt="About"
        />
        <div className="absolute bg-[#D0F2B7]/50 inset-0 w-full h-full"></div>
        <div className="absolute inset-0">
          <h3 className="text-center pt-60 uppercase text-[#452E19] font-black font-mono tracking-wider text-6xl mb-10">
            Contact Us
          </h3>
        </div>
      </div>
      <div className="grid pb-24 lg:grid-cols-5 lg:px-[200px] px-10 pt-10 grid-cols-1 gap-20">
        <div className="lg:col-span-3">
          <ContactForm />
        </div>
        <div className="lg:col-span-2">
          <h3 className="font-semibold text-2xl">Get in touch</h3>
          <p className="mt-2">
            Thank you for visiting our page! If you have any questions or are
            interested in collaborating with us on our homemade cakes, please
            don’t hesitate to get in touch.
          </p>
          <Link href="mailto:marianzaimer@gmail.com" className="flex items-center mt-5 gap-2">
            <Mail className="size-7" />
            <p className="text-lg">marianzaimer@gmail.com</p>
          </Link>
          <Link href="tel:09927641552" className="flex items-center mt-5 gap-2">
            <Phone className="size-7" />
            <p className="text-lg">+ 63 9927-641-552</p>
          </Link>
          <p className="mt-5 text-lg">Follow on: </p>
          <div className="flex items-center mt-3 gap-2">
            <Link href="https://www.facebook.com/" target="_blank">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/512px-2021_Facebook_icon.svg.png?20220821121039"
                alt="Facebook"
                width={40}
                height={40}
              />
            </Link>
            <Link href="https://www.messenger.com/" target="_blank">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Facebook_Messenger_logo_2020.svg/512px-Facebook_Messenger_logo_2020.svg.png?20220118041828"
                alt="Messenger"
                width={40}
                height={40}
              />
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
