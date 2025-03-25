import 'dotenv/config';
import { db } from './db';
import { users, categories, medicines, customers, doctors, prescriptions } from '@shared/schema';
import { eq } from 'drizzle-orm';

async function seed() {
  try {
    // Check if admin user exists
    const existingAdmin = await db.select().from(users).where(eq(users.username, 'admin'));
    
    if (existingAdmin.length === 0) {
      // Create admin user
      await db.insert(users).values({
        username: 'admin',
        password: 'admin123',
        name: 'Administrator',
        role: 'admin'
      });
    }

    // Check if categories exist
    const existingCategories = await db.select().from(categories);
    
    if (existingCategories.length === 0) {
      // Create test categories
      const categoryNames = [
        'Pain Relief',
        'Antibiotics',
        'Antiallergic',
        'Antidiabetic',
        'Supplements',
        'Cold & Cough'
      ];

      for (const name of categoryNames) {
        await db.insert(categories).values({ name });
      }
    }

    // Check if medicines exist
    const existingMedicines = await db.select().from(medicines);
    
    if (existingMedicines.length === 0) {
      // Create test medicines
      const medicinesData = [
        {
          name: 'Paracetamol 500mg',
          description: 'Tablet (Strip of 10)',
          category_id: 1,
          form: 'tablet',
          batchNumber: 'B2023056',
          expiryDate: new Date('2024-12-31'),
          mrp: '25',
          stock: 235,
          lowStockThreshold: 20,
          gstRate: '18'
        },
        {
          name: 'Azithromycin 500mg',
          description: 'Tablet (Strip of 6)',
          category_id: 2,
          form: 'tablet',
          batchNumber: 'B2023042',
          expiryDate: new Date('2024-10-31'),
          mrp: '90',
          stock: 186,
          lowStockThreshold: 20,
          gstRate: '18'
        },
        {
          name: 'Cetirizine 10mg',
          description: 'Tablet (Strip of 10)',
          category_id: 3,
          form: 'tablet',
          batchNumber: 'B2023089',
          expiryDate: new Date('2024-11-30'),
          mrp: '30',
          stock: 3,
          lowStockThreshold: 10,
          gstRate: '18'
        },
        {
          name: 'Amoxicillin 250mg',
          description: 'Capsule (Strip of 10)',
          category_id: 2,
          form: 'capsule',
          batchNumber: 'B2023016',
          expiryDate: new Date('2024-01-31'),
          mrp: '80',
          stock: 12,
          lowStockThreshold: 15,
          gstRate: '18'
        },
        {
          name: 'Vitamin C 500mg',
          description: 'Tablet (Strip of 10)',
          category_id: 5,
          form: 'tablet',
          batchNumber: 'B2023099',
          expiryDate: new Date('2024-12-31'),
          mrp: '45',
          stock: 150,
          lowStockThreshold: 20,
          gstRate: '18'
        },
        {
          name: 'Cetirizine Syrup',
          description: 'Syrup (100ml)',
          category_id: 3,
          form: 'syrup',
          batchNumber: 'B2023077',
          expiryDate: new Date('2024-08-31'),
          mrp: '65',
          stock: 8,
          lowStockThreshold: 10,
          gstRate: '18'
        }
      ];

      for (const medicine of medicinesData) {
        await db.insert(medicines).values(medicine);
      }
    }

    // Check if customers exist
    const existingCustomers = await db.select().from(customers);
    
    if (existingCustomers.length === 0) {
      // Create test customers
      const customersData = [
        {
          name: 'John Doe',
          phone: '9876543210',
          email: 'john@example.com',
          address: '123 Main St, City'
        },
        {
          name: 'Jane Smith',
          phone: '9876543211',
          email: 'jane@example.com',
          address: '456 Park Ave, City'
        },
        {
          name: 'Mike Johnson',
          phone: '9876543212',
          email: 'mike@example.com',
          address: '789 Oak St, City'
        }
      ];

      for (const customer of customersData) {
        await db.insert(customers).values(customer);
      }
    }

    // Check if doctors exist
    const existingDoctors = await db.select().from(doctors);
    
    if (existingDoctors.length === 0) {
      // Create test doctors
      const doctorsData = [
        {
          name: 'Dr. Sarah Wilson',
          specialization: 'General Physician',
          phone: '9876543213'
        },
        {
          name: 'Dr. Robert Brown',
          specialization: 'Cardiologist',
          phone: '9876543214'
        },
        {
          name: 'Dr. Emily Davis',
          specialization: 'Pediatrician',
          phone: '9876543215'
        }
      ];

      for (const doctor of doctorsData) {
        await db.insert(doctors).values(doctor);
      }
    }

    // Check if prescriptions exist
    const existingPrescriptions = await db.select().from(prescriptions);
    
    if (existingPrescriptions.length === 0) {
      // Create test prescriptions
      const prescriptionsData = [
        {
          customerId: 1,
          doctorId: 1,
          notes: 'Take as prescribed'
        },
        {
          customerId: 2,
          doctorId: 2,
          notes: 'Follow dosage instructions'
        },
        {
          customerId: 3,
          doctorId: 3,
          notes: 'Complete the course'
        }
      ];

      for (const prescription of prescriptionsData) {
        await db.insert(prescriptions).values(prescription);
      }
    }

    console.log('Database seeded successfully with test data!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    process.exit(0);
  }
}

seed(); 