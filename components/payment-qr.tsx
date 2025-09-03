"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QrCode, CreditCard } from "lucide-react"

export function PaymentQR() {
  return (
    <Card className="border-0 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
      <CardHeader className="text-center pb-4">
        <CardTitle className="flex items-center justify-center gap-2 text-amber-900 dark:text-amber-100">
          <CreditCard className="w-5 h-5" />
          Payment QR Code
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <div className="w-64 h-64 bg-white rounded-2xl border-4 border-amber-400 flex items-center justify-center shadow-lg">
          <div className="text-center space-y-2">
            <QrCode className="w-32 h-32 text-amber-600 mx-auto" />
            <p className="text-sm text-amber-700 font-medium">Scan to pay</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
