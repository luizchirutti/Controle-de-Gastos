import React, { useState, useEffect, useCallback, useMemo } from 'react';
import type { Expense } from './types';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseSummary from './components/ExpenseSummary';

const App: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    try {
      const storedExpenses = localStorage.getItem('expenses');
      if (storedExpenses) {
        setExpenses(JSON.parse(storedExpenses));
      }
    } catch (error) {
      console.error("Failed to load expenses from local storage:", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('expenses', JSON.stringify(expenses));
    } catch (error) {
      console.error("Failed to save expenses to local storage:", error);
    }
  }, [expenses]);

  const addExpense = useCallback((expense: Omit<Expense, 'id'>) => {
    setExpenses(prevExpenses => [
      { ...expense, id: crypto.randomUUID() },
      ...prevExpenses,
    ]);
  }, []);

  const deleteExpense = useCallback((id: string) => {
    setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
  }, []);

  const totalExpenses = useMemo(() => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  }, [expenses]);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">Controle de Despesas Diárias</h1>
          <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">Monitore seus gastos com facilidade e clareza.</p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">Adicionar Nova Despesa</h2>
            <ExpenseForm onAddExpense={addExpense} />
          </div>
          
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2">
                    <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">Resumo de Gastos</h2>
                    <ExpenseSummary expenses={expenses} total={totalExpenses} />
                </div>
                <div className="md:col-span-2">
                    <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">Histórico de Despesas</h2>
                    <ExpenseList expenses={expenses} onDeleteExpense={deleteExpense} />
                </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;