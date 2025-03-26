import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, Save, Printer, Search, Loader2 } from "lucide-react";
import { MedicineItem } from "./medicine-card";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { generateInvoicePDF } from "@/lib/utils/invoice";
import { useTranslate } from "@/hooks/use-translate";

export interface CartItem {
  medicineId: number;
  medicine: MedicineItem;
  quantity: number;
  unitPrice: number;
  gstRate: number;
  gstAmount: number;
  totalPrice: number;
}

interface CartProps {
  items: CartItem[];
  onClearCart: () => void;
  onRemoveItem: (medicineId: number) => void;
  onUpdateQuantity: (medicineId: number, quantity: number) => void;
  onGenerateInvoice: () => Promise<void>;
  loading: boolean;
}

export function Cart({
  items,
  onClearCart,
  onRemoveItem,
  onUpdateQuantity,
  onGenerateInvoice,
  loading,
}: CartProps) {
  const [customerPhone, setCustomerPhone] = useState("");
  const [searchingCustomer, setSearchingCustomer] = useState(false);
  const t = useTranslate();

  // Customer search form
  const form = useForm({
    defaultValues: {
      name: "",
      phone: "",
      doctorId: "",
    },
  });

  // Get customer by phone
  const { data: customer, isLoading: customerLoading } = useQuery({
    queryKey: ["/api/customers/phone", customerPhone],
    queryFn: async () => {
      if (!customerPhone) return null;
      try {
        const res = await fetch(`/api/customers/phone/${customerPhone}`, {
          credentials: "include",
        });
        if (res.status === 404) return null;
        await throwIfResNotOk(res);
        return await res.json();
      } catch (error) {
        console.error("Error fetching customer:", error);
        return null;
      }
    },
    enabled: customerPhone.length > 0 && searchingCustomer,
  });

  // Get doctors for dropdown
  const { data: doctors } = useQuery({
    queryKey: ["/api/doctors"],
    queryFn: async () => {
      const res = await fetch("/api/doctors", {
        credentials: "include",
      });
      await throwIfResNotOk(res);
      return await res.json();
    },
  });

  // Update form with customer data if found
  useEffect(() => {
    if (customer) {
      form.setValue("name", customer.name);
      form.setValue("phone", customer.phone);
    }
  }, [customer, form]);

  const findCustomer = () => {
    setSearchingCustomer(true);
  };

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const gstAmount = items.reduce((sum, item) => sum + item.gstAmount, 0);
  const total = subtotal + gstAmount;

  // Generate invoice
  const handleGenerateInvoice = async () => {
    if (items.length === 0) return;
    
    await onGenerateInvoice();
    
    const currentDate = new Date();
    
    generateInvoicePDF({
      invoiceNumber: `INV-${currentDate.getTime().toString().substr(0, 10)}`,
      date: currentDate,
      customer: customer,
      doctorName: doctors?.find((d: any) => d.id === parseInt(form.getValues("doctorId")))?.name,
      items,
      subtotal,
      gstAmount,
      total,
      userInfo: {
        name: "Administrator", // This would come from auth context in real app
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{t("pos.cart")}</span>
          <Button
            variant="ghost"
            size="sm"
            className="text-destructive"
            onClick={onClearCart}
          >
            {t("pos.clear")}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                placeholder={t("pos.customerPhone")}
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={findCustomer}
              title={t("pos.searchCustomer")}
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {t("pos.emptyCart")}
            </div>
          ) : (
            <div className="space-y-2">
              {items.map((item) => (
                <div
                  key={item.medicineId}
                  className="flex justify-between items-center p-2 border-b dark:border-slate-700"
                >
                  <div>
                    <p className="font-medium">{item.medicine.name}</p>
                    <p className="text-sm text-muted-foreground">
                      ₹{item.unitPrice.toFixed(2)} x{" "}
                      <input
                        type="number"
                        min="1"
                        max={item.medicine.stock}
                        value={item.quantity}
                        onChange={(e) => {
                          const quantity = parseInt(e.target.value);
                          if (quantity > 0 && quantity <= item.medicine.stock) {
                            onUpdateQuantity(item.medicineId, quantity);
                          }
                        }}
                        className="w-12 inline-block px-1 py-0 border rounded text-center"
                      />
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">₹{item.totalPrice.toFixed(2)}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      onClick={() => onRemoveItem(item.medicineId)}
                      title={t("common.delete")}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

              <div className="space-y-2 pt-4">
                <div className="flex justify-between text-sm">
                  <span>{t("pos.total")}</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>{t("pos.gst")}</span>
                  <span>₹{gstAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>{t("pos.grandTotal")}</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={handleGenerateInvoice}
          disabled={items.length === 0 || loading}
        >
          {loading ? (
            <span className="flex items-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t("pos.generating")}
            </span>
          ) : (
            <span className="flex items-center">
              <Printer className="mr-2 h-4 w-4" />
              {t("pos.generateInvoice")}
            </span>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}
