import { useEffect, useState, useRef } from "react";

const useDebounceScroll = (callback, delay = 500) => {
  const [isFetching, setIsFetching] = useState(false);
  const pageRef = useRef(1); // Ref to track the current page

  const handleScroll = () => {
    setIsFetching(true);
  };

  useEffect(() => {
    const debouncedHandleScroll = debounce(handleScroll, delay);

    window.addEventListener("scroll", debouncedHandleScroll);

    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isFetching) return;

    const fetchData = async () => {
      await callback(pageRef.current); // Pass the current page to the callback
      setIsFetching(false);
      pageRef.current++; // Increment the page after fetching data
    };

    fetchData();
  }, [isFetching, callback]);

  return { isFetching };
};

function debounce(func, wait, immediate) {
  let timeout;
  return function executedFunction() {
    const context = this;
    const args = arguments;

    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

export default useDebounceScroll;
