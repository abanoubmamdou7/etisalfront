
import React, { useState, useEffect } from 'react';
import { useStore } from '@/context/StoreContext';
import Header from '@/components/Header';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AnimatedTransition from '@/components/AnimatedTransition';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Package, Store, ShoppingBag } from 'lucide-react';
import OrderTabs from '@/components/OrderTabs';
import { OrderStatus, Store as StoreType } from '@/lib/types';
import { supabase } from '@/integrations/supabase/client';
import * as storeService from '@/services/storeService';

const ManagementDashboard = () => {
  const { orders, loading } = useStore();
  const [selectedStore, setSelectedStore] = useState<string>('all');
  const [stores, setStores] = useState<StoreType[]>([]);
  const [orderMetrics, setOrderMetrics] = useState({
    totalOrders: 0,
    openOrders: 0,
    deliveredOrders: 0,
    totalRevenue: 0
  });
  const [statusDistribution, setStatusDistribution] = useState<{name: string, value: number}[]>([]);

  // Fetch stores
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const storesData = await storeService.fetchStores();
        setStores(storesData);
      } catch (error) {
        console.error('Error fetching stores:', error);
      }
    };
    
    fetchStores();
  }, []);

  // Calculate metrics based on orders and selected store
  useEffect(() => {
    if (loading) return;

    // Filter orders by store if needed
    const filteredOrders = selectedStore === 'all' 
      ? orders 
      : orders.filter(order => order.storeId === selectedStore);
    
    // Count orders by status
    const statusCounts: Record<string, number> = {};
    const openStatuses: OrderStatus[] = ['Order Received', 'Store Received', 'Order Started', 'Delivery Boy Selected', 'Invoice Printed'];
    let totalRevenue = 0;
    let openOrderCount = 0;
    let deliveredOrderCount = 0;
    
    filteredOrders.forEach(order => {
      // Count by status
      statusCounts[order.status] = (statusCounts[order.status] || 0) + 1;
      
      // Calculate revenue
      totalRevenue += order.totalAmount;
      
      // Count open vs delivered
      if (openStatuses.includes(order.status)) {
        openOrderCount++;
      } else if (order.status === 'Order Delivered') {
        deliveredOrderCount++;
      }
    });
    
    // Update metrics
    setOrderMetrics({
      totalOrders: filteredOrders.length,
      openOrders: openOrderCount,
      deliveredOrders: deliveredOrderCount,
      totalRevenue
    });
    
    // Create status distribution data for chart
    const statusData = Object.entries(statusCounts).map(([name, value]) => ({
      name,
      value
    }));
    
    setStatusDistribution(statusData);
  }, [orders, selectedStore, loading]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  return (
    <AnimatedTransition location="management-dashboard">
      <div className="flex flex-col min-h-screen">
        <Header title="Management Dashboard" showBackButton={true} />
        
        <main className="flex-1 container mx-auto py-6 px-4">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-2xl font-bold">Order Management</h1>
            
            <div className="w-full sm:w-64">
              <Select value={selectedStore} onValueChange={setSelectedStore}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by store" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stores</SelectItem>
                  {stores.map(store => (
                    <SelectItem key={store.id} value={store.id}>{store.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Orders</p>
                  <h3 className="text-2xl font-bold">{orderMetrics.totalOrders}</h3>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <ShoppingBag className="h-6 w-6 text-primary" />
                </div>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Open Orders</p>
                  <h3 className="text-2xl font-bold">{orderMetrics.openOrders}</h3>
                </div>
                <div className="bg-amber-100 p-3 rounded-full">
                  <Package className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Delivered Orders</p>
                  <h3 className="text-2xl font-bold">{orderMetrics.deliveredOrders}</h3>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Revenue</p>
                  <h3 className="text-2xl font-bold">${orderMetrics.totalRevenue.toFixed(2)}</h3>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </Card>
          </div>
          
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="p-4">
              <h3 className="text-lg font-medium mb-4">Order Status Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {statusDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} orders`, 'Count']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
            
            <Card className="p-4">
              <h3 className="text-lg font-medium mb-4">Orders by Status</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={statusDistribution}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" name="Orders" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
          
          {/* Order Management */}
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-4">Order Management</h2>
            <OrderTabs />
          </div>
        </main>
      </div>
    </AnimatedTransition>
  );
};

export default ManagementDashboard;
