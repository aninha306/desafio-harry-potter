CREATE DATABASE desafio_harrypotter;

\c desafio_harrypotter;

CREATE TABLE bruxos(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    idade INTEGER NOT NULL,
    casa VARCHAR(100) NOT NULL,
    habilidade VARCHAR(100) NOT NULL,
    statusdesangue VARCHAR(100) NOT NULL
);

INSERT INTO bruxos (nome, idade, casa, habilidade, statusdesangue) VALUES ('Marcelo Gabriel Potter', 17, 'Sonserina', 'dar capa', 'trouxa');

CREATE TABLE varinhas(
    id SERIAL PRIMARY KEY,
    material VARCHAR(100) NOT NULL,
    comprimento VARCHAR(100) NOT NULL,
    nucleo VARCHAR(100) NOT NULL,
    datadefabricacao DATE NOT NULL
);

INSERT INTO varas (material, comprimento, nucleo, datadefabricacao) VALUES ('sabugueiro', '30cm', 'pelo de unicórnio', '1890-11-24);

