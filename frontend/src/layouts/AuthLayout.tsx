import { Outlet } from "@tanstack/react-router";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">InvenPro</h1>
          <p className="text-muted-foreground mt-1">Inventory Management System</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-8 shadow-sm">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
