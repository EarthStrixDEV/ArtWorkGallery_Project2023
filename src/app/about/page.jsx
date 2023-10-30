"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

import "../css/about.css";

import PimImage from "../img/366429773_1204065290290657_7747114279393195006_n.png"
import KU_QR from "../img/KU SRC.png"

export default function page() {
  const router = useRouter();

  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const session = async () => {
    try {
      const response = await fetch("http://localhost:4000/user/session");
      const data = await response.json();

      if (data.loggedIn) {
        setUser(data.user_session);
        setIsLoggedIn(true);
        router.push("/about");
      } else {
        setIsLoggedIn(false);
        router.push("/signInUpMenu");
      }
    } catch (error) {
      console.error("Request failed : " + JSON.stringify(error));
    }
  };

  useEffect(() => {
    session()
  }, [isLoggedIn])

  return (
    <>
      <Navbar is_enableSearchBar={false} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <main>
        <div className="head">
          <h1>ABOUT</h1>
        </div>
        <div className="box_profile">
          <div className="Photo">
            <Image src={PimImage} alt="profile" width={300} height={300} className="profile" />
            <p>Pim Kalasinmongol</p>
            <p>position</p>
          </div>

          <div className="Photo">
            <Image src={PimImage} alt="profile" width={300} height={300} className="profile" />
            <p>Pim Kalasinmongol</p>
            <p>position</p>
          </div>

          <div className="Photo">
            <Image src={PimImage} alt="profile" width={300} height={300} className="profile" />
            <p>Pim Kalasinmongol</p>
            <p>position</p>
          </div>
        </div>
        <footer className="footer-section">
          <div className="text_footer">
            <p>Location : Kasetsart Univercity ,Sriracha</p>
            <p>Contact : 022-222-2222</p>
            <p>Email : ku.src@ku.th</p>
          </div>
          <div className="QR">
            <Image src={KU_QR} alt="KU-SRC" width={120} height={120} />
          </div>
        </footer>
      </main>
    </>
  );
}
