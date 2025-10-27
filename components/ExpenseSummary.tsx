import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { Expense } from '../types';
import { CATEGORIES } from '../constants';

interface ExpenseSummaryProps {
  expenses: Expense[];
  total: number;
}

const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({ expenses, total }) => {
  const data = useMemo(() => {
    const categoryTotals: { [key: string]: number } = {};
    for (const expense of expenses) {
      if (!categoryTotals[expense.category]) {
        categoryTotals[expense.category] = 0;
      }
      categoryTotals[expense.category] += expense.amount;
    }
    return CATEGORIES.map(category => ({
      name: category.label,
      value: categoryTotals[category.value] || 0,
      color: category.color,
    })).filter(item => item.value > 0);
  }, [expenses]);

  const formatCurrency = (value: number) => `R$ ${value.toFixed(2).replace('.', ',')}`;

  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
      <div className="flex justify-between items-baseline mb-4">
          <h3 className="text-lg font-medium text-slate-600 dark:text-slate-300">Total Gasto</h3>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{formatCurrency(total)}</p>
      </div>
      
      {expenses.length > 0 ? (
        <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{ 
                  backgroundColor: 'rgba(30, 41, 59, 0.9)', 
                  borderColor: 'rgba(71, 85, 105, 1)',
                  borderRadius: '0.5rem'
                }}
                labelStyle={{ color: '#cbd5e1' }}
              />
              <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-[250px] flex items-center justify-center text-slate-500 dark:text-slate-400">
            <p>Nenhum dado para exibir. Adicione uma despesa para ver seu resumo.</p>
        </div>
      )}
    </div>
  );
};

export default ExpenseSummary;