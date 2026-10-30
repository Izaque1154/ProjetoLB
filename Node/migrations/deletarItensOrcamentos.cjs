"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('orcamentos', 'frete', {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: true
        });
        await queryInterface.addColumn('orcamentos', 'desconto', {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: true
        });
        await queryInterface.addColumn('orcamentos', 'prazo de entrega', {
            type: Sequelize.STRING,
            allowNull: true
        });
        await queryInterface.addColumn('orcamentos', 'garantia', {
            type: Sequelize.STRING,
            allowNull: true
        });
    },
    async down(queryInterface, Sequelize) {

        await queryInterface.removeColumn('orcamentos', 'validade')
        await queryInterface.removeColumn('orçamentoItens', 'valorOrcamento'),
        await queryInterface.removeColumn('orçamentoItens', 'frete'),
        await queryInterface.removeColumn('orçamentoItens', 'garantia'),
        await queryInterface.removeColumn('orçamentoItens', 'desconto'),
        await queryInterface.removeColumn('orçamentoItens', 'prazoEntrega')
    }
    
}

