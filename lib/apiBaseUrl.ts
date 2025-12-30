export function getApiBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.NEST_PUBLIC_API_URL ||
    "http://localhost:5000"
  );
}
