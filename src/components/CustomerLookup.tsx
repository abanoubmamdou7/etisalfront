
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Phone, User, MapPin, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { TabsContent, Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { useStore } from '@/context/StoreContext';
import { Customer, Address } from '@/lib/types';
import { toast } from 'sonner';
import * as customerService from '@/services/customerService';
import { useLanguage } from '@/context/LanguageContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { IconInput } from './IconInput';

interface CustomerLookupProps {
  onSelectCustomer: (customer: Customer, address: Address) => void;
}

const CustomerLookup: React.FC<CustomerLookupProps> = ({ onSelectCustomer }) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { addCustomer, regions } = useStore();
  
  const [activeTab, setActiveTab] = useState('search');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [regionId, setRegionId] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<Customer | null>(null);
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');
  
  // Payment methods
  const [cashEnabled, setCashEnabled] = useState(true);
  const [visaEnabled, setVisaEnabled] = useState(false);
  const [creditEnabled, setCreditEnabled] = useState(false);
  
  const handleSearch = async () => {
    if (!phoneNumber.trim()) {
      toast.error(language === 'en' ? 'Please enter a phone number' : 'الرجاء إدخال رقم الهاتف');
      return;
    }
    
    setLoading(true);
    
    try {
      const customer = await customerService.findCustomerByPhone(phoneNumber.trim());
      setSearchResults(customer);
      
      if (customer && customer.addresses.length > 0) {
        setSelectedAddressId(customer.addresses[0].id);
      }
      
      if (!customer) {
        toast.info(language === 'en' ? 'Customer not found' : 'لم يتم العثور على العميل');
        setActiveTab('create');
      }
    } catch (error) {
      console.error('Error searching for customer:', error);
      toast.error(language === 'en' ? 'Error searching for customer' : 'خطأ في البحث عن العميل');
    } finally {
      setLoading(false);
    }
  };
  
  const handleCreateCustomer = async () => {
    if (!phoneNumber.trim() || !name.trim() || !address.trim()) {
      toast.error(language === 'en' ? 'Please fill all required fields' : 'يرجى ملء جميع الحقول المطلوبة');
      return;
    }
    
    setLoading(true);
    
    try {
      const newCustomer = await addCustomer({
        phoneNumber: phoneNumber.trim(),
        name: name.trim(),
        address: address.trim(),
        paymentMethods: {
          cash: cashEnabled,
          visa: visaEnabled,
          credit: creditEnabled
        },
        regionId: regionId || undefined
      });
      
      toast.success(language === 'en' ? 'Customer created successfully' : 'تم إنشاء العميل بنجاح');
      
      // Select the newly created customer and their first address
      if (newCustomer.addresses.length > 0) {
        onSelectCustomer(newCustomer, newCustomer.addresses[0]);
      }
    } catch (error) {
      console.error('Error creating customer:', error);
      toast.error(language === 'en' ? 'Error creating customer' : 'خطأ في إنشاء العميل');
    } finally {
      setLoading(false);
    }
  };
  
  const handleSelectCustomer = () => {
    if (searchResults && selectedAddressId) {
      const selectedAddress = searchResults.addresses.find(
        addr => addr.id === selectedAddressId
      );
      
      if (selectedAddress) {
        onSelectCustomer(searchResults, selectedAddress);
      } else {
        toast.error(language === 'en' ? 'Please select an address' : 'الرجاء اختيار عنوان');
      }
    } else {
      toast.error(language === 'en' ? 'No customer selected' : 'لم يتم اختيار عميل');
    }
  };
  
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and limit to 15 digits
    if (/^\d*$/.test(value) && value.length <= 15) {
      setPhoneNumber(value);
      // When changing phone in create tab, also update the search tab
      if (activeTab === 'create') {
        // Reset search results when changing phone
        setSearchResults(null);
      }
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (activeTab === 'search') {
        handleSearch();
      }
    }
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="search">
            <Search className="mr-2 h-4 w-4" />
            {language === 'en' ? 'Search' : 'بحث'}
          </TabsTrigger>
          <TabsTrigger value="create">
            <Plus className="mr-2 h-4 w-4" />
            {language === 'en' ? 'Create' : 'إنشاء'}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="search">
          <CardHeader>
            <CardTitle>{language === 'en' ? 'Find Customer' : 'البحث عن عميل'}</CardTitle>
            <CardDescription>
              {language === 'en' ? 'Enter phone number to find existing customer' : 'أدخل رقم الهاتف للعثور على عميل موجود'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phoneSearch">{language === 'en' ? 'Phone Number' : 'رقم الهاتف'}</Label>
              <div className="flex space-x-2">
                <Input
                  id="phoneSearch"
                  placeholder="05xxxxxxxx"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  onKeyDown={handleKeyDown}
                  autoComplete="tel"
                  className="flex-1"
                />
                <Button 
                  onClick={handleSearch} 
                  disabled={loading || !phoneNumber.trim()}
                >
                  <Search className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'Search' : 'بحث'}
                </Button>
              </div>
            </div>
            
            {searchResults && (
              <div className="mt-6 space-y-4">
                <div className="rounded-lg bg-secondary p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg">{searchResults.name}</h3>
                      <p className="text-sm text-muted-foreground">{searchResults.phoneNumber}</p>
                    </div>
                    <div className="flex space-x-2">
                      {searchResults.paymentMethods.cash && (
                        <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                          {language === 'en' ? 'Cash' : 'نقداً'}
                        </span>
                      )}
                      {searchResults.paymentMethods.visa && (
                        <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                          {language === 'en' ? 'Visa' : 'فيزا'}
                        </span>
                      )}
                      {searchResults.paymentMethods.credit && (
                        <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                          {language === 'en' ? 'Credit' : 'ائتمان'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="addressSelect">{language === 'en' ? 'Select Address' : 'اختر العنوان'}</Label>
                  <Select 
                    value={selectedAddressId} 
                    onValueChange={setSelectedAddressId}
                  >
                    <SelectTrigger id="addressSelect">
                      <SelectValue placeholder={language === 'en' ? 'Select address' : 'اختر العنوان'} />
                    </SelectTrigger>
                    <SelectContent>
                      {searchResults.addresses.map((addr) => (
                        <SelectItem key={addr.id} value={addr.id}>
                          {addr.street}, {addr.city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  className="w-full"
                  onClick={handleSelectCustomer}
                  disabled={!selectedAddressId}
                >
                  {language === 'en' ? 'Select and Continue' : 'اختر واستمر'}
                </Button>
              </div>
            )}
          </CardContent>
        </TabsContent>
        
        <TabsContent value="create">
          <CardHeader>
            <CardTitle>{language === 'en' ? 'Create New Customer' : 'إنشاء عميل جديد'}</CardTitle>
            <CardDescription>
              {language === 'en' ? 'Add a new customer to the system' : 'إضافة عميل جديد إلى النظام'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phoneCreate">{language === 'en' ? 'Phone Number' : 'رقم الهاتف'}</Label>
              <div className="flex">
                <IconInput
                  id="phoneCreate"
                  placeholder="05xxxxxxxx"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  className="flex-1"
                  icon={<Phone className="h-4 w-4" />}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="name">{language === 'en' ? 'Customer Name' : 'اسم العميل'}</Label>
              <IconInput
                id="name"
                placeholder={language === 'en' ? 'Full name' : 'الاسم الكامل'}
                value={name}
                onChange={(e) => setName(e.target.value)}
                icon={<User className="h-4 w-4" />}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">{language === 'en' ? 'Address' : 'العنوان'}</Label>
              <IconInput
                id="address"
                placeholder={language === 'en' ? 'Delivery address' : 'عنوان التوصيل'}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                icon={<MapPin className="h-4 w-4" />}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="region">{language === 'en' ? 'Region' : 'المنطقة'}</Label>
              <Select 
                value={regionId} 
                onValueChange={setRegionId}
              >
                <SelectTrigger id="region">
                  <SelectValue placeholder={language === 'en' ? 'Select region' : 'اختر المنطقة'} />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region.id} value={region.id}>
                      {region.regionEngName} ({region.deliveryValue})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">{language === 'en' ? 'Payment Methods' : 'طرق الدفع'}</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="cashEnabled" className="cursor-pointer">
                    {language === 'en' ? 'Cash' : 'نقداً'}
                  </Label>
                  <Switch
                    id="cashEnabled"
                    checked={cashEnabled}
                    onCheckedChange={setCashEnabled}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="visaEnabled" className="cursor-pointer">
                    {language === 'en' ? 'Visa' : 'فيزا'}
                  </Label>
                  <Switch
                    id="visaEnabled"
                    checked={visaEnabled}
                    onCheckedChange={setVisaEnabled}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="creditEnabled" className="cursor-pointer">
                    {language === 'en' ? 'Credit' : 'ائتمان'}
                  </Label>
                  <Switch
                    id="creditEnabled"
                    checked={creditEnabled}
                    onCheckedChange={setCreditEnabled}
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleCreateCustomer} 
              className="w-full"
              disabled={loading || !phoneNumber.trim() || !name.trim() || !address.trim()}
            >
              {language === 'en' ? 'Create and Continue' : 'إنشاء واستمر'}
            </Button>
          </CardFooter>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default CustomerLookup;
