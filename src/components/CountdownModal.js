import { useEffect, useRef, useState } from "react";

export default function CountdownModal({ onStopTimer }) {
  const [count, setCount] = useState(3);

  const intervalId = useRef();

  useEffect(
    function () {
      intervalId.current = setInterval(function () {
        setCount((count) => count - 1);
      }, 1000);

      setTimeout(function () {
        onStopTimer();
      }, 3000);
      return () => {
        clearInterval(intervalId.current);
      };
    },
    [onStopTimer]
  );

  return (
    <div className="modal">
      <div className="countdown-timer">{count}</div>
    </div>
  );
}
