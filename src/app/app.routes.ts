import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { PurchaseInfo } from './pages/purchase-info/purchase-info';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'purchase-info', component: PurchaseInfo },
  { path: 'purchase-info/:id', component: PurchaseInfo },
  { path: '**', redirectTo: 'dashboard' }
];
