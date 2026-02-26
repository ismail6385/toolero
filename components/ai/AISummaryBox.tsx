import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

export interface AISummaryBoxProps {
    title?: string;
    summaryPoints: string[];
}

export default function AISummaryBox({ title = "Quick Summary", summaryPoints }: AISummaryBoxProps) {
    return (
        <div className="my-8 bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg shadow-sm">
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                <FontAwesomeIcon icon={faInfoCircle} className="h-5 w-5 text-blue-600" />
                {title}
            </h3>
            <ul className="space-y-2">
                {summaryPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3 text-blue-800">
                        <span className="text-blue-600 font-bold text-xl mt-[-4px]">•</span>
                        <span>{point}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
