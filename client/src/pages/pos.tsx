import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MedicineCard, MedicineItem } from "@/components/pos/medicine-card";
import { Cart, CartItem } from "@/components/pos/cart";
import { Search, Filter, ScanBarcode } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function POS() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isGeneratingInvoice, setIsGeneratingInvoice] = useState(false);
  const { toast } = useToast();

  // Fetch medicines
  const { data: medicines = [], isLoading: medicinesLoading } = useQuery({
    queryKey: ["/api/medicines"],
    queryFn: async () => {
      const res = await fetch("/api/medicines", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch medicines");
      return res.json();
    },
  });

  // Fetch categories
  const { data: categories = [] } = useQuery({
    queryKey: ["/api/categories"],
    queryFn: async () => {
      const res = await fetch("/api/categories", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch categories");
      return res.json();
    },
  });

  // Filter medicines based on search term and category
  const filteredMedicines = medicines.filter((medicine: any) => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          medicine.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === "all" || medicine.category_id === parseInt(category);
    return matchesSearch && matchesCategory;
  });

  // Add medicine to cart
  const addToCart = (medicine: MedicineItem) => {
    setCartItems(prev => {
      // Check if medicine already exists in cart
      const existingItemIndex = prev.findIndex(item => item.medicineId === medicine.id);
      
      if (existingItemIndex >= 0) {
        // Medicine exists, update quantity
        const updatedItems = [...prev];
        const item = updatedItems[existingItemIndex];
        
        // Ensure we don't exceed available stock
        if (item.quantity < medicine.stock) {
          const newQuantity = item.quantity + 1;
          const unitPrice = parseFloat(medicine.mrp);
          const gstRate = parseFloat(medicine.gstRate);
          const gstAmount = (unitPrice * newQuantity * gstRate) / 100;
          const totalPrice = (unitPrice * newQuantity) + gstAmount;
          
          updatedItems[existingItemIndex] = {
            ...item,
            quantity: newQuantity,
            gstAmount,
            totalPrice
          };
          
          return updatedItems;
        } else {
          toast({
            variant: "destructive",
            title: "Stock limit reached",
            description: `Only ${medicine.stock} units available in stock.`,
          });
          return prev;
        }
      } else {
        // Add new medicine to cart
        const unitPrice = parseFloat(medicine.mrp);
        const gstRate = parseFloat(medicine.gstRate);
        const gstAmount = (unitPrice * gstRate) / 100;
        const totalPrice = unitPrice + gstAmount;
        
        return [...prev, {
          medicineId: medicine.id,
          medicine,
          quantity: 1,
          unitPrice,
          gstRate,
          gstAmount,
          totalPrice
        }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (medicineId: number) => {
    setCartItems(prev => prev.filter(item => item.medicineId !== medicineId));
  };

  // Update item quantity in cart
  const updateQuantity = (medicineId: number, quantity: number) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.medicineId === medicineId) {
          const unitPrice = item.unitPrice;
          const gstRate = item.gstRate;
          const gstAmount = (unitPrice * quantity * gstRate) / 100;
          const totalPrice = (unitPrice * quantity) + gstAmount;
          
          return {
            ...item,
            quantity,
            gstAmount,
            totalPrice
          };
        }
        return item;
      });
    });
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Generate invoice
  const generateInvoice = async () => {
    if (cartItems.length === 0) {
      toast({
        variant: "destructive",
        title: "Empty cart",
        description: "Please add items to the cart before generating an invoice.",
      });
      return;
    }

    setIsGeneratingInvoice(true);

    try {
      // Calculate totals
      const subtotal = cartItems.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
      const gstAmount = cartItems.reduce((sum, item) => sum + item.gstAmount, 0);
      const total = subtotal + gstAmount;

      // Create invoice
      const invoiceData = {
        invoice: {
          customerId: null, // Could be updated with selected customer ID
          doctorId: null, // Could be updated with selected doctor ID
          subtotal: subtotal.toString(),
          gstAmount: gstAmount.toString(),
          total: total.toString(),
        },
        items: cartItems.map(item => ({
          medicineId: item.medicineId,
          quantity: item.quantity,
          unitPrice: item.unitPrice.toString(),
          gstRate: item.gstRate.toString(),
          gstAmount: item.gstAmount.toString(),
          totalPrice: item.totalPrice.toString(),
        }))
      };

      await apiRequest("POST", "/api/invoices", invoiceData);

      toast({
        title: "Invoice generated",
        description: "Invoice has been generated successfully.",
      });

      // Clear cart after successful invoice generation
      clearCart();

      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["/api/medicines"] });
      queryClient.invalidateQueries({ queryKey: ["/api/analytics/daily-sales"] });
      queryClient.invalidateQueries({ queryKey: ["/api/analytics/top-selling"] });
    } catch (error) {
      console.error("Error generating invoice:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate invoice. Please try again.",
      });
    } finally {
      setIsGeneratingInvoice(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left side - Medicine selection */}
        <div className="flex-1">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search medicines..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
                <div className="w-full md:w-48">
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((cat: any) => (
                        <SelectItem key={cat.id} value={cat.id.toString()}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMedicines.map((medicine: any) => (
                  <MedicineCard
                    key={medicine.id}
                    medicine={{
                      id: medicine.id,
                      name: medicine.name,
                      description: medicine.description || "",
                      form: medicine.form,
                      category: categories.find((c: any) => c.id === medicine.category_id)?.name || "Unknown",
                      stock: medicine.stock,
                      mrp: medicine.mrp,
                      lowStockThreshold: medicine.lowStockThreshold,
                      gstRate: medicine.gstRate
                    }}
                    onAddToCart={addToCart}
                  />
                ))}
                {filteredMedicines.length === 0 && (
                  <div className="col-span-full text-center py-8 text-muted-foreground">
                    No medicines found matching your search criteria.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right side - Cart */}
        <div className="w-full md:w-96">
          <Cart
            items={cartItems}
            onClearCart={clearCart}
            onRemoveItem={removeFromCart}
            onUpdateQuantity={updateQuantity}
            onGenerateInvoice={generateInvoice}
            loading={isGeneratingInvoice}
          />
        </div>
      </div>
    </div>
  );
}
