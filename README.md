# Proyecto 9

## Web Scraping

Proyecto de scraper que extrae la información de productos de un sitio web, y la guarda en un archivo JSON.

## Descripción

Este scraper utiliza [Puppeteer](https://pptr.dev/), una libreria de Node.js, para interactuar con el navegador y extraer información de productos de una pagina web. Los datos extraidos incluyen imágenes, nombres y precios, y se almacenan en un archivo JSON.

## Requisitos

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Instalación

### 1. Clona este repositorio a tu maquina local:

```sh
git clone https://github.com/Iskoh10/proyecto-9-WEB-SCRAPING.git
```

### 2. Accede al directorio del proyecto

```sh
cd proyecto-9-WEB-SCRAPING.git
```

### 3. Instala las dependencias

```sh
npm install
```

### 4. Uso

Para ejecutar el scraper, usa el siguiente script

```sh
npm run start
```

Este script ejecutará el scraper y comenzará a extraer la información de la pagina web definida en el codigo. El scraper guardará los datos extraidos y limpios de duplicados en un archivo products.json.

## License

**Free Software, Hell Yeah!**
