"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard } from "lucide-react"
import Image from "next/image"

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
        <div className="w-64 h-64 bg-white rounded-2xl border-4 border-amber-400 flex items-center justify-center shadow-lg overflow-hidden">
          <Image
            src="/images/civ_qr.jpg"
            alt="Payment QR Code"
            width={240}
            height={240}
            className="w-full h-full object-contain p-2"
          />
        </div>
      </CardContent>
    </Card>
  )
}
