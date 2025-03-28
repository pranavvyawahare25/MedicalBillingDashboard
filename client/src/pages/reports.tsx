import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable } from "@/components/ui/data-table";
import { Download, ArrowRight, FileText, BarChart2, TrendingUp, TrendingDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format, subDays, startOfMonth, endOfMonth, startOfYear, endOfYear } from "date-fns";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend
} from "recharts";
import { useLocation } from "wouter";
import { useTranslate } from "@/hooks/use-translate";

export default function Reports() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(location.split('?')[1]);
  const defaultTab = searchParams.get('tab') || 'sales';
  
  const [dateRange, setDateRange] = useState("week");
  const [gstPeriod, setGstPeriod] = useState("month");
  const { toast } = useToast();
  const t = useTranslate();

  // Get date range based on selection
  const getDateRange = () => {
    const today = new Date();

    switch (dateRange) {
      case "week":
        return { start: subDays(today, 7), end: today };
      case "month":
        return { start: startOfMonth(today), end: endOfMonth(today) };
      case "quarter":
        return { start: subDays(today, 90), end: today };
      case "year":
        return { start: startOfYear(today), end: endOfYear(today) };
      default:
        return { start: subDays(today, 7), end: today };
    }
  };

  // Format date range for display
  const formatDateRange = () => {
    const { start, end } = getDateRange();
    return `${format(start, "dd MMM, yyyy")} - ${format(end, "dd MMM, yyyy")}`;
  };

  // Fetch daily sales
  const { data: dailySales = [] } = useQuery({
    queryKey: ["/api/analytics/daily-sales", dateRange],
    queryFn: async () => {
      const days = dateRange === "week" ? 7 : dateRange === "month" ? 30 : dateRange === "quarter" ? 90 : 365;
      const res = await fetch(`/api/analytics/daily-sales?days=${days}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch daily sales");
      return res.json();
    },
  });

  // Fetch top selling medicines
  const { data: topSellingMedicines = [] } = useQuery({
    queryKey: ["/api/analytics/top-selling"],
    queryFn: async () => {
      const res = await fetch("/api/analytics/top-selling?limit=10", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch top selling medicines");
      return res.json();
    },
  });

  // Prepare chart data
  const [salesChartData, setSalesChartData] = useState<any[]>([]);
  const [categoryChartData, setCategoryChartData] = useState<any[]>([]);

  useEffect(() => {
    if (dailySales.length > 0) {
      // Format data for sales chart
      const formattedSalesData = dailySales.map((item: any) => ({
        date: format(new Date(item.date), "dd MMM"),
        sales: item.sales,
      })).reverse();

      setSalesChartData(formattedSalesData);

      // Mock category distribution data
      // In a real app, this would come from an API
      const categories = [
        { name: "Antibiotics", value: 35 },
        { name: "Pain Relief", value: 25 },
        { name: "Supplements", value: 20 },
        { name: "Cold & Cough", value: 10 },
        { name: "Antiallergic", value: 10 },
      ];

      setCategoryChartData(categories);
    }
  }, [dailySales, dateRange]);

  // Download reports in CSV format
  const downloadReport = (type: string) => {
    const data = type === "gstr1" ? gstReportData : type === "gstr3b" ? gstReportData : [];
    const filename = `${type}-report-${format(new Date(), 'yyyy-MM-dd')}.csv`;

    const csvContent = "data:text/csv;charset=utf-8," + 
      "Month,Taxable Amount,CGST,SGST,Total Tax,Total Amount\n" +
      data.map(row => 
        `${row.month},${row.taxableAmount},${row.cgst},${row.sgst},${row.totalTax},${row.totalAmount}`
      ).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Report Downloaded",
      description: `The ${type} report has been downloaded as ${filename}`,
    });
  };

  // Top selling medicines table columns
  const topSellingColumns = [
    {
      key: "name",
      header: "Medicine",
      cell: (row: any) => <div className="font-medium">{row.name}</div>,
    },
    {
      key: "category",
      header: "Category",
      cell: (row: any) => <div>{row.category}</div>,
    },
    {
      key: "soldUnits",
      header: "Units Sold",
      cell: (row: any) => <div>{row.soldUnits}</div>,
    },
    {
      key: "revenue",
      header: "Revenue",
      cell: (row: any) => <div className="font-medium">₹{Number(row.revenue).toFixed(2)}</div>,
    },
  ];

  // Mock GST report data
  const gstReportData = [
    { 
      month: "May 2023", 
      taxableAmount: 24500, 
      cgst: 2205, 
      sgst: 2205, 
      totalTax: 4410, 
      totalAmount: 28910 
    },
    { 
      month: "April 2023", 
      taxableAmount: 31200, 
      cgst: 2808, 
      sgst: 2808, 
      totalTax: 5616, 
      totalAmount: 36816 
    },
    { 
      month: "March 2023", 
      taxableAmount: 27800, 
      cgst: 2502, 
      sgst: 2502, 
      totalTax: 5004, 
      totalAmount: 32804 
    },
  ];

  // GST report table columns
  const gstReportColumns = [
    {
      key: "month",
      header: "Month",
      cell: (row: any) => <div className="font-medium">{row.month}</div>,
    },
    {
      key: "taxableAmount",
      header: "Taxable Amount",
      cell: (row: any) => <div>₹{row.taxableAmount.toFixed(2)}</div>,
    },
    {
      key: "cgst",
      header: "CGST",
      cell: (row: any) => <div>₹{row.cgst.toFixed(2)}</div>,
    },
    {
      key: "sgst",
      header: "SGST",
      cell: (row: any) => <div>₹{row.sgst.toFixed(2)}</div>,
    },
    {
      key: "totalTax",
      header: "Total Tax",
      cell: (row: any) => <div className="font-medium">₹{row.totalTax.toFixed(2)}</div>,
    },
    {
      key: "totalAmount",
      header: "Total Amount",
      cell: (row: any) => <div className="font-medium">₹{row.totalAmount.toFixed(2)}</div>,
    },
  ];

  // Calculate total sales for the selected period
  const totalSales = salesChartData.reduce((sum, day) => sum + day.sales, 0);

  // Colors for charts
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

  // Colors for pie chart
  const COLORS = [
    CHART_COLORS.primary,
    CHART_COLORS.secondary,
    CHART_COLORS.tertiary,
    CHART_COLORS.success,
    CHART_COLORS.warning,
    CHART_COLORS.info,
    CHART_COLORS.purple,
    CHART_COLORS.teal
  ];

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">{t('reportsAndAnalytics')}</h2>
      </div>

      <Tabs defaultValue={defaultTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="sales">{t('salesReports')}</TabsTrigger>
          <TabsTrigger value="gst">{t('gstReports')}</TabsTrigger>
          <TabsTrigger value="inventory">{t('inventoryReports')}</TabsTrigger>
        </TabsList>

        {/* Sales Reports */}
        <TabsContent value="sales">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
            <div>
              <h3 className="text-lg font-semibold">{t('salesOverview')}</h3>
              <p className="text-sm text-muted-foreground">{formatDateRange()}</p>
            </div>
            <div className="flex gap-2">
              <Select
                value={dateRange}
                onValueChange={setDateRange}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder={t('selectPeriod')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">{t('last7Days')}</SelectItem>
                  <SelectItem value="30">{t('last30Days')}</SelectItem>
                  <SelectItem value="90">{t('last90Days')}</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" onClick={() => downloadReport("sales")}>
                <Download className="h-4 w-4 mr-2" /> Export
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {t('totalSales')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{totalSales.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  <TrendingUp className="h-3 w-3 inline mr-1 text-green-500" />
                  <span className="text-green-500 font-medium">+12.5%</span> vs previous period
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {t('averageOrderValue')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹485.75</div>
                <div className="text-xs text-muted-foreground mt-1">
                  <TrendingUp className="h-3 w-3 inline mr-1 text-green-500" />
                  <span className="text-green-500 font-medium">+3.2%</span> vs previous period
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {t('totalTransactions')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">184</div>
                <div className="text-xs text-muted-foreground mt-1">
                  <TrendingDown className="h-3 w-3 inline mr-1 text-red-500" />
                  <span className="text-red-500 font-medium">-2.1%</span> vs previous period
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>{t('dailySales')}</CardTitle>
                <CardDescription>{t('salesTrendForSelectedPeriod')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={salesChartData}>
                      <XAxis 
                        dataKey="date" 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `₹${value}`}
                      />
                      <Tooltip 
                        formatter={(value: any) => [`₹${value}`, 'Sales']}
                        labelFormatter={(value) => `Date: ${value}`}
                        contentStyle={{
                          backgroundColor: 'hsl(var(--background))',
                          border: '1px solid hsl(var(--border))',
                          color: 'hsl(var(--foreground))'
                        }}
                        labelStyle={{ color: 'hsl(var(--foreground))' }}
                        itemStyle={{ color: 'hsl(var(--foreground))' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="sales" 
                        stroke={CHART_COLORS.primary}
                        strokeWidth={2} 
                        activeDot={{ r: 6, fill: CHART_COLORS.primary }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('salesByCategory')}</CardTitle>
                <CardDescription>{t('distributionOfSalesByCategory')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {categoryChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: any) => [`${value}%`, 'Percentage']}
                        contentStyle={{
                          backgroundColor: 'hsl(var(--background))',
                          border: '1px solid hsl(var(--border))',
                          color: 'hsl(var(--foreground))'
                        }}
                        labelStyle={{ color: 'hsl(var(--foreground))' }}
                        itemStyle={{ color: 'hsl(var(--foreground))' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>{t('topSellingProducts')}</CardTitle>
              <CardDescription>{t('productsWithTheHighestSalesInTheSelectedPeriod')}</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={topSellingMedicines}
                columns={topSellingColumns}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* GST Reports */}
        <TabsContent value="gst">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
            <div>
              <h3 className="text-lg font-semibold">{t('gstReports')}</h3>
              <p className="text-sm text-muted-foreground">{t('gstr1ReportsForTaxFiling')}</p>
            </div>
            <div className="flex gap-2">
              <Select
                value={gstPeriod}
                onValueChange={setGstPeriod}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Monthly</SelectItem>
                  <SelectItem value="quarter">Quarterly</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" onClick={() => downloadReport("gst")}>
                <Download className="h-4 w-4 mr-2" /> Export
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {t('taxableAmount')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹24,500.00</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  CGST
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹2,205.00</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  SGST
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹2,205.00</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {t('totalTax')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹4,410.00</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{t('monthlyGstSummary')}</CardTitle>
              <CardDescription>{t('gstDetailsForThePast3Months')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={gstReportData}>
                    <XAxis
                      dataKey="month"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `₹${value}`}
                    />
                    <Tooltip
                      formatter={(value: any) => [`₹${value}`, 'Amount']}
                      contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        color: 'hsl(var(--foreground))'
                      }}
                      labelStyle={{ color: 'hsl(var(--foreground))' }}
                      itemStyle={{ color: 'hsl(var(--foreground))' }}
                    />
                    <Legend 
                      formatter={(value) => <span style={{ color: 'hsl(var(--foreground))' }}>{value}</span>}
                    />
                    <Bar dataKey="cgst" name="CGST" fill={CHART_COLORS.primary} radius={[4, 4, 0, 0]} />
                    <Bar dataKey="sgst" name="SGST" fill={CHART_COLORS.secondary} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <DataTable
                data={gstReportData}
                columns={gstReportColumns}
              />
            </CardContent>
          </Card>

          <div className="mt-6 flex gap-4 flex-wrap">
            <Button className="flex items-center" onClick={() => downloadReport("gstr1")}>
              <FileText className="h-4 w-4 mr-2" /> {t('generateGstr1Report')}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>

            <Button variant="outline" className="flex items-center" onClick={() => downloadReport("gstr3b")}>
              <FileText className="h-4 w-4 mr-2" /> {t('generateGstr3bReport')}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </TabsContent>

        {/* Inventory Reports */}
        <TabsContent value="inventory">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
            <div>
              <h3 className="text-lg font-semibold">{t('inventoryReports')}</h3>
              <p className="text-sm text-muted-foreground">{t('stockMovementAndValuationReports')}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => downloadReport("inventory")}>
                <Download className="h-4 w-4 mr-2" /> Export
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {t('totalProducts')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">182</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {t('lowStockItems')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-500">8</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {t('outOfStock')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-500">3</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {t('expiringSoon')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-500">12</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('stockValuation')}</CardTitle>
                <CardDescription>{t('currentInventoryValueByCategory')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={[
                        { name: "Antibiotics", value: 45000 },
                        { name: "Pain Relief", value: 28000 },
                        { name: "Supplements", value: 32000 },
                        { name: "Cold & Cough", value: 18000 },
                        { name: "Antiallergic", value: 12000 },
                      ]}
                    >
                      <XAxis 
                        dataKey="name" 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `₹${value/1000}k`}
                      />
                      <Tooltip 
                        formatter={(value: any) => [`₹${value.toLocaleString()}`, 'Value']}
                        contentStyle={{
                          backgroundColor: 'hsl(var(--background))',
                          border: '1px solid hsl(var(--border))',
                          color: 'hsl(var(--foreground))'
                        }}
                        labelStyle={{ color: 'hsl(var(--foreground))' }}
                        itemStyle={{ color: 'hsl(var(--foreground))' }}
                      />
                      <Bar dataKey="value" name="Inventory Value" fill={CHART_COLORS.primary} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-center text-sm text-muted-foreground mt-4">
                  <p>{t('totalInventoryValue')}: <span className="font-bold">₹1,35,000</span></p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('stockMovement')}</CardTitle>
                <CardDescription>{t('inventoryTransactionsInTheLast30Days')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { date: "1 May", purchases: 20, sales: 12 },
                        { date: "5 May", purchases: 0, sales: 8 },
                        { date: "10 May", purchases: 30, sales: 14 },
                        { date: "15 May", purchases: 0, sales: 10 },
                        { date: "20 May", purchases: 15, sales: 6 },
                        { date: "25 May", purchases: 0, sales: 9 },
                        { date: "30 May", purchases: 25, sales: 15 },
                      ]}
                    >
                      <XAxis
                        dataKey="date"
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'hsl(var(--background))',
                          border: '1px solid hsl(var(--border))',
                          color: 'hsl(var(--foreground))'
                        }}
                        labelStyle={{ color: 'hsl(var(--foreground))' }}
                        itemStyle={{ color: 'hsl(var(--foreground))' }}
                      />
                      <Legend 
                        formatter={(value) => <span style={{ color: 'hsl(var(--foreground))' }}>{value}</span>}
                      />
                      <Line
                        type="monotone"
                        dataKey="purchases"
                        name="Purchases"
                        stroke={CHART_COLORS.success}
                        strokeWidth={2}
                        activeDot={{ r: 6, fill: CHART_COLORS.success }}
                      />
                      <Line
                        type="monotone"
                        dataKey="sales"
                        name="Sales"
                        stroke={CHART_COLORS.info}
                        strokeWidth={2}
                        activeDot={{ r: 6, fill: CHART_COLORS.info }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 flex gap-4 flex-wrap">
            <Button 
              className="flex items-center" 
              onClick={async () => {
                try {
                  const response = await fetch('/api/reports/stock-adjustment', {
                    credentials: 'include'
                  });
                  
                  if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to fetch stock adjustment data');
                  }
                  
                  const data = await response.json();
                  
                  // Create CSV content
                  const csvContent = [
                    ['Medicine', 'Old Stock', 'New Stock', 'Reason', 'Date'].join(','),
                    ...data.map((row: any) => [
                      `"${row.medicine}"`,
                      row.oldStock,
                      row.newStock,
                      `"${row.reason}"`,
                      new Date(row.date).toLocaleDateString()
                    ].join(','))
                  ].join('\n');
                  
                  // Create and trigger download
                  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                  const url = window.URL.createObjectURL(blob);
                  const link = document.createElement('a');
                  link.setAttribute('href', url);
                  link.setAttribute('download', `stock-adjustment-report-${new Date().toISOString().split('T')[0]}.csv`);
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  
                  toast({
                    title: t('success'),
                    description: t('downloadSuccess'),
                  });
                } catch (error) {
                  console.error('Error downloading stock adjustment report:', error);
                  toast({
                    variant: "destructive",
                    title: t('error'),
                    description: t('downloadError'),
                  });
                }
              }}
            >
              <BarChart2 className="h-4 w-4 mr-2" /> {t('stockAdjustmentReport')}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>

            <Button 
              variant="outline" 
              className="flex items-center"
              onClick={async () => {
                try {
                  const response = await fetch('/api/reports/expiry');
                  const data = await response.json();
                  const csv = [
                    ['Medicine', 'Batch', 'Expiry Date', 'Current Stock', 'Days Until Expiry'].join(','),
                    ...data.map((row: any) => [
                      row.name,
                      row.batch,
                      new Date(row.expiryDate).toLocaleDateString(),
                      row.stock,
                      row.daysLeft
                    ].join(','))
                  ].join('\n');
                  
                  const blob = new Blob([csv], { type: 'text/csv' });
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `expiry-report-${new Date().toISOString().split('T')[0]}.csv`;
                  a.click();
                } catch (error) {
                  toast({
                    title: "Error",
                    description: "Failed to generate report",
                    variant: "destructive"
                  });
                }
              }}
            >
              <BarChart2 className="h-4 w-4 mr-2" /> {t('expiryReport')}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}