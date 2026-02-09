"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useApp } from "@/lib/context";

export default function SupplierProfilePage() {
  const router = useRouter();
  const { user, logout } = useApp();

  const handleLogout = () => {
    logout();
    router.replace("/welcome");
  };

  if (!user) return null;

  const typeLabel = user.supplierType === "driver" ? "Driver" : user.supplierType === "tour_guide" ? "Tour Guide" : "Tour Agency";

  return (
    <>
      <Header title="Profile" />
      <main className="px-4 py-6 space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-xl font-semibold">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-slate-900">{user.name}</h2>
                {user.verificationStatus === "approved" && <Badge variant="verified">Verified</Badge>}
                {user.verificationStatus === "pending" && <Badge variant="warning">Pending</Badge>}
              </div>
              <p className="text-sm text-slate-600">{typeLabel}</p>
              <p className="text-sm text-slate-600">{user.email}</p>
              {user.phone && <p className="text-sm text-slate-600">{user.phone}</p>}
            </div>
          </div>
        </div>
        <div className="space-y-1">
          <Link href="/supplier/profile/edit" className="block rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800">
            Edit profile
          </Link>
          <Link href="/supplier/profile/availability" className="block rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800">
            Availability schedule
          </Link>
          <Link href="/supplier/profile/reviews" className="block rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800">
            Reviews & ratings
          </Link>
        </div>
        <Button variant="ghost" fullWidth onClick={handleLogout} className="text-slate-600">
          Log out
        </Button>
      </main>
    </>
  );
}
