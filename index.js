const puppeteer = require('puppeteer');
const fs = require('fs');

const scrapper = async (url) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(url, { waitUntil: 'load' });

  let productsBySection = [];

  const sections = await page.$$('.e-filter-item');

  if (sections) {
    for (let i = 0; i < sections.length - 1; i++) {
      const filterValue = await sections[i].evaluate((el) =>
        el.getAttribute('data-filter')
      );

      await sections[i].click();

      await new Promise((resolve) => setTimeout(resolve, 2000));

      const productsInSection = [];
      await repeatCopy(page, productsInSection);

      if (!productsBySection[i]) {
        productsBySection[i] = [];
      }

      productsBySection[i].push(...productsInSection);

      console.log(
        `Productos de la sección ${filterValue}:`,
        productsInSection.length
      );
    }
  }

  let allProducts = [];
  productsBySection.forEach((section) => {
    allProducts = allProducts.concat(section);
  });

  const allCleanProducts = removeDuplicates(allProducts);
  console.log(`Productos totales copiados:`, allCleanProducts.length);

  fs.writeFile('./products.json', JSON.stringify(allCleanProducts), () => {
    console.log('Datos almacenados');
  });

  await browser.close();
};

const removeDuplicates = (allProducts) => {
  const uniqueValues = new Set();
  return allProducts.filter((product) => {
    if (uniqueValues.has(product.nameProduct)) {
      return false;
    } else {
      uniqueValues.add(product.nameProduct);
      return true;
    }
  });
};

const repeatCopy = async (page, productsArray) => {
  const products = await page.$$('.elementor-element-1a9cae3');

  for (const product of products) {
    let img;
    let nameProduct;
    let nameProduct2;
    let priceProduct;

    let imgElement = await product.$(
      '.elementor-animation-float.attachment-full.size-full'
    );

    if (imgElement) {
      img = await imgElement.evaluate((item) => item.src);
    }

    let nameElement = await product.$('.elementor-page-title');

    if (nameElement) {
      nameProduct = await nameElement.evaluate((item) =>
        item.textContent.trim()
      );
    }

    let nameElement2 = await product.$('h4.elementor-heading-title');

    if (nameElement2) {
      nameProduct2 = await nameElement2.evaluate((item) => item.textContent);
    }

    let priceElement = await product.$('.woocommerce-Price-amount');

    if (priceElement) {
      priceProduct = await priceElement.evaluate((item) => item.textContent);
    }

    const productData = {
      img,
      nameProduct,
      nameProduct2,
      priceProduct
    };

    productsArray.push(productData);
  }
};

scrapper('https://www.nextdoorpublishers.com/libros/');
