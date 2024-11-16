import React from 'react';
import { Product } from '../types/inventory';
import { useVineyardStore } from '../store/useVineyardStore';
import toast from 'react-hot-toast';

interface UsageFormProps {
  products: Product[];
  onSubmit: (data: {
    totalWaterAmount: number;
    vineyardId: string;
    vineyardName: string;
    selectedProducts: Array<{ id: string; calculatedUsage: number }>;
  }) => void;
  onCancel: () => void;
}

export const UsageForm: React.FC<UsageFormProps> = ({
  products,
  onSubmit,
  onCancel,
}) => {
  const [waterAmount, setWaterAmount] = React.useState(1600);
  const [selectedProductIds, setSelectedProductIds] = React.useState<string[]>([]);
  const [selectedVineyardId, setSelectedVineyardId] = React.useState<string>('');
  
  const { vineyards } = useVineyardStore();

  // Rest of the implementation remains the same
}