import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DataTable } from "@/components/ui/data-table";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Plus, Search, FileText, Upload, Phone, User, Info, FileUp } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { useTranslate } from "@/hooks/use-translate";

// Schema for adding a new customer
const customerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  address: z.string().optional(),
});

type CustomerFormValues = z.infer<typeof customerSchema>;

// Schema for adding a prescription
const prescriptionSchema = z.object({
  customerId: z.string().min(1, "Customer is required"),
  doctorId: z.string().optional(),
  notes: z.string().optional(),
  imagePath: z.string().optional(), // Added imagePath field
});

type PrescriptionFormValues = z.infer<typeof prescriptionSchema>;

export default function Patients() {
  const [isAddCustomerDialogOpen, setIsAddCustomerDialogOpen] = useState(false);
  const [isAddPrescriptionDialogOpen, setIsAddPrescriptionDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const { t } = useTranslate();

  // Customer form
  const customerForm = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
    },
  });

  // Prescription form
  const prescriptionForm = useForm<PrescriptionFormValues>({
    resolver: zodResolver(prescriptionSchema),
    defaultValues: {
      customerId: "",
      doctorId: "",
      notes: "",
      imagePath: "", // Initialize imagePath
    },
  });

  // Fetch customers
  const { data: customers = [], refetch: refetchCustomers } = useQuery({
    queryKey: ["/api/customers"],
    queryFn: async () => {
      const res = await fetch("/api/customers", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch customers");
      return res.json();
    },
  });

  // Fetch doctors
  const { data: doctors = [] } = useQuery({
    queryKey: ["/api/doctors"],
    queryFn: async () => {
      const res = await fetch("/api/doctors", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch doctors");
      return res.json();
    },
  });

  // Fetch prescriptions when a customer is selected
  const { data: prescriptions = [] } = useQuery({
    queryKey: ["/api/customers", selectedCustomer?.id, "prescriptions"],
    queryFn: async () => {
      if (!selectedCustomer) return [];
      const res = await fetch(`/api/customers/${selectedCustomer.id}/prescriptions`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch prescriptions");
      return res.json();
    },
    enabled: !!selectedCustomer,
  });

  // Fetch invoices when a customer is selected
  const { data: invoices = [] } = useQuery({
    queryKey: ["/api/customers", selectedCustomer?.id, "invoices"],
    queryFn: async () => {
      if (!selectedCustomer) return [];
      const res = await fetch(`/api/customers/${selectedCustomer.id}/invoices`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch invoices");
      return res.json();
    },
    enabled: !!selectedCustomer,
  });

  // Filter customers based on search
  const filteredCustomers = customers.filter((customer: any) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  // Add new customer
  const onSubmitCustomer = async (data: CustomerFormValues) => {
    try {
      await apiRequest("POST", "/api/customers", data);

      toast({
        title: "Customer added",
        description: "Customer has been added successfully",
      });

      // Refetch customers
      queryClient.invalidateQueries({ queryKey: ["/api/customers"] });
      refetchCustomers();

      // Close dialog and reset form
      setIsAddCustomerDialogOpen(false);
      customerForm.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add customer. Please try again.",
      });
    }
  };

  // Add new prescription
  const onSubmitPrescription = async (data: PrescriptionFormValues) => {
    try {
      console.log('Submitting prescription with data:', data);
      const payload = {
        ...data,
        customerId: parseInt(data.customerId),
        doctorId: data.doctorId ? parseInt(data.doctorId) : null,
      };
      console.log('Prescription payload:', payload);

      const response = await apiRequest("POST", "/api/prescriptions", payload);
      console.log('Prescription submission response:', response);

      toast({
        title: t("common.upload"),
        description: t("patient.prescription.uploadSuccess"),
      });

      // Refetch prescriptions
      queryClient.invalidateQueries({ 
        queryKey: ["/api/customers", parseInt(data.customerId), "prescriptions"] 
      });

      // Close dialog and reset form
      setIsAddPrescriptionDialogOpen(false);
      prescriptionForm.reset();
    } catch (error) {
      console.error('Prescription submission error:', error);
      toast({
        variant: "destructive",
        title: t("common.error"),
        description: t("patient.prescription.uploadError"),
      });
    }
  };

  // Handle customer selection
  const handleCustomerSelect = (customer: any) => {
    setSelectedCustomer(customer);
    prescriptionForm.setValue("customerId", customer.id.toString());
  };

  // Customer table columns
  const customerColumns = [
    {
      key: "name",
      header: "Name",
      cell: (row: any) => <div className="font-medium">{row.name}</div>,
      sortable: true,
    },
    {
      key: "phone",
      header: "Phone",
      cell: (row: any) => <div>{row.phone}</div>,
    },
    {
      key: "email",
      header: "Email",
      cell: (row: any) => <div>{row.email || "-"}</div>,
    },
    {
      key: "address",
      header: "Address",
      cell: (row: any) => <div>{row.address || "-"}</div>,
    },
    {
      key: "createdAt",
      header: "Added On",
      cell: (row: any) => <div>{format(new Date(row.createdAt), "dd/MM/yyyy")}</div>,
    },
    {
      key: "actions",
      header: "Actions",
      cell: (row: any) => (
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => handleCustomerSelect(row)}
        >
          <Info className="h-4 w-4 mr-1" /> Details
        </Button>
      ),
    },
  ];

  // Prescription table columns
  const prescriptionColumns = [
    {
      key: "date",
      header: t("patient.prescription.date"),
      cell: (row: any) => <div>{format(new Date(row.createdAt), "dd/MM/yyyy")}</div>,
      sortable: true,
    },
    {
      key: "doctor",
      header: t("patient.prescription.doctor"),
      cell: (row: any) => {
        const doctor = doctors.find((d: any) => d.id === row.doctorId);
        return <div>{doctor ? `Dr. ${doctor.name}` : "Not specified"}</div>;
      },
    },
    {
      key: "notes",
      header: t("patient.prescription.notes"),
      cell: (row: any) => <div>{row.notes || "-"}</div>,
    },
    {
      key: "imagePath",
      header: t("patient.prescription.upload"),
      cell: (row: any) => {
        console.log('Rendering prescription row:', row);
        return (
          <div className="w-[100px] h-[100px] rounded-md overflow-hidden bg-zinc-900 flex flex-col items-center justify-center">
            {row.prescriptionImagePath ? (
              <>
                <img 
                  src={`/uploads/prescriptions/${row.prescriptionImagePath}`}
                  alt="Prescription"
                  className="w-full h-[80px] object-cover"
                  onError={(e) => {
                    console.error('Image failed to load:', row.prescriptionImagePath);
                    e.currentTarget.src = '/placeholder-prescription.png';
                  }}
                />
                <div className="text-xs text-zinc-400 mt-1">
                  {row.prescriptionImagePath.split('.').pop()?.toUpperCase()}
                </div>
              </>
            ) : (
              <div className="text-zinc-500 text-sm">No image</div>
            )}
          </div>
        );
      },
    },
    {
      key: "actions",
      header: t("common.actions"),
      cell: (row: any) => (
        <div className="flex space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm">
                <FileText className="h-4 w-4 mr-1" /> {t("common.view")}
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#1C1C1C] border-zinc-800 max-w-4xl p-6">
              <div className="flex justify-between items-center mb-6">
                <DialogTitle className="text-2xl font-normal text-white">
                  Prescription Details
                </DialogTitle>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>
                  </Button>
                </DialogTrigger>
              </div>
              <div className="space-y-6">
                <div className="rounded-lg overflow-hidden bg-zinc-900 flex items-center justify-center min-h-[300px] relative">
                  {row.prescriptionImagePath ? (
                    <>
                      <img 
                        src={`/uploads/prescriptions/${row.prescriptionImagePath}`}
                        alt="Prescription"
                        className="max-w-full max-h-[70vh] object-contain"
                        onError={(e) => {
                          console.error('Image failed to load in dialog:', row.prescriptionImagePath);
                          e.currentTarget.src = '/placeholder-prescription.png';
                        }}
                      />
                      <div className="absolute bottom-4 right-4 bg-black/50 px-2 py-1 rounded text-xs text-white">
                        {row.prescriptionImagePath.split('.').pop()?.toUpperCase()}
                      </div>
                    </>
                  ) : (
                    <div className="text-zinc-500">No prescription image available</div>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-normal text-white mb-2">Notes</h3>
                  <p className="text-[#71717A]">{row.notes || "Take as prescribed"}</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="ghost" size="sm">
            <Upload className="h-4 w-4 mr-1" /> {t("common.share")}
          </Button>
        </div>
      ),
    },
  ];

  // Invoice table columns
  const invoiceColumns = [
    {
      key: "invoiceNumber",
      header: "Invoice #",
      cell: (row: any) => <div className="font-medium">{row.invoiceNumber}</div>,
      sortable: true,
    },
    {
      key: "date",
      header: "Date",
      cell: (row: any) => <div>{format(new Date(row.createdAt), "dd/MM/yyyy")}</div>,
      sortable: true,
    },
    {
      key: "total",
      header: "Amount",
      cell: (row: any) => <div>₹{parseFloat(row.total).toFixed(2)}</div>,
      sortable: true,
    },
    {
      key: "actions",
      header: "Actions",
      cell: (row: any) => (
        <Button variant="ghost" size="sm">
          <FileText className="h-4 w-4 mr-1" /> View Invoice
        </Button>
      ),
    },
  ];

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl font-bold mb-6">Patient & Prescription Management</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customers List */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Patients</CardTitle>
              <CardDescription>Manage patient information and records</CardDescription>
            </div>
            <Button onClick={() => setIsAddCustomerDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" /> Add Patient
            </Button>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex">
              <div className="relative flex-grow">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search by name or phone..." 
                  className="pl-8" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <DataTable
              data={filteredCustomers}
              columns={customerColumns}
              pageSize={10}
            />
          </CardContent>
        </Card>

        {/* Patient Details */}
        <Card>
          <CardHeader>
            <CardTitle>Patient Details</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedCustomer ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-10 w-10 text-primary" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold">{selectedCustomer.name}</h3>
                    <div className="flex items-center justify-center text-sm text-muted-foreground">
                      <Phone className="h-3 w-3 mr-1" /> {selectedCustomer.phone}
                    </div>
                  </div>

                  {selectedCustomer.email && (
                    <div className="text-sm">
                      <Label className="font-medium">Email:</Label>
                      <div>{selectedCustomer.email}</div>
                    </div>
                  )}

                  {selectedCustomer.address && (
                    <div className="text-sm">
                      <Label className="font-medium">Address:</Label>
                      <div>{selectedCustomer.address}</div>
                    </div>
                  )}

                  <div className="text-sm">
                    <Label className="font-medium">Customer since:</Label>
                    <div>{format(new Date(selectedCustomer.createdAt), "dd MMMM, yyyy")}</div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => setIsAddPrescriptionDialogOpen(true)}
                  >
                    <FileUp className="h-4 w-4 mr-2" /> Upload Prescription
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <User className="h-12 w-12 mx-auto mb-3 opacity-20" />
                <p>Select a patient to view details</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Patient History */}
      {selectedCustomer && (
        <div className="mt-6">
          <Tabs defaultValue="prescriptions">
            <TabsList>
              <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
              <TabsTrigger value="invoices">Purchase History</TabsTrigger>
            </TabsList>

            <TabsContent value="prescriptions" className="mt-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>{t("patient.prescription.title")}</CardTitle>
                  <Button 
                    onClick={() => setIsAddPrescriptionDialogOpen(true)}
                    variant="outline"
                  >
                    <Plus className="h-4 w-4 mr-2" /> {t("patient.prescription.upload")}
                  </Button>
                </CardHeader>
                <CardContent>
                  {prescriptions.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <FileText className="h-12 w-12 mx-auto mb-3 opacity-20" />
                      <p>{t("patient.prescription.empty")}</p>
                    </div>
                  ) : (
                    <DataTable
                      data={prescriptions}
                      columns={prescriptionColumns}
                    />
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="invoices" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Purchase History</CardTitle>
                </CardHeader>
                <CardContent>
                  {invoices.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <FileText className="h-12 w-12 mx-auto mb-3 opacity-20" />
                      <p>No purchases found for this patient</p>
                    </div>
                  ) : (
                    <DataTable
                      data={invoices}
                      columns={invoiceColumns}
                    />
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}

      {/* Add Customer Dialog */}
      <Dialog open={isAddCustomerDialogOpen} onOpenChange={setIsAddCustomerDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Patient</DialogTitle>
          </DialogHeader>
          <Form {...customerForm}>
            <form onSubmit={customerForm.handleSubmit(onSubmitCustomer)} className="space-y-4">
              <FormField
                control={customerForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter patient name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={customerForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={customerForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={customerForm.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="submit">Add Patient</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Add Prescription Dialog */}
      <Dialog open={isAddPrescriptionDialogOpen} onOpenChange={setIsAddPrescriptionDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{t("patient.prescription.uploadTitle")}</DialogTitle>
          </DialogHeader>
          <Form {...prescriptionForm}>
            <form onSubmit={prescriptionForm.handleSubmit(onSubmitPrescription)} className="space-y-4">
              <FormField
                control={prescriptionForm.control}
                name="customerId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("patient.prescription.selectPatient")}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t("patient.prescription.selectPatient")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {customers.map((customer: any) => (
                          <SelectItem key={customer.id} value={customer.id.toString()}>
                            {customer.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={prescriptionForm.control}
                name="doctorId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("patient.prescription.selectDoctor")}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t("patient.prescription.selectDoctor")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        {doctors.map((doctor: any) => (
                          <SelectItem key={doctor.id} value={doctor.id.toString()}>
                            Dr. {doctor.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <Label>{t("patient.prescription.upload")}</Label>
                <div className="border-2 border-dashed border-border rounded-md p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    {t("patient.prescription.dragAndDrop")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t("patient.prescription.supportedFormats")}
                  </p>
                  <Input
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        console.log('Selected file:', e.target.files[0]);
                        const formData = new FormData();
                        formData.append("prescription", e.target.files[0]);

                        // Upload the file
                        fetch("/api/prescriptions/upload", {
                          method: "POST",
                          body: formData,
                        })
                        .then(res => res.json())
                        .then(data => {
                          console.log('Upload response:', data);
                          prescriptionForm.setValue("imagePath", data.path);
                          console.log('Form values after setting path:', prescriptionForm.getValues());
                          toast({
                            title: t("common.upload"),
                            description: t("patient.prescription.uploadSuccess"),
                          });
                        })
                        .catch((error) => {
                          console.error('Upload error:', error);
                          toast({
                            variant: "destructive",
                            title: t("common.error"),
                            description: t("patient.prescription.uploadError"),
                          });
                        });
                      }
                    }}
                  />
                </div>
              </div>

              <FormField
                control={prescriptionForm.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("patient.prescription.notes")}</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder={t("patient.prescription.addNotes")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="submit">{t("common.upload")}</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}