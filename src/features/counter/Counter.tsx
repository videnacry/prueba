import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount
} from './counterSlice';
import styles from './Counter.module.css';

export function Counter (): JSX.Element {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const getIncrementAmout = (pNumber: string): number => {
    const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const gotNumber = Number(pNumber);
    if (nums.includes(gotNumber)) return gotNumber;
    return 0;
  };

  const incrementValue = getIncrementAmout(incrementAmount);

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => { dispatch(decrement()); }}
        >
          -
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => { dispatch(increment()); }}
        >
          +
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => { setIncrementAmount(e.target.value); }}
        />
        <button
          className={styles.button}
          onClick={() => { dispatch(incrementByAmount(incrementValue)); }}
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={ () => { dispatch(incrementAsync(incrementValue)).catch(e => { throw new Error(e); }); }}
        >
          Add Async
        </button>
        <button
          className={styles.button}
          onClick={() => { dispatch(incrementIfOdd(incrementValue)); }}
        >
          Add If Odd
        </button>
      </div>
    </div>
  );
}
