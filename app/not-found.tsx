import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <div className="pt-20"></div>
      <h1 className="text-6xl font-bold text-emerald-600 mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-gray-600 max-w-md mb-8">
        We couldn't find the page you're looking for. The page might have been
        moved, deleted, or never existed.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
          <Link href="/">Go to Homepage</Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
        >
          <Link href="/insights">Browse Insights</Link>
        </Button>
      </div>
    </div>
  );
}
