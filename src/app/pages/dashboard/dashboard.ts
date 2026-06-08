import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Topbar } from '../../components/topbar/topbar';
import { Sidebar } from '../../components/sidebar/sidebar';
import { PurchaseBillService } from '../../services/purchase-bill.service';
import { PurchaseBill } from '../../models/purchase-bill.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, Topbar, Sidebar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private readonly billService = inject(PurchaseBillService);
  private readonly router = inject(Router);

  readonly searchQuery = signal('');
  readonly selectedStatus = signal<string>('all');
  readonly currentPage = signal(1);
  readonly pageSize = 13;

  readonly allBills = this.billService.bills;

  readonly counts = computed(() => {
    const bills = this.allBills();
    return {
      all: bills.length,
      draft: bills.filter(b => b.status === 'draft').length,
      pending: bills.filter(b => b.status === 'pending').length,
      completed: bills.filter(b => b.status === 'completed').length,
      rejected: bills.filter(b => b.status === 'rejected').length,
      cancelled: bills.filter(b => b.status === 'cancelled').length,
    };
  });

  readonly filteredBills = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const status = this.selectedStatus();
    let result = this.allBills();

    if (status !== 'all') {
      result = result.filter(b => b.status === status);
    }

    if (query) {
      result = result.filter(b =>
        b.reference.toLowerCase().includes(query) ||
        b.remark.toLowerCase().includes(query) ||
        b.supplier.toLowerCase().includes(query) ||
        b.employee.toLowerCase().includes(query) ||
        b.location.toLowerCase().includes(query) ||
        b.id.toString().includes(query)
      );
    }

    return result;
  });

  readonly paginatedBills = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.pageSize;
    return this.filteredBills().slice(startIndex, startIndex + this.pageSize);
  });

  readonly totalPages = computed(() => {
    return Math.ceil(this.filteredBills().length / this.pageSize);
  });

  selectStatus(status: string) {
    this.selectedStatus.set(status);
    this.currentPage.set(1);
  }

  onSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchQuery.set(target.value);
    this.currentPage.set(1);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(p => p + 1);
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update(p => p - 1);
    }
  }

  firstPage() {
    this.currentPage.set(1);
  }

  lastPage() {
    this.currentPage.set(this.totalPages());
  }

  viewBillDetails(bill: PurchaseBill) {
    this.router.navigate(['/purchase-info', bill.id]);
  }

  getStatusDotColor(status: string): string {
    switch (status) {
      case 'draft': return '#3b82f6';
      case 'pending': return '#f59e0b';
      case 'completed': return '#10b981';
      case 'rejected': return '#ef4444';
      case 'cancelled': return '#1e293b';
      default: return '#cbd5e1';
    }
  }
}
