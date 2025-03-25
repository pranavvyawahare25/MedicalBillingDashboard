interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

export const translations: Translations = {
  // English
  en: {
    // Navigation
    dashboard: "Dashboard",
    pos: "Point of Sale",
    inventory: "Inventory",
    patients: "Patients",
    reports: "Reports",
    settings: "Settings",

    // Common Actions
    add: "Add",
    edit: "Edit",
    delete: "Delete",
    save: "Save",
    cancel: "Cancel",
    search: "Search",
    filter: "Filter",
    export: "Export",

    // Dashboard
    dailySales: "Daily Sales",
    totalSales: "Total Sales",
    transactions: "Transactions",
    lowStock: "Low Stock",
    expiryAlert: "Expiry Alert",

    // Inventory
    medicine: "Medicine",
    category: "Category",
    stock: "Stock",
    price: "Price",
    expiry: "Expiry",
    supplier: "Supplier",

    // Patients
    patient: "Patient",
    prescription: "Prescription",
    doctor: "Doctor",
    phone: "Phone",
    email: "Email",
    address: "Address",

    // Settings
    language: "Language",
    theme: "Theme",
    notifications: "Notifications",
    profile: "Profile",
    storeSettings: "Store Settings",
  },

  // Hindi
  hi: {
    // Navigation
    dashboard: "डैशबोर्ड",
    pos: "बिक्री केंद्र",
    inventory: "इन्वेंटरी",
    patients: "मरीज़",
    reports: "रिपोर्ट",
    settings: "सेटिंग्स",

    // Common Actions
    add: "जोड़ें",
    edit: "संपादित करें",
    delete: "हटाएं",
    save: "सहेजें",
    cancel: "रद्द करें",
    search: "खोजें",
    filter: "फ़िल्टर",
    export: "निर्यात",

    // Dashboard
    dailySales: "दैनिक बिक्री",
    totalSales: "कुल बिक्री",
    transactions: "लेन-देन",
    lowStock: "कम स्टॉक",
    expiryAlert: "समाप्ति चेतावनी",

    // Inventory
    medicine: "दवा",
    category: "श्रेणी",
    stock: "स्टॉक",
    price: "मूल्य",
    expiry: "समाप्ति",
    supplier: "आपूर्तिकर्ता",

    // Patients
    patient: "मरीज़",
    prescription: "पर्चा",
    doctor: "डॉक्टर",
    phone: "फ़ोन",
    email: "ईमेल",
    address: "पता",

    // Settings
    language: "भाषा",
    theme: "थीम",
    notifications: "सूचनाएं",
    profile: "प्रोफ़ाइल",
    storeSettings: "स्टोर सेटिंग्स",
  },

  // Add more languages here...
}; 