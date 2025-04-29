
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define the available languages
export type Language = 'en' | 'ar';

// Define the context type
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, variables?: Record<string, string | number>) => string;
  isRTL: boolean;
};

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
  isRTL: false,
});

// Hook to use the language context
export const useLanguage = () => useContext(LanguageContext);

// Translations object
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Common
    'app.language': 'Language',
    'app.english': 'English',
    'app.arabic': 'Arabic',
    'app.back': 'Back',
    'app.dashboard': 'Dashboard',
    'app.newOrder': 'New Order',
    'app.loading': 'Loading...',
    'app.save': 'Save',
    'app.cancel': 'Cancel',
    'app.apply': 'Apply',
    'app.close': 'Close',
    'app.edit': 'Edit',
    'app.delete': 'Delete',
    'app.search': 'Search',
    'app.login': 'Login',
    'app.logout': 'Logout',
    'app.username': 'Username',
    'app.password': 'Password',
    'app.submit': 'Submit',
    
    // Header
    'header.pizzaShop': 'Pizza Shop Dashboard',
    
    // Index page
    'index.managementDashboard': 'Management Dashboard',
    'index.orders': 'Orders',
    'index.ordersTotal': '{count} orders total',
    'index.noOrders': 'No orders found',
    'index.listView': 'List View',
    'index.kanbanView': 'Kanban View',
    
    // 404 page
    '404.oops': 'Oops! Page not found',
    '404.returnHome': 'Return to Home',
    
    // New Order
    'newOrder.title': 'New Order',
    'newOrder.createTitle': 'Create New Order',
    'newOrder.enterPhone': 'Enter customer\'s phone number to start a new order',
    'newOrder.loadingStore': 'Loading store information...',
    
    // Order Status - Removing underscores here
    'status.orderReceived': 'Order Received',
    'status.storeReceived': 'Store Received',
    'status.orderStarted': 'Order Started',
    'status.deliveryBoySelected': 'Delivery Boy Selected',
    'status.invoicePrinted': 'Invoice Printed',
    'status.orderDelivered': 'Order Delivered',
    'status.select': 'Select status',
    'status.allOrders': 'All Orders',
    
    // Customer and Orders
    'customer.phone': 'Phone Number',
    'customer.name': 'Customer Name',
    'customer.address': 'Address',
    'customer.history': 'Customer\'s Order History',
    'customer.noOrders': 'No previous orders found for this customer',
    'customer.orderNum': 'Order #',
    'customer.items': 'Items',
    'customer.total': 'Total',
    'customer.payment': 'Payment',
    'customer.editOrder': 'Edit Order',
    'customer.cannotEdit': 'Cannot edit order with status',
    
    // Customer Best Items
    'bestItems.title': 'Customer\'s Favorite Items',
    'bestItems.noFavorites': 'This customer hasn\'t ordered enough items to determine favorites yet',
    'bestItems.ordered': 'Ordered {count} {times}',
    'bestItems.time': 'time',
    'bestItems.times': 'times',
    'bestItems.addToCart': 'Add to Cart',
    
    // Complaints
    'complaints.title': 'Submit New Complaint',
    'complaints.placeholder': 'What issue would you like to report?',
    'complaints.submit': 'Submit Complaint',
    'complaints.submitting': 'Submitting...',
    'complaints.previous': 'Previous Complaints',
    'complaints.loading': 'Loading complaints...',
    'complaints.noComplaints': 'No previous complaints found',
    'complaints.resolved': 'Resolved',
    'complaints.open': 'Open Complaint',
    
    // POS Screen
    'pos.orderDetails': 'Order Details',
    'pos.customerDetails': 'Customer Details',
    'pos.storeDetails': 'Store Details',
    'pos.productCatalog': 'Product Catalog',
    'pos.cart': 'Cart',
    'pos.orderTotal': 'Order Total',
    'pos.paymentMethod': 'Payment Method',
    'pos.cash': 'Cash',
    'pos.creditCard': 'Credit Card',
    'pos.placeOrder': 'Place Order',
    'pos.cancelOrder': 'Cancel Order',
    'pos.confirmOrder': 'Confirm Order',
    'pos.addToCart': 'Add to Cart',
    'pos.remove': 'Remove',
    'pos.editItem': 'Edit Item',
    'pos.emptyCart': 'Your cart is empty',
    'pos.lastOrders': 'Last Orders',
    'pos.bestItems': 'Best Items',
    'pos.complaints': 'Complaints',
    
    // Item Editor
    'itemEditor.notes': 'Notes',
    'itemEditor.discount': 'Discount (%)',
    'itemEditor.applyChanges': 'Apply Changes',
    'itemEditor.specialInstructions': 'Add special instructions for this item...',
    'itemEditor.success': 'Item updated successfully',
    
    // Management
    'management.title': 'Management Dashboard',
    'management.totalOrders': 'Total Orders',
    'management.openOrders': 'Open Orders',
    'management.deliveredOrders': 'Delivered Orders',
    'management.totalRevenue': 'Total Revenue',
    'management.byStore': 'Orders by Store',
    'management.filterStore': 'Filter by Store',
    'management.allStores': 'All Stores',
    
    // PWA install prompt text
    'app.installApp': 'Install App',
    'app.pwaInstalled': 'App installed',
    'app.pwaInstallInstructions': 'Add to Home Screen',
    
    // Login page
    'login.title': 'Login to Itisal',
    'login.usernamePlaceholder': 'Enter your username',
    'login.passwordPlaceholder': 'Enter your password',
    'login.button': 'Login',
    'login.error': 'Invalid username or password',

    // Setup page translations - Removing underscores here
    'SetupStores': 'Stores',
    'SetupStoresDescription': 'Manage store configurations',
    'SetupAddStore': 'Add Store',
    'SetupStoreCode': 'Store Code',
    'SetupStoreEngName': 'Store English Name',
    'SetupStoreArName': 'Store Arabic Name',
    'SetupEditStore': 'Edit Store',
    'SetupNoStores': 'No stores found',
    'SetupRegions': 'Regions',
    'SetupRegionsDescription': 'Manage region configurations',
    'SetupAddRegion': 'Add Region',
    'SetupRegionCode': 'Region Code',
    'SetupRegionEngName': 'Region English Name',
    'SetupRegionArName': 'Region Arabic Name',
    'SetupDeliveryValue': 'Delivery Value',
    'SetupEditRegion': 'Edit Region',
    'SetupNoRegions': 'No regions found',
    'SetupUsers': 'Users',
    'SetupUsersDescription': 'Manage system users',
    'SetupAddUser': 'Add User',
    'SetupUserCode': 'User Code',
    'SetupUserName': 'User Name',
    'SetupPassword': 'Password',
    'SetupIsAdmin': 'Is Admin',
    'SetupEditUser': 'Edit User',
    'SetupNoUsers': 'No users found',
    'SetupSecurity': 'Security',
    'SetupSecurityDescription': 'Manage user permissions',
    'SetupUserPermissions': 'User Permissions',
    'SetupSelectUser': 'Select User',
    'SetupAdminAllPermissions': 'Admin has all permissions',
    'SetupAdminPermissionsNote': 'Administrators have full access to all features',
    'SetupStoreRegions': 'Store Regions',
    'SetupStoreRegionsDescription': 'Manage store to region links',
    'SetupAddLink': 'Add Link',
    'SetupSelectStore': 'Select Store',
    'SetupSelectRegion': 'Select Region',
    'SetupCancel': 'Cancel',
    'SetupSave': 'Save',
    'SetupNoLinks': 'No links found',
    'SetupStore': 'Store',
    'SetupRegion': 'Region',
    'SetupActions': 'Actions',
    'SetupConfirmDelete': 'Are you sure you want to delete this?',
    'SetupFillAllFields': 'Please fill all fields',
    'SetupLinkAlreadyExists': 'This link already exists',
    'SetupSelectStoreAndRegion': 'Please select a store and a region',
    'SetupEdit': 'Edit',
    'SetupDelete': 'Delete',
    'SetupAddLinkSuccess': 'Link added successfully',
    'SetupDeleteLinkSuccess': 'Link deleted successfully',
    'SetupAllowStoreSetup': 'Allow Store Setup',
    'SetupAllowStoreSetupDesc': 'Allow user to manage store settings',
    'SetupAllowRegionSetup': 'Allow Region Setup',
    'SetupAllowRegionSetupDesc': 'Allow user to manage region settings',
    'SetupAllowNewCustomer': 'Allow New Customer',
    'SetupAllowNewCustomerDesc': 'Allow user to add new customers',
    'SetupAllowItemGroupsSetup': 'Allow Item Groups Setup',
    'SetupAllowItemGroupsSetupDesc': 'Allow user to manage item groups settings',
    'SetupAllowUserSetup': 'Allow User Setup',
    'SetupAllowUserSetupDesc': 'Allow user to manage user settings',
    'SetupSavePermissions': 'Save Permissions',
    'SetupUser': 'User',
    'SetupNewCustomer': 'New Customer',
    'SetupItemGroupsSetup': 'Item Groups Setup',
    'SetupAdmin': 'Admin',
    'SetupYes': 'Yes',
    'SetupNo': 'No',
    
    // New Order page translations
    'NewOrderTitle': 'New Order',
    'NewOrderCreateTitle': 'Create New Order',
    'NewOrderEnterPhone': 'Enter customer\'s phone number to start a new order',
    'NewOrderLoadingStore': 'Loading store information...',
  },
  ar: {
    // Common
    'app.language': 'اللغة',
    'app.english': 'الإنجليزية',
    'app.arabic': 'العربية',
    'app.back': 'رجوع',
    'app.dashboard': 'لوحة التحكم',
    'app.newOrder': 'طلب جديد',
    'app.loading': 'جاري التحميل...',
    'app.save': 'حفظ',
    'app.cancel': 'إلغاء',
    'app.apply': 'تطبيق',
    'app.close': 'إغلاق',
    'app.edit': 'تعديل',
    'app.delete': 'حذف',
    'app.search': 'بحث',
    'app.login': 'تسجيل الدخول',
    'app.logout': 'تسجيل الخروج',
    'app.username': 'اسم المستخدم',
    'app.password': 'كلمة المرور',
    'app.submit': 'إرسال',
    
    // Header
    'header.pizzaShop': 'لوحة تحكم متجر البيتزا',
    
    // Index page
    'index.managementDashboard': 'لوحة الإدارة',
    'index.orders': 'الطلبات',
    'index.ordersTotal': '{count} طلب إجمالي',
    'index.noOrders': 'لا توجد طلبات',
    'index.listView': 'عرض القائمة',
    'index.kanbanView': 'عرض كانبان',
    
    // 404 page
    '404.oops': 'عفواً! الصفحة غير موجودة',
    '404.returnHome': 'العودة إلى الصفحة الرئيسية',
    
    // New Order
    'newOrder.title': 'طلب جديد',
    'newOrder.createTitle': 'إنشاء طلب جديد',
    'newOrder.enterPhone': 'أدخل رقم هاتف العميل لبدء طلب جديد',
    'newOrder.loadingStore': 'جاري تحميل معلومات المتجر...',
    
    // Order Status - Removing underscores here
    'status.orderReceived': 'تم استلام الطلب',
    'status.storeReceived': 'تم استلام المتجر',
    'status.orderStarted': 'بدأ الطلب',
    'status.deliveryBoySelected': 'تم اختيار عامل التوصيل',
    'status.invoicePrinted': 'تمت طباعة الفاتورة',
    'status.orderDelivered': 'تم توصيل الطلب',
    'status.select': 'اختر الحالة',
    'status.allOrders': 'جميع الطلبات',
    
    // Customer and Orders
    'customer.phone': 'رقم الهاتف',
    'customer.name': 'اسم العميل',
    'customer.address': 'العنوان',
    'customer.history': 'سجل طلبات العميل',
    'customer.noOrders': 'لا توجد طلبات سابقة لهذا العميل',
    'customer.orderNum': 'طلب #',
    'customer.items': 'العناصر',
    'customer.total': 'المجموع',
    'customer.payment': 'الدفع',
    'customer.editOrder': 'تعديل الطلب',
    'customer.cannotEdit': 'لا يمكن تعديل الطلب بالحالة',
    
    // Customer Best Items
    'bestItems.title': 'العناصر المفضلة للعميل',
    'bestItems.noFavorites': 'لم يطلب هذا العميل عناصر كافية لتحديد المفضلات بعد',
    'bestItems.ordered': 'طُلب {count} {times}',
    'bestItems.time': 'مرة',
    'bestItems.times': 'مرات',
    'bestItems.addToCart': 'أضف إلى السلة',
    
    // Complaints
    'complaints.title': 'تقديم شكوى جديدة',
    'complaints.placeholder': 'ما هي المشكلة التي تود الإبلاغ عنها؟',
    'complaints.submit': 'تقديم شكوى',
    'complaints.submitting': 'جاري التقديم...',
    'complaints.previous': 'الشكاوى السابقة',
    'complaints.loading': 'جاري تحميل الشكاوى...',
    'complaints.noComplaints': 'لا توجد شكاوى سابقة',
    'complaints.resolved': 'تم الحل',
    'complaints.open': 'شكوى مفتوحة',
    
    // POS Screen
    'pos.orderDetails': 'تفاصيل الطلب',
    'pos.customerDetails': 'تفاصيل العميل',
    'pos.storeDetails': 'تفاصيل المتجر',
    'pos.productCatalog': 'كتالوج المنتجات',
    'pos.cart': 'سلة التسوق',
    'pos.orderTotal': 'إجمالي الطلب',
    'pos.paymentMethod': 'طريقة الدفع',
    'pos.cash': 'نقدا',
    'pos.creditCard': 'بطاقة ائتمان',
    'pos.placeOrder': 'تقديم الطلب',
    'pos.cancelOrder': 'إلغاء الطلب',
    'pos.confirmOrder': 'تأكيد الطلب',
    'pos.addToCart': 'أضف إلى السلة',
    'pos.remove': 'إزالة',
    'pos.editItem': 'تعديل العنصر',
    'pos.emptyCart': 'سلة التسوق فارغة',
    'pos.lastOrders': 'آخر الطلبات',
    'pos.bestItems': 'أفضل العناصر',
    'pos.complaints': 'الشكاوى',
    
    // Item Editor
    'itemEditor.notes': 'ملاحظات',
    'itemEditor.discount': 'خصم (%)',
    'itemEditor.applyChanges': 'تطبيق التغييرات',
    'itemEditor.specialInstructions': 'أضف تعليمات خاصة لهذا العنصر...',
    'itemEditor.success': 'تم تحديث العنصر بنجاح',
    
    // Management
    'management.title': 'لوحة الإدارة',
    'management.totalOrders': 'إجمالي الطلبات',
    'management.openOrders': 'الطلبات المفتوحة',
    'management.deliveredOrders': 'الطلبات التي تم توصيلها',
    'management.totalRevenue': 'إجمالي الإيرادات',
    'management.byStore': 'الطلبات حسب المتجر',
    'management.filterStore': 'تصفية حسب المتجر',
    'management.allStores': 'جميع المتاجر',
    
    // PWA install prompt text
    'app.installApp': 'تثبيت التطبيق',
    'app.pwaInstalled': 'تم تثبيت التطبيق',
    'app.pwaInstallInstructions': 'أضف إلى الشاشة الرئيسية',
    
    // Login page
    'login.title': 'تسجيل الدخول إلى جولدن بوكس',
    'login.usernamePlaceholder': 'أدخل اسم المستخدم',
    'login.passwordPlaceholder': 'أدخل كلمة المرور',
    'login.button': 'تسجيل الدخول',
    'login.error': 'اسم المستخدم أو كلمة المرور غير صحيحة',

    // Setup page translations - Removing underscores here
    'SetupStores': 'المتاجر',
    'SetupStoresDescription': 'إدارة إعدادات المتاجر',
    'SetupAddStore': 'إضافة متجر',
    'SetupStoreCode': 'رمز المتجر',
    'SetupStoreEngName': 'اسم المتجر بالإنجليزية',
    'SetupStoreArName': 'اسم المتجر بالعربية',
    'SetupEditStore': 'تعديل المتجر',
    'SetupNoStores': 'لا توجد متاجر',
    'SetupRegions': 'المناطق',
    'SetupRegionsDescription': 'إدارة إعدادات المناطق',
    'SetupAddRegion': 'إضافة منطقة',
    'SetupRegionCode': 'رمز المنطقة',
    'SetupRegionEngName': 'اسم المنطقة بالإنجليزية',
    'SetupRegionArName': 'اسم المنطقة بالعربية',
    'SetupDeliveryValue': 'قيمة التوصيل',
    'SetupEditRegion': 'تعديل المنطقة',
    'SetupNoRegions': 'لا توجد مناطق',
    'SetupUsers': 'المستخدمون',
    'SetupUsersDescription': 'إدارة مستخدمي النظام',
    'SetupAddUser': 'إضافة مستخدم',
    'SetupUserCode': 'رمز المستخدم',
    'SetupUserName': 'اسم المستخدم',
    'SetupPassword': 'كلمة المرور',
    'SetupIsAdmin': 'مسؤول',
    'SetupEditUser': 'تعديل المستخدم',
    'SetupNoUsers': 'لا يوجد مستخدمون',
    'SetupSecurity': 'الأمان',
    'SetupSecurityDescription': 'إدارة صلاحيات المستخدمين',
    'SetupUserPermissions': 'صلاحيات المستخدم',
    'SetupSelectUser': 'اختر المستخدم',
    'SetupAdminAllPermissions': 'المسؤول لديه جميع الصلاحيات',
    'SetupAdminPermissionsNote': 'يتمتع المسؤولون بوصول كامل إلى جميع الميزات',
    'SetupStoreRegions': 'مناطق المتجر',
    'SetupStoreRegionsDescription': 'إدارة روابط المتجر بالمنطقة',
    'SetupAddLink': 'أضف رابط',
    'SetupSelectStore': 'اختر متجر',
    'SetupSelectRegion': 'اختر منطقة',
    'SetupCancel': 'إلغاء',
    'SetupSave': 'حفظ',
    'SetupNoLinks': 'لا توجد روابط',
    'SetupStore': 'متجر',
    'SetupRegion': 'منطقة',
    'SetupActions': 'إجراءات',
    'SetupConfirmDelete': 'هل أنت متأكد أنك تريد حذف هذا؟',
    'SetupFillAllFields': 'يرجى ملء جميع الحقول',
    'SetupLinkAlreadyExists': 'هذا الرابط موجود بالفعل',
    'SetupSelectStoreAndRegion': 'الرجاء تحديد متجر ومنطقة',
    'SetupEdit': 'تعديل',
    'SetupDelete': 'حذف',
    'SetupAddLinkSuccess': 'تمت إضافة الرابط بنجاح',
    'SetupDeleteLinkSuccess': 'تم حذف الرابط بنجاح',
    'SetupAllowStoreSetup': 'السماح بإعداد المتجر',
    'SetupAllowStoreSetupDesc': 'السماح للمستخدم بإدارة إعدادات المتجر',
    'SetupAllowRegionSetup': 'السماح بإعداد المنطقة',
    'SetupAllowRegionSetupDesc': 'السماح للمستخدم بإدارة إعدادات المنطقة',
    'SetupAllowNewCustomer': 'السماح بعميل جديد',
    'SetupAllowNewCustomerDesc': 'السماح للمستخدم بإضافة عملاء جدد',
    'SetupAllowItemGroupsSetup': 'السماح بإعداد مجموعات العناصر',
    'SetupAllowItemGroupsSetupDesc': 'السماح للمستخدم بإدارة إعدادات مجموعات العناصر',
    'SetupAllowUserSetup': 'السماح بإعداد المستخدم',
    'SetupAllowUserSetupDesc': 'السماح للمستخدم بإدارة إعدادات المستخدم',
    'SetupSavePermissions': 'حفظ الأذونات',
    'SetupUser': 'المستخدم',
    'SetupNewCustomer': 'عميل جديد',
    'SetupItemGroupsSetup': 'إعداد مجموعات العناصر',
    'SetupAdmin': 'مسؤول',
    'SetupYes': 'نعم',
    'SetupNo': 'لا',

    // New Order page translations
    'NewOrderTitle': 'طلب جديد',
    'NewOrderCreateTitle': 'إنشاء طلب جديد',
    'NewOrderEnterPhone': 'أدخل رقم هاتف العميل لبدء طلب جديد',
    'NewOrderLoadingStore': 'جاري تحميل معلومات المتجر...',
  }
};

// Language provider component
interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Try to get the language from localStorage, default to 'en'
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage as Language) || 'en';
  });

  // Check if the current language is RTL (right-to-left)
  const isRTL = language === 'ar';

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('language', language);
    
    // Set the dir attribute on the html element
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    
    // Add or remove RTL class from body
    if (isRTL) {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
  }, [language, isRTL]);

  // Translation function
  const t = (key: string, variables?: Record<string, string | number>) => {
    const value = translations[language][key] || key;
    
    if (variables) {
      return Object.entries(variables).reduce((acc, [varKey, varValue]) => {
        return acc.replace(`{${varKey}}`, String(varValue));
      }, value);
    }
    
    return value;
  };

  // Context value
  const contextValue = {
    language,
    setLanguage,
    t,
    isRTL
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
