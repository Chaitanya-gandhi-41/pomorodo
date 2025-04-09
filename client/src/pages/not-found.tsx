import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";

export default function NotFound() {
  return (
    <Layout>
      <div className="min-h-[calc(100vh-64px)] w-full flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6">
            <div className="flex mb-4 gap-2">
              <AlertCircle className="h-8 w-8 text-red-500" />
              <h1 className="text-2xl font-bold">404 Page Not Found</h1>
            </div>

            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              The page you were looking for doesn't exist.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
