-- A cada tabela lembra de colocar ";" (ponto de virgula)
CREATE TABLE IF NOT EXISTS merchant(
    id UUID PRIMARY KEY,
    email VARCHAR(60) NOT NULL,
    password VARCHAR(100) NOT NULL,
    stripe_account_id VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS store (
    merchant_id UUID PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(500) NOT NULL,
    photo VARCHAR(200),
    banner VARCHAR(200),
    CONSTRAINT fk_merchant FOREIGN KEY (merchant_id) REFERENCES merchant(id) ON DELETE cascade
);