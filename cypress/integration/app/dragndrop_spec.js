describe("drag and drop", () => {
  it("user should be able to drag from pool to calculate reso area", () => {
    cy.visit("http://localhost:8000/ragnarok-tactics-simulator")
    cy.get("[data-label='hero-card']").should("have.length", 41)

    cy.get("[data-testid='hero-card-1']").should("have.length", 1)
    cy.get("[data-testid='hero-reso-cal-area']").should("have.length", 1)

    cy.get("[data-testid='hero-card-1']").drag(
      "[data-testid='hero-reso-cal-area']"
    )
    cy.get("[data-testid='hero-card-2']").drag(
      "[data-testid='hero-reso-cal-area']"
    )
    cy.get("[data-testid='hero-card-3']").drag(
      "[data-testid='hero-reso-cal-area']"
    )
    cy.get("[data-testid='hero-card-4']").drag(
      "[data-testid='hero-reso-cal-area']"
    )
    cy.get("[data-testid='hero-card-5']").drag(
      "[data-testid='hero-reso-cal-area']"
    )

    cy.get("[data-testid='hero-lineup-container']")
      .children()
      .should("have.length", 5)
  })
})
