import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetch(url)
      .then((response) => response.ok && response.json())
      .then((json) => {
        setLoading(false);
        setData(json);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, [url]);

  return { data, isLoading, isError };
};
