export type LanguageCode = 'en' | 'hi' | 'mr' | 'ta';

export interface TranslationStructure {
  common: {
    success: string;
    error: string;
  };
  dashboard: {
    title: string;
    todaySales: string;
    totalProducts: string;
    totalCustomers: string;
    lowStockItems: string;
    expiringItems: string;
    topSelling: string;
    recentActivity: string;
    vsLastMonth: string;
    itemsExpiringSoon: string;
  };
  reports: {
    downloadSuccess: string;
    downloadError: string;
  };
}

export const translations: Record<string, TranslationStructure> = {
  en: {
    common: {
      success: "Success",
      error: "Error"
    },
    dashboard: {
      title: "Dashboard",
      todaySales: "Today's Sales",
      totalProducts: "Total Products",
      totalCustomers: "Total Customers",
      lowStockItems: "Low Stock Items",
      expiringItems: "Expiring Items",
      topSelling: "Top Selling",
      recentActivity: "Recent Activity",
      vsLastMonth: "vs last month",
      itemsExpiringSoon: "items expiring soon"
    },
    reports: {
      downloadSuccess: "Report downloaded successfully",
      downloadError: "Failed to download report"
    }
  },
  hi: {
    common: {
      success: "सफलता",
      error: "त्रुटि"
    },
    dashboard: {
      title: "डैशबोर्ड",
      todaySales: "आज की बिक्री",
      totalProducts: "कुल उत्पाद",
      totalCustomers: "कुल ग्राहक",
      lowStockItems: "कम स्टॉक वाली वस्तुएं",
      expiringItems: "समाप्ति वाली वस्तुएं",
      topSelling: "सर्वाधिक बिकने वाले",
      recentActivity: "हाल की गतिविधि",
      vsLastMonth: "पिछले महीने की तुलना में",
      itemsExpiringSoon: "वस्तुएं जल्द समाप्त हो रही हैं"
    },
    reports: {
      downloadSuccess: "रिपोर्ट सफलतापूर्वक डाउनलोड की गई",
      downloadError: "रिपोर्ट डाउनलोड करने में विफल"
    }
  },
  mr: {
    common: {
      success: "यश",
      error: "त्रुटी"
    },
    dashboard: {
      title: "डॅशबोर्ड",
      todaySales: "आजची विक्री",
      totalProducts: "एकूण उत्पादने",
      totalCustomers: "एकूण ग्राहक",
      lowStockItems: "कमी साठा असलेल्या वस्तू",
      expiringItems: "कालबाह्य होणाऱ्या वस्तू",
      topSelling: "सर्वाधिक विकल्या जाणारे",
      recentActivity: "अलीकडील क्रिया",
      vsLastMonth: "मागील महिन्याच्या तुलनेत",
      itemsExpiringSoon: "वस्तू लवकरच कालबाह्य होत आहेत"
    },
    reports: {
      downloadSuccess: "अहवाल यशस्वीरित्या डाउनलोड झाला",
      downloadError: "अहवाल डाउनलोड करण्यात अयशस्वी"
    }
  },
  ta: {
    common: {
      success: "வெற்றி",
      error: "பிழை"
    },
    dashboard: {
      title: "டாஷ்போர்டு",
      todaySales: "இன்றைய விற்பனை",
      totalProducts: "மொத்த பொருட்கள்",
      totalCustomers: "மொத்த வாடிக்கையாளர்கள்",
      lowStockItems: "குறைந்த இருப்பு பொருட்கள்",
      expiringItems: "காலாவதியாகும் பொருட்கள்",
      topSelling: "அதிகம் விற்பனையாகும்",
      recentActivity: "சமீபத்திய செயல்பாடு",
      vsLastMonth: "கடந்த மாதத்துடன் ஒப்பிடுகையில்",
      itemsExpiringSoon: "பொருட்கள் விரைவில் காலாவதியாகின்றன"
    },
    reports: {
      downloadSuccess: "அறிக்கை வெற்றிகரமாக பதிவிறக்கம் செய்யப்பட்டது",
      downloadError: "அறிக்கையை பதிவிறக்க முடியவில்லை"
    }
  }
}; 