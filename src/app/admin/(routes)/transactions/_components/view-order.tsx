"use client";

import { OrderItems, Orders, Products } from "@prisma/client";
import React from "react";
import { toast } from "sonner";
import { getOrderById } from "@/actions/order";
import Image from "next/image";

interface OrderItemsWithProduct extends OrderItems {
  product: Products;
}

interface OrderWithProps extends Orders {
  orderItems: OrderItemsWithProduct[];
}

const ViewOrder = ({ id }: { id: string }) => {
  const [order, setOrder] = React.useState<OrderWithProps | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      try {
        const res = await getOrderById(id);
        if (res.success) {
          setOrder(res.data);
        } else {
          toast.error(res.error);
        }
      } catch (error) {
        console.error("Error fetching order:", error);
        toast.error("Error fetching order");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading order details...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-10 text-red-500">Order not found</div>
    );
  }

  return (
    <div className="p-2">
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>

      <div className="mb-4">
        <p>
          <strong>Order Number:</strong> {order.orderNumber}
        </p>
        <p>
          <strong>Name:</strong> {order.name}
        </p>
        <p>
          <strong>Address:</strong> {order.address}
        </p>
        <p>
          <strong>Total Amount:</strong> ₱{order.totalAmount.toFixed(2)}
        </p>
        <p>
          <strong>Order Status:</strong>{" "}
          <span
            className={`px-1.5 py-0.5 text-sm rounded-md text-white ${
              order.orderStatus === "Rejected"
                ? "bg-red-600"
                : order.orderStatus === "Pending"
                ? "bg-yellow-600"
                : "bg-green-600"
            }`}
          >
            {order.orderStatus}
          </span>
        </p>
        <p>
          <strong>Delivery Status:</strong>{" "}
          <span
            className={`px-1.5 py-0.5 text-sm rounded-md text-white ${
              order.deliveryStatus === "Waiting For Rider"
                ? "bg-yellow-600"
                : order.deliveryStatus === "Out for Delivery"
                ? "bg-blue-600"
                : order.deliveryStatus === "Delivered"
                ? "bg-green-600"
                : order.deliveryStatus === "Order Failed"
                ? "bg-red-600"
                : "bg-gray-500"
            }`}
          >
            {order.deliveryStatus}
          </span>
        </p>
        <p>
          <strong>Shipping Option:</strong> {order.shippingOption}
        </p>
        <p>
          <strong>Shipping Fee:</strong> ₱{order.shippingFee.toFixed(2)}
        </p>
        {order.message && (
          <p>
            <strong>Message:</strong> {order.message}
          </p>
        )}
      </div>

      <h3 className="text-xl font-semibold mb-2">Order Items</h3>
      <div className="pt-3">
        {order.orderItems.length > 0 ? (
          <ul className="space-y-3">
            {order.orderItems.map((item) => (
              <li
                key={item.id}
                className="p-3 flex items-center gap-3 border rounded-md"
              >
                <div className="relative w-20 h-20">
                  <Image
                    src={item.product.imageUrl}
                    alt="Product image"
                    fill
                    className="w-full h-full rounded-md"
                  />
                </div>
                <div>
                  <p>
                    <strong>Product Name:</strong> {item.product.name}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {item.quantity}
                  </p>
                  <p>
                    <strong>Subtotal:</strong> ₱{item.subTotal.toFixed(2)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No items found in this order.</p>
        )}
      </div>
    </div>
  );
};

export default ViewOrder;
