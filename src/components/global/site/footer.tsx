import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <>
      <footer className="py-24 lg:px-[200px] px-10 place-content-center place-items-center bg-[#452E19] text-white grid lg:grid-cols-4 grid-cols-1 gap-10">
        <div className="flex flex-col space-y-2">
          <Link className="hover:underline" href="/">
            Home
          </Link>
          <Link className="hover:underline" href="/about-us">
            About Us
          </Link>
          <Link className="hover:underline" href="/products">
            Products
          </Link>
          <Link className="hover:underline" href="/contact-us">
            Contact Us
          </Link>
        </div>
        <div className="flex flex-col space-y-2">
          <Link className="hover:underline" href="/blogs">
            Blogs
          </Link>
          <Link className="hover:underline" href="/cart">
            Cart Section
          </Link>
          <Link className="hover:underline" href="/product-catalog">
            Product Catalog
          </Link>
          <Link className="hover:underline" href="/checkout">
            Payments
          </Link>
        </div>
        <div className="flex flex-col space-y-2">
          <Link className="hover:underline" href="/faqs">
            FAQs
          </Link>
          <Link className="hover:underline" href="/return-policy">
            Return & Refund Policy
          </Link>
          <Link className="hover:underline" href="/terms-condition">
            Terms & Condition
          </Link>
          <Link className="hover:underline" href="/privacy-policy">
            Privacy Policy
          </Link>
        </div>
        <div className="flex flex-col space-y-2">
          <div>
            <p>Location</p>
            <div className="flex items-center gap-2 mt-2">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Flag_of_the_Philippines.svg/800px-Flag_of_the_Philippines.svg.png?20240817131847"
                alt="Philippines"
                width={20}
                height={20}
              />
              <p>Philippines</p>
            </div>
          </div>
          <div>
            <p>Social Media</p>
            <div className="flex mt-2 items-center gap-2">
              <Link href="https://www.facebook.com/" target="_blank">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/512px-2021_Facebook_icon.svg.png?20220821121039"
                  alt="Facebook"
                  width={20}
                  height={20}
                />
              </Link>
              <Link href="https://www.messenger.com/" target="_blank">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Facebook_Messenger_logo_2020.svg/512px-Facebook_Messenger_logo_2020.svg.png?20220118041828"
                  alt="Messenger"
                  width={20}
                  height={20}
                />
              </Link>
            </div>
          </div>
        </div>
      </footer>
      <div className="bg-[#D0F2B7] py-3">
        <p className="text-center">
          &copy; 2018. <b>Marian&apos;s Homebakeshop</b>. All rights reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;
