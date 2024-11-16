import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Product } from '../types/inventory';

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

export const exportToPDF = (products: Product[]) => {
  const doc = new jsPDF();
  
  // Rest of the implementation remains the same
}