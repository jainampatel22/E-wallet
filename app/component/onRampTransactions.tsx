import { Card } from "./Card";
import Image from "next/image";
import failed from '../fonts/th.jpg'
import success from '../fonts/OIP.jpg' 
export const OnRampTransaction = ({
  transactions,
  title = "Recent Transactions",
}: {
  transactions: {
    time: Date;
    amount: number;
    status: string;
    provider: string;
  }[];
  title?: string;
}) => {
  const isSentTransactions = title === "Sent transactions";

  if (!transactions.length) {
    return (
      <Card title={title}>
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }

  return (
    <Card title={title}>
      <div className="pt-2">
        {transactions
          .slice(-5)
          .reverse()
          .map((t, index) => (
            <div key={index} className="flex justify-between items-center">
              <div>
                <div className="text-sm">
                  {isSentTransactions ? "Sent INR" : "Received INR"}
                </div>
                <div className="text-slate-600 text-xs">
                {new Date(t.time).toDateString()}
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-sm">
                  {isSentTransactions
                    ? `- Rs ${t.amount / 100}`
                    : `+ Rs ${t.amount / 100}`}
                </div>
                <div className="text-sm flex">
                  {t.status === "Success" ? (
                    <span className="text-green-500 flex gap-1"><Image src={success} alt="" width={20} height={20}/>Success</span>
                  ) : t.status === "Proccessing" ? (
                    <span className="text-yellow-500">Pending</span>
                  ) : (
                    <span className="text-red-500 flex gap-1"> <Image src={failed} alt="" width={20} height={20}/> Failed</span>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </Card>
  );
};