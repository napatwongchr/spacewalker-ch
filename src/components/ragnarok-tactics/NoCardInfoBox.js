import React from "react"

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

export default NoCardInfoBox
