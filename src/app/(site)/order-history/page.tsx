import React from 'react';
import { redirect } from 'next/navigation';
import db from '@/lib/db';
import OrderHistoryPage from './client';
import { auth } from '@clerk/nextjs/server';

const Page = async () => {
  // Get current user session
  const {userId} = await auth();

  // Redirect if not logged in
  if (!userId) {
    redirect('/sign-in');
  }

  // Fetch all orders for the current user with related data
  const orders = await db.orders.findMany({
    where: {
      userId: userId
    },
    include: {
      orderItems: {
        include: {
          product: {
            select: {
              id: true,
              name: true,
              imageUrl: true,
            }
          }
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  // Convert Date fields to ISO strings for serialization
  const serializedOrders = orders.map(order => ({
    ...order,
    createdAt: order.createdAt.toISOString(),
    updatedAt: order.updatedAt.toISOString(),
    riderName: order.riderName === null ? undefined : order.riderName,
    message: order.message === null ? undefined : order.message,
    orderItems: order.orderItems.map(item => ({
      ...item,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
      // product does not have Date fields, so no need to serialize
    })),
  }));

  return (
    <OrderHistoryPage orders={serializedOrders} />
  );
};

export default Page;
