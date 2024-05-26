import { useState, useEffect } from "react";

export const useFetch = (urls) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const fetchPromises = urls.map((url) =>
      fetch(url).then((response) => response.json())
    );

    Promise.all(fetchPromises)
      .then((responses) => {
        setData(responses);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [urls]);

  return { data, isLoading };
};
