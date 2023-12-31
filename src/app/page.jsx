"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Head from "next/head";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import Navbar from "./components/Navbar";
import ArtWork from "./components/ArtWork";
import "./css/home.css";
import Monalisa from "./img/Mona_Lisa,_by_Leonardo_da_Vinci,_from_C2RMF_retouched.jpg";
import StarryNight from "./img/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg";
import theLastSupper from "./img/Última_Cena_-_Da_Vinci_5.jpg";
import GirlScream from './img/5.-The-Scream-–-Edvard-Munch.jpg';
import GirlWithPearlEarring from './img/7.-Girl-With-A-Pearl-Earring-–-Johannes-Vermeer.jpg';
import SelfPortrait from './img/9.-Self-–-Portrait-Without-Beard-–-Vincent-van-Gogh.jpg';
const MySwal = withReactContent(Swal);

export default function Home() {
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
        router.push("/");
      } else {
        setIsLoggedIn(false);
        router.push("/signInUpMenu");
      }
    } catch (error) {
      console.error("Request failed : " + JSON.stringify(error));
    }
  };

  useEffect(() => {
    session();
  }, [isLoggedIn]);

  const data_section_ = [
    {
      img: Monalisa,
      nameHeader: "Mona Lisa",
      description: `
        Artist  Leonardo da Vinci
        Year  c. 1503–1506, perhaps continuing until c. 1517
        Medium  Oil on poplar panel
        Subject Lisa  Gherardini
        Dimensions  77 cm × 53 cm (30 in × 21 in)
        Location  Louvre, Paris
      `,
      footer_desc:
        "The Mona Lisa digitally retouched to reduce the effects of aging; the unretouched image is slightly darker.",
    },
    {
      img: StarryNight,
      nameHeader: "Starry Night",
      description: `
      Artist  Vincent van Gogh
      Year  1889
      Medium  Oil on canvas
      Dimensions  73.7 cm × 92.1 cm (29.01 in × 36.26 in)
      Location  Museum of Modern Art, currently on loan to the Metropolitan Museum of Art, New York
      Accession  472.1941
      `,
      footer_desc: "",
    },
    {
      img: theLastSupper,
      nameHeader: "The Last Supper",
      description: `
        Artist  Leonardo da Vinci 
        Year  c.1495–1498
        Type  Tempera on gesso, pitch, and mastic
        Movement  High Renaissance
        Dimensions  460 cm × 880 cm (181 in × 346 in)
        Location  Santa Maria delle Grazie, Milan
      `,
      footer_desc: "",
    },
    {
      img: GirlScream,
      nameHeader: "Girl's Scream",
      description: `
        Artist   Edvard Munch
        Year   1893TypeOil, tempera, pastel and crayon on cardboard
        Movemen   tProto-Expressionism
        Dimensions   91 cm × 73.5 cm (36 in × 28.9 in)
        Location   National Gallery and Munch Museum, Oslo, Norway
      `,
      footer_desc: "",
    },
    {
      img: GirlWithPearlEarring,
      nameHeader: "Girl With A Pearl Earring",
      description: `
        Artist   Johannes Vermeer
        Year   c. 1665
        Type   Tronie
        Medium   Oil on canvas
        Movement   Dutch Golden Age painting
        Dimensions   44.5 cm × 39 cm (17.5 in × 15 in)
        LocationMauritshuis, The Hague, Netherlands
      `,
      footer_desc: "",
    },
    {
      img: SelfPortrait,
      nameHeader: "Self Portrait Without Beard",
      description: `
        Artist   Vincent van Gogh
        Year   1889
        Medium   Oil on canvas
        Dimensions   65 cm × 54 cm (26 in × 21 in)
        `,
      footer_desc: "",
    }
  ];

  return (
    <>
      <Head>
        <title>ArtGallery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar
        is_enableSearchBar={true}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <main className="container">
        <div className="cover_header">
          <h1>ART GALLERY</h1>
          {isLoggedIn ? <h2>Welcome ,{user.user_username}</h2> : <h2></h2>}
          <h3>"Art is not what you see ,but what you make other see."</h3>
        </div>
        <div className="text_headline">
          <p>
            "the best known, the most visited, the most written about, the most
            sung about, the most parodied work of art in the world"
          </p>
        </div>
        <div className="section_example_art">
          <figure>
            {data_section_.map((item, id) => (
              <div className="section_container" key={id}>
                <div className="section_image_container">
                  <div className="rectangle_graphic"></div>
                  <div className="image_container">
                    <Image
                      src={item.img}
                      sizes="32"
                      className="image"
                      alt={item.nameHeader}
                    />
                  </div>
                </div>
                <div className="section_description_container">
                  <h2>{item.nameHeader}</h2>
                  <p>{item.description}</p>
                  <small>{item.footer_desc}</small>
                </div>
              </div>
            ))}
          </figure>
        </div>
        <ArtWork user={user} />
      </main>
    </>
  );
}
