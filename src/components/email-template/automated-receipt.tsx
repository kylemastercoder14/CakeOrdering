/* eslint-disable react/no-unescaped-entities */
import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  render,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface OrderReceiptEmailProps {
  orderNumber: string;
  name: string;
  totalAmount: number;
  message?: string;
  paymentOption: string;
  proofOfPayment: string;
  items: {
    id: string;
    quantity: number;
    price: number;
    name?: string; // Added name for display
    image?: string; // Added image URL for display
  }[];
}

export const OrderReceiptEmail = ({
  orderNumber,
  name,
  totalAmount,
  message,
  paymentOption,
  proofOfPayment,
  items,
}: OrderReceiptEmailProps) => {
  // Calculate subtotal from items
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <Html>
      <Head />
      <Preview>Your Order Receipt #{orderNumber}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header Section */}
          <Section style={headerSection}>
            <Img
              src="https://utfs.io/f/jp1smUvciflcAEu1NPoC18D7xhopnWyK0YXAuPOdVjfeZwUR" // Replace with your logo
              width="50"
              height="50"
              alt="Marian Homebakeshop Logo"
              style={logo}
            />
            <Text style={headerText}>Order Confirmation</Text>
            <Text style={thankYouText}>Thank you for your purchase!</Text>
            <Text style={orderStatusText}>
              Your order #{orderNumber} has been received and is being processed. We response typically within 24 hours to confirm your order and provide further details.
            </Text>
          </Section>

          {/* Order Summary */}
          <Section style={infoBox}>
            <Text style={infoBoxTitle}>Order Summary</Text>
            <div style={infoRow}>
              <Text style={infoLabel}>Order Number:</Text>
              <Text style={infoValue}>#{orderNumber}</Text>
            </div>
            <div style={infoRow}>
              <Text style={infoLabel}>Customer Name:</Text>
              <Text style={infoValue}>{name}</Text>
            </div>
            <div style={infoRow}>
              <Text style={infoLabel}>Payment Method:</Text>
              <Text style={infoValue}>{paymentOption}</Text>
            </div>
            {message && (
              <div style={infoRow}>
                <Text style={infoLabel}>Customer Note:</Text>
                <Text style={infoValue}>{message}</Text>
              </div>
            )}
          </Section>

          {/* Order Items */}
          <Section style={orderItemsSection}>
            <Text style={sectionTitle}>Order Details</Text>

            {items.map((item, index) => (
              <div key={index} style={orderItemContainer}>
                {item.image && (
                  <div style={itemImageContainer}>
                    <Img
                      src={item.image}
                      width="60"
                      height="60"
                      alt={item.name || `Item ${index + 1}`}
                      style={itemImage}
                    />
                  </div>
                )}
                <div style={itemDetails}>
                  <Text style={itemName}>{item.name || `Item ${item.id}`}</Text>
                  <div style={itemMeta}>
                    <Text style={itemQuantity}>Qty: {item.quantity}</Text>
                    <Text style={itemPrice}>₱{(item.price * item.quantity).toFixed(2)}</Text>
                  </div>
                  <Text style={itemUnitPrice}>₱{item.price.toFixed(2)} each</Text>
                </div>
              </div>
            ))}
          </Section>

          {/* Payment Proof */}
          {proofOfPayment && (
            <Section style={paymentProofSection}>
              <Text style={sectionTitle}>Payment Proof</Text>
              <Img
                src={proofOfPayment}
                alt="Payment proof"
                style={proofImage}
              />
              <Text style={proofNote}>
                Your payment is being verified. We'll notify you once confirmed.
              </Text>
            </Section>
          )}

          {/* Order Total */}
          <Section style={totalSection}>
            <div style={totalRow}>
              <Text style={totalLabel}>Subtotal:</Text>
              <Text style={totalValue}>₱{subtotal.toFixed(2)}</Text>
            </div>
            <div style={totalRow}>
              <Text style={totalLabel}>Total:</Text>
              <Text style={grandTotal}>₱{totalAmount.toFixed(2)}</Text>
            </div>
          </Section>

          {/* Footer */}
          <Section style={footerSection}>
            <Text style={footerText}>
              If you have any questions about your order, please contact us at{" "}
              <Link href="mailto:marianshomemadebake@gmail.com" style={footerLink}>
                marianshomemadebake@gmail.com
              </Link>
            </Text>
            <Text style={footerCopyright}>
              © {new Date().getFullYear()} Marian Homebakeshop. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export const OrderReceiptEmailHTML = (props: OrderReceiptEmailProps) =>
  render(<OrderReceiptEmail {...props} />, {
    pretty: true,
  });

// Styles using your color palette
const main = {
  backgroundColor: "#E3EED4", // Lightest green as background
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
  padding: "20px 0",
};

const container = {
  maxWidth: "600px",
  margin: "0 auto",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  overflow: "hidden",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
};

const headerSection = {
  backgroundColor: "#0F2A1D", // Dark green
  color: "#ffffff",
  padding: "30px 20px",
  textAlign: "center" as const,
};

const logo = {
  margin: "0 auto 15px",
};

const headerText = {
  fontSize: "24px",
  fontWeight: "bold" as const,
  margin: "0 0 10px",
};

const thankYouText = {
  fontSize: "18px",
  margin: "15px 0 10px",
  color: "#AEC3B0", // Light green
};

const orderStatusText = {
  fontSize: "16px",
  lineHeight: "1.5",
  margin: "10px 0 0",
};

const infoBox = {
  backgroundColor: "#F8FAF6",
  padding: "20px",
  margin: "20px",
  borderRadius: "8px",
  border: "1px solid #AEC3B0", // Light green border
};

const infoBoxTitle = {
  fontSize: "18px",
  fontWeight: "bold" as const,
  color: "#375534", // Medium green
  margin: "0 0 15px",
  paddingBottom: "10px",
  borderBottom: "1px solid #AEC3B0",
};

const infoRow = {
  display: "flex",
  margin: "10px 0",
};

const infoLabel = {
  fontSize: "14px",
  color: "#375534", // Medium green
  fontWeight: "bold" as const,
  width: "40%",
};

const infoValue = {
  fontSize: "14px",
  color: "#0F2A1D", // Dark green
  width: "60%",
};

const orderItemsSection = {
  padding: "0 20px",
};

const sectionTitle = {
  fontSize: "18px",
  fontWeight: "bold" as const,
  color: "#375534", // Medium green
  margin: "0 0 15px",
  paddingBottom: "10px",
  borderBottom: "1px solid #AEC3B0",
};

const orderItemContainer = {
  display: "flex",
  margin: "15px 0",
  paddingBottom: "15px",
  borderBottom: "1px solid #E3EED4",
};

const itemImageContainer = {
  marginRight: "15px",
};

const itemImage = {
  borderRadius: "4px",
  border: "1px solid #AEC3B0",
};

const itemDetails = {
  flex: "1",
};

const itemName = {
  fontSize: "16px",
  fontWeight: "bold" as const,
  color: "#0F2A1D", // Dark green
  margin: "0 0 5px",
};

const itemMeta = {
  display: "flex",
  justifyContent: "space-between" as const,
  margin: "5px 0",
};

const itemQuantity = {
  fontSize: "14px",
  color: "#689071", // Medium-light green
};

const itemPrice = {
  fontSize: "16px",
  fontWeight: "bold" as const,
  color: "#0F2A1D", // Dark green
};

const itemUnitPrice = {
  fontSize: "12px",
  color: "#689071", // Medium-light green
  fontStyle: "italic" as const,
};

const paymentProofSection = {
  padding: "20px",
  margin: "20px 0",
  backgroundColor: "#F8FAF6",
  borderRadius: "8px",
};

const proofImage = {
  width: "100%",
  borderRadius: "4px",
  margin: "10px 0",
  border: "1px solid #AEC3B0",
};

const proofNote = {
  fontSize: "14px",
  color: "#689071", // Medium-light green
  fontStyle: "italic" as const,
  margin: "10px 0 0",
};

const totalSection = {
  padding: "20px",
  backgroundColor: "#F8FAF6",
  margin: "20px",
  borderRadius: "8px",
};

const totalRow = {
  display: "flex",
  justifyContent: "space-between" as const,
  margin: "10px 0",
};

const totalLabel = {
  fontSize: "16px",
  color: "#375534", // Medium green
};

const totalValue = {
  fontSize: "16px",
  color: "#0F2A1D", // Dark green
};

const grandTotal = {
  fontSize: "18px",
  fontWeight: "bold" as const,
  color: "#0F2A1D", // Dark green
};

const footerSection = {
  backgroundColor: "#0F2A1D", // Dark green
  color: "#ffffff",
  padding: "20px",
  textAlign: "center" as const,
};

const footerText = {
  fontSize: "14px",
  lineHeight: "1.5",
  margin: "0 0 10px",
};

const footerLink = {
  color: "#AEC3B0", // Light green
  textDecoration: "underline",
};

const footerCopyright = {
  fontSize: "12px",
  color: "#AEC3B0", // Light green
  margin: "10px 0 0",
};
