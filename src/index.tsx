import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';

const container = getContainer({ pId: 'root' });
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

function getContainer ({ pId = '', pTag = 'div', pParent = document.body }): HTMLElement {
  const existingContainer = document.getElementById(pId) ?? null;
  if (existingContainer !== null) return existingContainer;

  const containerEl = document.createElement(pTag);
  containerEl.id = pId;
  pParent.appendChild(containerEl);
  return containerEl;
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
