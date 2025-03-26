import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { StatsCard } from "@/components/dashboard/stats-card";
import { AlertCard } from "@/components/dashboard/alert-card";
import { TopSellingTable, TopSellingMedicine } from "@/components/dashboard/top-selling-table";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { format, subDays } from "date-fns";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { Search } from '../components/Search';
import { SearchResult } from '@shared/services/search';
import { useLocation } from "wouter";
import { useTranslate } from "@/hooks/use-translate";

// Chart colors
const CHART_COLORS = {
  primary: 'hsl(230, 85%, 60%)',
  secondary: 'hsl(280, 75%, 60%)',
  tertiary: 'hsl(330, 85%, 60%)',
  success: 'hsl(160, 85%, 45%)',
  warning: 'hsl(40, 95%, 55%)',
  error: 'hsl(0, 85%, 60%)',
  info: 'hsl(200, 85%, 60%)',
  purple: 'hsl(270, 85%, 60%)',
  teal: 'hsl(180, 75%, 45%)',
  orange: 'hsl(20, 85%, 55%)'
};

export default function Dashboard() {
  const [dailySalesData, setDailySalesData] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [, setLocation] = useLocation();
  const t = useTranslate();

  // Fetch low stock medicines
  const { data: lowStockMedicines = [] } = useQuery({
    queryKey: ["/api/medicines/low-stock"],
    queryFn: async () => {
      const res = await fetch("/api/medicines/low-stock", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch low stock medicines");
      return res.json();
    },
  });

  // Fetch expiring medicines
  const { data: expiringMedicines = [] } = useQuery({
    queryKey: ["/api/medicines/expiring"],
    queryFn: async () => {
      const res = await fetch("/api/medicines/expiring?days=30", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch expiring medicines");
      return res.json();
    },
  });

  // Fetch top selling medicines
  const { data: topSellingMedicines = [] } = useQuery({
    queryKey: ["/api/analytics/top-selling"],
    queryFn: async () => {
      const res = await fetch("/api/analytics/top-selling?limit=5", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch top selling medicines");
      return res.json();
    },
  });

  // Fetch daily sales
  const { data: dailySales = [] } = useQuery({
    queryKey: ["/api/analytics/daily-sales"],
    queryFn: async () => {
      const res = await fetch("/api/analytics/daily-sales?days=7", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch daily sales");
      return res.json();
    },
  });

  // Format daily sales data for chart
  useEffect(() => {
    if (dailySales.length > 0) {
      const formattedData = dailySales.map((item: any) => ({
        date: format(new Date(item.date), "dd MMM"),
        amount: item.sales,
      })).reverse();
      
      setDailySalesData(formattedData);
    }
  }, [dailySales]);

  // Mock recent activity data
  const recentActivity = [
    {
      id: 1,
      type: "new-stock" as const,
      title: "New stock added",
      description: "50 units of Paracetamol",
      timestamp: subDays(new Date(), 0.007), // 10 minutes ago
    },
    {
      id: 2,
      type: "invoice" as const,
      title: "Invoice #1234 generated",
      description: "For Amit Kumar",
      timestamp: subDays(new Date(), 0.025), // 35 minutes ago
    },
    {
      id: 3,
      type: "low-stock" as const,
      title: "Low stock alert",
      description: "Amoxicillin 250mg (5 left)",
      timestamp: subDays(new Date(), 0.084), // 2 hours ago
    },
    {
      id: 4,
      type: "expired" as const,
      title: "Expired medicine removed",
      description: "20 units of Disprin",
      timestamp: subDays(new Date(), 0.2), // 5 hours ago
    },
  ];

  // Format low stock items for display
  const lowStockItems = lowStockMedicines.slice(0, 3).map((med: any) => ({
    id: med.id,
    name: med.name,
    value: `${med.stock} left`,
    status: med.stock === 0 ? "error" : "warning",
  }));

  // Format expiring items for display
  const expiringItems = expiringMedicines.slice(0, 3).map((med: any) => {
    const today = new Date();
    const expiryDate = new Date(med.expiryDate);
    const daysLeft = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    return {
      id: med.id,
      name: med.name,
      value: `${daysLeft} days left`,
      status: daysLeft <= 5 ? "error" : "warning",
    };
  });

  // Calculate total sales for today
  const todaySales = dailySales.length > 0 ? dailySales[0].sales : 0;
  const todayTransactions = dailySales.length > 0 ? dailySales[0].transactions : 0;

  // Calculate sales change percentage (comparing today with yesterday)
  const yesterdaySales = dailySales.length > 1 ? dailySales[1].sales : 0;
  const salesChange = yesterdaySales > 0 
    ? Math.round(((todaySales - yesterdaySales) / yesterdaySales) * 100) 
    : 0;

  const handleSearch = (results: SearchResult) => {
    setSearchResults(results);
  };

  const handleCardClick = (destination: string) => {
    if (destination === 'sales') {
      setLocation(`/reports?tab=sales`);
    } else if (destination === 'inventory') {
      setLocation(`/inventory`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('dashboardTitle')}</h1>
      
      <Search onSearch={handleSearch} />

      {searchResults && (
        <div className="mt-8">
          {searchResults.medicines.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Medicines</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults.medicines.map((medicine) => (
                  <div key={medicine.id} className="p-4 bg-white rounded-lg shadow">
                    <h3 className="font-medium">{medicine.name}</h3>
                    <p className="text-gray-600">{medicine.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {searchResults.customers.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Customers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults.customers.map((customer) => (
                  <div key={customer.id} className="p-4 bg-white rounded-lg shadow">
                    <h3 className="font-medium">{customer.name}</h3>
                    <p className="text-gray-600">{customer.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {searchResults.doctors.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Doctors</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults.doctors.map((doctor) => (
                  <div key={doctor.id} className="p-4 bg-white rounded-lg shadow">
                    <h3 className="font-medium">{doctor.name}</h3>
                    <p className="text-gray-600">{doctor.specialization}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mt-8 space-y-6">
        {/* Sales Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Daily Sales Card */}
          <StatsCard
            title={t('dailySales')}
            value={`₹${todaySales.toLocaleString()}`}
            description={`${todayTransactions} ${t('transactionsToday')}`}
            change={salesChange}
            onClick={() => handleCardClick('sales')}
          >
            <div className="h-24 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailySalesData}>
                  <XAxis 
                    dataKey="date" 
                    tickLine={false} 
                    axisLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <Tooltip
                    formatter={(value: number) => [`₹${value}`, 'Sales']}
                    labelFormatter={(value) => `Date: ${value}`}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      color: 'hsl(var(--foreground))',
                      padding: '8px',
                      borderRadius: '6px'
                    }}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Bar 
                    dataKey="amount" 
                    fill={CHART_COLORS.info}
                    radius={[4, 4, 0, 0]} 
                    stroke={CHART_COLORS.info}
                    strokeWidth={1}
                    minPointSize={3}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </StatsCard>
          
          {/* Low Stock Alert Card */}
          <AlertCard
            title={t('lowStock')}
            count={lowStockMedicines.length}
            description={t('requiresRestock')}
            items={lowStockItems}
            icon="alert"
            onClick={() => handleCardClick('inventory')}
          />
          
          {/* Expiry Alert Card */}
          <AlertCard
            title={t('expiryAlert')}
            count={expiringMedicines.length}
            description={t('expiringWithinDays')}
            items={expiringItems}
            icon="calendar"
            onClick={() => handleCardClick('inventory')}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Selling Medicines */}
          <TopSellingTable 
            medicines={topSellingMedicines as TopSellingMedicine[]} 
          />
          
          {/* Recent Activity */}
          <RecentActivity activities={recentActivity} />
        </div>
      </div>
    </div>
  );
}
