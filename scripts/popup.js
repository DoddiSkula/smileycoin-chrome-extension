import { navigateTo, convert, swap } from './utils.js';
import { createSelect, closeAllSelect } from './select.js';
import { createList } from './list.js';


window.addEventListener('DOMContentLoaded', (event) => {
    const converterBtn = document.querySelector('#nav-converter');
    const marketBtn = document.querySelector('#nav-market');
    const linksBtn = document.querySelector('#nav-links');
    
    const amount = document.querySelector('#amount');
    const results = document.querySelector('#results');
    const convertBtn = document.querySelector('.convert-btn');
    const swapBtn = document.querySelector('.swap');

    createSelect();
    createList(50);

    localStorage.setItem('currencyFrom', 'SMLY');
    localStorage.setItem('currencyTo', 'USD');

    converterBtn.addEventListener('click', ()=> {navigateTo('converter')});
    marketBtn.addEventListener('click', ()=> {navigateTo('market')});
    linksBtn.addEventListener('click', ()=> {navigateTo('links')});
    document.addEventListener('click', closeAllSelect);
    convertBtn.addEventListener('click', ()=> {convert(amount.value, results)});
    swapBtn.addEventListener('click', swap);

});
