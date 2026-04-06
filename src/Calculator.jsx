import React, { useState } from 'react';
import { add, subtract, multiply, divide } from './calculator.js';

function Calculator() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleOperation = (op) => {
    setError('');
    let x = Number(a);
    let y = Number(b);
    if (isNaN(x) || isNaN(y)) {
      setError('Vui lòng nhập số hợp lệ!');
      setResult('');
      return;
    }
    try {
      let res;
      switch (op) {
        case 'add':
          res = add(x, y);
          break;
        case 'subtract':
          res = subtract(x, y);
          break;
        case 'multiply':
          res = multiply(x, y);
          break;
        case 'divide':
          res = divide(x, y);
          break;
        default:
          res = '';
      }
      setResult(res);
    } catch (e) {
      setError(e.message);
      setResult('');
    }
  };

  return (
    <div className="calculator-demo" style={{ maxWidth: 400, margin: '0 auto', padding: 24, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Demo Calculator</h2>
      <div style={{ marginBottom: 12 }}>
        <input
          type="number"
          value={a}
          onChange={e => setA(e.target.value)}
          placeholder="Số thứ nhất"
          style={{ width: 120, marginRight: 8 }}
        />
        <input
          type="number"
          value={b}
          onChange={e => setB(e.target.value)}
          placeholder="Số thứ hai"
          style={{ width: 120 }}
        />
      </div>
      <div style={{ marginBottom: 12 }}>
        <button onClick={() => handleOperation('add')}>Cộng</button>
        <button onClick={() => handleOperation('subtract')} style={{ marginLeft: 8 }}>Trừ</button>
        <button onClick={() => handleOperation('multiply')} style={{ marginLeft: 8 }}>Nhân</button>
        <button onClick={() => handleOperation('divide')} style={{ marginLeft: 8 }}>Chia</button>
      </div>
      {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
      <div>
        <strong>Kết quả: </strong>{result !== '' ? result : '--'}
      </div>
    </div>
  );
}

export default Calculator;
