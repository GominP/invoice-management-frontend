import React from "react";
import CheckBillInfo from "./CheckBillInfo";

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}
function priceRow(qty, unit) {
  return qty * unit;
}
const rows = [
  createRow("Paperclips (Box)", 100, 1.15),
  createRow("Paper (Case)", 10, 45.99),
  createRow("Waste Basket", 2, 17.99),
];
export default function BillInfo() {
  return (
    <div>
      <CheckBillInfo
        rows={rows}
        isPayerBill={true}
        status={"ยกเลิก"}></CheckBillInfo>
    </div>
  );
}
