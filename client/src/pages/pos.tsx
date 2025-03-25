import { useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Mic, Camera, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslate } from "@/hooks/use-translate";
import { MedicineItem } from "@/components/pos/medicine-card";
import { Cart } from "@/components/pos/cart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Add TypeScript interfaces for Speech Recognition
declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
}

interface SpeechRecognitionEvent {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognitionErrorEvent {
  error: string;
}

interface CartItem {
  medicineId: number;
  medicine: MedicineItem;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  gstRate: number;
  gstAmount: number;
}

export default function POS() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isGeneratingInvoice, setIsGeneratingInvoice] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { t } = useTranslate();

  // Fetch medicines query
  const { data: medicines = [] } = useQuery({
    queryKey: ["/api/medicines"],
    queryFn: async () => {
      const res = await fetch("/api/medicines");
      if (!res.ok) throw new Error("Failed to fetch medicines");
      return res.json();
    },
  });

  // Voice recognition setup
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;
  
  if (recognition) {
    recognition.continuous = false;
    recognition.lang = 'en-US';
    
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setSearchTerm(transcript);
      setIsListening(false);
      searchInputRef.current?.focus();
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Voice recognition failed. Please try again.",
      });
    };
  }

  // Handle voice search
  const handleVoiceSearch = () => {
    if (!recognition) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Voice recognition is not supported in your browser.",
      });
      return;
    }

    try {
      if (isListening) {
        recognition.stop();
      } else {
        recognition.start();
        setIsListening(true);
      }
    } catch (error) {
      console.error('Voice recognition error:', error);
      setIsListening(false);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Voice recognition failed to start. Please try again.",
      });
    }
  };

  // Handle OCR scanning
  const handleOCRScan = async () => {
    try {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      
      input.onchange = async (e: Event) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        try {
          const response = await fetch('/api/ocr/scan', {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) throw new Error('OCR scanning failed');

          const data = await response.json();
          setSearchTerm(data.text);
          toast({
            title: "Success",
            description: "Prescription scanned successfully",
          });
        } catch (error) {
          console.error('OCR error:', error);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to scan prescription. Please try again.",
          });
        }
      };

      input.click();
    } catch (error) {
      console.error('Camera access error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to access camera. Please check permissions.",
      });
    }
  };

  // Cart functions
  const handleAddToCart = (medicine: MedicineItem) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.medicineId === medicine.id);
      
      if (existingItem) {
        if (existingItem.quantity >= medicine.stock) {
          toast({
            variant: "destructive",
            title: "Stock limit reached",
            description: `Only ${medicine.stock} units available.`,
          });
          return prev;
        }

        return prev.map(item => 
          item.medicineId === medicine.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                totalPrice: (item.quantity + 1) * item.unitPrice,
                gstAmount: (item.quantity + 1) * item.unitPrice * (item.gstRate / 100),
              }
            : item
        );
      }

      const unitPrice = parseFloat(medicine.mrp);
      const gstRate = parseFloat(medicine.gstRate);
      const gstAmount = unitPrice * (gstRate / 100);
      const totalPrice = unitPrice + gstAmount;

      return [...prev, {
        medicineId: medicine.id,
        medicine,
        quantity: 1,
        unitPrice,
        totalPrice,
        gstRate,
        gstAmount,
      }];
    });
  };

  const handleRemoveFromCart = (medicineId: number) => {
    setCartItems(prev => prev.filter(item => item.medicineId !== medicineId));
  };

  const handleUpdateQuantity = (medicineId: number, quantity: number) => {
    setCartItems(prev => prev.map(item => 
      item.medicineId === medicineId
        ? {
            ...item,
            quantity,
            totalPrice: quantity * item.unitPrice,
            gstAmount: quantity * item.unitPrice * (item.gstRate / 100),
          }
        : item
    ));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleGenerateInvoice = async () => {
    if (cartItems.length === 0) {
      toast({
        variant: "destructive",
        title: "Empty cart",
        description: "Please add items to the cart first.",
      });
      return;
    }

    setIsGeneratingInvoice(true);

    try {
      const response = await fetch('/api/invoices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartItems.map(item => ({
            medicineId: item.medicineId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            gstRate: item.gstRate,
            gstAmount: item.gstAmount,
            totalPrice: item.totalPrice,
          })),
        }),
      });

      if (!response.ok) throw new Error('Failed to generate invoice');

      toast({
        title: "Success",
        description: "Invoice generated successfully",
      });

      handleClearCart();
    } catch (error) {
      console.error('Invoice error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate invoice. Please try again.",
      });
    } finally {
      setIsGeneratingInvoice(false);
    }
  };

  // Filter medicines based on search term
  const filteredMedicines = useMemo(() => {
    return medicines?.filter((medicine: MedicineItem) => {
      if (!searchTerm) return true;
      const searchLower = searchTerm.toLowerCase();
      return (
        (medicine.name?.toLowerCase() || '').includes(searchLower) ||
        (medicine.description?.toLowerCase() || '').includes(searchLower) ||
        (medicine.category?.toLowerCase() || '').includes(searchLower)
      );
    }) || [];
  }, [medicines, searchTerm]);

  return (
    <div className="p-4 md:p-6">
      {/* Search Section */}
      <div className="flex gap-2 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            ref={searchInputRef}
            placeholder={t("pos.searchPlaceholder") || "Search medicines..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 pr-4"
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={handleVoiceSearch}
          className={isListening ? "bg-red-500 text-white hover:bg-red-600" : ""}
          title="Voice Search"
        >
          <Mic className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleOCRScan}
          title="Scan Prescription"
        >
          <Camera className="h-4 w-4" />
        </Button>
      </div>

      {/* Medicines List */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>MRP</TableHead>
              <TableHead>GST</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMedicines.map((medicine: MedicineItem) => (
              <TableRow key={medicine.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{medicine.name}</div>
                    {medicine.description && (
                      <div className="text-sm text-muted-foreground">
                        {medicine.description}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>{medicine.category || '-'}</TableCell>
                <TableCell>
                  <span className={medicine.stock <= medicine.lowStockThreshold ? "text-red-500" : ""}>
                    {medicine.stock}
                  </span>
                </TableCell>
                <TableCell>₹{parseFloat(medicine.mrp).toFixed(2)}</TableCell>
                <TableCell>{medicine.gstRate}%</TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    onClick={() => handleAddToCart(medicine)}
                    disabled={medicine.stock <= 0}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filteredMedicines.length === 0 && searchTerm && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No medicines found matching "{searchTerm}"
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Cart Section */}
      <div className="mt-6">
        <Cart
          items={cartItems}
          onClearCart={handleClearCart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveFromCart}
          onGenerateInvoice={handleGenerateInvoice}
          loading={isGeneratingInvoice}
        />
      </div>
    </div>
  );
}
