import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { analyticsService } from "@/services/analytics.service";
import { useLowStock } from "@/hooks/useInventory";
import { Package, TrendingUp, AlertTriangle, ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/_dashboard/dashboard")({
  component: DashboardPage,
});

function StatCard({
  title,
  value,
  icon: Icon,
  color,
}: {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
}) {
  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}

function DashboardPage() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => analyticsService.getDashboard().then((r) => r.data),
  });
  const { data: lowStock } = useLowStock();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-card border border-border rounded-lg p-5 h-24 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Products"
          value={stats?.totalProducts ?? 0}
          icon={Package}
          color="bg-blue-100 text-blue-600"
        />
        <StatCard
          title="Total Revenue"
          value={`$${(stats?.totalRevenue ?? 0).toLocaleString()}`}
          icon={TrendingUp}
          color="bg-green-100 text-green-600"
        />
        <StatCard
          title="Low Stock Items"
          value={stats?.lowStockCount ?? lowStock?.length ?? 0}
          icon={AlertTriangle}
          color="bg-yellow-100 text-yellow-600"
        />
        <StatCard
          title="Active Orders"
          value={stats?.activeOrders ?? 0}
          icon={ShoppingBag}
          color="bg-purple-100 text-purple-600"
        />
      </div>

      {/* Low Stock Alert */}
      {lowStock && lowStock.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
            <AlertTriangle size={16} /> Low Stock Alerts ({lowStock.length})
          </h3>
          <ul className="space-y-1">
            {lowStock.slice(0, 5).map((item) => (
              <li key={item.id} className="text-sm text-yellow-700">
                {item.productName} — {item.quantity} remaining (threshold: {item.lowStockThreshold})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
