"use client";

import { useState } from "react";
import { Card } from "./Card";
import { Textinput } from "./TextInput";
import { Select } from "./Select";
import { Button } from "./Button"


const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
];

export const AddMoney = () => {
  const [value, setValue] = useState(0);
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
 
  const [, setRedirectUrl] = useState(
    SUPPORTED_BANKS[0]?.redirectUrl,
  );
  return (
    <Card title="Add Money">
      <div className="w-full">
        <Textinput
          label={"Amount"}
          placeholder={"Amount"}
          onChange={(val) => {
            setValue(Number(val));
          }}
        />
        <div className="py-4 text-left">Bank</div>
        <Select
          onSelect={(value) => {
            setProvider(
              SUPPORTED_BANKS.find((x) => x.name === value)?.name || "",
            );
            setRedirectUrl(
              SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl || "",
            );
          }}
          options={SUPPORTED_BANKS.map((x) => ({
            key: x.name,
            value: x.name,
          }))}
        />
        <div className="flex justify-center pt-4">
          <Button
            onClick={async () => {
              if (provider === "HDFC Bank") {
                window.open(`/Bank/hdfc?amount=${value}`, "_blank");
              } else if (provider === "Axis Bank") {
                window.open(`/Bank/axis?amount=${value}`, "_blank");
              }
            }}
          >
            Add Money
          </Button>
        </div>
      </div>
    </Card>
  );
};