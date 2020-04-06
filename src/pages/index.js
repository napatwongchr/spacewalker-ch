import React from "react"
import { Link } from "gatsby"
import { Global, css, keyframes } from "@emotion/core"

import SEO from "../components/seo"
import spacewalkerIcon from "../images/spacewalker-icon.png"
import facebookIcon from "../images/facebook.png"

const socials = [
  {
    src: facebookIcon,
    url: "https://www.facebook.com/spacewalker.ch",
    alt: "facebook icon",
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
            background: #1f1f1f;
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
        alt="spacewalker icon"
      />
      <Link css={styles.card} to="/ragnarok-tactics-simulator">
        Ragnarok Tactics Team Simulator
      </Link>
      <div
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 20px;
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
                @media (max-width: 576px) {
                  margin-right: 0px;
                }
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

const styles = {
  card: css`
    border-radius: 5px;
    background-color: white;
    padding: 20px;
    cursor: pointer;
    margin-bottom: 20px;
  `,
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
