"use client";

import { LuMinus, LuPlus } from "react-icons/lu";

import { Button } from "../ui/button";
import { useState } from "react";
import { Card, CardHeader } from "../ui/card";

function CounterInput({
  detail,
  defaultValue = 0,
}: {
  detail: string;
  defaultValue?: number;
}) {

  const [count, setCount] = useState(defaultValue);
  const increaseCount = () => setCount((prevCount) => prevCount + 1);

  const decreaseCount = () =>
    setCount((prevCount) => Math.max(prevCount - 1, 0));

  return (
    <Card className="mb-4">
      <input type="hidden" name={detail} value={count} />
      <CardHeader className="flex flex-col gapy-5">
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex flex-col">
            <h2 className="font-medium capitalize">{detail}</h2>
            <p className="text-muted-foreground text-sm">
              Specify the number of {detail}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              type="button"
              onClick={decreaseCount}
            >
              <LuMinus className="w-5 h-5 text-primary" />
            </Button>
            <span className="text-xl font-bold w-5 text-center tabular-nums transition-all duration-200">{count}</span>
            <Button
              variant="outline"
              size="icon"
              type="button"
              onClick={increaseCount}
            >
              <LuPlus className="w-5 h-5 text-primary" />
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}

export default CounterInput;
