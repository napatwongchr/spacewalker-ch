import React, { useState } from "react"
import { Global, css } from "@emotion/core"

import SEO from "../../components/seo"

import "bootstrap/dist/css/bootstrap.min.css"

function LibraryRagnarokTacticsPage() {
  return (
    <div css={styles.container}>
      <SEO
        title="โพยไกด์เกมส์ Ragnarok Tactics - SpaceSLibrary"
        description="ศูนย์รวมบทความเกมส์, ไกด์เกมส์, เทคนิคการเล่น ของเกมส์ Ragnarok Tactics ที่ผมเขียนไว้ ที่นี่"
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
      <h1>Ragnarok Tactics Library</h1>
    </div>
  )
}

const styles = {}

export default LibraryRagnarokTacticsPage
