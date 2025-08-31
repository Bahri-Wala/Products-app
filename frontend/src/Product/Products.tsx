import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  MoreVertical,
  Plus,
  Edit2,
  Trash2,
} from "lucide-react";
import useGetProducts from "./hooks/useGetProducts";
import { useCreateProduct } from "./hooks/useCreateProduct";
import { useUpdateProduct } from "./hooks/useUpdateProduct";
import { useDeleteProduct } from "./hooks/useDeleteProduct";
import { useCreateVariant } from "../Variant/hooks/useCreateVariant";
import { useUpdateVariant } from "../Variant/hooks/useUpdateVariant";
import { useDeleteVariant } from "../Variant/hooks/useDeleteVariant";

interface EditingItem {
  type: "product" | "variant";
  id: string;
}

interface MenuState {
  product: number | null;
  variant: string | null;
}

interface DropdownItem {
  icon: React.ReactNode;
  label: string;
  action: () => void;
}

interface DropdownMenuProps {
  items: DropdownItem[];
  onSelect: (action: () => void) => void;
  isOpen: boolean;
}

const ProductVariantManager: React.FC = () => {
  const { data: products, refetch: refetchProducts } = useGetProducts();
  const { mutateAsync: createProduct } = useCreateProduct();
  const { mutateAsync: updateProduct } = useUpdateProduct();
  const { mutateAsync: removeProduct } = useDeleteProduct();
  const { mutateAsync: createVariant } = useCreateVariant();
  const { mutateAsync: updateVariant } = useUpdateVariant();
  const { mutateAsync: removeVariant } = useDeleteVariant();

  const [expandedProducts, setExpandedProducts] = useState<Set<number>>(
    new Set()
  );
  const [openMenus, setOpenMenus] = useState<MenuState>({
    product: null,
    variant: null,
  });
  const [editingItem, setEditingItem] = useState<EditingItem | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  const toggleExpanded = (productIndex: number): void => {
    const newExpanded = new Set(expandedProducts);
    if (newExpanded.has(productIndex)) {
      newExpanded.delete(productIndex);
    } else {
      newExpanded.add(productIndex);
    }
    setExpandedProducts(newExpanded);
  };

  const toggleMenu = (
    type: "product" | "variant",
    id: number | string
  ): void => {
    setOpenMenus((prev) => ({
      ...prev,
      [type]: prev[type] === id ? null : id,
    }));
  };

  const startEdit = (
    type: "product" | "variant",
    id: string,
    currentName: string
  ): void => {
    setEditingItem({
      type,
      id,
    });
    setEditValue(currentName);
    setOpenMenus({ product: null, variant: null });
  };

  const saveEdit = async (): Promise<void> => {
    if (!editingItem || !editValue.trim()) return;
    if (editingItem.type == "product") {
      await updateProduct({ id: editingItem.id, name: editValue.trim() });
    } else {
      await updateVariant({ id: editingItem.id, name: editValue.trim() });
    }
    await refetchProducts();
    setEditingItem(null);
    setEditValue("");
  };

  const cancelEdit = (): void => {
    setEditingItem(null);
    setEditValue("");
  };

  const deleteProduct = async (productId: string): Promise<void> => {
    await removeProduct(productId);
    await refetchProducts();
    setOpenMenus({ product: null, variant: null });
  };

  const deleteVariant = async (variantId: string): Promise<void> => {
    await removeVariant(variantId);
    await refetchProducts();
    setOpenMenus({ product: null, variant: null });
  };

  const addProduct = async (): Promise<void> => {
    await createProduct({ name: "new_product" });
    await refetchProducts();
  };

  const addVariant = async (productId: string): Promise<void> => {
    await createVariant({ name: "new_variant", product_id: productId });
    await refetchProducts();
    setOpenMenus({ product: null, variant: null });
  };

  const DropdownMenu: React.FC<DropdownMenuProps> = ({
    items,
    onSelect,
    isOpen,
  }) => {
    if (!isOpen) return null;

    return (
      <div className="absolute right-0 top-8 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-50 min-w-32">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => onSelect(item.action)}
            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-gray-700"
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="max-full mx-auto p-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
          <h1 className="text-2xl font-bold text-white">Product Management</h1>
          <p className="text-blue-100 text-sm mt-1">
            Manage your products and variants
          </p>
        </div>

        <div className="p-6">
          <div className="space-y-3">
            {products?.map((product) => (
              <div
                key={product.id}
                className="border border-gray-200 rounded-lg bg-gray-50"
              >
                <div className="flex items-center justify-between p-4 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3 flex-1">
                    <button
                      onClick={() => toggleExpanded(product.index)}
                      className="p-1 hover:bg-gray-200 rounded transition-colors"
                    >
                      {expandedProducts.has(product.index) ? (
                        <ChevronDown size={16} className="text-gray-600" />
                      ) : (
                        <ChevronRight size={16} className="text-gray-600" />
                      )}
                    </button>

                    {editingItem?.type === "product" &&
                    editingItem.id === product.id ? (
                      <div className="flex items-center gap-2 flex-1">
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="flex-1 px-3 py-1 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") saveEdit();
                            if (e.key === "Escape") cancelEdit();
                          }}
                          autoFocus
                        />
                        <button
                          onClick={saveEdit}
                          className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {product.variants?.length} variants
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="relative">
                    <button
                      onClick={() => toggleMenu("product", product.index)}
                      className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      <MoreVertical size={16} className="text-gray-600" />
                    </button>

                    <DropdownMenu
                      isOpen={openMenus.product === product.index}
                      items={[
                        {
                          icon: <Plus size={14} />,
                          label: "Add Variant",
                          action: () => addVariant(product.id),
                        },
                        {
                          icon: <Edit2 size={14} />,
                          label: "Edit Product",
                          action: () =>
                            startEdit("product", product.id, product.name),
                        },
                        {
                          icon: <Trash2 size={14} />,
                          label: "Delete Product",
                          action: () => deleteProduct(product.id),
                        },
                      ]}
                      onSelect={(action) => action()}
                    />
                  </div>
                </div>

                {expandedProducts.has(product.index) && (
                  <div className="border-t border-gray-200 bg-white">
                    {product.variants?.length === 0 ? (
                      <div className="p-4 text-center text-gray-500">
                        No variants yet. Click the menu above to add one.
                      </div>
                    ) : (
                      <div className="divide-y divide-gray-100">
                        {product.variants?.map((variant) => (
                          <div
                            key={variant.index}
                            className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                          >
                            {editingItem?.type === "variant" &&
                            editingItem.id === variant.id ? (
                              <div className="flex items-center gap-2 flex-1">
                                <div className="w-6"></div>
                                <input
                                  type="text"
                                  value={editValue}
                                  onChange={(e) => setEditValue(e.target.value)}
                                  className="flex-1 px-3 py-1 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") saveEdit();
                                    if (e.key === "Escape") cancelEdit();
                                  }}
                                  autoFocus
                                />
                                <button
                                  onClick={saveEdit}
                                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={cancelEdit}
                                  className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600 transition-colors"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <>
                                <div className="flex items-center gap-3 flex-1">
                                  <div className="w-6"></div>
                                  <div>
                                    <h4 className="font-medium text-gray-800">
                                      {variant.name}
                                    </h4>
                                    <p className="text-sm text-gray-500 font-mono">
                                      {variant.skuCode}
                                    </p>
                                  </div>
                                </div>

                                <div className="relative">
                                  <button
                                    onClick={() =>
                                      toggleMenu(
                                        "variant",
                                        `${product.index}-${variant.index}`
                                      )
                                    }
                                    className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                                  >
                                    <MoreVertical
                                      size={14}
                                      className="text-gray-600"
                                    />
                                  </button>

                                  <DropdownMenu
                                    isOpen={
                                      openMenus.variant ===
                                      `${product.index}-${variant.index}`
                                    }
                                    items={[
                                      {
                                        icon: <Edit2 size={12} />,
                                        label: "Edit Variant",
                                        action: () =>
                                          startEdit(
                                            "variant",
                                            variant.id,
                                            variant.name
                                          ),
                                      },
                                      {
                                        icon: <Trash2 size={12} />,
                                        label: "Delete Variant",
                                        action: () => deleteVariant(variant.id),
                                      },
                                    ]}
                                    onSelect={(action) => action()}
                                  />
                                </div>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {products?.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Plus size={48} className="mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                No products yet
              </h3>
              <p className="text-gray-500 mb-6">
                Get started by adding your first product
              </p>
            </div>
          )}

          <button
            onClick={addProduct}
            className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Plus size={20} />
            Add New Product
          </button>
        </div>
      </div>

      {(openMenus.product || openMenus.variant) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setOpenMenus({ product: null, variant: null })}
        />
      )}
    </div>
  );
};

export default ProductVariantManager;
