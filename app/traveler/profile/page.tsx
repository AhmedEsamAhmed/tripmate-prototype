"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/lib/context";

export default function TravelerProfilePage() {
  const router = useRouter();
  const { user, logout } = useApp();

  const handleLogout = () => {
    logout();
    router.replace("/welcome");
  };

  if (!user) return null;

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
              <h2 className="font-semibold text-slate-900">{user.name}</h2>
              <p className="text-sm text-slate-600">{user.email}</p>
              {user.phone && <p className="text-sm text-slate-600">{user.phone}</p>}
            </div>
          </div>
        </div>
        <div className="space-y-1">
          <Link
            href="/traveler/profile/edit"
            className="block rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800"
          >
            Edit profile
          </Link>
          <Link
            href="/traveler/profile/payment-history"
            className="block rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800"
          >
            Payment history
          </Link>
          <Link
            href="/traveler/profile/language"
            className="block rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800"
          >
            Language settings
          </Link>
          <Link
            href="/traveler/profile/help"
            className="block rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800"
          >
            Help & support
          </Link>
        </div>
        <Button variant="ghost" fullWidth onClick={handleLogout} className="text-slate-600">
          Log out
        </Button>
      </main>
    </>
  );
}
