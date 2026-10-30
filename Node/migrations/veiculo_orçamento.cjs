"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('orçamentoItens', 'valorOrcamento', {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: true
        })
    },

    async down(queryInterface) {
        await queryInterface.removeColumn('orçamentoItens', 'valorOrcamento');
    },

};

