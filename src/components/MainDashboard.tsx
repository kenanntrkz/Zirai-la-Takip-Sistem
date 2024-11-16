import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductForm } from './ProductForm';
import { UsageForm } from './UsageForm';
import { InventoryTable } from './InventoryTable';
import { Statistics } from './Statistics';
import { Notifications } from './Notifications';
import { BackupControls } from './BackupControls';
import { VineyardSection } from './VineyardSection';
import { useInventoryStore } from '../store/useInventoryStore';
import { Product, ProductFormData } from '../types/inventory';

export const MainDashboard: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct, recordUsage } = useInventoryStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isUsageFormOpen, setIsUsageFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductFormData & { id?: string } | null>(null);

  const handleSubmit = (data: ProductFormData) => {
    if (editingProduct?.id) {
      updateProduct(editingProduct.id, data);
    } else {
      addProduct(data);
    }
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleEdit = (product: Product) => {
    const { id, lastUpdated, ...productData } = product;
    setEditingProduct({ ...productData, id });
    setIsFormOpen(true);
  };

  const handleUsageSubmit = (data: {
    totalWaterAmount: number;
    vineyardId: string;
    vineyardName: string;
    selectedProducts: Array<{ id: string; calculatedUsage: number }>;
  }) => {
    recordUsage(data);
    setIsUsageFormOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Zirai İlaç Stok Takip Sistemi
        </h1>
        <div className="space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsUsageFormOpen(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
          >
            İlaç Kullanımı Kaydet
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsFormOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Yeni Ürün Ekle
          </motion.button>
        </div>
      </div>

      <BackupControls />
      <Notifications />
      <Statistics />

      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white p-6 rounded-lg w-full max-w-md"
            >
              <h2 className="text-xl font-semibold mb-4">
                {editingProduct ? 'Ürün Düzenle' : 'Yeni Ürün Ekle'}
              </h2>
              <ProductForm
                initialData={editingProduct}
                onSubmit={handleSubmit}
                onCancel={() => {
                  setIsFormOpen(false);
                  setEditingProduct(null);
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isUsageFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white p-6 rounded-lg w-full max-w-md"
            >
              <h2 className="text-xl font-semibold mb-4">İlaç Kullanımı Kaydet</h2>
              <UsageForm
                products={products}
                onSubmit={handleUsageSubmit}
                onCancel={() => setIsUsageFormOpen(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white shadow rounded-lg mb-8"
      >
        <InventoryTable
          data={products}
          onEdit={handleEdit}
          onDelete={deleteProduct}
        />
      </motion.div>

      <VineyardSection />
    </motion.div>
  );
};