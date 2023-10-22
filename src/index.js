import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

document.body.addEventListener('focus', handleEvent, true);
document.body.addEventListener('blur', handleEvent, true);
document.body.addEventListener('keyup', handleEvent, true);
document.body.addEventListener('paste', handleEvent, true);
document.body.addEventListener('input', handleEvent, true);

function handleEvent(event) {
  const target = event.target;
  if (target.hasAttribute('contenteditable') && target.getAttribute('data-before') !== target.innerHTML) {
    target.setAttribute('data-before', target.innerHTML);
    target.dispatchEvent(new Event('change'));
  }
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
