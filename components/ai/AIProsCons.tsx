import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

export interface AIProsConsProps {
    title?: string;
    pros: string[];
    cons: string[];
}

export default function AIProsCons({ title = "Pros & Cons", pros, cons }: AIProsConsProps) {
    return (
        <div className="my-8">
            {title && <h3 className="text-2xl font-bold mb-6 text-gray-900">{title}</h3>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pros */}
                <div className="bg-green-50 rounded-lg p-6 border border-green-100">
                    <h4 className="text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
                        <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 h-5 w-5" />
                        Pros
                    </h4>
                    <ul className="space-y-3">
                        {pros.map((pro, index) => (
                            <li key={index} className="flex items-start gap-3 text-green-800">
                                <span className="text-green-600 mt-1 flex-shrink-0">•</span>
                                <span>{pro}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Cons */}
                <div className="bg-red-50 rounded-lg p-6 border border-red-100">
                    <h4 className="text-lg font-bold text-red-900 mb-4 flex items-center gap-2">
                        <FontAwesomeIcon icon={faTimesCircle} className="text-red-500 h-5 w-5" />
                        Cons
                    </h4>
                    <ul className="space-y-3">
                        {cons.map((con, index) => (
                            <li key={index} className="flex items-start gap-3 text-red-800">
                                <span className="text-red-500 mt-1 flex-shrink-0">•</span>
                                <span>{con}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
