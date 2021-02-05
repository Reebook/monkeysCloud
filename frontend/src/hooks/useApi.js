import { useState } from 'react';

const useApi = (func, initial = true) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(initial);

  const request = async (...args) => {
    try {
      setLoading(true);
      const res = await func(...args);
      setLoading(false);
      setData(res.data || res);
    } catch (ex) {
      setError(ex.response);
    }
  };

  return {
    data,
    error,
    loading,
    request,
  };
};

export default useApi;
