
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useStore } from '@/context/StoreContext';
import OrderTabs from '@/components/OrderTabs';
import KanbanBoard from '@/components/KanbanBoard';
import { PlusCircle, ListFilter, LayoutGrid, LayoutDashboard } from 'lucide-react';
import AnimatedTransition from '@/components/AnimatedTransition';
import { useLanguage } from '@/context/LanguageContext';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const Index = () => {
  const { orders, loading } = useStore();
  const [view, setView] = useState<'list' | 'kanban'>('list');
  const { t } = useLanguage();
  
  return (
    <AnimatedTransition location="dashboard">
      <div className="flex flex-col min-h-screen">
        <Header title={t('header.pizzaShop')} />
        
        <main className="flex-1 container mx-auto py-6 px-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <Link to="/new-order">
                <Button className="flex items-center gap-2">
                  <PlusCircle className="h-4 w-4" />
                  {t('app.newOrder')}
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center gap-4">
              <ToggleGroup type="single" value={view} onValueChange={(value) => setView(value as 'list' | 'kanban')}>
                <ToggleGroupItem value="list" variant="outline">
                  {t('index.listView')}
                </ToggleGroupItem>
                <ToggleGroupItem value="kanban" variant="outline">
                  {t('index.kanbanView')}
                </ToggleGroupItem>
              </ToggleGroup>
              
              <Link to="/management">
                <Button variant="outline" className="flex items-center gap-2">
                  <LayoutDashboard className="h-4 w-4" />
                  {t('index.managementDashboard')}
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border dark:border-gray-700">
            <div className="p-4 border-b dark:border-gray-700">
              <h2 className="text-lg font-medium">{t('index.orders')}</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {loading 
                  ? t('app.loading')
                  : t('index.ordersTotal', { count: orders.length })}
              </p>
            </div>
            
            <div className="p-4">
              {view === 'list' ? (
                <OrderTabs />
              ) : (
                <KanbanBoard />
              )}
            </div>
          </div>
        </main>
      </div>
    </AnimatedTransition>
  );
};

export default Index;
