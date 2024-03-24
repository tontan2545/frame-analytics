import { Card } from "@tremor/react";
import { ArrowUp } from "lucide-react";
import React from "react";

type Props = {
  label: string;
  icon: React.ReactNode;
  value: number;
  diff: number;
};

const AggregateCard = ({ diff, icon, label, value }: Props) => {
  return (
    <Card className="space-y-1">
      <div className="flex gap-2 items-center justify-center">
        {icon}
        <h4 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content whitespace-nowrap">
          {label}
        </h4>
      </div>
      <div className="flex gap-2 items-center justify-center">
        <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong text-center">
          {value}
        </p>
        {diff > 0 && (
          <div>
            <ArrowUp className="w-4 h-4 text-green-400" />
            <p className="text-xs text-green-400">+{diff}</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default AggregateCard;
