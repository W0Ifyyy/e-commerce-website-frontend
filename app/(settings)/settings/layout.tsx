import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buyzaar | Settings",
  description: "Manage your account settings",
};

export default async function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section className="bg-gray-100">{children}</section>;
}
