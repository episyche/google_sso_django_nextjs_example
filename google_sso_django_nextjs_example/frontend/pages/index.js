import styles from '../styles/Home.module.css'
import React, { useEffect } from "react";

import { useSession, signIn } from "next-auth/react"
import Image from 'next/image';

export default function Home({ providers }) {
  const { data: session, loading } = useSession()
  useEffect(() => {
    if (session) {
      if (session.provider === "google") {
        var auth_token = session.auth_token
        backendapi(auth_token)
      }

    }

  }, [session])
  function backendapi(auth_token) {
    // var tag = document.getElementById("user_token").innerHTML = auth_token
    fetch(`http://127.0.0.1:8000/accounts/google/`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "auth_token": auth_token }),
    }).then((data) => data.json())
      .then((res) => {
        if (res.tokens) {
          document.getElementById("email_id").innerText = res.email
          document.getElementById("token").innerText = res.tokens
        }
      })
  }
  return (
    <>

      <div id='google-login-btn'>
        <div
          type="submit"
          id='googlelogin'
          onClick={() => signIn("google")}
        >
          <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans" />

          <div class="google-btn">
            <div class="google-icon-wrapper">
              <Image class="google-icon" src="/Google__G__Logo (1).svg" layout='fill' />
            </div>
            <p class="btn-text"><b>Sign in with google</b></p>
          </div>
        </div>
        <h6 id='user_token'></h6>
        <div>
          <label>Email Id :</label>
          <label id='email_id'></label>
        </div>
        <div >
          <label>Auth token :</label>
          <label id='token'></label>
        </div>
      </div>
    </>
  )
}
