import React from "react";
import db from "@/lib/db";
import ProductDetails from "@/components/global/site/product-details";
import Feature from "@/components/global/site/feature";
import Footer from "@/components/global/site/footer";

const Page = async (props: { params: Promise<{ productId: string }> }) => {
  const params = await props.params;
  const product = await db.products.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      category: true,
    },
  });
  return (
    <>
      <div className="pt-24 lg:px-[200px] px-10">
        <ProductDetails product={product} />
      </div>
      <div className='pb-24'>
	  <Feature />
	  </div>
      <Footer />
    </>
  );
};

export default Page;
