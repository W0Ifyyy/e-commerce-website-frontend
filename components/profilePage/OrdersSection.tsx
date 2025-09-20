"use client";
import React, { useState } from "react";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface OrderItem {
  id: number;
  quantity: number;
  unitPrice: string;
  product: Product;
}

interface Order {
  id: number;
  name: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}

interface OrderSectionProps {
  orders: Order[];
}

export default function OrdersSection({ orders }: OrderSectionProps) {
  const [showAllOrders, setShowAllOrders] = useState(false);

  if (!orders || orders.length === 0) {
    return (
      <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
        <p className="text-gray-500 text-center">No orders found.</p>
      </div>
    );
  }

  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const displayedOrders = showAllOrders ? sortedOrders : [sortedOrders[0]];

  return (
    <div className="space-y-6">
      {displayedOrders.map((order) => (
        <div
          key={order.id}
          className="border border-gray-200 rounded-lg p-3 sm:p-5 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
            <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-0">
              Order #{order.id}
            </h3>
            <span
              className={`px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium ${
                order.status === "COMPLETED"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {order.status}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between text-xs sm:text-sm text-gray-600 mb-2 space-y-1 sm:space-y-0">
            <span className="font-medium">
              Order Total: ${order.totalAmount.toFixed(2)} Items:{" "}
              {order.items.length}
            </span>
            <span className="font-medium">
              Date: {new Date(order.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="mt-4 border-t border-gray-200 pt-4">
            <h4 className="font-medium text-sm mb-2">Order Items:</h4>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center p-2 sm:p-3 rounded bg-gray-50 justify-between"
                >
                  <div className="flex items-center w-full sm:w-auto mb-2 sm:mb-0">
                    <Image
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      width={48}
                      height={48}
                      className="object-cover rounded mr-3 w-12 h-12 sm:w-16 sm:h-16"
                    />
                    <div className="flex-grow">
                      <p className="font-medium text-sm sm:text-base">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-gray-500 line-clamp-1">
                        {item.product.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right ml-auto sm:ml-0 mt-1 sm:mt-0">
                    <p className="font-medium">${item.unitPrice}</p>
                    <p className="text-xs text-gray-500">x {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
      {sortedOrders.length > 1 && (
        <button
          onClick={() => setShowAllOrders(!showAllOrders)}
          className="w-full py-2 sm:py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-sm sm:text-base rounded-lg transition-colors duration-200"
        >
          {showAllOrders
            ? "Hide Orders"
            : `Show More Orders (${sortedOrders.length - 1} more)`}
        </button>
      )}
    </div>
  );
}
