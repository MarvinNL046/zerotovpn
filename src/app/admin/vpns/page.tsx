"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2, Search, Star, Check, X, Database } from "lucide-react";
import { VpnForm } from "./vpn-form";
import type { VpnData } from "@/lib/db/vpn-service";

export default function VpnsAdminPage() {
  const [vpns, setVpns] = useState<VpnData[]>([]);
  const [filteredVpns, setFilteredVpns] = useState<VpnData[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [editingVpn, setEditingVpn] = useState<VpnData | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [deleteVpn, setDeleteVpn] = useState<VpnData | null>(null);

  const fetchVpns = async () => {
    try {
      const res = await fetch("/api/admin/vpns");
      const data = await res.json();
      setVpns(data.vpns || []);
      setFilteredVpns(data.vpns || []);
    } catch (error) {
      console.error("Error fetching VPNs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVpns();
  }, []);

  useEffect(() => {
    if (search) {
      const filtered = vpns.filter(
        (vpn) =>
          vpn.name.toLowerCase().includes(search.toLowerCase()) ||
          vpn.slug.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredVpns(filtered);
    } else {
      setFilteredVpns(vpns);
    }
  }, [search, vpns]);

  const handleDelete = async () => {
    if (!deleteVpn) return;

    try {
      const res = await fetch(`/api/admin/vpns/${deleteVpn.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setVpns(vpns.filter((v) => v.id !== deleteVpn.id));
        setDeleteVpn(null);
      }
    } catch (error) {
      console.error("Error deleting VPN:", error);
    }
  };

  const handleCreateSuccess = () => {
    setIsCreateOpen(false);
    fetchVpns();
  };

  const handleEditSuccess = () => {
    setIsEditOpen(false);
    setEditingVpn(null);
    fetchVpns();
  };

  const seedDatabase = async () => {
    if (seeding) return;
    setSeeding(true);

    try {
      const res = await fetch("/api/admin/seed", { method: "POST" });
      const data = await res.json();

      if (data.seeded) {
        alert(`Successfully seeded ${data.count} VPNs!`);
        fetchVpns();
      } else {
        alert(data.message || "Database already has data");
      }
    } catch (error) {
      console.error("Error seeding database:", error);
      alert("Failed to seed database");
    } finally {
      setSeeding(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">VPN Providers</h1>
          <p className="text-muted-foreground">
            Manage VPN providers ({vpns.length} total)
          </p>
        </div>
        <div className="flex gap-2">
          {vpns.length === 0 && (
            <Button variant="outline" onClick={seedDatabase} disabled={seeding}>
              <Database className="h-4 w-4 mr-2" />
              {seeding ? "Seeding..." : "Seed from Static Data"}
            </Button>
          )}
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add VPN
              </Button>
            </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New VPN Provider</DialogTitle>
            </DialogHeader>
            <VpnForm onSuccess={handleCreateSuccess} />
          </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search VPNs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* VPN Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead className="text-center">Rating</TableHead>
                <TableHead className="text-center">Featured</TableHead>
                <TableHead className="text-center">Editor&apos;s Choice</TableHead>
                <TableHead className="text-right">Price/mo</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVpns.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    {vpns.length === 0
                      ? "No VPNs yet. Click 'Add VPN' to create one."
                      : "No VPNs match your search."}
                  </TableCell>
                </TableRow>
              ) : (
                filteredVpns.map((vpn) => (
                  <TableRow key={vpn.id}>
                    <TableCell className="font-mono text-sm">
                      {vpn.sortOrder}
                    </TableCell>
                    <TableCell className="font-medium">{vpn.name}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {vpn.slug}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{vpn.overallRating.toFixed(1)}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {vpn.featured ? (
                        <Check className="h-4 w-4 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-4 w-4 text-muted-foreground mx-auto" />
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {vpn.editorChoice ? (
                        <Check className="h-4 w-4 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-4 w-4 text-muted-foreground mx-auto" />
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      ${vpn.priceMonthly.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setEditingVpn(vpn);
                            setIsEditOpen(true);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteVpn(vpn)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit VPN: {editingVpn?.name}</DialogTitle>
          </DialogHeader>
          {editingVpn && (
            <VpnForm vpn={editingVpn} onSuccess={handleEditSuccess} />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteVpn} onOpenChange={() => setDeleteVpn(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete VPN Provider</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{deleteVpn?.name}&quot;? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
