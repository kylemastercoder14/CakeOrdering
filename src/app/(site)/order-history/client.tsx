"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { differenceInHours, format } from "date-fns";
import { Modal } from "@/components/ui/modal";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cancelOrder } from "@/actions/order";

// Define types for the data structures
type Product = {
  id: string;
  name: string;
  imageUrl?: string;
};

type OrderItem = {
  id: string;
  product: Product;
  quantity: number;
  subTotal: number;
};

type Order = {
  id: string;
  orderNumber: string;
  createdAt: string;
  totalAmount: number;
  orderStatus: "Completed" | "Pending" | "Cancelled" | string;
  paymentOption: string;
  proofOfPayment?: string;
  name: string;
  message?: string;
  cancellationReason?: string;
  cancelledAt?: string;
  orderItems: OrderItem[];
};

type OrderHistoryPageProps = {
  orders?: Order[];
};

type OrderItemProps = {
  item: OrderItem;
};

type StatusBadgeProps = {
  status: string;
  type: "order" | "payment";
};

// Status badges with appropriate colors
const StatusBadge = ({ status, type }: StatusBadgeProps) => {
  let bgColor: string = "bg-gray-100";
  let textColor: string = "text-gray-800";

  if (type === "order") {
    if (status === "Completed") {
      bgColor = "bg-green-100";
      textColor = "text-green-800";
    } else if (status === "Pending") {
      bgColor = "bg-yellow-100";
      textColor = "text-yellow-800";
    } else if (status === "Cancelled") {
      bgColor = "bg-red-100";
      textColor = "text-red-800";
    } else {
      bgColor = "bg-blue-100";
      textColor = "text-blue-800";
    }
  } else if (type === "payment") {
    if (status === "Paid") {
      bgColor = "bg-green-100";
      textColor = "text-green-800";
    } else if (status === "Pending") {
      bgColor = "bg-yellow-100";
      textColor = "text-yellow-800";
    } else if (status === "Failed") {
      bgColor = "bg-red-100";
      textColor = "text-red-800";
    } else {
      bgColor = "bg-gray-100";
      textColor = "text-gray-800";
    }
  }

  return (
    <span
      className={`${bgColor} ${textColor} text-xs font-medium px-2.5 py-0.5 rounded-full`}
    >
      {status}
    </span>
  );
};

const OrderItem = ({ item }: OrderItemProps) => {
  return (
    <div className="flex items-center space-x-3 py-2">
      <div className="relative h-12 w-12 rounded-md overflow-hidden bg-gray-100">
        {item.product.imageUrl ? (
          <Image
            src={item.product.imageUrl}
            alt={item.product.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full w-full text-[#452E19]/50">
            No image
          </div>
        )}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-[#452E19]">
          {item.product.name}
        </p>
        <p className="text-xs text-[#452E19]/70">Qty: {item.quantity}</p>
      </div>
      <p className="text-sm font-semibold text-[#452E19]">
        ₱{item.subTotal.toFixed(2)}
      </p>
    </div>
  );
};

const OrderHistoryPage = ({ orders = [] }: OrderHistoryPageProps) => {
  const router = useRouter();
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);
  const [cancellingOrderId, setCancellingOrderId] = useState<string | null>(
    null
  );
  const [cancelModal, setCancelModal] = useState<boolean>(false);
  const [cancellationReason, setCancellationReason] = useState<string>("");
  const [otherReason, setOtherReason] = useState<string>("");

  // Refund modal states
  const [refundModal, setRefundModal] = useState<boolean>(false);
  const [refundingOrderId, setRefundingOrderId] = useState<string | null>(null);
  const [refundReason, setRefundReason] = useState<string>("");
  const [otherRefundReason, setOtherRefundReason] = useState<string>("");
  const [refundDetails, setRefundDetails] = useState<string>("");

  // Review modal states
  const [reviewModal, setReviewModal] = useState<boolean>(false);
  const [reviewingOrderId, setReviewingOrderId] = useState<string | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [reviewComment, setReviewComment] = useState<string>("");

  // Toggle order details
  const toggleOrderDetails = (orderId: string) => {
    if (activeOrderId === orderId) {
      setActiveOrderId(null);
    } else {
      setActiveOrderId(orderId);
    }
  };

  // Check if order is within 24 hours
  const isWithin24Hours = (createdAt: string) => {
    const orderDate = new Date(createdAt);
    const now = new Date();
    return differenceInHours(now, orderDate) < 24;
  };

  // Handle cancel order click
  const handleCancelClick = (orderId: string) => {
    setCancellingOrderId(orderId);
    setCancellationReason("");
    setOtherReason("");
    setCancelModal(true);
  };

  // Handle cancellation submission
  const submitCancellation = async () => {
    if (!cancellingOrderId) return;

    const finalReason =
      cancellationReason === "other"
        ? `Other: ${otherReason}`
        : cancellationReason;

    try {
      const response = await cancelOrder(cancellingOrderId, finalReason);

      if (response.error) {
        toast.error(response.error);
      }

      router.refresh();
      toast.success("Order cancelled successfully.");
    } catch (error) {
      console.error("Cancellation failed:", error);
      toast.error("Failed to cancel order. Please try again later.");
    } finally {
      setCancellingOrderId(null);
      setCancellationReason("");
      setOtherReason("");
      setCancelModal(false);
    }
  };

  // Handle refund request click
  const handleRefundClick = (orderId: string) => {
    setRefundingOrderId(orderId);
    setRefundReason("");
    setOtherRefundReason("");
    setRefundDetails("");
    setRefundModal(true);
  };

  // Handle refund submission
  const submitRefund = async () => {
    if (!refundingOrderId) return;

    const finalReason =
      refundReason === "other" ? `Other: ${otherRefundReason}` : refundReason;

    try {
      // Here you would typically call an API to submit the refund request
      console.log("Submitting refund request for order:", refundingOrderId);
      console.log("Reason:", finalReason);
      console.log("Details:", refundDetails);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      router.refresh();
      toast.success("Refund request submitted successfully.");
    } catch (error) {
      console.error("Refund request failed:", error);
      toast.error("Failed to submit refund request. Please try again later.");
    } finally {
      setRefundingOrderId(null);
      setRefundReason("");
      setOtherRefundReason("");
      setRefundDetails("");
      setRefundModal(false);
    }
  };

  // Handle review click
  const handleReviewClick = (orderId: string) => {
    setReviewingOrderId(orderId);
    setRating(0);
    setReviewComment("");
    setReviewModal(true);
  };

  // Handle review submission
  const submitReview = async () => {
    if (!reviewingOrderId || rating === 0) return;

    try {
      // Here you would typically call an API to submit the review
      console.log("Submitting review for order:", reviewingOrderId);
      console.log("Rating:", rating);
      console.log("Comment:", reviewComment);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      router.refresh();
      toast.success("Thank you for your review!");
    } catch (error) {
      console.error("Review submission failed:", error);
      toast.error("Failed to submit review. Please try again later.");
    } finally {
      setReviewingOrderId(null);
      setRating(0);
      setReviewComment("");
      setReviewModal(false);
    }
  };

  // Filter options
  const [filter, setFilter] = useState<
    "all" | "Completed" | "Pending" | "Cancelled" | "Refunded"
  >("all");

  // Filtered orders based on selected filter
  const filteredOrders = orders.filter((order) => {
    if (filter === "all") return true;
    if (filter === "Completed") return order.orderStatus === "Completed";
    if (filter === "Pending") return order.orderStatus === "Pending";
    if (filter === "Cancelled") return order.orderStatus === "Cancelled";
    if (filter === "Refunded") return order.orderStatus === "Refunded";
    return true;
  });

  return (
    <div className="min-h-screen pt-32 pb-16">
      {/* Cancel Order Modal */}
      <Modal isOpen={cancelModal} onClose={() => setCancelModal(false)}>
        <div>
          <h3 className="text-lg font-bold text-[#452E19] mb-4">
            Cancel Order
          </h3>
          <p className="text-[#452E19]/80 mb-4">
            Please tell us why you&apos;re canceling this order:
          </p>
          <div className="space-y-3 mb-4">
            {[
              "I don't like it",
              "Short of money",
              "Found a better deal",
              "Changed my mind",
              "other",
            ].map((reason) => (
              <div key={reason} className="flex items-center">
                <input
                  type="radio"
                  id={`reason-${reason}`}
                  name="cancellationReason"
                  value={reason}
                  checked={cancellationReason === reason}
                  onChange={() => setCancellationReason(reason)}
                  className="h-4 w-4 text-[#0F2A1D] focus:ring-[#0F2A1D]"
                />
                <label
                  htmlFor={`reason-${reason}`}
                  className="ml-2 text-sm text-[#452E19]"
                >
                  {reason === "other" ? "Other (please specify)" : reason}
                </label>
              </div>
            ))}

            {cancellationReason === "other" && (
              <textarea
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
                placeholder="Please specify your reason..."
                className="w-full mt-2 p-2 border border-gray-300 rounded-md text-sm text-[#452E19]"
                rows={3}
              />
            )}
          </div>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                setCancellingOrderId(null);
                setCancelModal(false);
              }}
              className="px-4 py-2 text-sm font-medium text-[#452E19] bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              Back
            </button>
            <button
              onClick={submitCancellation}
              disabled={
                !cancellationReason ||
                (cancellationReason === "other" && !otherReason)
              }
              className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors ${
                !cancellationReason ||
                (cancellationReason === "other" && !otherReason)
                  ? "bg-red-300 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              Confirm Cancellation
            </button>
          </div>
        </div>
      </Modal>

      {/* Refund Request Modal */}
      <Modal isOpen={refundModal} onClose={() => setRefundModal(false)}>
        <div>
          <h3 className="text-lg font-bold text-[#452E19] mb-4">
            Request Refund
          </h3>
          <p className="text-[#452E19]/80 mb-4">
            Please provide details about your refund request:
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#452E19] mb-2">
                Reason for Refund
              </label>
              <div className="space-y-3">
                {[
                  "Change of mind",
                  "Lack of budget",
                  "Duplicate order",
                  "Product not as described",
                  "other",
                ].map((reason) => (
                  <div key={reason} className="flex items-center">
                    <input
                      type="radio"
                      id={`refund-reason-${reason}`}
                      name="refundReason"
                      value={reason}
                      checked={refundReason === reason}
                      onChange={() => setRefundReason(reason)}
                      className="h-4 w-4 text-[#0F2A1D] focus:ring-[#0F2A1D]"
                    />
                    <label
                      htmlFor={`refund-reason-${reason}`}
                      className="ml-2 text-sm text-[#452E19]"
                    >
                      {reason === "other" ? "Other (please specify)" : reason}
                    </label>
                  </div>
                ))}

                {refundReason === "other" && (
                  <input
                    type="text"
                    value={otherRefundReason}
                    onChange={(e) => setOtherRefundReason(e.target.value)}
                    placeholder="Please specify your reason..."
                    className="w-full mt-2 p-2 border border-gray-300 rounded-md text-sm text-[#452E19]"
                  />
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#452E19] mb-2">
                Additional Details
              </label>
              <textarea
                value={refundDetails}
                onChange={(e) => setRefundDetails(e.target.value)}
                placeholder="Please provide any additional information about your refund request..."
                className="w-full p-2 border border-gray-300 rounded-md text-sm text-[#452E19]"
                rows={4}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => {
                setRefundingOrderId(null);
                setRefundModal(false);
              }}
              className="px-4 py-2 text-sm font-medium text-[#452E19] bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={submitRefund}
              disabled={
                !refundReason ||
                (refundReason === "other" && !otherRefundReason)
              }
              className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors ${
                !refundReason ||
                (refundReason === "other" && !otherRefundReason)
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              Submit Refund Request
            </button>
          </div>
        </div>
      </Modal>

      {/* Review Modal */}
      <Modal isOpen={reviewModal} onClose={() => setReviewModal(false)}>
        <div>
          <h3 className="text-lg font-bold text-[#452E19] mb-4">
            Write a Review
          </h3>
          <p className="text-[#452E19]/80 mb-4">
            Share your experience with this order:
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#452E19] mb-2">
                Rating
              </label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="text-2xl focus:outline-none"
                  >
                    {star <= rating ? "★" : "☆"}
                  </button>
                ))}
                <span className="text-sm text-[#452E19]/70 ml-2">
                  {rating > 0
                    ? `${rating} star${rating > 1 ? "s" : ""}`
                    : "Select rating"}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#452E19] mb-2">
                Your Review
              </label>
              <textarea
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="What did you like or dislike about your order?"
                className="w-full p-2 border border-gray-300 rounded-md text-sm text-[#452E19]"
                rows={4}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => {
                setReviewingOrderId(null);
                setReviewModal(false);
              }}
              className="px-4 py-2 text-sm font-medium text-[#452E19] bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={submitReview}
              disabled={rating === 0}
              className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors ${
                rating === 0
                  ? "bg-green-300 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              Submit Review
            </button>
          </div>
        </div>
      </Modal>

      <div className="max-w-6xl mx-auto px-4">
        {/* Header section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#452E19]">My Orders</h1>
          <p className="text-[#452E19]/70 mt-2">
            View and track all your Marian Homebakes orders
          </p>
        </div>

        {/* Filter section */}
        <div className="bg-white rounded-lg shadow-sm mb-6 p-4 flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 text-sm rounded-full transition-colors ${
              filter === "all"
                ? "bg-[#0F2A1D] text-white"
                : "bg-gray-100 text-[#452E19] hover:bg-gray-200"
            }`}
          >
            All Orders
          </button>
          <button
            onClick={() => setFilter("Pending")}
            className={`px-4 py-2 text-sm rounded-full transition-colors ${
              filter === "Pending"
                ? "bg-[#0F2A1D] text-white"
                : "bg-gray-100 text-[#452E19] hover:bg-gray-200"
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter("Completed")}
            className={`px-4 py-2 text-sm rounded-full transition-colors ${
              filter === "Completed"
                ? "bg-[#0F2A1D] text-white"
                : "bg-gray-100 text-[#452E19] hover:bg-gray-200"
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setFilter("Cancelled")}
            className={`px-4 py-2 text-sm rounded-full transition-colors ${
              filter === "Cancelled"
                ? "bg-[#0F2A1D] text-white"
                : "bg-gray-100 text-[#452E19] hover:bg-gray-200"
            }`}
          >
            Cancelled
          </button>
          <button
            onClick={() => setFilter("Refunded")}
            className={`px-4 py-2 text-sm rounded-full transition-colors ${
              filter === "Refunded"
                ? "bg-[#0F2A1D] text-white"
                : "bg-gray-100 text-[#452E19] hover:bg-gray-200"
            }`}
          >
            Refunded
          </button>
        </div>

        {/* Orders list */}
        {filteredOrders.length > 0 ? (
          <div className="space-y-6">
            {filteredOrders.map((order) => {
              const canCancel =
                order.orderStatus === "Pending" &&
                isWithin24Hours(order.createdAt);
              return (
                <div
                  key={order.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-[#D0F2B7]/50"
                >
                  {/* Order header */}
                  <div className="bg-[#D0F2B7]/30 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between">
                    <div>
                      <p className="text-sm text-[#452E19]/70">
                        Order #{order.orderNumber}
                      </p>
                      <p className="text-sm text-[#452E19]/70">
                        Placed on{" "}
                        {format(new Date(order.createdAt), "MMM d, yyyy")}
                      </p>
                    </div>
                    <div className="flex flex-col sm:items-end mt-2 sm:mt-0">
                      <p className="text-lg font-bold text-[#452E19]">
                        ₱{order.totalAmount.toFixed(2)}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <StatusBadge status={order.orderStatus} type="order" />
                      </div>
                    </div>
                  </div>

                  {/* Order summary */}
                  <div className="px-6 py-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="hidden sm:flex items-center space-x-2 mr-6">
                          {order.orderItems.slice(0, 3).map((item, index) => (
                            <div
                              key={item.id}
                              className={`relative h-12 w-12 rounded-md overflow-hidden bg-gray-100 border-2 border-white ${
                                index > 0 ? "-ml-4" : ""
                              }`}
                              style={{ zIndex: 10 - index }}
                            >
                              {item.product?.imageUrl ? (
                                <Image
                                  src={item.product.imageUrl}
                                  alt={item.product.name}
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <div className="flex items-center justify-center h-full w-full text-[#452E19]/50">
                                  <span className="text-xs">No img</span>
                                </div>
                              )}
                            </div>
                          ))}
                          {order.orderItems.length > 3 && (
                            <span className="text-sm text-[#452E19]/70">
                              +{order.orderItems.length - 3} more
                            </span>
                          )}
                        </div>
                        <div className="sm:hidden">
                          <p className="text-sm text-[#452E19]">
                            {order.orderItems.length}{" "}
                            {order.orderItems.length === 1 ? "item" : "items"}
                          </p>
                        </div>
                      </div>

                      <div className="flex space-x-4">
                        <button
                          onClick={() => toggleOrderDetails(order.id)}
                          className="text-sm font-medium text-[#8BC34A] hover:text-[#7CB342] transition-colors"
                        >
                          {activeOrderId === order.id
                            ? "Hide Details"
                            : "View Details"}
                        </button>
                        {order.orderStatus === "Completed" && (
                          <div className="flex items-center space-x-4">
                            <button
                              onClick={() => handleRefundClick(order.id)}
                              className="text-sm font-medium text-[#452E19]/70 hover:text-[#452E19] transition-colors"
                            >
                              Request Refund
                            </button>
                            <button
                              onClick={() => handleReviewClick(order.id)}
                              className="text-sm font-medium text-[#452E19]/70 hover:text-[#452E19] transition-colors"
                            >
                              Write Review
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Order details (expandable) */}
                  {activeOrderId === order.id && (
                    <div className="bg-[#F8FAF5] border-t border-[#D0F2B7]/30 px-6 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left column: Order items */}
                        <div>
                          <h3 className="font-semibold text-[#452E19] mb-3">
                            Order Items
                          </h3>
                          <div className="bg-white rounded-lg shadow-sm p-4 divide-y divide-gray-100">
                            {order.orderItems.map((item) => (
                              <OrderItem key={item.id} item={item} />
                            ))}

                            {/* Order summary */}
                            <div className="pt-4 space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-[#452E19]/70">
                                  Subtotal
                                </span>
                                <span className="text-[#452E19]">
                                  ₱{order.totalAmount.toFixed(2)}
                                </span>
                              </div>
                              <div className="flex justify-between text-base font-semibold pt-2 border-t">
                                <span className="text-[#452E19]">Total</span>
                                <span className="text-[#452E19]">
                                  ₱{order.totalAmount.toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Right column: Order info */}
                        <div>
                          <h3 className="font-semibold text-[#452E19] mb-3">
                            Order Information
                          </h3>
                          <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
                            {/* Status information */}
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span className="text-sm text-[#452E19]/70">
                                  Order Status
                                </span>
                                <StatusBadge
                                  status={order.orderStatus}
                                  type="order"
                                />
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-[#452E19]/70">
                                  Payment Method
                                </span>
                                <span className="text-sm text-[#452E19]">
                                  {order.paymentOption}
                                </span>
                              </div>
                              {order.proofOfPayment && (
                                <div className="flex justify-between">
                                  <span className="text-sm text-[#452E19]/70">
                                    Proof of Payment
                                  </span>
                                  <a
                                    href={order.proofOfPayment}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-500 hover:underline"
                                  >
                                    View Proof
                                  </a>
                                </div>
                              )}
                            </div>

                            {/* Separator */}
                            <hr className="border-gray-100" />

                            {/* Customer details */}
                            <div className="space-y-2">
                              <h4 className="text-sm font-medium text-[#452E19]">
                                Customer Name
                              </h4>
                              <p className="text-sm text-[#452E19]/70">
                                {order.name}
                              </p>
                            </div>

                            {/* Customer message if available */}
                            {order.message && (
                              <>
                                <hr className="border-gray-100" />
                                <div className="space-y-2">
                                  <h4 className="text-sm font-medium text-[#452E19]">
                                    Message
                                  </h4>
                                  <p className="text-sm text-[#452E19]/70 italic">
                                    {order.message}
                                  </p>
                                </div>
                              </>
                            )}

                            {/* Cancellation reason if available */}
                            {order.cancellationReason && (
                              <>
                                <hr className="border-gray-100" />
                                <div className="space-y-2">
                                  <h4 className="text-sm font-medium text-[#452E19]">
                                    Cancellation Reason
                                  </h4>
                                  <p className="text-sm text-[#452E19]/70">
                                    {order.cancellationReason}
                                  </p>
                                </div>
                              </>
                            )}
                          </div>

                          {/* Action buttons */}
                          {order.orderStatus === "Pending" && (
                            <div className="mt-4 flex justify-end">
                              <button
                                disabled={!canCancel}
                                onClick={() => handleCancelClick(order.id)}
                                className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors ${
                                  canCancel
                                    ? "bg-red-500 hover:bg-red-600"
                                    : "bg-gray-400 cursor-not-allowed"
                                }`}
                              >
                                {canCancel
                                  ? "Cancel Order"
                                  : "Cancellation Period Expired"}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="mb-4 text-[#452E19]/40">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20 7l-8-4-8 4m16 0v10l-8 4m0-10v10m0-10l-8-4m8 8l8-4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#452E19] mb-2">
              No orders found
            </h3>
            <p className="text-[#452E19]/70 mb-6">
              {filter === "all"
                ? "You haven't placed any orders yet."
                : `You don't have any ${filter} orders.`}
            </p>
            <Link
              href="/products"
              className="inline-block px-6 py-3 bg-[#8BC34A] text-white rounded-full font-medium hover:bg-[#7CB342] transition-colors shadow-sm"
            >
              Browse Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
