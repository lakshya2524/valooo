import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-pink-50">
      <Card className="w-full max-w-md mx-4 border-none shadow-xl bg-white/80 backdrop-blur">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900 font-display">404 Page Not Found</h1>
          </div>
          <p className="mt-4 text-sm text-gray-600 font-body">
            Oops! It looks like you've wandered off the path of love. 
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
