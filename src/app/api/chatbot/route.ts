import db from "@/lib/db";
import { NextResponse } from "next/server";

interface ChatbotResponse {
  response: string;
  type: string;
  isLink?: boolean;
}

export async function POST(req: Request) {
  const { message } = await req.json();

  if (!message) {
    return NextResponse.json(
      { message: "Message is required" },
      { status: 400 }
    );
  }

  try {
    const response = await handleChatMessage(message.toLowerCase());
    return NextResponse.json(response);
  } catch (error) {
    console.error("Chatbot error:", error);
    return NextResponse.json(
      { message: "Error processing your request" },
      { status: 500 }
    );
  } finally {
    await db.$disconnect();
  }
}

async function handleChatMessage(message: string): Promise<ChatbotResponse> {
  const orderNumberPattern =
    /\b(MarianHomeBakeShop-\d{13}|(?:order|#)?\s*[A-Z0-9-]{6,20})\b/i;
  const orderNumberMatch = message.match(orderNumberPattern);

  // Order number has priority — short-circuit everything else
  if (orderNumberMatch) {
    const orderNumber = orderNumberMatch[0].trim();
    const orderResponse = await getOrderStatus(orderNumber);

    // Only return this if the order is actually found
    if (orderResponse.type !== "order_not_found") {
      return orderResponse;
    }
  }

  // Greetings
  if (containsAny(message, ["hello", "hi", "hey", "wazzup"])) {
    return {
      response:
        "Hello! Welcome to Marian's Homebakeshop. How can I assist you today? You can ask about our cakes, services, order status, or business information.",
      type: "greeting",
    };
  }

  // About the business
  if (
    containsAny(message, [
      "about",
      "information",
      "details",
      "business",
      "shop",
    ])
  ) {
    return {
      response: `**About Marian's Homebakeshop:**
      - Specializes in **custom cakes** for birthdays, weddings, and all special occasions
      - Uses **premium ingredients** for high-quality taste and presentation
      - Every cake is **handcrafted with care** and tailored to your style
      - Located in Bella Vista Subdivision, Brgy. Santiago, General Trias, Cavite`,
      type: "about_info",
    };
  }

  // Core services
  if (
    containsAny(message, ["services", "offer", "what do you sell", "products"])
  ) {
    return {
      response: `**Our Core Services:**
      - **Custom Cake Orders** – Personalized designs for any theme or event
      - **Consultation & Design** – We'll work with you to bring your vision to life
      - **Customer Support** – Assistance with orders, pricing, and customization

      Looking for something specific? Just ask!`,
      type: "services_info",
    };
  }

  // Mission/Vision/Values
  if (containsAny(message, ["mission", "vision", "values", "philosophy"])) {
    return {
      response: `**Our Mission:**
      To craft exceptional, personalized cakes that blend artistry, flavor, and premium ingredients, making every celebration sweeter and more memorable.

      **Our Vision:**
      To be the go-to custom cake shop, transforming life's special moments into edible masterpieces that inspire joy and connection.

      **Core Values:**
      - **Creativity** – Unique cake visions come to life
      - **Quality** – Finest ingredients for best taste and design
      - **Customer-Centric** – Your happiness is our priority
      - **Passion** – We love creating joyful experiences
      - **Integrity** – Transparent and excellent service always`,
      type: "mission_info",
    };
  }

  // Business hours
  if (
    containsAny(message, [
      "hours",
      "open",
      "time",
      "schedule",
      "when are you open",
    ])
  ) {
    return {
      response:
        "**Our Business Hours:**\nMonday-Friday: 9:00 AM - 7:00 PM\nSaturday: 10:00 AM - 5:00 PM\nSunday: Closed\n\nWe're closed on major holidays.",
      type: "business_hours",
    };
  }

  // Location
  if (
    containsAny(message, ["location", "address", "where", "find you", "map"])
  ) {
    return {
      response:
        "**Our Location:**\nBella Vista Subdivision, Brgy. Santiago\nGeneral Trias, Cavite\n\nYou can visit us during business hours! Need directions? [Click here for maps](https://maps.google.com)",
      type: "location_info",
      isLink: true,
    };
  }

  // Contact information
  if (
    containsAny(message, [
      "contact",
      "phone",
      "email",
      "number",
      "reach",
      "how to contact",
    ])
  ) {
    return {
      response:
        "**Contact Us:**\n📞 Phone: (046) 123-4567\n📱 Mobile: 0917 123 4567\n✉️ Email: orders@marianshomebakeshop.com\n💬 Facebook: [Message Us](https://facebook.com/marianshomebakeshop)\n\nWe typically respond within 1 business day.",
      type: "contact_info",
      isLink: true,
    };
  }

  // Menu/Flavors
  if (
    containsAny(message, [
      "menu",
      "flavors",
      "options",
      "cakes",
      "what cakes",
      "offer",
    ])
  ) {
    return {
      response: `**Our Cake Flavors:**
        - **Classic Flavors:** Vanilla, Chocolate, Red Velvet
        - **Specialty Flavors:** Ube, Mango, Matcha, Cookies & Cream
        - **Premium Flavors:** Dark Chocolate Ganache, Salted Caramel

        **Available Sizes:**
        - Round: 6", 8", 10", 12"
        - Sheet: 9x13", 11x15"

        Want to know about a specific flavor or get recommendations? Just ask!`,
      type: "menu_info",
    };
  }

  // Pricing
  if (containsAny(message, ["price", "cost", "how much", "rates"])) {
    return {
      response: `**Our Pricing (Starting At):**
        - **Round Cakes:**
          6": ₱1,200 | 8": ₱1,800 | 10": ₱2,500 | 12": ₱3,200
        - **Sheet Cakes:**
          9x13": ₱2,000 | 11x15": ₱2,800

        **Note:**
        - Custom designs may have additional costs
        - Fondant decorations cost extra
        - Delivery fees depend on location

        For an exact quote, please describe what you're looking for!`,
      type: "pricing_info",
    };
  }

  // Order status
  if (
    containsAny(message, [
      "order status",
      "track order",
      "my order",
      "order tracking",
      "tracking number",
    ])
  ) {
    return {
      response:
        "To check your order status, please provide your order number (like MarianHomeBakeShop-1748137822072 or ORDER123). You can find this in your order confirmation email or receipt.",
      type: "order_status_request",
    };
  }

  // Delivery
  if (containsAny(message, ["delivery", "pickup", "shipping", "how to get"])) {
    return {
      response: `**Delivery Options:**
        - **Free Pickup:** Available at our shop during business hours
        - **Local Delivery:** ₱150 within General Trias (free for orders over ₱3,000)
        - **Outside City:** Delivery fees vary by location

        Need delivery to a specific area? Just ask and we'll check availability!`,
      type: "delivery_info",
    };
  }

  // Payment
  if (
    containsAny(message, [
      "payment",
      "pay",
      "gcash",
      "credit card",
      "how to pay",
    ])
  ) {
    return {
      response: `**Payment Methods:**
        - Cash on pickup/delivery
        - GCash (0917 123 4567)
        - Bank Transfer (BDO/BPI)
        - Credit Card (in-store only)

        **Note:** A 50% deposit is required for custom orders. Full payment is due before delivery/pickup.`,
      type: "payment_info",
    };
  }

  // Default fallback
  return {
    response:
      "I couldn't understand your question. For more assistance, you can:\n1. Visit our Facebook page: [Marian's Homebakeshop](https://facebook.com/marianshomebakeshop)\n2. Call us at (046) 123-4567\n3. Email orders@marianshomebakeshop.com",
    type: "default",
    isLink: true,
  };
}

function containsAny(message: string, keywords: string[]): boolean {
  return keywords.some((keyword) => message.includes(keyword));
}

async function getOrderStatus(orderNumber: string): Promise<ChatbotResponse> {
  try {
    // Clean the order number by removing any prefixes and trimming whitespace
    const cleanOrderNumber = orderNumber.replace(/^(order|#|\s*)/i, "").trim();

    const order = await db.orders.findFirst({
      where: {
        orderNumber: {
          equals: cleanOrderNumber,
          mode: "insensitive",
        },
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      return {
        response: `No order found with number ${orderNumber}. Please check your order number and try again. You can also contact us directly at (046) 123-4567 for assistance.`,
        type: "order_not_found",
      };
    }

    // Format order items for display
    const itemsList = order.orderItems
      .map(
        (item) =>
          `- ${item.quantity}x ${item.product.name}: ₱${item.subTotal.toFixed(2)}`
      )
      .join("\n");

    const responseMessage = [
      `**Order #${order.orderNumber}**`,
      `\n**Customer:** ${order.name}`,
      `\n**Status:** ${order.orderStatus}`,
      `\n**Order Date:** ${new Date(order.createdAt).toLocaleDateString()}`,
      `\n**Order Items:**`,
      itemsList,
      `\n**Total Amount:** ₱${order.totalAmount.toFixed(2)}`,
      `\n\nNeed more help? Reply with your question or contact us directly at (046) 123-4567.`,
    ]
      .filter(Boolean)
      .join("\n");

    return {
      response: responseMessage,
      type: "order_status",
    };
  } catch (error) {
    console.error("Error fetching order:", error);
    return {
      response:
        "Sorry, I encountered an error while checking your order status. Please try again later or contact us directly at (046) 123-4567.",
      type: "order_error",
    };
  }
}
