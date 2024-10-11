import {
  AiFillCustomerService,
  AiFillHome,
  AiFillInfoCircle,
  AiFillPhone,
  AiOutlineClose,
  AiOutlineMenu,
} from "react-icons/ai";
import { useState } from "react";

const Sidenav = () => {
  const [nav, setNav] = useState(false);

  const navHandler = () => {
    setNav(!nav);
  };
  return (
    <div
      className={`${
        nav ? "sm:w-full" : "sm:w-[72px]"
      } duration-300 min-h-10 sm:h-full bg-slate-800 flex flex-col`}
    >
      <div
        className="text-green-700 px-2 pt-2 block text-2xl"
        onClick={navHandler}
      >
        {nav ? <AiOutlineClose /> : <AiOutlineMenu />}
      </div>
      <div className="text-green-500 flex flex-col">
        <ul className="mt-4 hidden flex-col justify-between sm:flex">
          <li className="flex px-4 my-4 hover:bg-sky-700">
            <AiFillHome className="mx-2 text-2xl" />
            <p className={`${!nav ? "hidden" : ""}`}>Home</p>
          </li>
          <li className="flex px-4 my-4">
            <AiFillInfoCircle className="mx-2 text-2xl" />{" "}
            <p className={`${!nav ? "hidden" : ""}`}>About</p>
          </li>
          <li className="flex px-4 my-4">
            <AiFillCustomerService className="mx-2 text-2xl" />
            <p className={`${!nav ? "hidden" : ""}`}>Services</p>
          </li>
          <li className="flex px-4 my-4">
            <AiFillPhone className="mx-2 text-2xl" />
            <p className={`${!nav ? "hidden" : ""}`}>Contact</p>
          </li>
        </ul>
      </div>
      <div
        className={
          !nav
            ? "text-green-500  w-[60%] ease-in-out duration-300 fixed top-5 left-[-100%] sm:hidden bg-slate-800"
            : "text-green-500  fixed top-5 ease-in-out duration-500  left-0 sm:hidden w-[60%] bg-slate-800"
        }
      >
        <ul className="mt-10 flex-col justify-between sm:flex ">
          <li className="flex my-4 border-b border-gray-300">
            <AiFillHome className="mx-2" />
            Home
          </li>
          <li className="flex my-4 border-b border-gray-300">
            <AiFillInfoCircle className="mx-2" /> About
          </li>
          <li className="flex my-4 border-b border-gray-300">
            <AiFillCustomerService className="mx-2" />
            Services
          </li>
          <li className="flex my-4">
            <AiFillPhone className="mx-2" />
            Contact
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidenav;
