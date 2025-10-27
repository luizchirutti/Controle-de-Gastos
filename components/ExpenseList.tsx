import React from 'react';
import type { Expense } from '../types';
import { CATEGORIES } from '../constants';
import { TrashIcon } from './icons';

interface ExpenseListProps {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void;
}

const ExpenseItem: React.FC<{ expense: Expense; onDelete: (id: string) => void }> = ({ expense, onDelete }) => {
  const categoryInfo = CATEGORIES.find(c => c.value === expense.category);
  const Icon = categoryInfo?.icon || (() => null);

  // Format date to a more common format in Brazil (dd/mm/yyyy)
  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  }

  return (
    <li className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center space-x-4">
        <div className="p-2 rounded-full" style={{ backgroundColor: `${categoryInfo?.color}20` }}>
          <Icon className="h-6 w-6" style={{ color: categoryInfo?.color }} />
        </div>
        <div>
          <p className="font-semibold text-slate-800 dark:text-slate-100">{expense.description}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">{formatDate(expense.date)} &bull; {categoryInfo?.label}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <span className="font-bold text-lg text-slate-900 dark:text-white">R$ {expense.amount.toFixed(2).replace('.',',')}</span>
        <button
          onClick={() => onDelete(expense.id)}
          className="p-2 rounded-full text-slate-400 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/50 dark:hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition-colors"
          aria-label={`Excluir despesa: ${expense.description}`}
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </li>
  );
};

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onDeleteExpense }) => {
  if (expenses.length === 0) {
    return (
      <div className="text-center py-10 px-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
        <h3 className="text-lg font-medium text-slate-900 dark:text-white">Nenhuma despesa ainda!</h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Adicione uma despesa usando o formulário para começar.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {expenses.map(expense => (
        <ExpenseItem key={expense.id} expense={expense} onDelete={onDeleteExpense} />
      ))}
    </ul>
  );
};

export default ExpenseList;