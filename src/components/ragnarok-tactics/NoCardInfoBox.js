import React from "react"
import { css } from "@emotion/core"

function NoCardInfoBox() {
  let windowWidth = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  )
  if (
    windowWidth <= 576 ||
    (windowWidth > 576 && windowWidth <= 768) ||
    (windowWidth > 768 && windowWidth <= 992) ||
    (windowWidth > 992 && windowWidth <= 1200)
  ) {
    return (
      <div css={styles.noCardInfoBox}>
        <span>Tap monster in hero list</span>
      </div>
    )
  }
  return (
    <div css={styles.noCardInfoBox}>
      <span>Double click monster</span>
      <span>or</span>
      <span>Drag monster here !</span>
    </div>
  )
}

const styles = {
  noCardInfoBox: css`
    display: flex;
    flex-direction: column;
    text-align: center;
    font-size: 24px;
    width: 100%;
    border: 3px dashed rgb(238, 238, 238);
    border-radius: 3px;
    color: white;
    padding: 70px 0;
    letter-spacing: 3px;
  `,
}

export default NoCardInfoBox
