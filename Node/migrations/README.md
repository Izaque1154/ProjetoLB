# Migrações do banco

Execute a migração com a API parada e faça um backup do PostgreSQL antes. O
arquivo usa uma transação: qualquer erro desfaz todas as alterações da execução.

## Executar pelo PowerShell

No diretório `Node`, carregue o `.env` no processo sem imprimir seus valores:

```powershell
Get-Content .env | ForEach-Object {
    $linha = $_.Trim()
    if ($linha -and -not $linha.StartsWith("#")) {
        $chave, $valor = $linha -split "=", 2
        [Environment]::SetEnvironmentVariable(
            $chave.Trim(),
            $valor.Trim().Trim('"').Trim("'"),
            "Process"
        )
    }
}

$DbHost = $env:DB_HOST
$DbPort = $env:DB_PORT
$DbName = $env:DB_NAME
$DbUser = $env:DB_USER
$env:PGPASSWORD = $env:DB_SENHA

try {
    & psql --set=ON_ERROR_STOP=1 `
        --host=$DbHost `
        --port=$DbPort `
        --username=$DbUser `
        --dbname=$DbName `
        --file=.\migrations\20260827_separar_solicitacoes_orcamentos.sql

    if ($LASTEXITCODE -ne 0) {
        throw "A migração falhou com código $LASTEXITCODE."
    }
}
finally {
    Remove-Item Env:PGPASSWORD -ErrorAction SilentlyContinue
}
```

## Verificar depois da execução

As duas primeiras contagens devem ser iguais no banco atual; as consultas de
órfãos e duplicidades não devem retornar linhas.

```sql
SELECT
    (SELECT COUNT(*) FROM "solicitacoes_orcamento") AS solicitacoes,
    (SELECT COUNT(*) FROM "orcamentos") AS orcamentos;

SELECT o."id", o."solicitacaoId"
FROM "orcamentos" AS o
LEFT JOIN "solicitacoes_orcamento" AS s ON s."id" = o."solicitacaoId"
WHERE s."id" IS NULL;

SELECT "solicitacaoId", COUNT(*)
FROM "orcamentos"
GROUP BY "solicitacaoId"
HAVING COUNT(*) > 1;

SELECT
    o."id",
    o."valorTotal" AS total_gravado,
    COALESCE(SUM(
        i."quantidade" * i."precoUnitario"
        - i."desconto"
        + i."frete"
    ), 0) AS total_calculado
FROM "orcamentos" AS o
LEFT JOIN "orçamentoItens" AS i ON i."orcamentoId" = o."id"
GROUP BY o."id", o."valorTotal"
ORDER BY o."id";

SELECT conname, pg_get_constraintdef(oid)
FROM pg_constraint
WHERE conrelid IN (
    'orcamentos'::regclass,
    'solicitacoes_orcamento'::regclass,
    '"orçamentoItens"'::regclass
)
ORDER BY conrelid::regclass::text, conname;
```

## Conferência antes de qualquer rollback

Não há rollback destrutivo automático, pois a tabela nova passa a receber dados
do cliente. Antes de restaurar o backup, confira o que foi criado ou modificado:

```sql
SELECT table_name, column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name IN ('solicitacoes_orcamento', 'orcamentos')
ORDER BY table_name, ordinal_position;

SELECT COUNT(*) AS solicitacoes_criadas_depois_da_migracao
FROM "solicitacoes_orcamento"
WHERE "createdAt" > TIMESTAMP WITH TIME ZONE '2026-08-27 00:00:00-03';
```

Se for necessário voltar, pare a API e restaure o backup feito antes da migração;
não remova tabelas ou colunas sem antes exportar as solicitações criadas depois.
