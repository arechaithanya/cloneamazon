'use client';
import React from "react";
import NavBar from "./NavBar";
import LocationOnIcon from "@mui/icons-material/LocationOn";
// import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Link from "next/link";
import { CartCountBadge } from "./CartCountBadge";
import { assetsImg } from "../Data/data";
import SearchBar from "./SearchBar";
const Header = () => {

  return (
    <header className="sticky top-0 z-[999] w-full">
      <div className="flex flex-wrap justify-between items-center min-h-[60px] py-2 bg-[#131921] text-white lg:flex-nowrap">
        <div className=" mx-4 flex justify-center items-center">
          <div className=" w-28 border border-transparent hover:border-white p-2 h-12">
            <Link href={'/'}>
              <img className=" w-full" src={assetsImg.amazonLogo} alt="" />
            </Link>
          </div>
          <Link href="/account/addresses" className="flex justify-center items-center text-sm p-2 h-12 border border-transparent hover:border-white m-0 text-white no-underline">
            <div>
              <LocationOnIcon />
            </div>
            <div>
              <span className="text-[12px] text-[#d7cece]">Hello</span>
              <p className="font-semibold capitalize">Select Your Address</p>
            </div>
          </Link>
        </div>
        <SearchBar />
        <div className=" mx-4 flex justify-center items-center">
          <div className="text-sm p-2 h-12 border border-transparent hover:border-white flex justify-center items-center">

            <div className=" gap-2 flex justify-center items-center">
              <img src="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/4.1.4/flags/4x3/in.svg" />
              <p className="font-semibold capitalize">EN</p>
            </div>
          </div>
          <div className=" px-1">
            <ArrowDropDownIcon />
          </div>

          <Link href="/login" className="text-[12px] p-2 h-12 border border-transparent hover:border-white">
            <span>Hello, <span>Sign in</span></span>
            <p className="font-semibold capitalize">Account & List</p>
          </Link>
          <Link href="/orders" className="text-[12px] p-2 h-12 border border-transparent hover:border-white">
            <span>Returns</span>
            <p className="font-semibold capitalize">& Orders</p>
          </Link>
          <Link href={"/CartPage"}>
            <div className="text-sm p-2 h-12 border border-transparent hover:border-white flex justify-center items-center">
              <div className="font-semibold capitalize flex flex-col justify-center items-start">
                <CartCountBadge />
                <div className=" flex ">
                  <ShoppingCartIcon />
                  <p>Cart</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <NavBar />
    </header>
  );
};

export default Header;
