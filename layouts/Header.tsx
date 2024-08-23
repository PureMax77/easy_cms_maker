import {
  Image,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import React from "react";

const Header: React.FC = () => {
  const router = useRouter();
  const { pathname } = router;

  const pathArray = pathname.split("/");
  const lastSegment = pathArray[pathArray.length - 1];

  const logoClass: string =
    "grid items-center w-[180px] h-[80px] bg-blue-500 rounded-[10px] text-xl text-white text-center font-bold";
  const btnClass: string =
    "flex gap-3 !text-16 text-inherit font-medium py-0 min-w-fit cursor-pointer";

  const isActive = (path: string) => {
    if (lastSegment == path) return true;
    else return false;
  };

  return (
    <>
      <Navbar
        classNames={{
          base: ["bg-white", "h-[120px]", "border-b-1", "px-20"],
          wrapper: ["w-full", "max-w-full", "px-0"],
          content: ["w-full"],
        }}
      >
        <NavbarBrand>
          <span
            className={logoClass}
            style={{ cursor: "pointer" }}
            onClick={() => router.push("/")}
          >
            EZCodeMaker
          </span>
        </NavbarBrand>
        {/* <div className="ml-14 flex flex-row w-full h-[40px] bg-white items-center">
          <NavbarContent className="md:flex items-center" justify="start">
            <NavbarItem
              className={
                isActive("setup")
                  ? "w-[220px] py-2 px-4 rounded-lg bg-slate-100"
                  : "w-[220px] py-2 px-4 rounded-lg"
              }
            >
              <Link className={btnClass} onClick={() => router.push("/setup")}>
                <Image
                  src={"/images/ic_setup.png"}
                  className="rounded-none"
                  alt="CMS Setup"
                />
                CMS Setup
              </Link>
            </NavbarItem>
            <NavbarItem
              className={
                isActive("ezm")
                  ? "w-[220px] py-2 px-4 rounded-lg bg-slate-100"
                  : "w-[220px] py-2 px-4 rounded-lg"
              }
            >
              <Link className={btnClass} onClick={() => router.push("/ezm")}>
                <Image
                  src={"/images/ic_ezm.png"}
                  className="rounded-none"
                  alt="EZCodeMaker"
                />
                EZCodeMaker
              </Link>
            </NavbarItem>
            <NavbarItem
              className={
                isActive("token")
                  ? "w-[220px] py-2 px-4 rounded-lg bg-slate-100"
                  : "w-[220px] py-2 px-4 rounded-lg"
              }
            >
              <Link className={btnClass} onClick={() => router.push("/token")}>
                <Image
                  src={"/images/ic_token.png"}
                  className="rounded-none"
                  alt="Token"
                />
                Token
              </Link>
            </NavbarItem>
            <NavbarItem
              className={
                isActive("exchange")
                  ? "w-[220px] py-2 px-4 rounded-lg bg-slate-100"
                  : "w-[220px] py-2 px-4 rounded-lg"
              }
            >
              <Link
                className={btnClass}
                onClick={() => router.push("/exchange")}
              >
                <Image
                  src={"/images/ic_exchange.png"}
                  className="rounded-none"
                  alt="Exchange"
                />
                Exchange
              </Link>
            </NavbarItem>
          </NavbarContent>
        </div> */}
      </Navbar>
    </>
  );
};

export { Header };
