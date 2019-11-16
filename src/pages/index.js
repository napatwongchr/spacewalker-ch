import React from "react"
import { Global, css, keyframes } from "@emotion/core"

import SEO from "../components/seo"
import spacewalkerIcon from "../images/spacewalker-icon.png"
import facebookIcon from "../images/facebook.png"
import lineIcon from "../images/line.png"
import twitterIcon from "../images/twitter.png"
import youtubeIcon from "../images/youtube.png"

const socials = [
  {
    src: youtubeIcon,
    url: "https://www.youtube.com/channel/UC6QIx75fjE2ee135egI4fDg",
    alt: "youtube icon",
  },
  {
    src: facebookIcon,
    url: "https://www.facebook.com/spacewalker.ch",
    alt: "facebook icon",
  },
  {
    src: lineIcon,
    url:
      "https://line.me/ti/g2/nES-h_tpXRighsqWgRDHLw?utm_source=invitation&utm_medium=link_copy&utm_campaign=default",
    alt: "line icon",
  },
  {
    src: twitterIcon,
    alt: "twitter icon",
    url: "https://twitter.com/spacewalker_ch",
  },
]

const IndexPage = () => {
  return (
    <div
      css={css`
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      `}
    >
      <SEO
        title="Spacewalker CH"
        description="เล่นเกมส์คนเดียวมันไม่สนุก ถ้าจะเล่นให้สนุกต้องเล่นกับเพื่อนนน"
      />
      <Global
        styles={css`
          body {
            background: black;
          }
        `}
      />
      <img
        css={css`
          @media (max-width: 576px) {
            margin-top: 50px;
          }
        `}
        width={256}
        height={256}
        src={spacewalkerIcon}
      />
      <div
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          @media (max-width: 576px) {
            display: flex;
            flex-direction: column;
          }
        `}
      >
        {socials.map((social, index) => (
          <a
            css={css`
              position: relative;
              animation: ${animation.shake} 1s ease-in infinite;
            `}
            key={index}
            href={social.url}
          >
            <img
              css={css`
                margin-right: 40px;
                cursor: pointer;
              `}
              width={90}
              height={90}
              src={social.src}
              alt={social.alt}
            />
          </a>
        ))}
      </div>
    </div>
  )
}

const animation = {
  shake: keyframes`
    0% {
      left: 0px;
      top: 10px;
    }
    40% {
      left: 0px;
      top: 15px;
    }
    100% {
      left: 0px;
      top: 10px;
    }
  `,
}

export default IndexPage
