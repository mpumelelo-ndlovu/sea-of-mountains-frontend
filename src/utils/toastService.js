// FILE: src/utils/toastService.js

import toast from 'react-hot-toast';

export const toastSuccess = (message) => {
  toast.success(message, {
    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    },
  });
};

export const toastError = (message) => {
  toast.error(message, {
    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    },
  });
};