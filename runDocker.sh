#!/bin/bash

# Baixa a imagem
docker pull mongo

# Remove o container, se existir
docker stop node-tdd
docker container rm node-tdd

# Gera o container
docker run --name node-tdd -p 27017:27017 -d mongo
