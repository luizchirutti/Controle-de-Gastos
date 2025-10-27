import React from 'react';
import type { Category } from './types';
import { FoodIcon, TransportIcon, HousingIcon, UtilitiesIcon, EntertainmentIcon, HealthIcon, ShoppingIcon, OtherIcon } from './components/icons';

interface CategoryConfig {
  value: Category;
  label: string;
  color: string;
  icon: React.FC<{ className?: string }>;
}

export const CATEGORIES: CategoryConfig[] = [
  { value: 'Food' as Category, label: 'Alimentação', color: '#34d399', icon: FoodIcon },
  { value: 'Transport' as Category, label: 'Transporte', color: '#60a5fa', icon: TransportIcon },
  { value: 'Housing' as Category, label: 'Moradia', color: '#f87171', icon: HousingIcon },
  { value: 'Utilities' as Category, label: 'Contas', color: '#facc15', icon: UtilitiesIcon },
  { value: 'Entertainment' as Category, label: 'Lazer', color: '#c084fc', icon: EntertainmentIcon },
  { value: 'Health' as Category, label: 'Saúde', color: '#fb923c', icon: HealthIcon },
  { value: 'Shopping' as Category, label: 'Compras', color: '#a78bfa', icon: ShoppingIcon },
  { value: 'Other' as Category, label: 'Outros', color: '#9ca3af', icon: OtherIcon },
];