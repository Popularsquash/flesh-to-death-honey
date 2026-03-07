import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  Shield,
  Package,
  DollarSign,
  Tag,
  Eye,
  EyeOff,
  Save,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Users,
  ShoppingCart,
  Mail,
  ArrowLeft,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { SEO } from "@/components/SEO";

type AdminTab = "products" | "orders" | "subscribers";

export default function AdminDashboard() {
  const { user, loading } = useAuth({ redirectOnUnauthenticated: true });
  const [activeTab, setActiveTab] = useState<AdminTab>("products");

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <RefreshCw className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md w-full bg-card border-destructive">
          <CardContent className="p-8 text-center">
            <Shield className="w-16 h-16 text-destructive mx-auto mb-4" />
            <h2 className="font-heading text-2xl text-foreground mb-2">ACCESS DENIED</h2>
            <p className="text-muted-foreground mb-4">You need admin privileges to access this page.</p>
            <Link href="/">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Admin Dashboard | Flesh to Death Honey Co."
        description="Admin dashboard for managing products, orders, and subscribers."
      />

      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-primary" />
            <h1 className="font-heading text-2xl text-foreground">ADMIN DASHBOARD</h1>
          </div>
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Site
            </Button>
          </Link>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-card border-b border-border">
        <div className="container flex gap-1">
          {[
            { id: "products" as AdminTab, label: "Products", icon: Package },
            { id: "orders" as AdminTab, label: "Orders", icon: ShoppingCart },
            { id: "subscribers" as AdminTab, label: "Subscribers", icon: Mail },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 font-body text-sm border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container py-6">
        {activeTab === "products" && <ProductsPanel />}
        {activeTab === "orders" && <OrdersPanel />}
        {activeTab === "subscribers" && <SubscribersPanel />}
      </div>
    </div>
  );
}

function ProductsPanel() {
  const utils = trpc.useUtils();
  const { data: products, isLoading } = trpc.admin.allProducts.useQuery();

  const syncMutation = trpc.products.sync.useMutation({
    onSuccess: (data) => {
      toast.success(`Synced ${data.synced} products. ${data.errors.length} errors.`);
      utils.admin.allProducts.invalidate();
    },
    onError: (err) => {
      toast.error(err.message || "Sync failed");
    },
  });

  const toggleActiveMutation = trpc.admin.toggleActive.useMutation({
    onSuccess: () => {
      utils.admin.allProducts.invalidate();
      toast.success("Product updated");
    },
  });

  const updateDetailsMutation = trpc.admin.updateDetails.useMutation({
    onSuccess: () => {
      utils.admin.allProducts.invalidate();
      toast.success("Details saved");
    },
  });

  const updatePriceMutation = trpc.admin.updatePrice.useMutation({
    onSuccess: () => {
      utils.admin.allProducts.invalidate();
      toast.success("Price updated");
    },
  });

  const toggleSaleMutation = trpc.admin.toggleSale.useMutation({
    onSuccess: () => {
      utils.admin.allProducts.invalidate();
      toast.success("Sale status updated");
    },
  });

  const [expandedProduct, setExpandedProduct] = useState<number | null>(null);
  const [editingName, setEditingName] = useState<Record<number, string>>({});
  const [editingDesc, setEditingDesc] = useState<Record<number, string>>({});
  const [editingPrice, setEditingPrice] = useState<Record<number, string>>({});
  const [editingSalePrice, setEditingSalePrice] = useState<Record<number, string>>({});
  const [editingSaleLabel, setEditingSaleLabel] = useState<Record<number, string>>({});

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <RefreshCw className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Actions Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Package className="w-5 h-5 text-primary" />
          <h2 className="font-heading text-xl text-foreground">
            PRODUCTS ({products?.length || 0})
          </h2>
        </div>
        <Button
          onClick={() => syncMutation.mutate()}
          disabled={syncMutation.isPending}
          variant="outline"
          size="sm"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${syncMutation.isPending ? "animate-spin" : ""}`} />
          {syncMutation.isPending ? "Syncing..." : "Sync from Printful"}
        </Button>
      </div>

      {/* Product Cards */}
      <div className="space-y-3">
        {products?.map((product) => {
          const isExpanded = expandedProduct === product.id;
          const minPrice = product.variants.length > 0
            ? Math.min(...product.variants.map((v) => v.retailPrice))
            : 0;

          return (
            <Card
              key={product.id}
              className={`bg-card border-border transition-all ${
                !product.isActive ? "opacity-60" : ""
              }`}
            >
              <CardContent className="p-4">
                {/* Product Row */}
                <div className="flex items-center gap-4">
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded overflow-hidden bg-muted flex-shrink-0">
                    {product.thumbnailUrl ? (
                      <img
                        src={product.thumbnailUrl}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <Package className="w-6 h-6" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-heading text-lg text-foreground truncate">
                        {product.name}
                      </h3>
                      {product.onSale === 1 && (
                        <Badge className="bg-red-600 text-white text-xs">
                          {product.saleLabel || "SALE"}
                        </Badge>
                      )}
                      {!product.isActive && (
                        <Badge variant="outline" className="text-muted-foreground text-xs">
                          HIDDEN
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                      <span>{product.variants.length} variants</span>
                      <span>
                        <DollarSign className="w-3 h-3 inline" />
                        {(minPrice / 100).toFixed(2)}
                      </span>
                      <span>ID: {product.id}</span>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {product.isActive ? "Visible" : "Hidden"}
                      </span>
                      <Switch
                        checked={product.isActive === 1}
                        onCheckedChange={(checked) =>
                          toggleActiveMutation.mutate({
                            productId: product.id,
                            isActive: checked,
                          })
                        }
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setExpandedProduct(isExpanded ? null : product.id)
                      }
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-border space-y-4">
                    {/* Edit Name */}
                    <div>
                      <label className="text-sm font-body text-muted-foreground mb-1 block">
                        Product Name
                      </label>
                      <div className="flex gap-2">
                        <Input
                          value={editingName[product.id] ?? product.name}
                          onChange={(e) =>
                            setEditingName({ ...editingName, [product.id]: e.target.value })
                          }
                          className="bg-muted"
                        />
                        <Button
                          size="sm"
                          disabled={
                            updateDetailsMutation.isPending ||
                            (editingName[product.id] ?? product.name) === product.name
                          }
                          onClick={() =>
                            updateDetailsMutation.mutate({
                              productId: product.id,
                              name: editingName[product.id],
                            })
                          }
                        >
                          <Save className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Edit Description */}
                    <div>
                      <label className="text-sm font-body text-muted-foreground mb-1 block">
                        Description
                      </label>
                      <div className="flex gap-2">
                        <Textarea
                          value={editingDesc[product.id] ?? product.description ?? ""}
                          onChange={(e) =>
                            setEditingDesc({ ...editingDesc, [product.id]: e.target.value })
                          }
                          className="bg-muted min-h-[80px]"
                        />
                        <Button
                          size="sm"
                          disabled={updateDetailsMutation.isPending}
                          onClick={() =>
                            updateDetailsMutation.mutate({
                              productId: product.id,
                              description: editingDesc[product.id],
                            })
                          }
                        >
                          <Save className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Edit Price */}
                    <div>
                      <label className="text-sm font-body text-muted-foreground mb-1 block">
                        Price (all variants)
                      </label>
                      <div className="flex gap-2 items-center">
                        <span className="text-foreground">$</span>
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          value={
                            editingPrice[product.id] ?? (minPrice / 100).toFixed(2)
                          }
                          onChange={(e) =>
                            setEditingPrice({ ...editingPrice, [product.id]: e.target.value })
                          }
                          className="bg-muted w-32"
                        />
                        <Button
                          size="sm"
                          disabled={updatePriceMutation.isPending}
                          onClick={() => {
                            const cents = Math.round(
                              parseFloat(editingPrice[product.id] || "0") * 100
                            );
                            updatePriceMutation.mutate({
                              productId: product.id,
                              priceCents: cents,
                            });
                          }}
                        >
                          <DollarSign className="w-4 h-4 mr-1" />
                          Update Price
                        </Button>
                      </div>
                    </div>

                    {/* Sale Controls */}
                    <div className="bg-muted/50 rounded-lg p-4 border border-border">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4 text-red-500" />
                          <span className="font-body text-sm text-foreground font-medium">
                            HIVES GARAGE SALE
                          </span>
                        </div>
                        <Switch
                          checked={product.onSale === 1}
                          onCheckedChange={(checked) => {
                            const salePriceCents = editingSalePrice[product.id]
                              ? Math.round(parseFloat(editingSalePrice[product.id]) * 100)
                              : product.salePrice || Math.round(minPrice * 0.75);
                            toggleSaleMutation.mutate({
                              productId: product.id,
                              onSale: checked,
                              salePrice: salePriceCents,
                              saleLabel: editingSaleLabel[product.id] || product.saleLabel || "25% OFF",
                            });
                          }}
                        />
                      </div>
                      {product.onSale === 1 && (
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs text-muted-foreground mb-1 block">
                              Sale Price
                            </label>
                            <div className="flex items-center gap-1">
                              <span className="text-foreground text-sm">$</span>
                              <Input
                                type="number"
                                step="0.01"
                                min="0"
                                value={
                                  editingSalePrice[product.id] ??
                                  (product.salePrice ? (product.salePrice / 100).toFixed(2) : "")
                                }
                                onChange={(e) =>
                                  setEditingSalePrice({
                                    ...editingSalePrice,
                                    [product.id]: e.target.value,
                                  })
                                }
                                className="bg-background h-8 text-sm"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-xs text-muted-foreground mb-1 block">
                              Sale Label
                            </label>
                            <Input
                              value={
                                editingSaleLabel[product.id] ?? product.saleLabel ?? "SALE"
                              }
                              onChange={(e) =>
                                setEditingSaleLabel({
                                  ...editingSaleLabel,
                                  [product.id]: e.target.value,
                                })
                              }
                              className="bg-background h-8 text-sm"
                              placeholder="e.g. 25% OFF"
                            />
                          </div>
                          <div className="col-span-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-full border-red-600 text-red-500 hover:bg-red-600/10"
                              disabled={toggleSaleMutation.isPending}
                              onClick={() => {
                                const salePriceCents = editingSalePrice[product.id]
                                  ? Math.round(parseFloat(editingSalePrice[product.id]) * 100)
                                  : product.salePrice || 0;
                                toggleSaleMutation.mutate({
                                  productId: product.id,
                                  onSale: true,
                                  salePrice: salePriceCents,
                                  saleLabel: editingSaleLabel[product.id] || product.saleLabel || "SALE",
                                });
                              }}
                            >
                              <Save className="w-4 h-4 mr-1" />
                              Save Sale Settings
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Variants List */}
                    <div>
                      <label className="text-sm font-body text-muted-foreground mb-2 block">
                        Variants ({product.variants.length})
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-60 overflow-y-auto">
                        {product.variants.map((variant) => (
                          <div
                            key={variant.id}
                            className="flex items-center gap-2 p-2 bg-muted rounded text-sm"
                          >
                            {variant.imageUrl && (
                              <img
                                src={variant.imageUrl}
                                alt={variant.name}
                                className="w-8 h-8 rounded object-cover"
                              />
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="truncate text-foreground">{variant.name}</div>
                              <div className="text-xs text-muted-foreground">
                                ${(variant.retailPrice / 100).toFixed(2)}
                                {variant.size && ` · ${variant.size}`}
                                {variant.color && ` · ${variant.color}`}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function OrdersPanel() {
  const { data: orders, isLoading } = trpc.admin.pendingOrders.useQuery();
  const utils = trpc.useUtils();

  const markProcessedMutation = trpc.admin.markOrderProcessed.useMutation({
    onSuccess: () => {
      utils.admin.pendingOrders.invalidate();
      toast.success("Order marked as processed");
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <RefreshCw className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <ShoppingCart className="w-5 h-5 text-primary" />
        <h2 className="font-heading text-xl text-foreground">
          PENDING ORDERS ({orders?.length || 0})
        </h2>
      </div>

      {(!orders || orders.length === 0) ? (
        <Card className="bg-card border-border">
          <CardContent className="p-8 text-center">
            <ShoppingCart className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No pending orders at this time.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <Card key={order.id} className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-heading text-foreground">Order #{order.id}</div>
                    <div className="text-sm text-muted-foreground">
                      ${(order.totalAmount / 100).toFixed(2)} · {order.status}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => markProcessedMutation.mutate({ orderId: order.id })}
                    disabled={markProcessedMutation.isPending}
                  >
                    Mark Processed
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function SubscribersPanel() {
  const { data: subscribers, isLoading } = trpc.admin.subscribers.useQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <RefreshCw className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Mail className="w-5 h-5 text-primary" />
        <h2 className="font-heading text-xl text-foreground">
          EMAIL SUBSCRIBERS ({subscribers?.length || 0})
        </h2>
      </div>

      {(!subscribers || subscribers.length === 0) ? (
        <Card className="bg-card border-border">
          <CardContent className="p-8 text-center">
            <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No subscribers yet.</p>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-card border-border">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 font-body text-muted-foreground">Email</th>
                    <th className="text-left p-3 font-body text-muted-foreground">Interest</th>
                    <th className="text-left p-3 font-body text-muted-foreground">Date</th>
                    <th className="text-left p-3 font-body text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((sub) => (
                    <tr key={sub.id} className="border-b border-border/50">
                      <td className="p-3 text-foreground">{sub.email}</td>
                      <td className="p-3 text-muted-foreground">{sub.interest}</td>
                      <td className="p-3 text-muted-foreground">
                        {new Date(sub.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-3">
                        <Badge
                          variant={sub.isActive ? "default" : "outline"}
                          className={sub.isActive ? "bg-green-600" : ""}
                        >
                          {sub.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
