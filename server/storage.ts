import { 
  users, type User, type InsertUser,
  categories, type Category, type InsertCategory,
  medicines, type Medicine, type InsertMedicine,
  customers, type Customer, type InsertCustomer,
  doctors, type Doctor, type InsertDoctor,
  invoices, type Invoice, type InsertInvoice,
  invoiceItems, type InvoiceItem, type InsertInvoiceItem,
  prescriptions, type Prescription, type InsertPrescription
} from "@shared/schema";
import { db } from "./db";
import { and, desc, eq, gte, lte, sql } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getUsers(): Promise<User[]>;
  
  // Category methods
  getCategories(): Promise<Category[]>;
  getCategory(id: number): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Medicine methods
  getMedicines(): Promise<Medicine[]>;
  getMedicine(id: number): Promise<Medicine | undefined>;
  createMedicine(medicine: InsertMedicine): Promise<Medicine>;
  updateMedicineStock(id: number, newStock: number): Promise<Medicine | undefined>;
  getLowStockMedicines(): Promise<Medicine[]>;
  getExpiringMedicines(daysThreshold: number): Promise<Medicine[]>;
  
  // Customer methods
  getCustomers(): Promise<Customer[]>;
  getCustomer(id: number): Promise<Customer | undefined>;
  getCustomerByPhone(phone: string): Promise<Customer | undefined>;
  createCustomer(customer: InsertCustomer): Promise<Customer>;
  
  // Doctor methods
  getDoctors(): Promise<Doctor[]>;
  getDoctor(id: number): Promise<Doctor | undefined>;
  createDoctor(doctor: InsertDoctor): Promise<Doctor>;
  
  // Invoice methods
  getInvoices(): Promise<Invoice[]>;
  getInvoice(id: number): Promise<Invoice | undefined>;
  getInvoiceByNumber(invoiceNumber: string): Promise<Invoice | undefined>;
  createInvoice(invoice: InsertInvoice): Promise<Invoice>;
  getCustomerInvoices(customerId: number): Promise<Invoice[]>;
  
  // Invoice items methods
  getInvoiceItems(invoiceId: number): Promise<InvoiceItem[]>;
  createInvoiceItem(invoiceItem: InsertInvoiceItem): Promise<InvoiceItem>;
  
  // Prescription methods
  getPrescriptions(customerId: number): Promise<Prescription[]>;
  getPrescription(id: number): Promise<Prescription | undefined>;
  createPrescription(prescription: InsertPrescription): Promise<Prescription>;
  
  // Analytics
  getTopSellingMedicines(limit: number): Promise<any[]>;
  getDailySales(days: number): Promise<any[]>;
}

// Database storage implementation
export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }
  
  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  async getUsers(): Promise<User[]> {
    return await db.select().from(users);
  }
  
  // Category methods
  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories);
  }
  
  async getCategory(id: number): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.id, id));
    return category;
  }
  
  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const [category] = await db.insert(categories).values(insertCategory).returning();
    return category;
  }
  
  // Medicine methods
  async getMedicines(): Promise<Medicine[]> {
    return await db.select().from(medicines);
  }
  
  async getMedicine(id: number): Promise<Medicine | undefined> {
    const [medicine] = await db.select().from(medicines).where(eq(medicines.id, id));
    return medicine;
  }
  
  async createMedicine(insertMedicine: InsertMedicine): Promise<Medicine> {
    const [medicine] = await db.insert(medicines).values(insertMedicine).returning();
    return medicine;
  }
  
  async updateMedicineStock(id: number, newStock: number): Promise<Medicine | undefined> {
    const [medicine] = await db
      .update(medicines)
      .set({ stock: newStock })
      .where(eq(medicines.id, id))
      .returning();
    return medicine;
  }
  
  async getLowStockMedicines(): Promise<Medicine[]> {
    return await db
      .select()
      .from(medicines)
      .where(sql`${medicines.stock} <= ${medicines.lowStockThreshold}`);
  }
  
  async getExpiringMedicines(daysThreshold: number): Promise<Medicine[]> {
    const today = new Date();
    const thresholdDate = new Date(today);
    thresholdDate.setDate(today.getDate() + daysThreshold);
    
    return await db
      .select()
      .from(medicines)
      .where(lte(medicines.expiryDate, thresholdDate));
  }
  
  // Customer methods
  async getCustomers(): Promise<Customer[]> {
    return await db.select().from(customers);
  }
  
  async getCustomer(id: number): Promise<Customer | undefined> {
    const [customer] = await db.select().from(customers).where(eq(customers.id, id));
    return customer;
  }
  
  async getCustomerByPhone(phone: string): Promise<Customer | undefined> {
    const [customer] = await db.select().from(customers).where(eq(customers.phone, phone));
    return customer;
  }
  
  async createCustomer(insertCustomer: InsertCustomer): Promise<Customer> {
    const [customer] = await db.insert(customers).values(insertCustomer).returning();
    return customer;
  }
  
  // Doctor methods
  async getDoctors(): Promise<Doctor[]> {
    return await db.select().from(doctors);
  }
  
  async getDoctor(id: number): Promise<Doctor | undefined> {
    const [doctor] = await db.select().from(doctors).where(eq(doctors.id, id));
    return doctor;
  }
  
  async createDoctor(insertDoctor: InsertDoctor): Promise<Doctor> {
    const [doctor] = await db.insert(doctors).values(insertDoctor).returning();
    return doctor;
  }
  
  // Invoice methods
  async getInvoices(): Promise<Invoice[]> {
    return await db.select().from(invoices).orderBy(desc(invoices.createdAt));
  }
  
  async getInvoice(id: number): Promise<Invoice | undefined> {
    const [invoice] = await db.select().from(invoices).where(eq(invoices.id, id));
    return invoice;
  }
  
  async getInvoiceByNumber(invoiceNumber: string): Promise<Invoice | undefined> {
    const [invoice] = await db.select().from(invoices).where(eq(invoices.invoiceNumber, invoiceNumber));
    return invoice;
  }
  
  async createInvoice(insertInvoice: InsertInvoice): Promise<Invoice> {
    const [invoice] = await db.insert(invoices).values(insertInvoice).returning();
    return invoice;
  }
  
  async getCustomerInvoices(customerId: number): Promise<Invoice[]> {
    return await db
      .select()
      .from(invoices)
      .where(eq(invoices.customerId, customerId))
      .orderBy(desc(invoices.createdAt));
  }
  
  // Invoice items methods
  async getInvoiceItems(invoiceId: number): Promise<InvoiceItem[]> {
    return await db
      .select()
      .from(invoiceItems)
      .where(eq(invoiceItems.invoiceId, invoiceId));
  }
  
  async createInvoiceItem(insertInvoiceItem: InsertInvoiceItem): Promise<InvoiceItem> {
    const [item] = await db.insert(invoiceItems).values(insertInvoiceItem).returning();
    return item;
  }
  
  // Prescription methods
  async getPrescriptions(customerId: number): Promise<Prescription[]> {
    return await db
      .select()
      .from(prescriptions)
      .where(eq(prescriptions.customerId, customerId))
      .orderBy(desc(prescriptions.createdAt));
  }
  
  async getPrescription(id: number): Promise<Prescription | undefined> {
    const [prescription] = await db.select().from(prescriptions).where(eq(prescriptions.id, id));
    return prescription;
  }
  
  async createPrescription(insertPrescription: InsertPrescription): Promise<Prescription> {
    const [prescription] = await db.insert(prescriptions).values(insertPrescription).returning();
    return prescription;
  }
  
  // Stock adjustment methods
  async getStockAdjustments(): Promise<any[]> {
    const adjustments = await db
      .select({
        medicine_name: medicines.name,
        old_stock: sql<number>`old_stock`,
        new_stock: medicines.stock,
        reason: sql<string>`reason`,
        created_at: sql<Date>`created_at`
      })
      .from(medicines)
      .where(sql`old_stock IS NOT NULL`);
    
    return adjustments;
  }

  // Analytics methods
  async getTopSellingMedicines(limit: number): Promise<any[]> {
    const result = await db
      .select({
        id: medicines.id,
        name: medicines.name,
        category: categories.name,
        soldUnits: sql<number>`SUM(${invoiceItems.quantity})`,
        revenue: sql<number>`SUM(${invoiceItems.totalPrice})`
      })
      .from(invoiceItems)
      .innerJoin(medicines, eq(invoiceItems.medicineId, medicines.id))
      .innerJoin(categories, eq(medicines.category_id, categories.id))
      .groupBy(medicines.id, medicines.name, categories.name)
      .orderBy(desc(sql`SUM(${invoiceItems.quantity})`))
      .limit(limit);
    
    return result.length > 0 ? result : this.getDefaultTopSellingMedicines(limit);
  }
  
  // Fallback method if no invoice data exists yet
  private async getDefaultTopSellingMedicines(limit: number): Promise<any[]> {
    const medicinesList = await db
      .select({
        id: medicines.id,
        name: medicines.name,
        category: categories.name
      })
      .from(medicines)
      .innerJoin(categories, eq(medicines.category_id, categories.id))
      .limit(limit);
    
    return medicinesList.map((medicine, index) => {
      const soldUnits = 100 - (index * 15);
      return {
        ...medicine,
        soldUnits,
        revenue: 0
      };
    });
  }
  
  async getDailySales(days: number): Promise<any[]> {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - days + 1);
    startDate.setHours(0, 0, 0, 0);
    
    // Get sales data from database grouped by date
    const salesData = await db
      .select({
        date: sql<string>`DATE(${invoices.createdAt})`,
        sales: sql<number>`SUM(CAST(${invoices.total} AS DECIMAL))`
      })
      .from(invoices)
      .where(gte(invoices.createdAt, startDate))
      .groupBy(sql`DATE(${invoices.createdAt})`)
      .orderBy(sql`DATE(${invoices.createdAt})`);
    
    // Create an array of all dates in the range
    const result: { date: string; sales: number }[] = [];
    for (let i = 0; i < days; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      
      // Find matching sales data or use 0
      const found = salesData.find(d => d.date === dateStr);
      result.push({
        date: dateStr,
        sales: found ? Number(found.sales) : 0
      });
    }
    
    return result;
  }
}

// In-memory storage implementation for fallback or testing
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private categories: Map<number, Category>;
  private medicines: Map<number, Medicine>;
  private customers: Map<number, Customer>;
  private doctors: Map<number, Doctor>;
  private invoices: Map<number, Invoice>;
  private invoiceItems: Map<number, InvoiceItem>;
  private prescriptions: Map<number, Prescription>;
  
  private currentUserId: number;
  private currentCategoryId: number;
  private currentMedicineId: number;
  private currentCustomerId: number;
  private currentDoctorId: number;
  private currentInvoiceId: number;
  private currentInvoiceItemId: number;
  private currentPrescriptionId: number;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.medicines = new Map();
    this.customers = new Map();
    this.doctors = new Map();
    this.invoices = new Map();
    this.invoiceItems = new Map();
    this.prescriptions = new Map();
    
    this.currentUserId = 1;
    this.currentCategoryId = 1;
    this.currentMedicineId = 1;
    this.currentCustomerId = 1;
    this.currentDoctorId = 1;
    this.currentInvoiceId = 1;
    this.currentInvoiceItemId = 1;
    this.currentPrescriptionId = 1;
    
    this.seedData();
  }

  // Seed initial data
  private seedData() {
    // Seed users
    const adminUser: User = {
      id: 1,
      username: "admin",
      password: "admin",
      name: "Admin User",
      role: "admin",
      createdAt: new Date()
    };
    this.users.set(adminUser.id, adminUser);

    // Seed categories
    const tabletCategory: Category = {
      id: 1,
      name: "Tablets"
    };
    this.categories.set(tabletCategory.id, tabletCategory);

    // Seed medicines
    const paracetamol: Medicine = {
      id: 1,
      name: "Paracetamol",
      description: null,
        category_id: 1,
        form: "tablet",
      batchNumber: "BATCH001",
        expiryDate: new Date("2024-12-31"),
      mrp: "10.00",
      stock: 100,
        lowStockThreshold: 20,
      gstRate: "18",
      createdAt: new Date()
    };
    this.medicines.set(paracetamol.id, paracetamol);

    // Seed customers
    const customer: Customer = {
      id: 1,
      name: "John Doe",
      phone: "1234567890",
      email: null,
      address: null,
      createdAt: new Date()
    };
    this.customers.set(customer.id, customer);

    // Seed doctors
    const doctor: Doctor = {
      id: 1,
      name: "Dr. Smith",
      specialization: null,
      phone: null,
      createdAt: new Date()
    };
    this.doctors.set(doctor.id, doctor);

    // Seed invoices
    const invoice: Invoice = {
      id: 1,
      invoiceNumber: "INV-001",
      customerId: null,
      doctorId: null,
      subtotal: "100.00",
      gstAmount: "18.00",
      total: "118.00",
      userId: 1,
      createdAt: new Date()
    };
    this.invoices.set(invoice.id, invoice);

    // Seed prescriptions
    const prescription: Prescription = {
      id: 1,
      customerId: 1,
      doctorId: null,
      prescriptionImagePath: null,
      notes: null,
      createdAt: new Date()
    };
    this.prescriptions.set(prescription.id, prescription);
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const createdAt = new Date();
    const user: User = { ...insertUser, id, createdAt };
    this.users.set(id, user);
    return user;
  }

  // Category methods
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategory(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.currentCategoryId++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }

  // Medicine methods
  async getMedicines(): Promise<Medicine[]> {
    return Array.from(this.medicines.values());
  }

  async getMedicine(id: number): Promise<Medicine | undefined> {
    return this.medicines.get(id);
  }

  async createMedicine(insertMedicine: InsertMedicine): Promise<Medicine> {
    const id = this.currentMedicineId++;
    const createdAt = new Date();
    const medicine: Medicine = { ...insertMedicine, id, createdAt };
    this.medicines.set(id, medicine);
    return medicine;
  }

  async updateMedicineStock(id: number, newStock: number): Promise<Medicine | undefined> {
    const medicine = this.medicines.get(id);
    if (medicine) {
      const updatedMedicine = { ...medicine, stock: newStock };
      this.medicines.set(id, updatedMedicine);
      return updatedMedicine;
    }
    return undefined;
  }

  async getLowStockMedicines(): Promise<Medicine[]> {
    return Array.from(this.medicines.values()).filter(
      medicine => medicine.stock <= medicine.lowStockThreshold
    );
  }

  async getExpiringMedicines(daysThreshold: number): Promise<Medicine[]> {
    const thresholdDate = new Date();
    thresholdDate.setDate(thresholdDate.getDate() + daysThreshold);
    
    return Array.from(this.medicines.values()).filter(
      medicine => medicine.expiryDate <= thresholdDate
    );
  }

  // Customer methods
  async getCustomers(): Promise<Customer[]> {
    return Array.from(this.customers.values());
  }

  async getCustomer(id: number): Promise<Customer | undefined> {
    return this.customers.get(id);
  }

  async getCustomerByPhone(phone: string): Promise<Customer | undefined> {
    return Array.from(this.customers.values()).find(
      customer => customer.phone === phone
    );
  }

  async createCustomer(insertCustomer: InsertCustomer): Promise<Customer> {
    const id = this.currentCustomerId++;
    const createdAt = new Date();
    const customer: Customer = { ...insertCustomer, id, createdAt };
    this.customers.set(id, customer);
    return customer;
  }

  // Doctor methods
  async getDoctors(): Promise<Doctor[]> {
    return Array.from(this.doctors.values());
  }

  async getDoctor(id: number): Promise<Doctor | undefined> {
    return this.doctors.get(id);
  }

  async createDoctor(insertDoctor: InsertDoctor): Promise<Doctor> {
    const id = this.currentDoctorId++;
    const createdAt = new Date();
    const doctor: Doctor = { ...insertDoctor, id, createdAt };
    this.doctors.set(id, doctor);
    return doctor;
  }

  // Invoice methods
  async getInvoices(): Promise<Invoice[]> {
    return Array.from(this.invoices.values());
  }

  async getInvoice(id: number): Promise<Invoice | undefined> {
    return this.invoices.get(id);
  }

  async getInvoiceByNumber(invoiceNumber: string): Promise<Invoice | undefined> {
    return Array.from(this.invoices.values()).find(
      invoice => invoice.invoiceNumber === invoiceNumber
    );
  }

  async createInvoice(insertInvoice: InsertInvoice): Promise<Invoice> {
    const id = this.currentInvoiceId++;
    const createdAt = new Date();
    const invoice: Invoice = { ...insertInvoice, id, createdAt };
    this.invoices.set(id, invoice);
    return invoice;
  }

  async getCustomerInvoices(customerId: number): Promise<Invoice[]> {
    return Array.from(this.invoices.values()).filter(
      invoice => invoice.customerId === customerId
    );
  }

  // Invoice items methods
  async getInvoiceItems(invoiceId: number): Promise<InvoiceItem[]> {
    return Array.from(this.invoiceItems.values()).filter(
      item => item.invoiceId === invoiceId
    );
  }

  async createInvoiceItem(insertInvoiceItem: InsertInvoiceItem): Promise<InvoiceItem> {
    const id = this.currentInvoiceItemId++;
    const invoiceItem: InvoiceItem = { ...insertInvoiceItem, id };
    this.invoiceItems.set(id, invoiceItem);
    return invoiceItem;
  }

  // Prescription methods
  async getPrescriptions(customerId: number): Promise<Prescription[]> {
    return Array.from(this.prescriptions.values()).filter(
      prescription => prescription.customerId === customerId
    );
  }

  async getPrescription(id: number): Promise<Prescription | undefined> {
    return this.prescriptions.get(id);
  }

  async createPrescription(insertPrescription: InsertPrescription): Promise<Prescription> {
    const id = this.currentPrescriptionId++;
    const createdAt = new Date();
    const prescription: Prescription = { ...insertPrescription, id, createdAt };
    this.prescriptions.set(id, prescription);
    return prescription;
  }

  // Analytics
  async getTopSellingMedicines(limit: number): Promise<any[]> {
    // In memory implementation - create mock data
    // In real implementation this would aggregate data from invoiceItems
    const medicinesList = Array.from(this.medicines.values()).slice(0, limit);
    
    return medicinesList.map((medicine, index) => {
      const soldUnits = 245 - (index * 40); // Mock sales data
      const revenue = Number(medicine.mrp) * soldUnits;
      
      return {
        id: medicine.id,
        name: medicine.name,
        category: this.categories.get(medicine.category_id)?.name || 'Unknown',
        soldUnits,
        revenue
      };
    });
  }

  async getDailySales(days: number): Promise<any[]> {
    // In memory implementation - create mock data
    // In real implementation this would aggregate data from invoices
    const result = [];
    const today = new Date();
    
    for (let i = 0; i < days; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      result.push({
        date: date.toISOString().split('T')[0],
        sales: Math.floor(Math.random() * 10000) + 5000
      });
    }
    
    return result;
  }

  async getUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }
}

// Initialize storage
export const storage = new DatabaseStorage();
