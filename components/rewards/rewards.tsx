"use client";
import React, { useState } from "react";
import { Zap, Leaf, X, Car } from "lucide-react";
import QRCode from "react-qr-code";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";

interface Voucher {
  id: string;
  title: string;
  credits: number;
  description: string;
  image: string;
}

const vouchers: Voucher[] = [
  {
    id: "1",
    title: "30 min de încarcare",
    credits: 100,
    description:
      "Obține 30 de minute de incarcare gratuită stațiile de încărcare electrică de la benzinărille partenere",
    image:
      "https://plus.unsplash.com/premium_photo-1715611974827-ee63fb3d705c?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "2",
    title: "1 oră de încarcare",
    credits: 180,
    description:
      "Obține 60 de minute de incarcare gratuită stațiile de încărcare electrică de la benzinărille partenere",
    image:
      "https://plus.unsplash.com/premium_photo-1715611974827-ee63fb3d705c?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "3",
    title: "Încărcare Premium",
    credits: 250,
    description:
      "Obține 90 de minute de incarcare gratuită stațiile de încărcare electrică de la benzinărille partenere",
    image:
      "https://plus.unsplash.com/premium_photo-1715611974827-ee63fb3d705c?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

function RewardComponent() {
  const [userCredits, setUserCredits] = useState(500);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [showQR, setShowQR] = useState(false);

  const handleVoucherPurchase = (voucher: Voucher) => {
    if (userCredits >= voucher.credits) {
      setSelectedVoucher(voucher);
      setUserCredits((prev) => prev - voucher.credits);
      setShowQR(true);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 flex flex-col gap-4">
      <header className="gap-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-600" />
            <h1 className="text-2xl font-semibold ">Recompense Eco-Friendly</h1>
          </div>
          <div className="flex items-center space-x-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 hover:bg-green-200 dark:hover:bg-green-800 px-4 py-2 rounded-full">
            <Zap className="h-5 w-5 text-green-600" />
            <span className="font-semibold ">{userCredits} Credite</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        <ScrollArea className="rounded-lg border h-[735px]">
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {vouchers.map((voucher) => (
              <motion.div key={voucher.id} whileHover={{ scale: 1.02 }} className="">
                <Card className="overflow-hidden">
                  <div className="">
                    <img
                      src={voucher.image}
                      alt={voucher.title}
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{voucher.title}</h3>
                    <p className="mb-4">{voucher.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-green-600 dark:text-green-400 font-semibold">
                        {voucher.credits} Credite
                      </span>
                      <Button
                        onClick={() => handleVoucherPurchase(voucher)}
                        variant="outline"
                        disabled={userCredits < voucher.credits}
                      >
                        Revendica
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </main>

      <AnimatePresence>
        {showQR && selectedVoucher && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="rounded-2xl max-w-sm w-full relative bg-gradient-to-b hover:shadow-lg p-8 bg-black bg-opacity-60"
            >
              <button onClick={() => setShowQR(false)} className="absolute top-4 right-4">
                <X className="h-6 w-6" />
              </button>
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">Voucher-ul este pregătit !</h3>
                <p className="mb-6">Arată acest QR Cod la benzinăriile partenere</p>
                <div className=" p-4 rounded-xl shadow-inner mx-auto w-fit mb-6">
                  <QRCode value={`greenify-voucher-${selectedVoucher.id}-${Date.now()}`} size={200} />
                </div>
                <p className="text-sm ">Valabil pentru: {selectedVoucher.title}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default RewardComponent;
