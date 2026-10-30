"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('solicitacoes_orcamento', 'orcamentoId', {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'orcamentos',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        });
    },

    async down(queryInterface) {
        await queryInterface.removeColumn('solicitacoes_orcamento', 'orcamentoId');
    }
}

