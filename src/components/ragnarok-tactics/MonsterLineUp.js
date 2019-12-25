import React, { useState, Fragment } from "react"
import Select, { components } from "react-select"
import { Modal, Button, Tabs, Tab, Form } from "react-bootstrap"
import { css } from "@emotion/core"
import { mediaQuery } from "../../utils"
import essencesData from "./data/essences"

function MonsterLineUp({ monsterList, setMonsterList }) {
  const [selectedMonster, setSelectedMonster] = useState(null)
  const [show, setShow] = useState(false)

  const ESSENCES = essencesData.data.map(essence => {
    return {
      ...essence,
      label: essence.name,
      value: essence.name,
    }
  })

  const handleClose = () => setShow(false)

  const handleShow = monster => e => {
    if (!e.target.dataset.avoidmodal) {
      setSelectedMonster(monster.id)
      setShow(true)
    }
  }

  const handleOnSelectEssence = item => {
    let monsterIndex = monsterList.findIndex(
      monster => monster.id === selectedMonster
    )

    monsterList[monsterIndex].essence = item
    monsterList[monsterIndex].essenceAuras = []

    if (item.additionalAura) {
      monsterList[monsterIndex].essenceAuras = [item.additionalAura]
    }

    if (item.aura) {
      monsterList[monsterIndex].essenceAuras = [
        ...monsterList[monsterIndex].essenceAuras,
        item.aura,
      ]
    }

    setMonsterList([...monsterList])
  }

  const handleOnAdditionalAuraClick = e => {
    let monsterIndex = monsterList.findIndex(
      monster => monster.id === selectedMonster
    )
    monsterList[monsterIndex].isAdditionalAuraCheck = e.target.checked
    setMonsterList([...monsterList])
  }

  const handleOnHeroDelete = heroId => e => {
    let deletedmonsterList = monsterList.filter(item => item.id !== heroId)
    setMonsterList([...deletedmonsterList])
  }

  let monsterFromList =
    monsterList.find(monster => monster.id === selectedMonster) || {}

  return (
    <div css={styles.container}>
      {monsterList.length ? (
        monsterList.map(monster => {
          let monsterImgName = monster.name
            .split(" ")
            .map(word => word.toLowerCase())
            .join("-")
          return (
            <div
              key={monster.id}
              css={styles.monsterCard}
              onClick={handleShow(monster)}
            >
              <img
                css={styles.monsterElement}
                src={require(`../../images/elements/${monster.element.toLowerCase()}.png`)}
                alt={monster.element}
              />
              <span
                css={styles.cardDeleteBtn}
                data-avoidmodal
                onClick={handleOnHeroDelete(monster.id)}
              >
                X
              </span>
              <img
                css={styles.monsterImage}
                src={require(`../../images/monsters/${monsterImgName}.png`)}
                width={70}
                height={70}
                alt={monster.name}
              />
              <div css={styles.monsterDetails}>
                <div css={styles.auraDetail}>
                  {monster.isAdditionalAuraCheck &&
                    Boolean(monster.additionalAuras.length) && (
                      <span css={styles.auraUnlockText}>Unlocked</span>
                    )}
                  {monster.essence && (
                    <span css={styles.essenceUnlock}>
                      {monster.essence.label}
                    </span>
                  )}
                </div>
                <div css={styles.monsterNameContainer}>
                  <span css={styles.monsterName}>{monster.name}</span>
                </div>
              </div>
            </div>
          )
        })
      ) : (
        <NoCardInfoBox />
      )}

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body>
          <Form>
            <Tabs defaultActiveKey="essence" id="uncontrolled-tab-example">
              <Tab eventKey="essence" title="Essence">
                <h5 css={styles.pickEssenceHeading}>
                  Pick essence for {monsterFromList.name}{" "}
                </h5>
                <Select
                  styles={styles.optionCustomStyle}
                  components={{
                    Option,
                  }}
                  test={"2313"}
                  onChange={handleOnSelectEssence}
                  options={ESSENCES}
                  value={monsterFromList.essence}
                />
              </Tab>
              <Tab eventKey="additionalAura" title="Unlock extra monster aura">
                {Boolean((monsterFromList.additionalAuras || []).length) ? (
                  <Form.Group
                    controlId="additionalAuraCheck"
                    css={styles.unlockMonsterHeading}
                  >
                    <Form.Check
                      type="checkbox"
                      label="Unlock extra monster aura"
                      onClick={handleOnAdditionalAuraClick}
                      defaultChecked={monsterFromList.isAdditionalAuraCheck}
                    />
                  </Form.Group>
                ) : (
                  <div css={styles.noExtraAuraText}>
                    This monster has no extra aura
                  </div>
                )}
              </Tab>
            </Tabs>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

const Option = props => {
  return (
    <div css={styles.optionContainer}>
      <img
        width={50}
        height={50}
        src={require(`../../images/essences/${props.data.name.toLowerCase()}.png`)}
        alt="atroce"
      />
      <div style={{ flex: "2" }}>
        <components.Option {...props} />
      </div>
      <div css={styles.optionExtraAuraDetail}>
        {props.data.additionalAura ? (
          <Fragment>
            <span>You will get extra</span>
            <img
              css="mx-2"
              src={require(`../../images/auras/${props.data.additionalAura.toLowerCase()}.png`)}
              alt="atroce"
            />
            <span>aura</span>
          </Fragment>
        ) : null}
      </div>
    </div>
  )
}

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
  container: css`
    display: flex;
    justify-content: center;
    ${mediaQuery[0]} {
      flex-direction: column;
      justify-content: center;
    }
  `,
  optionCustomStyle: {
    menu: (provided, state) => ({
      ...provided,
      fontSize: "20px",
    }),
  },
  monsterElement: css`
    position: absolute;
    top: -15px;
    left: -15px;
  `,
  monsterCard: css`
    cursor: pointer;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px;
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.75);
    width: 140px;
    height: 180px;
    margin: 0 10px;
    ${mediaQuery[0]} {
      width: 100%;
      max-height: 100px;
      margin: 20px 0 0 0;
      flex-direction: row;
      justify-content: flex-start;
    }
  `,
  monsterImage: css`
    margin-top: 20px;
    margin-bottom: 0px;
    ${mediaQuery[0]} {
      margin-top: 0px;
    }
  `,
  monsterNameContainer: css`
    text-align: center;
    ${mediaQuery[0]} {
      text-align: left;
    }
  `,
  monsterName: css`
    font-size: 20px;
  `,
  auraUnlockText: css``,
  essenceUnlock: css`
    margin-left: 10px;
  `,
  monsterDetails: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    ${mediaQuery[0]} {
      margin-left: 20px;
    }
  `,
  auraDetail: css`
    display: felx;
    margin-top: 10px;
    ${mediaQuery[0]} {
      flex-direction: column;
    }
  `,
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
  cardDeleteBtn: css`
    position: absolute;
    top: 6px;
    right: 10px;
    cursor: pointer;
    font-size: 20px;
  `,
  optionContainer: css`
    display: flex;
    align-items: center;
  `,
  optionExtraAuraDetail: css`
    display: flex;
    align-items: center;
  `,
  pickEssenceHeading: css`
    margin-top: 20px;
  `,
  unlockMonsterHeading: css`
    margin-top: 20px;
  `,
  noExtraAuraText: css`
    margin-top: 20px;
  `,
}

export default MonsterLineUp
