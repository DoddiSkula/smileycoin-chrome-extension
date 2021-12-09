export function createSelect() {
    const customSelect = document.getElementsByClassName("custom-select");
    const amountUnit = document.querySelector("#amount-unit");
    const resultsUnit = document.querySelector('#results-unit');

    for (let i = 0; i < customSelect.length; i++) {
      let selectedEl = customSelect[i].getElementsByTagName("select")[0];

      // for each element, create a new div that will act as the selected item
      const selectedOpt = selectedEl.options[selectedEl.selectedIndex];
      const a = document.createElement("div");
      const img = document.createElement('img');
      const p = document.createElement('p');
  
      img.classList.add('select-img');
      img.src = `../img/currencies/${selectedOpt.value}.png`;
      p.innerHTML = selectedOpt.innerHTML;
  
      a.setAttribute("class", "select-selected flex-item");
  
      a.appendChild(img);
      a.appendChild(p);

      customSelect[i].appendChild(a);

      // for each element, create a new div that will contain the option list
      const b = document.createElement("div");
      b.setAttribute("class", "select-items select-hide");

      // for each option in the original select element, create a new div that will act as an option item
      for (let j = 0; j < selectedEl.length; j++) {
        const c = document.createElement("div");
        const img = document.createElement('img');
        const p = document.createElement('p');

        c.setAttribute("class", "flex-item");
        img.classList.add('select-img');
        img.src = `../img/currencies/${selectedEl.options[j].value}.png`;
        p.innerHTML = selectedEl.options[j].innerHTML;

        c.appendChild(img);
        c.appendChild(p);
    
        c.addEventListener("click", function(e) {
            // when an item is clicked, update the original select box, and the selected item
            const s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            const h = this.parentNode.previousSibling;

            for (let x = 0; x < s.length; x++) {
              if (s.options[x].innerHTML == this.childNodes[1].innerHTML) {
                s.selectedIndex = i;
                h.childNodes[1].innerHTML = this.childNodes[1].innerHTML;
                const name = this.childNodes[1].innerHTML.split('/')[0].trim();
                h.childNodes[0].src = `../img/currencies/${name}.png`
                if (customSelect[i].id == 'fromList') {
                  amountUnit.innerHTML = name;
                  localStorage.setItem('currencyFrom', name);
                } else {
                  resultsUnit.innerHTML = name;
                  localStorage.setItem('currencyTo', name);
                  
                }

                const y = this.parentNode.getElementsByClassName("same-as-selected");

                if (y.length > 0) {
                    for (let k = 0; k < y.length; k++) {
                        y[k].classList.remove("same-as-selected");
                    }
                }

                this.setAttribute("class", "same-as-selected flex-item");
                break;
              }
            }
            h.click();
        });

        b.appendChild(c);
      }

      customSelect[i].appendChild(b);

      // when the select box is clicked, close any other select boxes, and open/close the current select box
      a.addEventListener("click", function(e) {
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
      });
    }
}


export function closeAllSelect(elmnt) {
  let arrNo = [];
  const selectItems = document.getElementsByClassName("select-items");
  const y = document.getElementsByClassName("select-selected");

  for (let i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }

  for (let i = 0; i < selectItems.length; i++) {
    if (arrNo.indexOf(i)) {
        selectItems[i].classList.add("select-hide");
    }
  }
}
