export type LanguageCode = 'en' | 'hi' | 'mr' | 'ta';

export interface TranslationStructure {
  // Navigation and basic UI
  dashboard: string;
  reports: string;
  settings: string;
  pointOfSale: string;
  patients: string;
  appDescription: string;

  // Common Actions
  add: string;
  edit: string;
  delete: string;
  save: string;
  cancel: string;
  search: string;
  filter: string;
  export: string;

  // Dashboard sections
  dailySales: string;
  totalSales: string;
  transactions: string;
  lowStock: string;
  expiryAlert: string;

  // Settings sections
  general: string;
  users: string;
  doctors: string;
  language: string;
  languageDescription: string;
  languageNote: string;
  theme: string;
  themeDescription: string;
  light: string;
  dark: string;
  system: string;

  // Common UI elements
  commonActions: string;
  commonEdit: string;
  commonDelete: string;
  commonCancel: string;
  commonSave: string;
  commonAdd: string;
  commonSearch: string;
  commonFilter: string;
  commonClear: string;
  commonClose: string;
  commonView: string;
  commonShare: string;
  commonUpload: string;
  commonGst: string;

  // Inventory
  inventoryTitle: string;
  inventoryName: string;
  inventoryDescription: string;
  inventoryCategory: string;
  inventoryBatch: string;
  inventoryExpiry: string;
  inventoryStock: string;
  inventoryMrp: string;
  inventoryForm: string;
  inventoryLowStock: string;
  inventoryOutOfStock: string;
  inventoryInStock: string;
  inventoryDeleteSuccess: string;
  inventoryDeleteError: string;
  inventoryDeleteConfirmTitle: string;
  inventoryDeleteConfirmDescription: string;

  // Point of Sale
  posTitle: string;
  posSearchPlaceholder: string;
  posVoiceSearch: string;
  posScanPrescription: string;
  posNoResults: string;
  posAddToCart: string;
  posStockLimit: string;
  posEmptyCart: string;
  posGenerateInvoice: string;
  posInvoiceSuccess: string;
  posInvoiceError: string;
  posCustomerPhone: string;
  posSearchCustomer: string;
  posTotal: string;
  posGst: string;
  posGrandTotal: string;
  posClear: string;
  posCart: string;
  posGenerating: string;

  // Patient
  patientTitle: string;
  prescriptionTitle: string;
  prescriptionDate: string;
  prescriptionDoctor: string;
  prescriptionDiagnosis: string;
  prescriptionMedicines: string;
  prescriptionNotes: string;
  prescriptionEmpty: string;
  prescriptionUpload: string;
  prescriptionUploadTitle: string;
  prescriptionUploadDescription: string;
  prescriptionSelectPatient: string;
  prescriptionSelectDoctor: string;
  prescriptionAddNotes: string;
  prescriptionViewTitle: string;
  prescriptionUploadSuccess: string;
  prescriptionUploadError: string;
  prescriptionDragAndDrop: string;
  prescriptionSupportedFormats: string;
  prescriptionCurrentStock: string;
  prescriptionNewStock: string;
  prescriptionReason: string;

  // User Management
  userManagement: string;
  createNewUser: string;
  updateUserDetails: string;
  fullName: string;
  username: string;
  password: string;
  enterFullName: string;
  enterUsername: string;
  enterPassword: string;
  leaveBlankForCurrentPassword: string;
  role: string;
  selectRole: string;
  adminRole: string;
  pharmacistRole: string;
  accountantRole: string;
  update: string;
  new: string;
  user: string;

  // Doctor Management
  doctorManagement: string;
  addDoctorDescription: string;
  doctorName: string;
  enterDoctorName: string;
  specialization: string;
  optional: string;
  enterSpecialization: string;
  phoneNumber: string;
  enterPhoneNumber: string;

  // Notifications
  notifications: string;
  noNotifications: string;
  switchToLight: string;
  switchToDark: string;

  // Logout
  logoutSuccess: string;
  logoutDescription: string;
  logoutError: string;
  logoutErrorDescription: string;

  // Page Titles
  dashboardTitle: string;
  reportsAndAnalytics: string;
  salesReports: string;
  gstReports: string;
  inventoryReports: string;

  // Dashboard
  transactionsToday: string;
  requiresRestock: string;
  expiringWithinDays: string;

  // Reports
  salesOverview: string;
  salesPeriod: string;
  selectPeriod: string;
  last7Days: string;
  last30Days: string;
  last90Days: string;
  vsPreviousPeriod: string;
  averageOrderValue: string;
  salesTrendForSelectedPeriod: string;
  salesByCategory: string;
  distributionOfSalesByCategory: string;
  topSellingProducts: string;
  productsWithTheHighestSalesInTheSelectedPeriod: string;
  gstr1ReportsForTaxFiling: string;
  taxableAmount: string;
  totalTax: string;
  monthlyGstSummary: string;
  gstDetailsForThePast3Months: string;
  generateGstr1Report: string;
  generateGstr3bReport: string;
  stockMovementAndValuationReports: string;
  totalProducts: string;
  lowStockItems: string;
  outOfStock: string;
  expiringSoon: string;
  stockValuation: string;
  currentInventoryValueByCategory: string;
  totalInventoryValue: string;
  stockMovement: string;
  inventoryTransactionsInTheLast30Days: string;
  stockAdjustmentReport: string;
  expiryReport: string;

  // Patient Management
  addPatient: string;
  searchPatients: string;
  patientDetails: string;
  selectPatientToView: string;
  uploadPrescription: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  addedOn: string;
  actions: string;
  details: string;

  // Inventory Management
  addNewMedicine: string;
  addCategory: string;
  addNewCategory: string;
  categoryName: string;
  enterCategoryName: string;
}

export const translations: Record<LanguageCode, TranslationStructure> = {
  en: {
    // Navigation and basic UI
    dashboard: "Dashboard",
    reports: "Reports",
    settings: "Settings",
    pointOfSale: "Point of Sale",
    patients: "Patients",
    appDescription: "Medical Billing System",

    // Common Actions
    add: "Add",
    edit: "Edit",
    delete: "Delete",
    save: "Save",
    cancel: "Cancel",
    search: "Search",
    filter: "Filter",
    export: "Export",

    // Dashboard sections
    dailySales: "Daily Sales",
    totalSales: "Total Sales",
    transactions: "Transactions",
    lowStock: "Low Stock",
    expiryAlert: "Expiry Alert",

    // Settings sections
    general: "General",
    users: "Users",
    doctors: "Doctors",
    language: "Language Settings",
    languageDescription: "Choose your preferred language for the interface",
    languageNote: "Note: Changing the language will affect the entire application interface",
    theme: "Theme Settings",
    themeDescription: "Customize the appearance of the application",
    light: "Light",
    dark: "Dark",
    system: "System",

    // Common UI elements
    commonActions: "Actions",
    commonEdit: "Edit",
    commonDelete: "Delete",
    commonCancel: "Cancel",
    commonSave: "Save",
    commonAdd: "Add",
    commonSearch: "Search",
    commonFilter: "Filter",
    commonClear: "Clear",
    commonClose: "Close",
    commonView: "View",
    commonShare: "Share",
    commonUpload: "Upload",
    commonGst: "GST",

    // Inventory
    inventoryTitle: "Inventory",
    inventoryName: "Name",
    inventoryDescription: "Description",
    inventoryCategory: "Category",
    inventoryBatch: "Batch",
    inventoryExpiry: "Expiry",
    inventoryStock: "Stock",
    inventoryMrp: "MRP",
    inventoryForm: "Form",
    inventoryLowStock: "Low Stock",
    inventoryOutOfStock: "Out of Stock",
    inventoryInStock: "In Stock",
    inventoryDeleteSuccess: "Item deleted successfully",
    inventoryDeleteError: "Error deleting item",
    inventoryDeleteConfirmTitle: "Delete Item",
    inventoryDeleteConfirmDescription: "Are you sure you want to delete this item?",

    // Point of Sale
    posTitle: "Point of Sale",
    posSearchPlaceholder: "Search medicines...",
    posVoiceSearch: "Voice Search",
    posScanPrescription: "Scan Prescription",
    posNoResults: "No results found",
    posAddToCart: "Add to Cart",
    posStockLimit: "Stock limit reached",
    posEmptyCart: "Cart is empty",
    posGenerateInvoice: "Generate Invoice",
    posInvoiceSuccess: "Invoice generated successfully",
    posInvoiceError: "Error generating invoice",
    posCustomerPhone: "Customer Phone",
    posSearchCustomer: "Search customer",
    posTotal: "Total",
    posGst: "GST",
    posGrandTotal: "Grand Total",
    posClear: "Clear",
    posCart: "Cart",
    posGenerating: "Generating...",

    // Patient
    patientTitle: "Patient",
    prescriptionTitle: "Prescription",
    prescriptionDate: "Date",
    prescriptionDoctor: "Doctor",
    prescriptionDiagnosis: "Diagnosis",
    prescriptionMedicines: "Medicines",
    prescriptionNotes: "Notes",
    prescriptionEmpty: "No prescriptions found",
    prescriptionUpload: "Upload",
    prescriptionUploadTitle: "Upload Prescription",
    prescriptionUploadDescription: "Upload a prescription file",
    prescriptionSelectPatient: "Select Patient",
    prescriptionSelectDoctor: "Select Doctor",
    prescriptionAddNotes: "Add Notes",
    prescriptionViewTitle: "View Prescription",
    prescriptionUploadSuccess: "Prescription uploaded successfully",
    prescriptionUploadError: "Error uploading prescription",
    prescriptionDragAndDrop: "Drag and drop files here",
    prescriptionSupportedFormats: "Supported formats: PDF, JPG, PNG",
    prescriptionCurrentStock: "Current Stock",
    prescriptionNewStock: "New Stock",
    prescriptionReason: "Reason",

    // User Management
    userManagement: "User Management",
    createNewUser: "Create New User",
    updateUserDetails: "Update User Details",
    fullName: "Full Name",
    username: "Username",
    password: "Password",
    enterFullName: "Enter full name",
    enterUsername: "Enter username",
    enterPassword: "Enter password",
    leaveBlankForCurrentPassword: "Leave blank to keep current password",
    role: "Role",
    selectRole: "Select role",
    adminRole: "Admin",
    pharmacistRole: "Pharmacist",
    accountantRole: "Accountant",
    update: "Update",
    new: "New",
    user: "User",

    // Doctor Management
    doctorManagement: "Doctor Management",
    addDoctorDescription: "Add or update doctor details",
    doctorName: "Doctor Name",
    enterDoctorName: "Enter doctor name",
    specialization: "Specialization",
    optional: "Optional",
    enterSpecialization: "Enter specialization",
    phoneNumber: "Phone Number",
    enterPhoneNumber: "Enter phone number",

    // Notifications
    notifications: "Notifications",
    noNotifications: "No notifications",
    switchToLight: "Switch to light mode",
    switchToDark: "Switch to dark mode",

    // Logout
    logoutSuccess: "Logged out successfully",
    logoutDescription: "You have been logged out of your account",
    logoutError: "Logout failed",
    logoutErrorDescription: "An error occurred while logging out",

    // Page Titles
    dashboardTitle: "Medical Billing Dashboard",
    reportsAndAnalytics: "Reports & Analytics",
    salesReports: "Sales Reports",
    gstReports: "GST Reports",
    inventoryReports: "Inventory Reports",

    // Dashboard
    transactionsToday: "transactions today",
    requiresRestock: "Requiring immediate restock",
    expiringWithinDays: "Expiring within 30 days",

    // Reports
    salesOverview: "Sales Overview",
    salesPeriod: "Sales Period",
    selectPeriod: "Select period",
    last7Days: "Last 7 days",
    last30Days: "Last 30 days",
    last90Days: "Last 90 days",
    vsPreviousPeriod: "vs previous period",
    averageOrderValue: "Average Order Value",
    salesTrendForSelectedPeriod: "Sales trend for the selected period",
    salesByCategory: "Sales by Category",
    distributionOfSalesByCategory: "Distribution of sales by category",
    topSellingProducts: "Top Selling Products",
    productsWithTheHighestSalesInTheSelectedPeriod: "Products with the highest sales in the selected period",
    gstr1ReportsForTaxFiling: "GSTR-1 Reports for tax filing",
    taxableAmount: "Taxable Amount",
    totalTax: "Total Tax",
    monthlyGstSummary: "Monthly GST Summary",
    gstDetailsForThePast3Months: "GST details for the past 3 months",
    generateGstr1Report: "Generate GSTR-1 Report",
    generateGstr3bReport: "Generate GSTR-3B Report",
    stockMovementAndValuationReports: "Stock movement and valuation reports",
    totalProducts: "Total Products",
    lowStockItems: "Low Stock Items",
    outOfStock: "Out of Stock",
    expiringSoon: "Expiring Soon",
    stockValuation: "Stock Valuation",
    currentInventoryValueByCategory: "Current inventory value by category",
    totalInventoryValue: "Total Inventory Value",
    stockMovement: "Stock Movement",
    inventoryTransactionsInTheLast30Days: "Inventory transactions in the last 30 days",
    stockAdjustmentReport: "Stock Adjustment Report",
    expiryReport: "Expiry Report",

    // Patient Management
    addPatient: "Add Patient",
    searchPatients: "Search patients...",
    patientDetails: "Patient Details",
    selectPatientToView: "Select a patient to view details",
    uploadPrescription: "Upload Prescription",
    name: "Name",
    phone: "Phone",
    email: "Email",
    address: "Address",
    addedOn: "Added On",
    actions: "Actions",
    details: "Details",

    // Inventory Management
    addNewMedicine: "Add New Medicine",
    addCategory: "Add Category",
    addNewCategory: "Add New Category",
    categoryName: "Category Name",
    enterCategoryName: "Enter category name",
  },
  hi: {
    // Navigation and basic UI
    dashboard: "डैशबोर्ड",
    reports: "रिपोर्ट",
    settings: "सेटिंग्स",
    pointOfSale: "बिक्री केंद्र",
    patients: "मरीज़",
    appDescription: "मेडिकल बिलिंग सिस्टम",

    // Common Actions
    add: "जोड़ें",
    edit: "संपादित करें",
    delete: "हटाएं",
    save: "सहेजें",
    cancel: "रद्द करें",
    search: "खोजें",
    filter: "फ़िल्टर",
    export: "निर्यात",

    // Dashboard sections
    dailySales: "दैनिक बिक्री",
    totalSales: "कुल बिक्री",
    transactions: "लेन-देन",
    lowStock: "कम स्टॉक",
    expiryAlert: "समाप्ति चेतावनी",

    // Settings sections
    general: "सामान्य",
    users: "उपयोगकर्ता",
    doctors: "डॉक्टर",
    language: "भाषा सेटिंग्स",
    languageDescription: "इंटरफ़ेस के लिए अपनी पसंदीदा भाषा चुनें",
    languageNote: "नोट: भाषा बदलने से पूरे एप्लिकेशन का इंटरफ़ेस प्रभावित होगा",
    theme: "थीम सेटिंग्स",
    themeDescription: "एप्लिकेशन की दिखावट को अनुकूलित करें",
    light: "लाइट",
    dark: "डार्क",
    system: "सिस्टम",

    // Common UI elements
    commonActions: "कार्रवाई",
    commonEdit: "संपादित करें",
    commonDelete: "हटाएं",
    commonCancel: "रद्द करें",
    commonSave: "सहेजें",
    commonAdd: "जोड़ें",
    commonSearch: "खोजें",
    commonFilter: "फ़िल्टर",
    commonClear: "साफ़ करें",
    commonClose: "बंद करें",
    commonView: "देखें",
    commonShare: "साझा करें",
    commonUpload: "अपलोड",
    commonGst: "जीएसटी",

    // Inventory
    inventoryTitle: "इन्वेंटरी",
    inventoryName: "दवा का नाम",
    inventoryDescription: "विवरण",
    inventoryCategory: "श्रेणी",
    inventoryBatch: "बैच",
    inventoryExpiry: "समाप्ति",
    inventoryStock: "स्टॉक",
    inventoryMrp: "एमआरपी",
    inventoryForm: "फॉर्म",
    inventoryLowStock: "कम स्टॉक",
    inventoryOutOfStock: "स्टॉक ख़त्म",
    inventoryInStock: "स्टॉक में",
    inventoryDeleteSuccess: "दवा सफलतापूर्वक हटा दी गई",
    inventoryDeleteError: "दवा हटाने में त्रुटि",
    inventoryDeleteConfirmTitle: "दवा हटाएं",
    inventoryDeleteConfirmDescription: "क्या आप वाकई इस दवा को हटाना चाहते हैं?",

    // Point of Sale
    posTitle: "बिक्री केंद्र",
    posSearchPlaceholder: "दवाएं खोजें...",
    posVoiceSearch: "आवाज से खोजें",
    posScanPrescription: "नुस्खा स्कैन करें",
    posNoResults: "कोई दवा नहीं मिली",
    posAddToCart: "कार्ट में जोड़ें",
    posStockLimit: "स्टॉक सीमा पहुंच गई",
    posEmptyCart: "कार्ट खाली है",
    posGenerateInvoice: "चालान बनाएं",
    posInvoiceSuccess: "चालान सफलतापूर्वक बना",
    posInvoiceError: "चालान बनाने में त्रुटि",
    posCustomerPhone: "ग्राहक फोन",
    posSearchCustomer: "ग्राहक खोजें",
    posTotal: "कुल",
    posGst: "जीएसटी",
    posGrandTotal: "कुल योग",
    posClear: "साफ़ करें",
    posCart: "कार्ट",
    posGenerating: "बना रहा है...",

    // Patient
    patientTitle: "मरीज़",
    prescriptionTitle: "नुस्खे",
    prescriptionDate: "दिनांक",
    prescriptionDoctor: "डॉक्टर",
    prescriptionDiagnosis: "निदान",
    prescriptionMedicines: "दवाएं",
    prescriptionNotes: "नोट्स",
    prescriptionEmpty: "कोई नुस्खा नहीं मिला",
    prescriptionUpload: "नुस्खा अपलोड करें",
    prescriptionUploadTitle: "नया नुस्खा अपलोड करें",
    prescriptionUploadDescription: "नुस्खे की छवि या पीडीएफ अपलोड करें",
    prescriptionSelectPatient: "मरीज़ चुनें",
    prescriptionSelectDoctor: "डॉक्टर चुनें",
    prescriptionAddNotes: "नोट जोड़ें",
    prescriptionViewTitle: "नुस्खा देखें",
    prescriptionUploadSuccess: "नुस्खा सफलतापूर्वक अपलोड किया गया",
    prescriptionUploadError: "नुस्खा अपलोड करने में त्रुटि",
    prescriptionDragAndDrop: "फ़ाइलें यहाँ खींचें और छोड़ें",
    prescriptionSupportedFormats: "समर्थित प्रारूप: JPG, PNG, PDF",
    prescriptionCurrentStock: "वर्तमान स्टॉक",
    prescriptionNewStock: "नया स्टॉक",
    prescriptionReason: "कारण",

    // User Management
    userManagement: "उपयोगकर्ता प्रबंधन",
    createNewUser: "नया उपयोगकर्ता बनाएं",
    updateUserDetails: "उपयोगकर्ता विवरण अपडेट करें",
    fullName: "पूरा नाम",
    username: "उपयोगकर्ता नाम",
    password: "पासवर्ड",
    enterFullName: "पूरा नाम दर्ज करें",
    enterUsername: "उपयोगकर्ता नाम दर्ज करें",
    enterPassword: "पासवर्ड दर्ज करें",
    leaveBlankForCurrentPassword: "वर्तमान पासवर्ड रखने के लिए खाली छोड़ें",
    role: "भूमिका",
    selectRole: "भूमिका चुनें",
    adminRole: "व्यवस्थापक",
    pharmacistRole: "फार्मासिस्ट",
    accountantRole: "लेखाकार",
    update: "अपडेट",
    new: "नया",
    user: "उपयोगकर्ता",

    // Doctor Management
    doctorManagement: "डॉक्टर प्रबंधन",
    addDoctorDescription: "डॉक्टर विवरण जोड़ें या अपडेट करें",
    doctorName: "डॉक्टर का नाम",
    enterDoctorName: "डॉक्टर का नाम दर्ज करें",
    specialization: "विशेषज्ञता",
    optional: "वैकल्पिक",
    enterSpecialization: "विशेषज्ञता दर्ज करें",
    phoneNumber: "फोन नंबर",
    enterPhoneNumber: "फोन नंबर दर्ज करें",

    // Notifications
    notifications: "सूचनाएं",
    noNotifications: "कोई सूचना नहीं",
    switchToLight: "लाइट मोड में स्विच करें",
    switchToDark: "डार्क मोड में स्विच करें",

    // Logout
    logoutSuccess: "सफलतापूर्वक लॉग आउट हो गया",
    logoutDescription: "आप अपने खाते से लॉग आउट हो गए हैं",
    logoutError: "लॉग आउट विफल",
    logoutErrorDescription: "लॉग आउट करते समय एक त्रुटि हुई",

    // Page Titles
    dashboardTitle: "मेडिकल बिलिंग डैशबोर्ड",
    reportsAndAnalytics: "रिपोर्ट और विश्लेषण",
    salesReports: "विक्री रिपोर्ट",
    gstReports: "जीएसटी रिपोर्ट",
    inventoryReports: "इन्वेंटरी रिपोर्ट",

    // Dashboard
    transactionsToday: "आजचे व्यवहार",
    requiresRestock: "तात्काळ रीस्टॉक आवश्यक",
    expiringWithinDays: "30 दिवसांत कालबाह्य होणार",

    // Reports
    salesOverview: "विक्री आढावा",
    salesPeriod: "विक्री कालावधी",
    selectPeriod: "कालावधी निवडा",
    last7Days: "मागील 7 दिवस",
    last30Days: "मागील 30 दिवस",
    last90Days: "मागील 90 दिवस",
    vsPreviousPeriod: "मागील कालावधीच्या तुलनेत",
    averageOrderValue: "सरासरी ऑर्डर मूल्य",
    salesTrendForSelectedPeriod: "निवडलेल्या कालावधीसाठी विक्री ट्रेंड",
    salesByCategory: "श्रेणीनुसार विक्री",
    distributionOfSalesByCategory: "श्रेणीनुसार विक्रीचे वितरण",
    topSellingProducts: "सर्वाधिक विकल्या जाणाऱ्या वस्तू",
    productsWithTheHighestSalesInTheSelectedPeriod: "निवडलेल्या कालावधीत सर्वाधिक विक्री झालेल्या वस्तू",
    gstr1ReportsForTaxFiling: "कर भरण्यासाठी GSTR-1 अहवाल",
    taxableAmount: "कर योग्य रक्कम",
    totalTax: "एकूण कर",
    monthlyGstSummary: "मासिक जीएसटी सारांश",
    gstDetailsForThePast3Months: "मागील 3 महिन्यांचे जीएसटी तपशील",
    generateGstr1Report: "GSTR-1 अहवाल तयार करा",
    generateGstr3bReport: "GSTR-3B अहवाल तयार करा",
    stockMovementAndValuationReports: "साठा हालचाल आणि मूल्यांकन अहवाल",
    totalProducts: "एकूण वस्तू",
    lowStockItems: "कमी साठा असलेल्या वस्तू",
    outOfStock: "साठा संपलेला",
    expiringSoon: "लवकरच कालबाह्य होणार",
    stockValuation: "साठा मूल्यांकन",
    currentInventoryValueByCategory: "श्रेणीनुसार सध्याचे इन्व्हेंटरी मूल्य",
    totalInventoryValue: "एकूण इन्व्हेंटरी मूल्य",
    stockMovement: "साठा हालचाल",
    inventoryTransactionsInTheLast30Days: "मागील 30 दिवसांतील इन्व्हेंटरी व्यवहार",
    stockAdjustmentReport: "साठा समायोजन अहवाल",
    expiryReport: "कालबाह्यता अहवाल",

    // Patient Management
    addPatient: "मरीज़ जोड़ें",
    searchPatients: "मरीज़ खोजें...",
    patientDetails: "मरीज़ का विवरण",
    selectPatientToView: "तपशील पाहण्यासाठी मरीज़ चुनें",
    uploadPrescription: "नुस्खा अपलोड करें",
    name: "नाम",
    phone: "फोन",
    email: "ईमेल",
    address: "पता",
    addedOn: "जोडले",
    actions: "कृती",
    details: "तपशील",

    // Inventory Management
    addNewMedicine: "नई दवा जोड़ें",
    addCategory: "श्रेणी जोड़ें",
    addNewCategory: "नई श्रेणी जोड़ें",
    categoryName: "श्रेणीचे नाम",
    enterCategoryName: "श्रेणीचे नाम प्रविष्ट करें",
  },
  mr: {
    // Navigation and basic UI
    dashboard: "डॅशबोर्ड",
    reports: "अहवाल",
    settings: "सेटिंग्ज",
    pointOfSale: "विक्री केंद्र",
    patients: "रुग्ण",
    appDescription: "मेडिकल बिलिंग सिस्टम",

    // Common Actions
    add: "जोडा",
    edit: "संपादित करा",
    delete: "हटवा",
    save: "जतन करा",
    cancel: "रद्द करा",
    search: "शोधा",
    filter: "फिल्टर",
    export: "निर्यात",

    // Dashboard sections
    dailySales: "दैनिक विक्री",
    totalSales: "एकूण विक्री",
    transactions: "व्यवहार",
    lowStock: "कमी स्टॉक",
    expiryAlert: "कालबाह्यता सूचना",

    // Settings sections
    general: "सामान्य",
    users: "वापरकर्ते",
    doctors: "डॉक्टर्स",
    language: "भाषा सेटिंग्ज",
    languageDescription: "इंटरफेसची पसंतीची भाषा निवडा",
    languageNote: "टीप: भाषा बदलल्याने संपूर्ण अॅप्लिकेशन इंटरफेस बदलेल",
    theme: "थीम सेटिंग्ज",
    themeDescription: "अॅप्लिकेशनचे स्वरूप सानुकूल करा",
    light: "प्रकाश",
    dark: "गडद",
    system: "सिस्टम",

    // Common UI elements
    commonActions: "कृती",
    commonEdit: "संपादित करा",
    commonDelete: "हटवा",
    commonCancel: "रद्द करा",
    commonSave: "जतन करा",
    commonAdd: "जोडा",
    commonSearch: "शोधा",
    commonFilter: "फिल्टर",
    commonClear: "काढून टाका",
    commonClose: "बंद करें",
    commonView: "पहा",
    commonShare: "शेअर",
    commonUpload: "अपलोड",
    commonGst: "जीएसटी",

    // Inventory
    inventoryTitle: "इन्व्हेंटरी",
    inventoryName: "औषधाचे नाव",
    inventoryDescription: "वर्णन",
    inventoryCategory: "श्रेणी",
    inventoryBatch: "बॅच",
    inventoryExpiry: "कालबाह्यता",
    inventoryStock: "साठा",
    inventoryMrp: "एमआरपी",
    inventoryForm: "फॉर्म",
    inventoryLowStock: "कमी स्टॉक",
    inventoryOutOfStock: "साठा संपला",
    inventoryInStock: "साठ्यात",
    inventoryDeleteSuccess: "औषध यशस्वीरित्या हटवले",
    inventoryDeleteError: "औषध हटवण्यात त्रुटी",
    inventoryDeleteConfirmTitle: "औषध हटवा",
    inventoryDeleteConfirmDescription: "तुम्हाला खात्री आहे की तुम्ही हे औषध हटवू इच्छिता?",

    // Point of Sale
    posTitle: "विक्री केंद्र",
    posSearchPlaceholder: "औषधे शोधा...",
    posVoiceSearch: "ध्वनि शोध",
    posScanPrescription: "प्रिस्क्रिप्षन स्कैन",
    posNoResults: "कोणतीही औषधे सापडली नाहीत",
    posAddToCart: "कार्टमध्ये जोडा",
    posStockLimit: "साठा मर्यादा गाठली",
    posEmptyCart: "कार्ट रिकामा आहे",
    posGenerateInvoice: "बिल तयार करा",
    posInvoiceSuccess: "बिल यशस्वीरित्या तयार केले",
    posInvoiceError: "बिल तयार करण्यात त्रुटी",
    posCustomerPhone: "ग्राहक फोन",
    posSearchCustomer: "ग्राहक शोधा",
    posTotal: "एकूण",
    posGst: "जीएसटी",
    posGrandTotal: "एकूण रक्कम",
    posClear: "काढून टाका",
    posCart: "कार्ट",
    posGenerating: "तयार करत आहे...",

    // Patient
    patientTitle: "रुग्ण",
    prescriptionTitle: "प्रिस्क्रिप्षन",
    prescriptionDate: "दिनांक",
    prescriptionDoctor: "डॉक्टर",
    prescriptionDiagnosis: "निदान",
    prescriptionMedicines: "औषधे",
    prescriptionNotes: "नोट्स",
    prescriptionEmpty: "प्रिस्क्रिप्षन नाही",
    prescriptionUpload: "अपलोड",
    prescriptionUploadTitle: "प्रिस्क्रिप्षन अपलोड",
    prescriptionUploadDescription: "प्रिस्क्रिप्षन चित्र अपलोड करें",
    prescriptionSelectPatient: "रुग्ण निवडा",
    prescriptionSelectDoctor: "डॉक्टर निवडा",
    prescriptionAddNotes: "नोट जोडा",
    prescriptionViewTitle: "प्रिस्क्रिप्षन पहा",
    prescriptionUploadSuccess: "प्रिस्क्रिप्षन यशस्वीरित्या अपलोड केले",
    prescriptionUploadError: "प्रिस्क्रिप्षन अपलोड करण्यात त्रुटी",
    prescriptionDragAndDrop: "फाइल इथे ड्रॅग करा",
    prescriptionSupportedFormats: "समर्थित फॉरमॅट: JPG, PNG, PDF",
    prescriptionCurrentStock: "वर्तमान साठा",
    prescriptionNewStock: "नवीन साठा",
    prescriptionReason: "कारण",

    // User Management
    userManagement: "वापरकर्ता व्यवस्थापन",
    createNewUser: "नवीन वापरकर्ता तयार करा",
    updateUserDetails: "वापरकर्ता तपशील अद्यतनित करें",
    fullName: "पूर्ण नाव",
    username: "वापरकर्तानाव",
    password: "पासवर्ड",
    enterFullName: "पूर्ण नाव प्रविष्ट करें",
    enterUsername: "वापरकर्तानाव प्रविष्ट करें",
    enterPassword: "पासवर्ड प्रविष्ट करें",
    leaveBlankForCurrentPassword: "सध्याचा पासवर्ड ठेवण्यासाठी रिक्त सोडा",
    role: "भूमिका",
    selectRole: "भूमिका निवडा",
    adminRole: "प्रशासक",
    pharmacistRole: "फार्मासिस्ट",
    accountantRole: "लेखापाल",
    update: "अद्यतनित करा",
    new: "नवीन",
    user: "वापरकर्ता",

    // Doctor Management
    doctorManagement: "डॉक्टर व्यवस्थापन",
    addDoctorDescription: "डॉक्टर तपशील जोडा किंवा अद्यतनित करा",
    doctorName: "डॉक्टरचे नाव",
    enterDoctorName: "डॉक्टरचे नाव प्रविष्ट करें",
    specialization: "विशेषज्ञता",
    optional: "ऐच्छिक",
    enterSpecialization: "विशेषज्ञता प्रविष्ट करें",
    phoneNumber: "फोन नंबर",
    enterPhoneNumber: "फोन नंबर प्रविष्ट करें",

    // Notifications
    notifications: "सूचना",
    noNotifications: "कोणतीही सूचना नाही",
    switchToLight: "लाइट मोडवर स्विच करें",
    switchToDark: "डार्क मोडवर स्विच करें",

    // Logout
    logoutSuccess: "यशस्वीरित्या लॉग आउट झाले",
    logoutDescription: "तुम्ही तुमच्या खाते से लॉग आउट झाला आहात",
    logoutError: "लॉग आउट अयशस्वी",
    logoutErrorDescription: "लॉग आउट करताना त्रुटी आली",

    // Page Titles
    dashboardTitle: "मेडिकल बिलिंग डॅशबोर्ड",
    reportsAndAnalytics: "अहवाल आणि विश्लेषण",
    salesReports: "विक्री अहवाल",
    gstReports: "जीएसटी अहवाल",
    inventoryReports: "इन्व्हेंटरी अहवाल",

    // Dashboard
    transactionsToday: "आजचे व्यवहार",
    requiresRestock: "तात्काळ रीस्टॉक आवश्यक",
    expiringWithinDays: "30 दिवसांत कालबाह्य होणार",

    // Reports
    salesOverview: "विक्री आढावा",
    salesPeriod: "विक्री कालावधी",
    selectPeriod: "कालावधी निवडा",
    last7Days: "मागील 7 दिवस",
    last30Days: "मागील 30 दिवस",
    last90Days: "मागील 90 दिवस",
    vsPreviousPeriod: "मागील कालावधीच्या तुलनेत",
    averageOrderValue: "सरासरी ऑर्डर मूल्य",
    salesTrendForSelectedPeriod: "निवडलेल्या कालावधीसाठी विक्री ट्रेंड",
    salesByCategory: "श्रेणीनुसार विक्री",
    distributionOfSalesByCategory: "श्रेणीनुसार विक्रीचे वितरण",
    topSellingProducts: "सर्वाधिक विकल्या जाणाऱ्या वस्तू",
    productsWithTheHighestSalesInTheSelectedPeriod: "निवडलेल्या कालावधीत सर्वाधिक विक्री झालेल्या वस्तू",
    gstr1ReportsForTaxFiling: "कर भरण्यासाठी GSTR-1 अहवाल",
    taxableAmount: "कर योग्य रक्कम",
    totalTax: "एकूण कर",
    monthlyGstSummary: "मासिक जीएसटी सारांश",
    gstDetailsForThePast3Months: "मागील 3 महिन्यांचे जीएसटी तपशील",
    generateGstr1Report: "GSTR-1 अहवाल तयार करा",
    generateGstr3bReport: "GSTR-3B अहवाल तयार करा",
    stockMovementAndValuationReports: "साठा हालचाल आणि मूल्यांकन अहवाल",
    totalProducts: "एकूण वस्तू",
    lowStockItems: "कमी साठा असलेल्या वस्तू",
    outOfStock: "साठा संपलेला",
    expiringSoon: "लवकरच कालबाह्य होणार",
    stockValuation: "साठा मूल्यांकन",
    currentInventoryValueByCategory: "श्रेणीनुसार सध्याचे इन्व्हेंटरी मूल्य",
    totalInventoryValue: "एकूण इन्व्हेंटरी मूल्य",
    stockMovement: "साठा हालचाल",
    inventoryTransactionsInTheLast30Days: "मागील 30 दिवसांतील इन्व्हेंटरी व्यवहार",
    stockAdjustmentReport: "साठा समायोजन अहवाल",
    expiryReport: "कालबाह्यता अहवाल",

    // Patient Management
    addPatient: "रुग्ण जोडा",
    searchPatients: "रुग्ण शोधा...",
    patientDetails: "रुग्णाचा तपशील",
    selectPatientToView: "तपशील पाहण्यासाठी रुग्ण निवडा",
    uploadPrescription: "प्रिस्क्रिप्शन अपलोड करा",
    name: "नाव",
    phone: "फोन",
    email: "ईमेल",
    address: "पत्ता",
    addedOn: "जोडले",
    actions: "कृती",
    details: "तपशील",

    // Inventory Management
    addNewMedicine: "नवीन औषध जोडा",
    addCategory: "श्रेणी जोडा",
    addNewCategory: "नवीन श्रेणी जोडा",
    categoryName: "श्रेणीचे नाव",
    enterCategoryName: "श्रेणीचे नाव प्रविष्ट करें",
  },
  ta: {
    // Navigation and basic UI
    dashboard: "டாஷ்போர்டு",
    reports: "அறிக்கைகள்",
    settings: "அமைப்புகள்",
    pointOfSale: "விற்பனை மையம்",
    patients: "நோயாளிகள்",
    appDescription: "மருத்துவ பில்லிங் சிஸ்டம்",

    // Common Actions
    add: "சேர்க்க",
    edit: "திருத்த",
    delete: "நீக்க",
    save: "சேமி",
    cancel: "ரத்து",
    search: "தேடு",
    filter: "வடிகட்டு",
    export: "ஏற்றுமதி",

    // Dashboard sections
    dailySales: "தினசரி விற்பனை",
    totalSales: "மொத்த விற்பனை",
    transactions: "பரிவர்த்தனைகள்",
    lowStock: "குறைந்த பங்கு",
    expiryAlert: "காலாவதி எச்சரிக்கை",

    // Settings sections
    general: "பொது",
    users: "பயனர்கள்",
    doctors: "மருத்துவர்கள்",
    language: "மொழி அமைப்புகள்",
    languageDescription: "உங்கள் விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும்",
    languageNote: "குறிப்பு: மொழியை மாற்றுவது முழு பயன்பாட்டு இடைமுகத்தையும் பாதிக்கும்",
    theme: "தீம் அமைப்புகள்",
    themeDescription: "பயன்பாட்டின் தோற்றத்தை தனிப்பயனாக்கவும்",
    light: "ஒளி",
    dark: "இருள்",
    system: "சிஸ்டம்",

    // Common UI elements
    commonActions: "செயல்கள்",
    commonEdit: "திருத்த",
    commonDelete: "நீக்க",
    commonCancel: "ரத்து",
    commonSave: "சேமி",
    commonAdd: "சேர்க்க",
    commonSearch: "தேடு",
    commonFilter: "வடிகட்டு",
    commonClear: "நீக்க",
    commonClose: "மூடு",
    commonView: "காண்க",
    commonShare: "பகிர்",
    commonUpload: "பதிவேற்றம்",
    commonGst: "GST",

    // Inventory
    inventoryTitle: "சரக்கு",
    inventoryName: "மருந்து பெயர்",
    inventoryDescription: "விவரணை",
    inventoryCategory: "வகை",
    inventoryBatch: "கட்டு",
    inventoryExpiry: "காலாவதி",
    inventoryStock: "கையிருப்பு",
    inventoryMrp: "எம்ஆர்பி",
    inventoryForm: "வடிவம்",
    inventoryLowStock: "குறைந்த கையிருப்பு",
    inventoryOutOfStock: "கையிருப்பு இல்லை",
    inventoryInStock: "கையிருப்பில் உள்ளது",
    inventoryDeleteSuccess: "மருந்து வெற்றிகரமாக நீக்கப்பட்டது",
    inventoryDeleteError: "மருந்து நீக்குவதில் பிழை",
    inventoryDeleteConfirmTitle: "மருந்து நீக்க",
    inventoryDeleteConfirmDescription: "இந்த மருந்தை நீக்க விரும்புகிறீர்களா?",

    // Point of Sale
    posTitle: "விற்பனை மையம்",
    posSearchPlaceholder: "மருந்துகளைத் தேடுங்கள்...",
    posVoiceSearch: "குரல் தேடல்",
    posScanPrescription: "மருந்துச் சீட்டை ஸ்கேன்",
    posNoResults: "மருந்துகள் எதுவும் கிடைக்கவில்லை",
    posAddToCart: "கார்ட்டில் சேர்க்க",
    posStockLimit: "கையிருப்பு வரம்பை எட்டியது",
    posEmptyCart: "கார்ட் காலியாக உள்ளது",
    posGenerateInvoice: "விலைப்பட்டியல் உருவாக்க",
    posInvoiceSuccess: "விலைப்பட்டியல் வெற்றிகரமாக உருவாக்கப்பட்டது",
    posInvoiceError: "விலைப்பட்டியல் உருவாக்குவதில் பிழை",
    posCustomerPhone: "வாடிக்கையாளர் தொலைபேசி",
    posSearchCustomer: "வாடிக்கையாளரைத் தேடு",
    posTotal: "மொத்தம்",
    posGst: "GST",
    posGrandTotal: "மொத்தத் தொகை",
    posClear: "நீக்க",
    posCart: "கார்ட்",
    posGenerating: "உருவாக்குகிறது",

    // Patient
    patientTitle: "நோயாளி",
    prescriptionTitle: "மருந்துச் சீட்டு",
    prescriptionDate: "தேதி",
    prescriptionDoctor: "மருத்துவர்",
    prescriptionDiagnosis: "நோய் கண்டறிதல்",
    prescriptionMedicines: "மருந்துகள்",
    prescriptionNotes: "குறிப்புகள்",
    prescriptionEmpty: "மருந்துச் சீட்டு இல்லை",
    prescriptionUpload: "பதிவேற்றம்",
    prescriptionUploadTitle: "மருந்துச் சீட்டை பதிவேற்றம்",
    prescriptionUploadDescription: "மருந்துச் சீட்டின் படத்தை பதிவேற்றம் செய்யவும்",
    prescriptionSelectPatient: "நோயாளியைத் தேர்ந்தெடுக்கவும்",
    prescriptionSelectDoctor: "மருத்துவரைத் தேர்ந்தெடுக்கவும்",
    prescriptionAddNotes: "குறிப்புகளைச் சேர்க்க",
    prescriptionViewTitle: "மருந்துச் சீட்டைக் காண்க",
    prescriptionUploadSuccess: "மருந்துச் சீட்டு வெற்றிகரமாக பதிவேற்றம் செய்யப்பட்டது",
    prescriptionUploadError: "மருந்துச் சீட்டை பதிவேற்றம் செய்வதில் பிழை",
    prescriptionDragAndDrop: "கோப்பை இங்கே இழுக்கவும்",
    prescriptionSupportedFormats: "ஆதரிக்கப்படும் வடிவங்கள்: PDF, JPG, PNG",
    prescriptionCurrentStock: "தற்போதைய கையிருப்பு",
    prescriptionNewStock: "புதிய கையிருப்பு",
    prescriptionReason: "காரணம்",

    // User Management
    userManagement: "பயனர் மேலாண்மை",
    createNewUser: "புதிய பயனரை உருவாக்க",
    updateUserDetails: "பயனர் விவரங்களை புதுப்பிக்க",
    fullName: "முழு பெயர்",
    username: "பயனர்பெயர்",
    password: "கடவுச்சொல்",
    enterFullName: "முழு பெயரை உள்ளிடவும்",
    enterUsername: "பயனர்பெயரை உள்ளிடவும்",
    enterPassword: "கடவுச்சொல்லை உள்ளிடவும்",
    leaveBlankForCurrentPassword: "தற்போதைய கடவுச்சொல்லை வைத்திருக்க காலியாக விடவும்",
    role: "பாத்திரம்",
    selectRole: "பாத்திரத்தைத் தேர்ந்தெடுக்கவும்",
    adminRole: "நிர்வாகி",
    pharmacistRole: "மருந்தாளுநர்",
    accountantRole: "கணக்காளர்",
    update: "புதுப்பி",
    new: "புதிய",
    user: "பயனர்",

    // Doctor Management
    doctorManagement: "மருத்துவர் மேலாண்மை",
    addDoctorDescription: "மருத்துவர் விவரங்களை சேர்க்க அல்லது புதுப்பிக்க",
    doctorName: "மருத்துவர் பெயர்",
    enterDoctorName: "மருத்துவர் பெயரை உள்ளிடவும்",
    specialization: "சிறப்புத்துவம்",
    optional: "விருப்பத்தேர்வு",
    enterSpecialization: "சிறப்புத்துவத்தை உள்ளிடவும்",
    phoneNumber: "தொலைபேசி எண்",
    enterPhoneNumber: "தொலைபேசி எண்ணை உள்ளிடவும்",

    // Notifications
    notifications: "அறிவிப்புகள்",
    noNotifications: "அறிவிப்புகள் எதுவும் இல்லை",
    switchToLight: "ஒளி பயன்முறைக்கு மாறவும்",
    switchToDark: "இருள் பயன்முறைக்கு மாறவும்",

    // Logout
    logoutSuccess: "வெற்றிகரமாக வெளியேறியது",
    logoutDescription: "நீங்கள் உங்கள் கணக்கிலிருந்து வெளியேறியுள்ளீர்கள்",
    logoutError: "வெளியேறுதல் தோல்வி",
    logoutErrorDescription: "வெளியேறும்போது பிழை ஏற்பட்டது",

    // Page Titles
    dashboardTitle: "மருத்துவ பில்லிங் டாஷ்போர்டு",
    reportsAndAnalytics: "அறிக்கைகள் மற்றும் பகுப்பாய்வு",
    salesReports: "விற்பனை அறிக்கைகள்",
    gstReports: "ஜிஎஸ்டி அறிக்கைகள்",
    inventoryReports: "சரக்கு அறிக்கைகள்",

    // Dashboard
    transactionsToday: "இன்றைய பரிவர்த்தனைகள்",
    requiresRestock: "உடனடி மறுநிரப்பல் தேவை",
    expiringWithinDays: "30 நாட்களில் காலாவதியாகும்",

    // Reports
    salesOverview: "விற்பனை கண்ணோட்டம்",
    salesPeriod: "விற்பனை காலம்",
    selectPeriod: "காலத்தை தேர்ந்தெடுக்கவும்",
    last7Days: "கடந்த 7 நாட்கள்",
    last30Days: "கடந்த 30 நாட்கள்",
    last90Days: "கடந்த 90 நாட்கள்",
    vsPreviousPeriod: "முந்தைய காலத்துடன் ஒப்பிடுக",
    averageOrderValue: "சராசரி ஆர்டர் மதிப்பு",
    salesTrendForSelectedPeriod: "தேர்ந்தெடுக்கப்பட்ட காலத்திற்கான விற்பனை போக்கு",
    salesByCategory: "வகை வாரியான விற்பனை",
    distributionOfSalesByCategory: "வகை வாரியான விற்பனை விநியோகம்",
    topSellingProducts: "அதிகம் விற்பனையாகும் பொருட்கள்",
    productsWithTheHighestSalesInTheSelectedPeriod: "தேர்ந்தெடுக்கப்பட்ட காலத்தில் அதிக விற்பனையான பொருட்கள்",
    gstr1ReportsForTaxFiling: "வரி தாக்கலுக்கான GSTR-1 அறிக்கைகள்",
    taxableAmount: "வரி விதிக்கக்கூடிய தொகை",
    totalTax: "மொத்த வரி",
    monthlyGstSummary: "மாதாந்திர ஜிஎஸ்டி சுருக்கம்",
    gstDetailsForThePast3Months: "கடந்த 3 மாதங்களின் ஜிஎஸ்டி விவரங்கள்",
    generateGstr1Report: "GSTR-1 அறிக்கையை உருவாக்கு",
    generateGstr3bReport: "GSTR-3B அறிக்கையை உருவாக்கு",
    stockMovementAndValuationReports: "சரக்கு நகர்வு மற்றும் மதிப்பீட்டு அறிக்கைகள்",
    totalProducts: "மொத்த பொருட்கள்",
    lowStockItems: "குறைந்த கையிருப்பு பொருட்கள்",
    outOfStock: "கையிருப்பு இல்லை",
    expiringSoon: "விரைவில் காலாவதியாகும்",
    stockValuation: "சரக்கு மதிப்பீடு",
    currentInventoryValueByCategory: "வகை வாரியான தற்போதைய சரக்கு மதிப்பு",
    totalInventoryValue: "மொத்த சரக்கு மதிப்பு",
    stockMovement: "சரக்கு நகர்வு",
    inventoryTransactionsInTheLast30Days: "கடந்த 30 நாட்களில் சரக்கு பரிவர்த்தனைகள்",
    stockAdjustmentReport: "சரக்கு சரிசெய்தல் அறிக்கை",
    expiryReport: "காலாவதி அறிக்கை",

    // Patient Management
    addPatient: "நோயாளியை சேர்க்க",
    searchPatients: "நோயாளிகளை தேட...",
    patientDetails: "நோயாளி விவரங்கள்",
    selectPatientToView: "விவரங்களைக் காண நோயாளியை தேர்ந்தெடுக்கவும்",
    uploadPrescription: "மருந்துச் சீட்டை பதிவேற்றம் செய்க",
    name: "பெயர்",
    phone: "தொலைபேசி",
    email: "மின்னஞ்சல்",
    address: "முகவரி",
    addedOn: "சேர்க்கப்பட்டது",
    actions: "செயல்கள்",
    details: "விவரங்கள்",

    // Inventory Management
    addNewMedicine: "புதிய மருந்து சேர்க்க",
    addCategory: "வகை சேர்க்க",
    addNewCategory: "புதிய வகை சேர்க்க",
    categoryName: "வகை பெயர்",
    enterCategoryName: "வகை பெயரை உள்ளிடவும்",
  }
}; 