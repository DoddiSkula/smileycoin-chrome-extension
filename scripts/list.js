import { getTopList } from "./data.js";
import { element } from "./utils.js";

export async function createList(limit) {
    const table = document.querySelector('.table');
    const data = await getTopList(limit);

    for(const coin in data) {
        const info = data[coin];
        const rank = `${parseInt(coin) + 1}`;
        const name = info.CoinInfo.FullName;
        const url = 'https://www.cryptocompare.com' + info.CoinInfo.Url;
        const img = 'https://www.cryptocompare.com' + info.CoinInfo.ImageUrl;
        const change = info.DISPLAY == undefined ? 'N/A' : info.DISPLAY.USD.CHANGEPCT24HOUR + '%';
        const price = info.DISPLAY == undefined ? 'N/A' : info.DISPLAY.USD.PRICE;

        const row = element('tr', null, 
            element('td', null, rank),
            element('td', {'class': 'flex-small'},
                element('img', {'src': img, 'class': 'coin-img'}, ' '),
                element('a', {'href': url, 'target': '_blank'}, name)),
            element('td', {'class': parseFloat(change) >= 0 ? 'green': 'red'}, change),
            element('td', null, price)
        );
        
        table.appendChild(row);
    }
}
