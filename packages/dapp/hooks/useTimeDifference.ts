import { useCallback, useEffect, useState } from 'react';

const MILLIS_IN_SEC = 1000;
const MILLIS_IN_MIN = 60 * MILLIS_IN_SEC;
const MILLIS_IN_HR = 60 * MILLIS_IN_MIN;
const MILLIS_IN_DAY = 24 * MILLIS_IN_HR;
const MILLIS_IN_YR = 365 * MILLIS_IN_DAY;

export const useTimeDifference = (
  from: string | number | Date,
  to: string | number | Date | null = null,
): string => {
  const [text, setText] = useState('');

  const calcDifference = useCallback(() => {
    setText('');
    const fromDate = new Date(from);
    const toDate = to ? new Date(to) : new Date();
    let diffMillis = Math.abs(fromDate.getTime() - toDate.getTime());
    const diffYears = Math.floor(diffMillis / MILLIS_IN_YR);
    diffMillis = diffMillis - diffYears * MILLIS_IN_YR;
    const diffDays = Math.floor(diffMillis / MILLIS_IN_DAY);
    diffMillis = diffMillis - diffDays * MILLIS_IN_DAY;
    const diffHours = Math.floor(diffMillis / MILLIS_IN_HR);
    diffMillis = diffMillis - diffHours * MILLIS_IN_HR;
    const diffMins = Math.floor(diffMillis / MILLIS_IN_MIN);
    diffMillis = diffMillis - diffMins * MILLIS_IN_MIN;
    const diffSecs = Math.floor(diffMillis / MILLIS_IN_SEC);
    let newText = '';
    if (diffYears) {
      newText += `${diffYears}y `;
    }
    if (diffDays) {
      newText += `${diffDays}d `;
    }
    if (diffHours) {
      newText += `${diffHours}h `;
    }
    if (diffMins) {
      newText += `${diffMins}m `;
    }
    if (diffSecs) {
      newText += `${diffSecs}s`;
    }
    setText(newText);
  }, [from, to]);

  useEffect(() => {
    calcDifference();
    const id = setInterval(calcDifference, 1000);
    return () => clearInterval(id);
  }, [calcDifference]);

  return text;
};
