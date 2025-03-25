interface TranslationStructure {
  common: {
    actions: string;
    edit: string;
    delete: string;
    cancel: string;
    save: string;
    add: string;
    search: string;
    filter: string;
    clear: string;
    close: string;
    view: string;
    share: string;
    upload: string;
  };
  inventory: {
    name: string;
    description: string;
    category: string;
    batch: string;
    expiry: string;
    stock: string;
    mrp: string;
    form: string;
    lowStock: string;
    outOfStock: string;
    inStock: string;
    deleteSuccess: string;
    deleteError: string;
    deleteConfirmTitle: string;
    deleteConfirmDescription: string;
  };
  patient: {
    prescription: {
      title: string;
      date: string;
      doctor: string;
      diagnosis: string;
      medicines: string;
      notes: string;
      empty: string;
      upload: string;
      uploadTitle: string;
      uploadDescription: string;
      selectPatient: string;
      selectDoctor: string;
      addNotes: string;
      viewTitle: string;
      uploadSuccess: string;
      uploadError: string;
      dragAndDrop: string;
      supportedFormats: string;
      currentStock: string;
      newStock: string;
      reason: string;
    };
  };
}

export const translations: Record<string, TranslationStructure> = {
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

    common: {
      actions: "Actions",
      edit: "Edit",
      delete: "Delete",
      cancel: "Cancel",
      save: "Save",
      add: "Add",
      search: "Search",
      filter: "Filter",
      clear: "Clear",
      close: "Close",
      view: "View",
      share: "Share",
      upload: "Upload"
    },

    inventory: {
      name: "Medicine Name",
      description: "Description",
      category: "Category",
      batch: "Batch Number",
      expiry: "Expiry Date",
      stock: "Stock",
      mrp: "MRP (₹)",
      form: "Form",
      lowStock: "Low Stock",
      outOfStock: "Out of Stock",
      inStock: "In Stock",
      deleteSuccess: "Medicine deleted successfully",
      deleteError: "Failed to delete medicine",
      deleteConfirmTitle: "Delete Medicine",
      deleteConfirmDescription: "Are you sure you want to delete {name}? This action cannot be undone."
    },

    patient: {
      prescription: {
        title: "Prescriptions",
        date: "Date",
        doctor: "Doctor",
        diagnosis: "Diagnosis",
        medicines: "Medicines",
        notes: "Notes",
        empty: "No prescriptions found",
        upload: "Upload Prescription",
        uploadTitle: "Upload Prescription",
        uploadDescription: "Upload a prescription image for the patient",
        selectPatient: "Select patient",
        selectDoctor: "Select doctor (Optional)",
        addNotes: "Add any notes about this prescription",
        viewTitle: "Prescription Details",
        uploadSuccess: "Prescription uploaded successfully",
        uploadError: "Failed to upload prescription",
        dragAndDrop: "Drag and drop or click to upload",
        supportedFormats: "Supports: JPG, PNG up to 5MB",
        currentStock: "Current Stock",
        newStock: "New Stock Quantity",
        reason: "Reason (Optional)"
      }
    }
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

    common: {
      actions: "कार्रवाई",
      edit: "संपादित करें",
      delete: "हटाएं",
      cancel: "रद्द करें",
      save: "सहेजें",
      add: "जोड़ें",
      search: "खोजें",
      filter: "फ़िल्टर",
      clear: "साफ़ करें",
      close: "बंद करें",
      view: "देखें",
      share: "साझा करें",
      upload: "अपलोड करें"
    },

    inventory: {
      name: "दवा का नाम",
      description: "विवरण",
      category: "श्रेणी",
      batch: "बैच नंबर",
      expiry: "समाप्ति तिथि",
      stock: "स्टॉक",
      mrp: "एमआरपी (₹)",
      form: "प्रकार",
      lowStock: "कम स्टॉक",
      outOfStock: "स्टॉक ख़त्म",
      inStock: "स्टॉक में",
      deleteSuccess: "दवा सफलतापूर्वक हटा दी गई",
      deleteError: "दवा हटाने में विफल",
      deleteConfirmTitle: "दवा हटाएं",
      deleteConfirmDescription: "क्या आप वाकई {name} को हटाना चाहते हैं? यह क्रिया पूर्ववत नहीं की जा सकती।"
    },

    patient: {
      prescription: {
        title: "नुस्खे",
        date: "तारीख",
        doctor: "डॉक्टर",
        diagnosis: "निदान",
        medicines: "दवाएं",
        notes: "नोट्स",
        empty: "कोई नुस्खा नहीं मिला",
        upload: "नुस्खा अपलोड करें",
        uploadTitle: "नुस्खा अपलोड करें",
        uploadDescription: "मरीज के लिए नुस्खे की छवि अपलोड करें",
        selectPatient: "मरीज चुनें",
        selectDoctor: "डॉक्टर चुनें (वैकल्पिक)",
        addNotes: "इस नुस्खे के बारे में कोई नोट जोड़ें",
        viewTitle: "नुस्खे का विवरण",
        uploadSuccess: "नुस्खा सफलतापूर्वक अपलोड किया गया",
        uploadError: "नुस्खा अपलोड करने में विफल",
        dragAndDrop: "खींचें और छोड़ें या अपलोड करने के लिए क्लिक करें",
        supportedFormats: "समर्थित: JPG, PNG 5MB तक",
        currentStock: "वर्तमान स्टॉक",
        newStock: "नई स्टॉक मात्रा",
        reason: "कारण (वैकल्पिक)"
      }
    }
  },

  // Add more languages here...
}; 