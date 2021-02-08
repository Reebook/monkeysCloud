import { useState } from 'react';

const useApi = (func, callback, initial = true) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(initial);

  const request = async (...args) => {
    try {
      setLoading(true);
      const res = await func(...args);
      setLoading(false);
      callback(res.data || res);
    } catch (ex) {
      setError(ex.response);
    }
  };

  return {
    error,
    loading,
    request,
  };
};

export default useApi;
