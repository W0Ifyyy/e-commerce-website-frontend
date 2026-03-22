import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "View and manage your Buyzaar profile.",
};

export default async function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section className="bg-gray-100">{children}</section>;
}
