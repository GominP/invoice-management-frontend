import React, { useEffect, useState } from "react";
import CheckBillInfo from "./CheckBillInfo";
import {
  setRole,
  setId,
  setNotiCount,
  getRole,
  getUserID,
  getNotiCount,
} from "../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";

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
  const role = useSelector(getRole);
  const userId = useSelector(getUserID);
  const [isPayerBill, setIsPayerBill] = useState(false);
  useEffect(() => {
    if (role === "payer") {
      setIsPayerBill(true);
    }
  }, []);

  return (
    <div>
      <CheckBillInfo
        rows={rows}
        isPayerBill={isPayerBill}
        status={"ยกเลิก"}></CheckBillInfo>
    </div>
  );
}
