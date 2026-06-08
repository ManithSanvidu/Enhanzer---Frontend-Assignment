export interface PurchaseBill {
  id: number;
  date: string;
  reference: string;
  remark: string;
  supplier: string;
  employee: string;
  amount: number;
  paid: number;
  due: number;
  location: string;
  dueDate: string;
  status: 'draft' | 'pending' | 'completed' | 'rejected' | 'cancelled';
  updatedOn: string;
  updatedBy: string;
  avatarColor: string;
  items?: PurchaseBillItem[];
}

export interface PurchaseBillItem {
  id?: number;
  item: string;
  batch: string;
  standardCost: number;
  standardPrice: number;
  margin: number;
  qty: number;
  freeQty: number;
  discount: number;
  totalCost: number;
  totalSelling: number;
}
