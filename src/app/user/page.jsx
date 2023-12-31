'use client'
import React ,{useState ,useEffect} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import "../css/userProfile.css"
import "../css/Font.css"
import Navbar from '../components/Navbar'
import images from '../createImageImport'
import Logo from "../img/Logo.png"

export default function Page() {
  const router = useRouter()

  const [user ,setUser] = useState({})
  const [artwork ,setArtworkData] = useState([])
  const [isLoggedIn ,setIsLoggedIn] = useState(false)

  const session = async () => {
    try {
      const response = await fetch('http://localhost:4000/user/session')
      const data = await response.json()

      if (data.loggedIn) {
        setUser(data.user_session)
        setIsLoggedIn(true)
        router.push('/user')
      } else {
        setIsLoggedIn(false)
        router.push('/signInUpMenu')
      }
    } catch (error) {
      console.error("Request failed : " + JSON.stringify(error));
    }
  }

  const artwork_session = async () => {
    try {
      const response = await fetch(`http://localhost:4000/gallery/gallery_user/${user.user_username}`)
      const data = await response.json()
      setArtworkData(data)
    } catch (error) {
      console.error("Request failed : " + JSON.stringify(error));
    }
  }

  useEffect(() => {
    session()
  }, [isLoggedIn])

  return (
    <>
        <Head>
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="author" content="user_profile" />
            <meta name="description" content="Portfolio of user_profile" />
            <title>User Profile</title>
        </Head>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <main>
            <div className='user_header' onLoad={artwork_session}>
                {
                  Object.keys(images).map((image) => {
                    if (!image.startsWith('src')) {
                      if (image === user.user_imageprofile) {
                        return (
                          <div className='user_image_header'>
                            <Image src={images[image]} className='user-edit-image-src' alt='user_edit_image' width={500} height={500} />
                          </div>
                        )
                      }
                    }
                  })
                }
                {
                  user.user_imageprofile === null && 
                  <div className='user_image_header'>
                    <Image src={Logo} className='user-edit-image-src' alt='user_edit_image' width={500} height={500} />
                  </div>
                }
                <div className='user_info_header'>
                    <h2>{user.user_artistname === null ? `${user.user_username}${Math.floor(Math.random() * 10000)}`: user.user_artistname}</h2>
                    <p>{user.user_username}</p>
                </div>
            </div>
            <div className='user_artwork'>
                <div className='user_artwork'>
                    <div className='artwork_container'>
                        {
                          artwork.map((item) => (
                            Object.keys(images).map((image) => {
                              if (!image.startsWith('src')) {
                                if (image === item.gallery_work) {
                                  return (
                                    <div>
                                      <Image src={images[image]} style={{objectFit:'cover'}} width={400} height={400}/>
                                      <h3>{item.gallery_title.toUpperCase()}</h3>
                                      <p>Post Date: {item.gallery_date.slice(0 ,-5).replace('T' ," ")}</p>
                                    </div>
                                  )
                                }
                              }
                            })
                          ))
                        }
                    </div>
                </div>
            </div>
        </main>
    </>
  )
}
