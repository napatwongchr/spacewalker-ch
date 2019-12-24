import React, { useState } from "react"
import { Global, css } from "@emotion/core"

import SEO from "../components/seo"

import HeroList from "../components/ragnarok-tactics/HeroList"
import ResonanceCalArea from "../components/ragnarok-tactics/ResonanceCalArea"
import wallpaper from "../images/main-bg.png"

import { mediaQuery } from "../utils"
import "bootstrap/dist/css/bootstrap.min.css"

function RagnarokTacticsPage() {
  const [monsterList, setMonsterList] = useState([])

  return (
    <div css={styles.container}>
      <SEO
        title="Ragnarok Tactics Team Emulator - Spacewalker CH"
        description="โปรแกรมจำลองการจัดทีม"
      />
      <Global
        styles={css`
          body {
            background-color: #070509;
          }
          img {
            margin-bottom: 0;
          }
        `}
      />
      <HeroList monsterList={monsterList} setMonsterList={setMonsterList} />
      <ResonanceCalArea
        monsterList={monsterList}
        setMonsterList={setMonsterList}
      />
    </div>
  )
}

const styles = {
  container: css`
    font-family: "Baloo Bhai", cursive;
    height: 100vh;
    display: flex;
    background-image: url(${wallpaper});
    ${mediaQuery[0]} {
      flex-direction: column;
    }
    ${mediaQuery[2]} {
      flex-direction: column;
    }
    ${mediaQuery[3]} {
      background-repeat: no-repeat;
    }
  `,
}

export default RagnarokTacticsPage
