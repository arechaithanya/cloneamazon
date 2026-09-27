'use client';
import Link from "next/link";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useContext } from "react";
import CartContext from "../ContextApi/CartContext";

export const LeftMenuBox = ({ title, listDetail }) => {
  const { closeButton } = useContext(CartContext);

  return (
    <div className="p-5 text-[#111] border-b border-[#d5dbdb]">
      <h3 className="font-semibold mb-4">{title}</h3>
      <ul className="list-none">
        {listDetail.map((item) =>
          item.href ? (
            <li key={item.id}>
              <Link
                href={item.href}
                onClick={() => closeButton?.()}
                className="flex justify-between items-center py-[0.7rem] text-[0.9rem] hover:bg-[#eaeded] rounded-md cursor-pointer text-[#111] no-underline"
              >
                <div>{item.menuItem}</div>
                <ArrowForwardIosIcon className="text-sm" />
              </Link>
            </li>
          ) : (
            <li
              key={item.id}
              className="flex justify-between items-center py-[0.7rem] text-[0.9rem] hover:bg-[#eaeded] rounded-md cursor-pointer"
            >
              <div>{item.menuItem}</div>
              <ArrowForwardIosIcon className="text-sm" />
            </li>
          )
        )}
      </ul>
    </div>
  );
};



export const LeftMenuBox2 = ({ title, listDetail }) => {
  return (
    <div className="p-5 text-[#111] border-b border-[#d5dbdb]">
      <h3 className="font-semibold mb-4">{title}</h3>
      <ul className="list-none">
        {listDetail.map((item) => (
          <li
            key={item.id}
            className="py-[0.7rem] text-[0.9rem] hover:bg-[#eaeded] rounded-md cursor-pointer"
          >
            {item.menuItem}
          </li>
        ))}
      </ul>
    </div>
  );
};

