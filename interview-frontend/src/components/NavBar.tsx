import React from "react";
import {
  FaPhoneSlash,
  FaBars,
  FaAddressCard,
  FaRuler,
  FaCog,
  FaDoorOpen,
} from "react-icons/fa";
import Cookies from "js-cookie";
import Link from "next/link";
import { ColorButton, FreeButton } from "./Button";
function NavBar(props: any) {
  return (
    <nav className="flex justify-between items-center h-20 bg-black">
      <div className="ml-10">
        <NavBarBrand color="white">
          <Link href="/">INTERVIEW APP</Link>
        </NavBarBrand>
      </div>
      <div className="flex items-center">{props.children}</div>

      <div className="flex">
        {props.userData.username ? (
          <MenuButton>
            <NavMenu
              userData={props.userData}
              color="bg-gradient-to-r from-green-400 to-green-500"
            >
              <DropdownItem
                icon={
                  <FaAddressCard className="w-5 h-5 text-black text-opacity-90" />
                }
              >
                Interviews
              </DropdownItem>
              <DropdownItem
                icon={
                  <FaRuler className="w-5 h-5 text-black text-opacity-90" />
                }
              >
                Analytics
              </DropdownItem>
              {props.userData.admin == 1 ? (
                <DropdownItem
                  icon={
                    <FaPhoneSlash className="w-5 h-5 text-black text-opacity-90" />
                  }
                >
                  <Link href="/doctor">Dashboard</Link>
                </DropdownItem>
              ) : (
                <DropdownItem
                  icon={
                    <FaPhoneSlash className="w-5 h-5 text-black text-opacity-90" />
                  }
                >
                  <Link href="/dashboard">Profile</Link>
                </DropdownItem>
              )}
            </NavMenu>
          </MenuButton>
        ) : (
          <div className="flex">
            <div className="mr-5">
              <ColorButton color="sky-300">
                <Link href="/signup">
                  <div className="text-white">Sign Up</div>
                </Link>
              </ColorButton>
            </div>
            <div className="mr-5">
              <FreeButton color="blue-500">
                <Link href="/login">
                  <div className="text-white">Log In</div>
                </Link>
              </FreeButton>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

function NavBarBrand(props: any) {
  const classes = `
  text-2xl text-${props.color ? props.color : "black"} text-bold mr-10
  `;
  return <div className={classes}>{props.children}</div>;
}

function NavBarItem(props: any) {
  const classes = `
  text-md text-${props.color ? props.color : "black"} text-bold mx-10
  `;
  return <div className={classes}>{props.children}</div>;
}
function MenuButton(props: any) {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <div
        onClick={() => {
          setOpen(!open);
          console.log(open);
        }}
        className="flex items-center ml-10 mr-10 h-10 w-10 rounded-full bg-green-300"
      >
        <a href="#" className="w-full flex justify-center text-2xl">
          <FaBars className="w-6 h-6"></FaBars>
        </a>
      </div>
      {open && props.children}
    </div>
  );
}
function DropdownItem(props: any) {
  return (
    <div className="flex justify-center items-center">
      <div className=" text-xs text-black flex text-opacity-70 items-center justify-center w-16 h-16 cursor-pointer text-center transition rounded-xl  hover:bg-blue-500 bg-opacity-20 duration-500">
        <div>
          <div className="flex justify-center">{props.icon}</div>
          {props.children}
        </div>
      </div>
    </div>
  );
}
function NavMenu(props: any) {
  return (
    <div
      className={`z-50 absolute shadow-2xl rounded-lg top-16 w-72 transform -translate-x-48 px-3 py-5  ${props.color}`}
    >
      <div className="bg-gray-100  rounded-xl px-2 py-2 mb-3">
        <div className="grid grid-cols-3">
          <div className="col-span-3 flex items-center justify-center">
            <div>
              <div className="text-xl text-black text-center text-opacity-90">
                {props.userData.username}
              </div>
              <div className="text-xs text-black text-center text-opacity-70">
                {props.userData.admin ? "Admin" : "User"}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-100  rounded-xl px-2 py-3 mb-3">
        <div className="grid grid-cols-3 gap-2">{props.children}</div>
      </div>
      <div className="bg-gray-100  hover:bg-yellow-300 cursor-pointer transition duration-500 rounded-xl px-2 py-2 mb-3">
        <div className="flex items-center bg-opacity-20 p-2 rounded-xl ">
          <FaCog className="text-black w-5 h-5 text-opacity-90"></FaCog>
          <div className="text-md text-black ml-2 text-opacity-90">
            Settings
          </div>
        </div>
      </div>
      <div
        onClick={() => {
          window.location.reload();
          Cookies.remove("token");
        }}
        className="bg-gray-100 cursor-pointer hover:bg-red-500 transition duration-500 rounded-xl px-2 py-2"
      >
        <div className="flex items-center   bg-opacity-20 p-2 rounded-xl">
          <FaDoorOpen className="text-black w-5 h-5 text-opacity-90"></FaDoorOpen>
          <div className="text-md text-black text-opacity-90 ml-2">Logout</div>
        </div>
      </div>
    </div>
  );
}

function NavItem(props: any) {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <div
        onClick={() => {
          setOpen(!open);
          console.log(open);
        }}
        className="flex items-center ml-10 mr-10 h-10 w-10 rounded-full bg-green-300"
      >
        <a href="#" className="w-full flex justify-center text-2xl">
          <FaBars className="w-6 h-6"></FaBars>
        </a>
      </div>
      {open && props.children}
    </div>
  );
}

export default NavBar;
