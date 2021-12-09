import { getPrice } from "./data.js";


export function navigateTo(page) {
    const converterBtn = document.querySelector('#nav-converter');
    const marketBtn = document.querySelector('#nav-market');
    const linksBtn = document.querySelector('#nav-links');
    const converter = document.querySelector('#converter');
    const market = document.querySelector('#market');
    const links = document.querySelector('#links');

    switch(page) {
        case 'converter':
            converterBtn.classList.add('selected');
            marketBtn.classList.remove('selected');
            linksBtn.classList.remove('selected');
            converter.classList.remove('hidden');
            market.classList.add('hidden');
            links.classList.add('hidden');
            break;
        case 'market':
            converterBtn.classList.remove('selected');
            marketBtn.classList.add('selected');
            linksBtn.classList.remove('selected');
            converter.classList.add('hidden');
            market.classList.remove('hidden');
            links.classList.add('hidden');
            break;
        case 'links':
            converterBtn.classList.remove('selected');
            marketBtn.classList.remove('selected');
            linksBtn.classList.add('selected');
            converter.classList.add('hidden');
            market.classList.add('hidden');
            links.classList.remove('hidden');
            break;
        default:
            break;
    }
}


export async function convert(amount, results) {
    const price = await getPrice();
    let result = price*amount;
    result = result >= 1 ? result.toFixed(2) : result.toPrecision(5);
    results.value = result;
}


export function swap() {
    const currencyFrom = localStorage.getItem('currencyFrom');
    const currencyTo = localStorage.getItem('currencyTo');

    const elements = document.querySelectorAll('.select-items');
    const fromList = elements[0].children;
    const toList = elements[1].children;

    for(let i=0; i < fromList.length; i++) {
      const child = fromList[i]
      const childList = child.children;
      const currency = childList[1].innerHTML;
        if(currency.split('/')[0].trim() == currencyTo) {
          child.click();
        }
    }

    for(let i=0; i < toList.length; i++) {
      const child = toList[i]
      const childList = child.children;
      const currency = childList[1].innerHTML;
        if(currency.split('/')[0].trim() == currencyFrom) {
          child.click();
        }
    }

    localStorage.setItem('currencyFrom', currencyTo);
    localStorage.setItem('currencyTo', currencyFrom);
}


export function element(name, attributes = null, ...children) {
    const elem = document.createElement(name);
  
    for (const child of children) {
      if (!child) {
        continue;
      }
  
      if (attributes) {
        for (const attrib in attributes) {
          elem.setAttribute(attrib, attributes[attrib]);
        }
      }
  
      if (typeof child === 'string') {
        elem.appendChild(document.createTextNode(child));
      } else {
        elem.appendChild(child);
      }
    }
  
    return elem;
}
