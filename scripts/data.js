export async function getPrice() {
    const from = localStorage.getItem('currencyFrom');
    const to = localStorage.getItem('currencyTo');
    const url = `https://min-api.cryptocompare.com/data/price?fsym=${from}&tsyms=${to}`;

    let result;
    try {
        result = await fetch(url);
      } catch (e) {
        console.error('Error. Could not fetch prices.', e);
        return null;
      }
    
      if (!result.ok) {
        console.error('Error with request. No 200 response.', await result.text());
        return null;
      }
    
      const data = await result.json();
      const price = data[to];

      return price;
}


export async function getTopList(limit) {
  const url = `https://min-api.cryptocompare.com/data/top/totalvolfull?limit=${limit}&tsym=USD`;

  let result;
  try {
      result = await fetch(url);
    } catch (e) {
      console.error('Error. Could not fetch the top coins list.', e);
      return null;
    }
  
    if (!result.ok) {
      console.error('Error with request. No 200 response.', await result.text());
      return null;
    }
  
    const data = await result.json();

    return data.Data;
}
