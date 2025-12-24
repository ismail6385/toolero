"use client";

import React from 'react';

export default function TodoGeneratorClient() {
  const [task, setTask] = React.useState('');
  const [tasks, setTasks] = React.useState<{ text: string; done: boolean }[]>([]);
  const [copied, setCopied] = React.useState(false);

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { text: task, done: false }]);
      setTask('');
    }
  };

  const toggleTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks[index].done = !newTasks[index].done;
    setTasks(newTasks);
  };

  const deleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const exportList = () => {
    const text = tasks.map((t, i) => `${i + 1}. [${t.done ? 'X' : ' '}] ${t.text}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
            placeholder="Nueva tarea..."
            className="flex-1 p-3 border border-gray-300 rounded-lg"
          />
          <button
            onClick={addTask}
            className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700"
          >
            Añadir
          </button>
        </div>

        <div className="space-y-2">
          {tasks.map((t, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <input
                type="checkbox"
                checked={t.done}
                onChange={() => toggleTask(index)}
                className="w-5 h-5 rounded text-indigo-600"
              />
              <span className={`flex-1 ${t.done ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                {t.text}
              </span>
              <button
                onClick={() => deleteTask(index)}
                className="text-red-500 hover:text-red-700 px-2"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {tasks.length > 0 && (
          <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              {tasks.filter(t => t.done).length} de {tasks.length} completadas
            </div>
            <button
              onClick={exportList}
              className={`px-4 py-2 rounded-lg font-medium ${copied ? 'bg-green-500 text-white' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                }`}
            >
              {copied ? '✓ Copiado!' : 'Exportar Lista'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


