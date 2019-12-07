import React from "react"
import { css } from "@emotion/core"
import MONSTERS from "./data/monsters.json"

const uuidv4 = require("uuid/v4")

function MonsterPoolList({ monsterList, setMonsterList }) {
  const handleOnDragStart = heroId => e => {
    e.dataTransfer.setData("id", heroId)
  }

  const handleOnDoubleClick = clickedHeroId => e => {
    if (monsterList.length < 5) {
      let filteredHero = MONSTERS.data
        .filter(hero => hero.id === clickedHeroId)
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
    <div css={styles.container}>
      <div css={styles.heading}>
        <h1 css={styles.headingText}>MONSTER LIST</h1>
      </div>

      <div css={styles.monsterPoolList}>
        {MONSTERS.data.map(monster => {
          let monsterImgName = monster.name
            .split(" ")
            .map(word => word.toLowerCase())
            .join("-")
          return (
            <div
              key={monster.id}
              css={styles.monster}
              draggable
              onDragStart={handleOnDragStart(monster.id)}
              onDoubleClick={handleOnDoubleClick(monster.id)}
            >
              <img
                src={require(`../../images/monsters/${monsterImgName}.png`)}
                alt={monster.name}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

const styles = {
  container: css`
    max-width: 350px;
    background-color: rgba(26.1, 25.9, 31.5, 0.8);
    box-shadow: 2px 0 5px -2px rgba(255, 255, 255, 0.9);
  `,
  heading: css`
    letter-spacing: 3px;
    display: flex;
    justify-content: center;
    color: white;
  `,
  headingText: css`
    font-family: "Baloo Bhai", cursive;
    font-size: 32px;
    margin-top: 20px;
    margin-bottom: 5px;
  `,
  monsterPoolList: css`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    overflow-y: scroll;
    max-height: 86%;
  `,
  monster: css`
    display: inline;
    margin: 10px;
    width: 60px;
    height: 60px;
    cursor: grab;
  `,
}

export default MonsterPoolList
