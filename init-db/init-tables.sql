-- A cada tabela lembra de colocar ";" (ponto de virgula)
CREATE TABLE IF NOT EXISTS merchant(
    id UUID PRIMARY KEY,
    email VARCHAR(60) NOT NULL,
    password VARCHAR(150) NOT NULL,
    account_id VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS store (
    merchant_id UUID PRIMARY KEY,
    name VARCHAR(40) NOT NULL,
    description VARCHAR(100) NOT NULL,
    photo_url VARCHAR(200),
    banner_url VARCHAR(200),
    CONSTRAINT fk_merchant FOREIGN KEY (merchant_id) REFERENCES merchant(id) ON DELETE cascade
);

CREATE TABLE IF NOT EXISTS ebook (
    id UUID PRIMARY KEY,
    name VARCHAR(80) NOT NULL,
    description VARCHAR(200) NOT NULL,
    cover_url VARCHAR(200) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    product_id VARCHAR(200) NOT NULL,
    price_id VARCHAR(200) NOT NULL,
    store_id UUID NOT NULL,
    CONSTRAINT fk_store FOREIGN KEY (store_id) REFERENCES store(merchant_id) ON DELETE cascade
);