import React, { useState, useEffect, useCallback, Fragment } from "react"
import { css } from "@emotion/core"
import BONUS_ELEMENT_BUFFS from "./data/elementBuffs.json"
import BONUS_AURA_BUFFS from "./data/auraBuffs.json"

function ResonanceSummary({ monsterList }) {
  const [resonanceAuraCount, setResonanceAuraCount] = useState({})
  const [resonanceElementCount, setResonanceElementCount] = useState({})
  const [resonanceElementBuffs, setResonanceElementBuffs] = useState([])
  const [resonanceAuraBuffs, setResonanceAuraBuffs] = useState([])

  const countResonances = useCallback(() => {
    let countElements = {}
    let countAuras = {}
    // count types
    monsterList.forEach(monster => {
      if (countElements[monster.element]) {
        countElements[monster.element]++
      } else {
        countElements[monster.element] = 1
      }
      // count auras
      monster.auras.forEach(aura => {
        if (countAuras[aura]) {
          countAuras[aura]++
        } else {
          countAuras[aura] = 1
        }
      })
      // count additional auras (unlock monster aura)
      if (monster.isAdditionalAuraCheck) {
        monster.additionalAuras.forEach(aura => {
          if (countAuras[aura]) {
            countAuras[aura]++
          } else {
            countAuras[aura] = 1
          }
        })
      }
      //count essence auras
      ;(monster.essenceAuras || []).forEach(aura => {
        if (countAuras[aura]) {
          countAuras[aura]++
        } else {
          countAuras[aura] = 1
        }
      })
    })

    setResonanceAuraCount(countAuras)
    setResonanceElementCount(countElements)
  }, [monsterList])

  const checkElementBuffCondition = useCallback(() => {
    let resultBuffs = []

    Object.keys(BONUS_ELEMENT_BUFFS).forEach(bonus => {
      let isConditionValid = Object.keys(
        BONUS_ELEMENT_BUFFS[bonus]["conditions"]
      ).map(element => {
        return (
          resonanceElementCount[element] >=
          BONUS_ELEMENT_BUFFS[bonus]["conditions"][element]
        )
      })

      if (BONUS_ELEMENT_BUFFS[bonus]["isSomeConditions"] || false) {
        isConditionValid = isConditionValid.some(value => value === true)
      } else {
        isConditionValid = isConditionValid.every(value => value === true)
      }

      if (isConditionValid) {
        resultBuffs.push(bonus)
        const OVERRIDE_ELEMENT_BUFFS = [
          "Elf Knots",
          "Chain Guardian",
          "Void Barrier",
        ]
        OVERRIDE_ELEMENT_BUFFS.forEach(overrideBuff => {
          if (resultBuffs.includes(overrideBuff)) {
            resultBuffs = resultBuffs.filter(
              resultBuff => resultBuff !== "Fraction Expert"
            )
          }
        })
      }

      setResonanceElementBuffs(resultBuffs)
    })
  }, [resonanceElementCount])

  const checkAuraBuffCondition = useCallback(() => {
    let resultBuffs = []

    Object.keys(BONUS_AURA_BUFFS).forEach(bonus => {
      let isConditionValid = Object.keys(BONUS_AURA_BUFFS[bonus]["conditions"])
        .map(aura => {
          return (
            resonanceAuraCount[aura] >=
            BONUS_AURA_BUFFS[bonus]["conditions"][aura]
          )
        })
        .every(value => value === true)

      if (isConditionValid) {
        resultBuffs.push(bonus)
      }
    })

    setResonanceAuraBuffs(resultBuffs)
  }, [resonanceAuraCount])

  useEffect(() => {
    countResonances()
  }, [countResonances, monsterList.length])

  useEffect(() => {
    checkAuraBuffCondition()
  }, [checkAuraBuffCondition, resonanceAuraCount])

  useEffect(() => {
    checkElementBuffCondition()
  }, [checkElementBuffCondition, resonanceElementCount])

  return (
    <div css={styles.resonanceSummaryContainer}>
      <div css={styles.resonanceSummaryHeadingContainer}>
        <h2 css={styles.resonanceSummaryHeading}>SUMMARY</h2>
      </div>
      <div css={styles.resonanceSummaryContent}>
        <div css={styles.resonanceSummaryElementCount}>
          {Object.keys(resonanceElementCount).map((key, index) => {
            return (
              <div css={styles.resonanceElementCountInfo} key={index}>
                <img
                  css={styles.elementImg}
                  src={require(`../../images/elements/${key.toLowerCase()}.png`)}
                  alt={key}
                />{" "}
                <span css={styles.elementCountNumber}>
                  x{resonanceElementCount[key]}
                </span>
              </div>
            )
          })}
        </div>
        <div css={styles.resonanceSummaryAuraCount}>
          {Object.keys(resonanceAuraCount).map((key, index) => {
            return (
              <div css={styles.resonanceAuraCountInfo} key={index}>
                <img
                  css={styles.auraImage}
                  src={require(`../../images/auras/${key.toLowerCase()}.png`)}
                  alt={key}
                />{" "}
                <span css={styles.elementCountNumber}>
                  x{resonanceAuraCount[key]}
                </span>
              </div>
            )
          })}
        </div>

        <div css={styles.resonanceSummaryBuffs}>
          <div css={styles.resonanceSummaryElementBuffs}>
            {resonanceElementBuffs.length ? (
              <Fragment>
                <span css={styles.buffsHeading}>Element buffs</span>
                <div css={styles.buffsDetailContainer}>
                  {resonanceElementBuffs.map((elementBuff, index) => {
                    return (
                      <div key={index} css={styles.buffsDetail}>
                        <span css={styles.buffName}>{elementBuff}</span> :{" "}
                        {BONUS_ELEMENT_BUFFS[elementBuff].effect} <br />
                      </div>
                    )
                  })}
                </div>
              </Fragment>
            ) : null}
          </div>
          <div css={styles.resonanceSummaryAuraBuffs}>
            {resonanceAuraBuffs.length ? (
              <Fragment>
                <span css={styles.buffsHeading}>Aura buffs</span>
                <div css={styles.buffsDetailContainer}>
                  {resonanceAuraBuffs.map((auraBuff, index) => {
                    return (
                      <div key={index} css={styles.buffsDetail}>
                        <span css={styles.buffName}>{auraBuff}</span> :{" "}
                        {BONUS_AURA_BUFFS[auraBuff].effect} <br />
                      </div>
                    )
                  })}
                </div>
              </Fragment>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  resonanceSummaryHeadingContainer: css`
    display: flex;
    justify-content: center;
    margin-bottom: 25px;
  `,
  resonanceSummaryHeading: css`
    font-family: "Baloo Bhai", cursive;

    font-size: 30px;
    border-bottom: 3px dashed white;
  `,
  resonanceElementCountInfo: css`
    display: flex;
    align-items: center;
  `,
  resonanceAuraCountInfo: css`
    display: flex;
    align-items: center;
  `,
  elementImage: css`
    margin-bottom: 5px;
  `,
  auraImage: css`
    margin-bottom: 5px;
  `,
  elementCountNumber: css`
    margin-left: 10px;
    font-size: 24px;
  `,
  buffsHeading: css`
    width: 100%;
    font-size: 20px;
    background-color: white;
    color: black;
    margin-top: 0;
    padding: 0 5px;
  `,
  buffName: css`
    color: coral;
    border-bottom: 4px dashed coral;
  `,
  buffsDetail: css`
    line-height: 1.6;
    margin-top: 10px;
  `,
  buffsDetailContainer: css`
    max-height: 150px;
    overflow-y: scroll;
  `,
  resonanceSummaryContainer: css`
    letter-spacing: 2px;
    font-size: 18px;
    margin-top: 40px;
    color: white;
  `,
  resonanceSummaryContent: css`
    display: flex;
  `,
  resonanceSummaryAuraCount: css`
    margin-right: 50px;
  `,
  resonanceSummaryElementCount: css`
    margin-right: 50px;
  `,
  resonanceSummaryBuffs: css`
    display: flex;
  `,
  resonanceSummaryElementBuffs: css`
    max-width: 350px;
    margin-right: 10px;
    word-break: break-all;
  `,
  resonanceSummaryAuraBuffs: css`
    max-width: 350px;
    margin-right: 10px;
    word-break: break-all;
  `,
}

export default ResonanceSummary
