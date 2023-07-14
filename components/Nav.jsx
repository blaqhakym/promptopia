"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const authProviders = async () => {
      const response = await getProviders();
      setProviders(response);
      // console.log(response)
    };


    authProviders();
  }, []);

  const {data: session} = useSession();
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Promptopia Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* desktop navigation */}

      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Prompt
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>

            <Link href="/profile/my-profile" title="profile">
              <Image
                alt="profile"
                width={37}
                height={37}
                src={session?.user?.image}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn">
                  Sign In with {provider.name}
                </button>
              ))}
          </>
        )}
      </div>

      {/* mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              alt="profile"
              width={37}
              height={37}
              onClick={() => {
                setToggleDropdown((prev) => !prev);
              }}
              src={session?.user?.image}
              className="rounded-full"
            />
            {toggleDropDown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}>
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}>
                  Create Prompt
                </Link>

                <button
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  type="button"
                  className="mt-5 w-full black_btn">
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn">
                  Sign In {provider.name.toLowerCase()}
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
