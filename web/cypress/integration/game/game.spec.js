import _ from 'lodash';

describe('Test game ', () => {
  it('loses the game', () => {
    const settings = {
      rows: 10,
      columns: 10,
      mines: 5,
    };
    cy.visitHome();

    cy.getDataCy('rows').type(settings.rows);
    cy.getDataCy('columns').type(settings.columns);
    cy.getDataCy('mines').type(settings.mines);
    cy.getDataCy('start').click();

    cy.getDataCy('cell-mine').should(($minedCells) => {
      expect($minedCells).to.have.length(5);
    });
    
    cy.getDataCy('cell-mine').eq(0).click();
    cy.getDataCy('game-lost').should('have.text', 'You lost');
    cy.getDataCy('a-play-again').should('have.text', 'Play again');
  });

  it('wins the game', () => {
    const settings = {
      rows: 10,
      columns: 10,
      mines: 5,
    };
    cy.visitHome();

    cy.getDataCy('rows').type(settings.rows);
    cy.getDataCy('columns').type(settings.columns);
    cy.getDataCy('mines').type(settings.mines);
    cy.getDataCy('start').click();


    cy.getDataCy('button-red-flag').click();
    cy.get(`.header-actions-button.selected-button[data-cy=button-red-flag]`);
    cy.getDataCy('cell-mine').each(($el) => {
      cy.wrap($el).click();
    });
    cy.getDataCy('button-red-flag').click();
    cy.get(`.header-actions-button[data-cy=button-red-flag]:not(.selected-button)`);
    
    cy.getDataCy('cell-not-a-mine').each(($el) => {
      cy.wrap($el).click();
    });

    cy.getDataCy('game-won').should('have.text', 'You Won');
    cy.getDataCy('a-play-again').should('have.text', 'Play again');
  });
});
