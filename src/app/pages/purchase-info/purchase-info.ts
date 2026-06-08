import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseBillService } from '../../services/purchase-bill.service';
import { PurchaseBill, PurchaseBillItem } from '../../models/purchase-bill.model';

@Component({
  selector: 'app-purchase-info',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './purchase-info.html',
  styleUrl: './purchase-info.css',
})
export class PurchaseInfo implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly billService = inject(PurchaseBillService);

  billId: number | null = null;
  bill: PurchaseBill | null = null;

  activeTab = 'details';
  activeSubTab = 'items';

  items: PurchaseBillItem[] = [];

  formItem = '';
  formBatch = 'BATCH001';
  formStandardCost = 0.00;
  formStandardPrice = 0.00;
  formQty = 0;
  formFreeQty = 0;
  formDiscount = 0.00;
  formMargin = 0.00;
  formTotalCost = 0.00;
  formTotalSelling = 0.00;

  summaryTotalItems = 200;
  summaryTotalQty = 200;
  summaryGrossTotal = 950000.00;
  summaryItemDiscount = 90.00;
  summaryOverallDiscount = 0.00;
  summaryTotalDiscounts = 950.00;
  summaryTotalBeforeTax = 500000.00;
  summaryTotalTax = 1000000.00;
  summarySuspendedTax = 1000.00;
  summaryNetTotal = 100000000.00;

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.billId = Number(idParam);
      const foundBill = this.billService.getBillById(this.billId);
      if (foundBill) {
        this.bill = foundBill;
        this.items = foundBill.items ? [...foundBill.items] : [];
        if (this.items.length > 0) {
          const costSum = this.items.reduce((sum, item) => sum + item.totalCost, 0);
          const sellSum = this.items.reduce((sum, item) => sum + item.totalSelling, 0);
          const qtySum = this.items.reduce((sum, item) => sum + item.qty, 0);
          const discSum = this.items.reduce((sum, item) => sum + item.discount, 0);

          this.summaryTotalItems = 200 + this.items.length;
          this.summaryTotalQty = 200 + qtySum;
          this.summaryGrossTotal = 950000.00 + sellSum;
          this.summaryItemDiscount = 90.00 + discSum;
          this.summaryTotalDiscounts = 950.00 + discSum;
          this.summaryTotalBeforeTax = 500000.00 + costSum;
          this.summaryNetTotal = 100000000.00 + (sellSum - costSum);
        }
      }
    } else {
      this.items = [
        { item: 'Item 1', batch: 'BATCH001', standardCost: 100.00, standardPrice: 150.00, margin: 50.00, qty: 10, freeQty: 1, discount: 5.00, totalCost: 1000.00, totalSelling: 1500.00 },
        { item: 'Item 2', batch: 'BATCH002', standardCost: 200.00, standardPrice: 300.00, margin: 100.00, qty: 5, freeQty: 0, discount: 10.00, totalCost: 1000.00, totalSelling: 1500.00 }
      ];
    }
  }

  calculateFields() {
    this.formMargin = Math.max(0, this.formStandardPrice - this.formStandardCost);
    this.formTotalCost = this.formStandardCost * this.formQty;
    this.formTotalSelling = this.formStandardPrice * this.formQty;
  }

  addItem() {
    if (!this.formItem.trim()) {
      return;
    }

    const newItem: PurchaseBillItem = {
      item: this.formItem,
      batch: this.formBatch,
      standardCost: this.formStandardCost,
      standardPrice: this.formStandardPrice,
      margin: this.formMargin,
      qty: this.formQty,
      freeQty: this.formFreeQty,
      discount: this.formDiscount,
      totalCost: this.formTotalCost,
      totalSelling: this.formTotalSelling
    };

    this.items.push(newItem);

    if (this.billId) {
      this.billService.addItemToBill(this.billId, newItem);
    }

    this.summaryTotalItems += 1;
    this.summaryTotalQty += this.formQty;
    this.summaryGrossTotal += this.formTotalSelling;
    this.summaryItemDiscount += this.formDiscount;
    this.summaryTotalDiscounts += this.formDiscount;
    this.summaryTotalBeforeTax += this.formTotalCost;
    this.summaryNetTotal += (this.formTotalSelling - this.formTotalCost);

    this.resetForm();
  }

  resetForm() {
    this.formItem = '';
    this.formBatch = 'BATCH001';
    this.formStandardCost = 0.00;
    this.formStandardPrice = 0.00;
    this.formQty = 0;
    this.formFreeQty = 0;
    this.formDiscount = 0.00;
    this.formMargin = 0.00;
    this.formTotalCost = 0.00;
    this.formTotalSelling = 0.00;
  }

  closePage() {
    this.router.navigate(['/dashboard']);
  }
}
