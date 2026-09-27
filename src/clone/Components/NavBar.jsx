'use client';
import { useContext, useState } from "react";
// import NavBarItem from "../Details/NavBarItem"
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LeftBar from "./LeftBar";
import CartContext from "../ContextApi/CartContext";
import Link from "next/link";
import { NavBarItem } from "../Data/data";

const NavBar = () => {

  const { openButton } = useContext(CartContext);

  return (
    <>
      <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap bg-[#232f3e] px-2 text-white">
        <div className="flex justify-center items-center cursor-pointer gap-2">
          <div onClick={() => openButton()}><MenuIcon />All</div>
          {/* <div className="bold">All</div> */}
          <LeftBar />
        </div>
        <div className="min-w-0 flex-1 list-none">
          <ul className="flex">
            {NavBarItem.map((item) =>
              item.href ? (
                <li key={item.id} className="inline-block shrink-0">
                  <Link
                    href={item.href}
                    className="block px-3 py-3 text-sm font-semibold text-white no-underline border border-transparent transition-all duration-300 ease-in-out hover:border-white"
                  >
                    {item.MenuItem.trim()}
                  </Link>
                </li>
              ) : (
                <li
                  key={item.id}
                  className="inline-block shrink-0 px-3 py-3 text-sm font-semibold border border-transparent transition-all duration-300 ease-in-out hover:border-white"
                >
                  {item.MenuItem}
                </li>
              )
            )}
          </ul>
        </div>
        {/* <div className="font-bold text-[1.2rem] flex justify-center items-center">
          <div>
            <p>CITADEL</p>
          </div>
          <div className="h-4 w-[2px] mx-2 bg-white"></div>
          <div className="offer-date">
            <span className="date">ddd</span>
            <span className="count-down">ddd</span>
          </div>
        </div> */}
      </div>
    </>
  )
}

export default NavBar