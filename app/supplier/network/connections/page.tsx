"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Badge } from "@/components/ui/Badge";
import { useApp } from "@/lib/context";
import { getConnections, getSupplierById } from "@/lib/network-store";

export default function NetworkConnectionsPage() {
  const { user } = useApp();
  const connections = user?.id ? getConnections(user.id) : [];
  const accepted = connections.filter((c) => c.status === "accepted");
  const pending = connections.filter((c) => c.status === "pending");

  const otherSupplierId = (c: (typeof connections)[0]) =>
    c.supplierOneId === user?.id ? c.supplierTwoId : c.supplierOneId;

  return (
    <>
      <Header title="Connections" backHref="/supplier/network" />
      <main className="px-4 py-4 space-y-6">
        {pending.length > 0 && (
          <div>
            <h2 className="section-title mb-3">Pending</h2>
            <ul className="space-y-2">
              {pending.map((c) => {
                const otherId = otherSupplierId(c);
                const other = getSupplierById(otherId);
                return (
                  <li key={c.id} className="rounded-2xl border border-slate-200 bg-white p-4 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">{other?.name ?? otherId}</p>
                      <p className="text-sm text-slate-500">{other?.type ?? ""}</p>
                    </div>
                    <Badge variant="warning">Pending</Badge>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        <div>
          <h2 className="section-title mb-3">Connections ({accepted.length})</h2>
          {accepted.length === 0 ? (
            <div className="empty-state">
              <p>No connections yet.</p>
              <p className="text-sm mt-1">Use &quot;Connect&quot; on posts in the Network feed.</p>
            </div>
          ) : (
            <ul className="space-y-2">
              {accepted.map((c) => {
                const otherId = otherSupplierId(c);
                const other = getSupplierById(otherId);
                return (
                  <li key={c.id} className="rounded-2xl border border-slate-200 bg-white p-4 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">{other?.name ?? otherId}</p>
                      <p className="text-sm text-slate-500">{other?.type ?? ""}</p>
                    </div>
                    <Badge variant="success">Connected</Badge>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </main>
    </>
  );
}
