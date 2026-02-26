import React from 'react';

export interface AITableProps {
    title: string;
    columns: string[];
    rows: (string | React.ReactNode)[][];
}

export default function AITable({ title, columns, rows }: AITableProps) {
    return (
        <div className="my-8 rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-white">
            {title && (
                <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
                    <h3 className="text-xl font-bold text-gray-900 m-0">{title}</h3>
                </div>
            )}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {columns.map((col, idx) => (
                                <th
                                    key={idx}
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                                >
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {rows.map((row, rowIndex) => (
                            <tr key={rowIndex} className="hover:bg-gray-50 transition-colors">
                                {row.map((cell, cellIndex) => (
                                    <td
                                        key={cellIndex}
                                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-800"
                                    >
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
