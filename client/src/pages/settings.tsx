import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable } from "@/components/ui/data-table";
import { Switch } from "@/components/ui/switch";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Plus, User, Shield, Store, Printer, Sun, Moon, Laptop } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { useTheme } from "@/components/ui/theme-provider";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/language-context";
import { supportedLanguages } from "@/config/languages";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useTranslate } from "@/hooks/use-translate";

// Schema for adding a new user
const userSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(1, "Name is required"),
  role: z.enum(["admin", "pharmacist", "accountant"]),
});

type UserFormValues = z.infer<typeof userSchema>;

// Schema for adding a new doctor
const doctorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  specialization: z.string().optional(),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
});

type DoctorFormValues = z.infer<typeof doctorSchema>;

// Schema for store settings
const storeSettingsSchema = z.object({
  name: z.string().min(1, "Store name is required"),
  address: z.string().min(1, "Address is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Invalid email address"),
  gstNumber: z.string().min(15, "GST number must be 15 characters").max(15, "GST number must be 15 characters"),
});

type StoreSettingsFormValues = z.infer<typeof storeSettingsSchema>;

export default function Settings() {
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [isAddDoctorDialogOpen, setIsAddDoctorDialogOpen] = useState(false);
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const { currentLanguage, setLanguage } = useLanguage();
  const t = useTranslate();

  // User form
  const userForm = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: "",
      password: "",
      name: "",
      role: "pharmacist",
    },
  });

  // Doctor form
  const doctorForm = useForm<DoctorFormValues>({
    resolver: zodResolver(doctorSchema),
    defaultValues: {
      name: "",
      specialization: "",
      phone: "",
    },
  });

  // Store settings form
  const storeSettingsForm = useForm<StoreSettingsFormValues>({
    resolver: zodResolver(storeSettingsSchema),
    defaultValues: {
      name: "MediTrack Pharmacy",
      address: "123 Main Street, Delhi, India",
      phone: "9876543210",
      email: "info@meditrack.com",
      gstNumber: "22AAAAA0000A1Z5",
    },
  });

  // Fetch users
  const { data: users = [], refetch: refetchUsers } = useQuery({
    queryKey: ["/api/users"],
    queryFn: async () => {
      const res = await fetch("/api/users", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch users");
      return res.json();
    },
  });

  // Fetch doctors
  const { data: doctors = [], refetch: refetchDoctors } = useQuery({
    queryKey: ["/api/doctors"],
    queryFn: async () => {
      const res = await fetch("/api/doctors", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch doctors");
      return res.json();
    },
  });

  // Add new user
  const onSubmitUser = async (data: UserFormValues) => {
    try {
      await apiRequest("POST", "/api/users", data);
      
      toast({
        title: "User added",
        description: "User has been added successfully",
      });
      
      // Refetch users
      queryClient.invalidateQueries({ queryKey: ["/api/users"] });
      refetchUsers();
      
      // Close dialog and reset form
      setIsAddUserDialogOpen(false);
      userForm.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add user. Please try again.",
      });
    }
  };

  // Add new doctor
  const onSubmitDoctor = async (data: DoctorFormValues) => {
    try {
      await apiRequest("POST", "/api/doctors", data);
      
      toast({
        title: "Doctor added",
        description: "Doctor has been added successfully",
      });
      
      // Refetch doctors
      queryClient.invalidateQueries({ queryKey: ["/api/doctors"] });
      refetchDoctors();
      
      // Close dialog and reset form
      setIsAddDoctorDialogOpen(false);
      doctorForm.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add doctor. Please try again.",
      });
    }
  };

  // Save store settings
  const onSaveStoreSettings = async (data: StoreSettingsFormValues) => {
    try {
      // In a real app, this would save to a settings API
      // Simulating success here
      
      toast({
        title: "Settings saved",
        description: "Store settings have been saved successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save settings. Please try again.",
      });
    }
  };

  // Delete user
  const handleDeleteUser = async (id: number) => {
    try {
      await apiRequest("DELETE", `/api/users/${id}`, undefined);
      
      toast({
        title: "User deleted",
        description: "User has been deleted successfully",
      });
      
      queryClient.invalidateQueries({ queryKey: ["/api/users"] });
      refetchUsers();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete user. Please try again.",
      });
    }
  };

  // Edit user
  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    userForm.reset({
      username: user.username,
      password: "", // Don't populate password for security
      name: user.name,
      role: user.role,
    });
    setIsEditUserDialogOpen(true);
  };

  // User table columns
  const userColumns = [
    {
      key: "name",
      header: "Name",
      cell: (row: any) => <div className="font-medium">{row.name}</div>,
    },
    {
      key: "username",
      header: "Username",
      cell: (row: any) => <div>{row.username}</div>,
    },
    {
      key: "role",
      header: "Role",
      cell: (row: any) => (
        <div className="capitalize">
          {row.role === "admin" ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
              Admin
            </span>
          ) : row.role === "pharmacist" ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
              Pharmacist
            </span>
          ) : (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
              Accountant
            </span>
          )}
        </div>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      cell: (row: any) => (
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleEditUser(row)}
          >
            Edit
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="sm" className="text-destructive">
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the user
                  account and remove their data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleDeleteUser(row.id)}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ),
    },
  ];

  // Doctor table columns
  const doctorColumns = [
    {
      key: "name",
      header: "Name",
      cell: (row: any) => <div className="font-medium">Dr. {row.name}</div>,
    },
    {
      key: "specialization",
      header: "Specialization",
      cell: (row: any) => <div>{row.specialization || "-"}</div>,
    },
    {
      key: "phone",
      header: "Phone",
      cell: (row: any) => <div>{row.phone}</div>,
    },
    {
      key: "actions",
      header: "Actions",
      cell: (row: any) => (
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm">
            Edit
          </Button>
          <Button variant="ghost" size="sm" className="text-destructive">
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto py-6">
      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">{t('general')}</TabsTrigger>
          <TabsTrigger value="users">{t('users')}</TabsTrigger>
          <TabsTrigger value="doctors">{t('doctors')}</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          {/* Language Settings */}
          <Card>
            <CardHeader>
              <CardTitle>{t('language')}</CardTitle>
              <CardDescription>{t('languageDescription')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup
                value={currentLanguage.code}
                onValueChange={setLanguage}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {supportedLanguages.map((lang) => (
                  <div key={lang.code} className="flex items-center space-x-2">
                    <RadioGroupItem value={lang.code} id={`lang-${lang.code}`} />
                    <Label htmlFor={`lang-${lang.code}`} className="flex flex-col">
                      <span className="font-medium">{lang.nativeName}</span>
                      <span className="text-sm text-muted-foreground">{lang.name}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              <p className="text-sm text-muted-foreground mt-4">
                {t('languageNote')}
              </p>
            </CardContent>
          </Card>

          <Separator />

          {/* Theme Settings */}
          <Card>
            <CardHeader>
              <CardTitle>{t('theme')}</CardTitle>
              <CardDescription>{t('themeDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>{t('theme')}</Label>
                  <div className="flex flex-col xs:flex-row gap-2">
                    <Button
                      variant={theme === "light" ? "default" : "outline"}
                      className="w-full xs:w-auto"
                      onClick={() => setTheme("light")}
                    >
                      <Sun className="h-4 w-4 mr-2" /> {t('light')}
                    </Button>
                    <Button
                      variant={theme === "dark" ? "default" : "outline"}
                      className="w-full xs:w-auto"
                      onClick={() => setTheme("dark")}
                    >
                      <Moon className="h-4 w-4 mr-2" /> {t('dark')}
                    </Button>
                    <Button
                      variant={theme === "system" ? "default" : "outline"}
                      className="w-full xs:w-auto"
                      onClick={() => setTheme("system")}
                    >
                      <Laptop className="h-4 w-4 mr-2" /> {t('system')}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* User Management */}
        <TabsContent value="users">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{t('users')}</CardTitle>
                <CardDescription>{t('userManagement')}</CardDescription>
              </div>
              <Button onClick={() => setIsAddUserDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" /> {t('add')} {t('user')}
              </Button>
            </CardHeader>
            <CardContent>
              <DataTable
                data={users}
                columns={userColumns}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Doctor Management */}
        <TabsContent value="doctors">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{t('doctors')}</CardTitle>
                <CardDescription>{t('doctorManagement')}</CardDescription>
              </div>
              <Button onClick={() => setIsAddDoctorDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" /> {t('add')} {t('doctor')}
              </Button>
            </CardHeader>
            <CardContent>
              <DataTable
                data={doctors}
                columns={doctorColumns}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Add User Dialog */}
      <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t('add')} {t('new')} {t('user')}</DialogTitle>
            <DialogDescription>
              {t('createNewUser')}
            </DialogDescription>
          </DialogHeader>
          <Form {...userForm}>
            <form onSubmit={userForm.handleSubmit(onSubmitUser)} className="space-y-4">
              <FormField
                control={userForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('fullName')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('enterFullName')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={userForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('username')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('enterUsername')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={userForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('password')}</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder={t('enterPassword')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={userForm.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('role')}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('selectRole')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="admin">
                          <div className="flex items-center">
                            <Shield className="h-4 w-4 mr-2 text-blue-500" />
                            {t('admin')}
                          </div>
                        </SelectItem>
                        <SelectItem value="pharmacist">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-2 text-green-500" />
                            {t('pharmacist')}
                          </div>
                        </SelectItem>
                        <SelectItem value="accountant">
                          <div className="flex items-center">
                            <Store className="h-4 w-4 mr-2 text-purple-500" />
                            {t('accountant')}
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="submit">{t('add')} {t('user')}</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Edit User Dialog */}
      <Dialog open={isEditUserDialogOpen} onOpenChange={setIsEditUserDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t('edit')} {t('user')}</DialogTitle>
            <DialogDescription>
              {t('updateUserDetails')}
            </DialogDescription>
          </DialogHeader>
          <Form {...userForm}>
            <form onSubmit={userForm.handleSubmit(onSubmitUser)} className="space-y-4">
              <FormField
                control={userForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('fullName')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('enterFullName')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={userForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('username')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('enterUsername')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={userForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('password')}</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder={t('leaveBlankForCurrentPassword')} 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={userForm.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('role')}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('selectRole')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="admin">
                          <div className="flex items-center">
                            <Shield className="h-4 w-4 mr-2 text-blue-500" />
                            {t('admin')}
                          </div>
                        </SelectItem>
                        <SelectItem value="pharmacist">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-2 text-green-500" />
                            {t('pharmacist')}
                          </div>
                        </SelectItem>
                        <SelectItem value="accountant">
                          <div className="flex items-center">
                            <Store className="h-4 w-4 mr-2 text-purple-500" />
                            {t('accountant')}
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="submit">{t('update')} {t('user')}</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Add Doctor Dialog */}
      <Dialog open={isAddDoctorDialogOpen} onOpenChange={setIsAddDoctorDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t('add')} {t('new')} {t('doctor')}</DialogTitle>
            <DialogDescription>
              {t('addDoctorDescription')}
            </DialogDescription>
          </DialogHeader>
          <Form {...doctorForm}>
            <form onSubmit={doctorForm.handleSubmit(onSubmitDoctor)} className="space-y-4">
              <FormField
                control={doctorForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('doctorName')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('enterDoctorName')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={doctorForm.control}
                name="specialization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('specialization')} ({t('optional')})</FormLabel>
                    <FormControl>
                      <Input placeholder={t('enterSpecialization')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={doctorForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('phoneNumber')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('enterPhoneNumber')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="submit">{t('add')} {t('doctor')}</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
