"use client";

import React, { useState } from "react";

export default function Demo() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h3>Demo</h3>
      <span onClick={() => setCount(count + 1)}>{count}</span>
    </div>
  );
}
