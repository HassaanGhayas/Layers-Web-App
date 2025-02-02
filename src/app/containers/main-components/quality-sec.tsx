import React from "react";
import { PiPackageThin } from "react-icons/pi";
import { CiBitcoin, CiHeadphones, CiCreditCard2 } from "react-icons/ci";

const data = [
  {
    svg: PiPackageThin,
    title: "Free Shipping",
    text: "Free Shipping for order above $150",
  },
  {
    svg: CiBitcoin,
    title: "Money Guarantee",
    text: "Within 30 days for an exchange",
  },
  {
    svg: CiHeadphones,
    title: "Online Support",
    text: "24 hours a day, 7 days a week",
  },
  {
    svg: CiCreditCard2,
    title: "Flexible Payment",
    text: "Pay with multiple cards",
  },
];

const QualitySection = () => {
  return (
    <section className="w-full max-w-screen-xl m-auto py-10 px-4 manrope">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] h-full gap-2">
        {data.map((a, index) => {
          return (
            <div key={index} className="flex flex-col gap-4 justify-center p-4 rounded-xl">
              <a.svg className="text-4xl" />
              <div>
                <h2 className="text-lg font-bold">{a.title}</h2>
                <p>{a.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default QualitySection;
