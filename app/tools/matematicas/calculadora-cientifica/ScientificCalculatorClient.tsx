'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareRootAlt, faBackspace, faEraser, faEquals } from '@fortawesome/free-solid-svg-icons';

export default function ScientificCalculatorClient() {
    const [display, setDisplay] = useState('0');
    const [memory, setMemory] = useState<number | null>(null);
    const [resetNext, setResetNext] = useState(false);

    const handleNumber = (num: string) => {
        if (display === '0' || resetNext) {
            setDisplay(num);
            setResetNext(false);
        } else {
            setDisplay(display + num);
        }
    };

    const handleOp = (op: string) => {
        if (['+', '-', '*', '/', '.', '(', ')'].includes(op)) {
            setDisplay(display + op);
            setResetNext(false);
        } else {
            // Instant operations
            try {
                let val = eval(display); // Simple JS eval for base calc logic
                let res = 0;
                switch (op) {
                    case 'sin': res = Math.sin(val); break;
                    case 'cos': res = Math.cos(val); break;
                    case 'tan': res = Math.tan(val); break;
                    case 'sqrt': res = Math.sqrt(val); break;
                    case 'log': res = Math.log10(val); break;
                    case 'ln': res = Math.log(val); break;
                    case 'pow2': res = Math.pow(val, 2); break;
                    case 'pi':
                        setDisplay(Math.PI.toString());
                        setResetNext(true);
                        return;
                    case 'e':
                        setDisplay(Math.E.toString());
                        setResetNext(true);
                        return;
                }
                // Limit decimals
                setDisplay(Number(res.toFixed(8)).toString());
                setResetNext(true);
            } catch (e) {
                setDisplay('Error');
                setResetNext(true);
            }
        }
    };

    const calculate = () => {
        try {
            // Replace visual symbols if any
            // eslint-disable-next-line no-eval
            const result = eval(display);
            setDisplay(Number(result.toFixed(8)).toString());
            setResetNext(true);
        } catch (e) {
            setDisplay('Error');
            setResetNext(true);
        }
    };

    const clear = () => {
        setDisplay('0');
        setResetNext(false);
    };

    const backspace = () => {
        if (display.length > 1) {
            setDisplay(display.slice(0, -1));
        } else {
            setDisplay('0');
        }
    };

    const btnClass = "h-14 rounded-lg font-bold text-lg transition-all active:scale-95 flex items-center justify-center shadow-sm";
    const numBtn = `${btnClass} bg-white text-gray-800 hover:bg-gray-50 border border-gray-200`;
    const opBtn = `${btnClass} bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20`;
    const funcBtn = `${btnClass} bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200`;
    const eqBtn = `${btnClass} bg-primary text-white hover:bg-secondary border-transparent shadow-md`;

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4 text-primary">
                    <FontAwesomeIcon icon={faSquareRootAlt} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Calculadora Científica</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Realiza cálculos matemáticos avanzados, trigonometría y funciones exponenciales.
                </p>
            </div>

            <div className="max-w-md mx-auto bg-surface p-6 rounded-3xl shadow-xl border border-gray-200">
                {/* Display */}
                <div className="bg-gray-900 rounded-2xl p-6 mb-6 text-right shadow-inner">
                    <div className="text-white text-4xl font-mono overflow-x-auto whitespace-nowrap scrollbar-hide">
                        {display}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-4 gap-3">
                    {/* Row 0 */}
                    <button onClick={clear} className={`${funcBtn} text-red-500`}>AC</button>
                    <button onClick={backspace} className={funcBtn}><FontAwesomeIcon icon={faBackspace} /></button>
                    <button onClick={() => handleOp('(')} className={funcBtn}>(</button>
                    <button onClick={() => handleOp(')')} className={funcBtn}>)</button>

                    {/* Row 1 */}
                    <button onClick={() => handleOp('sin')} className={funcBtn}>sin</button>
                    <button onClick={() => handleOp('cos')} className={funcBtn}>cos</button>
                    <button onClick={() => handleOp('tan')} className={funcBtn}>tan</button>
                    <button onClick={() => handleOp('/')} className={opBtn}>÷</button>

                    {/* Row 2 */}
                    <button onClick={() => handleOp('pow2')} className={funcBtn}>x²</button>
                    <button onClick={() => handleOp('sqrt')} className={funcBtn}>√</button>
                    <button onClick={() => handleOp('pi')} className={funcBtn}>π</button>
                    <button onClick={() => handleOp('*')} className={opBtn}>×</button>

                    {/* Row 3 */}
                    <button onClick={() => handleNumber('7')} className={numBtn}>7</button>
                    <button onClick={() => handleNumber('8')} className={numBtn}>8</button>
                    <button onClick={() => handleNumber('9')} className={numBtn}>9</button>
                    <button onClick={() => handleOp('-')} className={opBtn}>-</button>

                    {/* Row 4 */}
                    <button onClick={() => handleNumber('4')} className={numBtn}>4</button>
                    <button onClick={() => handleNumber('5')} className={numBtn}>5</button>
                    <button onClick={() => handleNumber('6')} className={numBtn}>6</button>
                    <button onClick={() => handleOp('+')} className={opBtn}>+</button>

                    {/* Row 5 */}
                    <button onClick={() => handleNumber('1')} className={numBtn}>1</button>
                    <button onClick={() => handleNumber('2')} className={numBtn}>2</button>
                    <button onClick={() => handleNumber('3')} className={numBtn}>3</button>
                    <button onClick={calculate} className={`${eqBtn} row-span-2 text-2xl`}>=</button>

                    {/* Row 6 */}
                    <button onClick={() => handleNumber('0')} className={`${numBtn} col-span-2`}>0</button>
                    <button onClick={() => handleOp('.')} className={numBtn}>.</button>
                </div>
            </div>
        </div>
    );
}
