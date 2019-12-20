import React from "react"
import { css } from "@emotion/core"
import MonsterLineUp from "./MonsterLineUp"
import ResonanceSummary from "./ResonanceSummary"
import { mediaQuery } from "../../utils"
import MONSTERS from "./data/monsters.json"

const uuidv4 = require("uuid/v4")

function ResonanceCalArea({ monsterList, setMonsterList }) {
  const handleDragOver = e => {
    e.preventDefault()
  }

  const handleOnDrop = e => {
    if (monsterList.length < 5) {
      let droppedHeroId = e.dataTransfer.getData("id")
      let filteredHero = MONSTERS.data
        .filter(hero => hero.id === droppedHeroId)
        .map(item => {
          return {
            ...item,
            id: `${item.id}-${uuidv4()}`,
          }
        })
      setMonsterList([...monsterList, ...filteredHero])
    }
  }

  return (
    <div
      css={styles.resonanceCalSection}
      onDragOver={handleDragOver}
      onDrop={handleOnDrop}
    >
      <div css={styles.resonanceCalHeading}>
        <span>MONSTERS LINE UP</span>
      </div>
      <MonsterLineUp
        monsterList={monsterList}
        setMonsterList={setMonsterList}
      />
      <ResonanceSummary monsterList={monsterList} />
      <div css={styles.footer}>
        <a
          css={styles.creditText}
          href="https://www.facebook.com/spacewalker.ch"
        >
          By Spacewalker CH
        </a>
      </div>
    </div>
  )
}

const styles = {
  resonanceCalSection: css`
    position: relative;
    width: 100vw;
    background-color: rgba(26.1, 25.9, 31.5, 0.8);
    padding: 0px 50px;
    ${mediaQuery[0]} {
      height: 100%;
    }
  `,
  resonanceCalHeading: css`
    font-size: 50px;
    letter-spacing: 3px;
    display: flex;
    justify-content: center;
    margin: 30px 0;
    color: white;
    ${mediaQuery[0]} {
      font-size: 35px;
      text-align: center;
    }
  `,
  footer: css`
    position: absolute;
    bottom: 0;
    right: 5px;
    color: white;
    font-size: 16px;
  `,
  creditText: css`
    text-decoration: none;
    :visited {
      color: white;
    }
  `,
}

export default ResonanceCalArea
