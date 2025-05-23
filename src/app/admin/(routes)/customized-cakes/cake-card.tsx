/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useTransition } from "react";
import {
  Eye,
  Trash2,
  Check,
  X,
  Calendar,
  User,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { CustomizedCake } from "@prisma/client";
import { approveCake, rejectCake, deleteCake } from "@/actions/customized-cake";
import { toast } from "sonner";

const CakeCard = ({ cake }: { cake: CustomizedCake }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "Rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleApprove = () => {
    startTransition(async () => {
      try {
        const result = await approveCake(cake.id);
        if (result.success) {
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error("Failed to approve cake");
        console.error("Error approving cake:", error);
      }
    });
  };

  const handleReject = () => {
    startTransition(async () => {
      try {
        const result = await rejectCake(cake.id);
        if (result.success) {
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error("Failed to reject cake");
        console.error("Error rejecting cake:", error);
      }
    });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this cake order?")) {
      startTransition(async () => {
        try {
          const result = await deleteCake(cake.id);
          if (result.success) {
            toast.success(result.message);
          } else {
            toast.error(result.message);
          }
        } catch (error) {
          toast.error("Failed to delete cake");
          console.error("Error deleting cake:", error);
        }
      });
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {/* Image */}
        <div className="relative h-60 bg-gray-200">
          {cake.imageUrl ? (
            <img
              src={cake.imageUrl}
              alt={`${cake.theme} cake`}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg
                className="w-16 h-16 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}

          {/* Status Badge */}
          <div
            className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
              cake.status
            )}`}
          >
            {cake.status}
          </div>

          {/* Processing Overlay */}
          {isPending && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-900 capitalize">
              {cake.theme}
            </h3>
            <span className="text-lg font-bold text-green-600">
              ₱{cake.price}
            </span>
          </div>

          <div className="space-y-1 text-sm text-gray-600 mb-3">
            <p>
              <span className="font-medium">Size:</span> {cake.size}
            </p>
            <p>
              <span className="font-medium">Shape:</span> {cake.shape}
            </p>
            <p>
              <span className="font-medium">Flavor:</span> {cake.flavor}
            </p>
            <p>
              <span className="font-medium">Layers:</span> {cake.layers}
            </p>
          </div>

          {cake.customerName && (
            <div className="flex items-center text-sm text-gray-600 mb-3">
              <User className="w-4 h-4 mr-1" />
              <span>{cake.customerName}</span>
            </div>
          )}

          {cake.deliveryDate && (
            <div className="flex items-center text-sm text-gray-600 mb-3">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{new Date(cake.deliveryDate).toLocaleDateString()}</span>
            </div>
          )}

          <div className="text-xs text-gray-500 mb-4">
            Ordered: {new Date(cake.createdAt).toLocaleDateString()}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={() => setIsModalOpen(true)}
              disabled={isPending}
              className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50"
            >
              <Eye className="w-4 h-4" />
              View
            </button>

            {cake.status === "Pending" && (
              <>
                <button
                  onClick={handleApprove}
                  disabled={isPending}
                  className="flex items-center justify-center gap-1 px-3 py-2 text-sm text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors disabled:opacity-50"
                >
                  <Check className="w-4 h-4" />
                </button>
                <button
                  onClick={handleReject}
                  disabled={isPending}
                  className="flex items-center justify-center gap-1 px-3 py-2 text-sm text-orange-600 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors disabled:opacity-50"
                >
                  <X className="w-4 h-4" />
                </button>
              </>
            )}

            <button
              onClick={handleDelete}
              disabled={isPending}
              className="flex items-center justify-center gap-1 px-3 py-2 text-sm text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900 capitalize">
                  {cake.theme} Cake
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Processing Banner */}
              {isPending && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                    <span className="text-blue-800 text-sm">Processing...</span>
                  </div>
                </div>
              )}

              {/* Image */}
              {cake.imageUrl && (
                <div className="mb-6">
                  <img
                    src={cake.imageUrl}
                    alt={`${cake.theme} cake`}
                    className="w-full h-80 object-contain rounded-lg"
                  />
                </div>
              )}

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Cake Details</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Theme:</span> {cake.theme}
                    </div>
                    <div>
                      <span className="font-medium">Size:</span> {cake.size}
                    </div>
                    <div>
                      <span className="font-medium">Shape:</span> {cake.shape}
                    </div>
                    <div>
                      <span className="font-medium">Layers:</span> {cake.layers}
                    </div>
                    <div>
                      <span className="font-medium">Flavor:</span> {cake.flavor}
                    </div>
                    <div>
                      <span className="font-medium">Icing Type:</span>{" "}
                      {cake.icingType}
                    </div>
                    <div>
                      <span className="font-medium">Price:</span>{" "}
                      <span className="text-green-600 font-bold">
                        ₱{cake.price}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium">Status:</span>
                      <span
                        className={`ml-2 px-2 py-1 rounded-full text-xs ${getStatusColor(
                          cake.status
                        )}`}
                      >
                        {cake.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Customer Info</h3>
                  <div className="space-y-2 text-sm">
                    {cake.customerName && (
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2 text-gray-400" />
                        {cake.customerName}
                      </div>
                    )}
                    {cake.customerEmail && (
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-2 text-gray-400" />
                        {cake.customerEmail}
                      </div>
                    )}
                    {cake.customerPhone && (
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                        {cake.customerPhone}
                      </div>
                    )}
                    {cake.deliveryDate && (
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        {new Date(cake.deliveryDate).toLocaleDateString()}
                      </div>
                    )}
                    {cake.deliveryAddress && (
                      <div className="flex items-start">
                        <MapPin className="w-4 h-4 mr-2 text-gray-400 mt-0.5" />
                        {cake.deliveryAddress}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              {cake.additionalNotes && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">
                    Additional Notes
                  </h3>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                    {cake.additionalNotes}
                  </p>
                </div>
              )}

              {/* Order Info */}
              <div className="border-t pt-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>
                    Order Date: {new Date(cake.createdAt).toLocaleString()}
                  </span>
                  <span>
                    Last Updated: {new Date(cake.updatedAt).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex gap-3 mt-6">
                {cake.status === "Pending" && (
                  <>
                    <button
                      onClick={handleApprove}
                      disabled={isPending}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                    >
                      <Check className="w-4 h-4" />
                      Approve
                    </button>
                    <button
                      onClick={handleReject}
                      disabled={isPending}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50"
                    >
                      <X className="w-4 h-4" />
                      Reject
                    </button>
                  </>
                )}
                <button
                  onClick={handleDelete}
                  disabled={isPending}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CakeCard;
