import React from 'react';

export default function Rating({ value, text }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (value >= i) stars.push('★');
    else if (value >= i - 0.5) stars.push('☆');
    else stars.push('☆');
  }
  return <div style={{color:'#f59e0b'}}>{stars.join(' ')} {text && <span style={{color:'#6b7280', marginLeft:8}}>{text}</span>}</div>;
}
