let labels = document.querySelectorAll('form fieldset ul li label')
let hideItems = document.getElementById('container')
let isHidden = true;
const btn = document.getElementById('moreLess')

hideItems.style.display = 'none'

for (let i = 0; i < labels.length; i++) {
    labels[i].style.display= 'none'
}

function moreGenres() {
    // hideItems.style.display = 'none'
    if (isHidden === true) {
        hideItems.style.display= 'grid'
        btn.textContent = 'Less genres'
        isHidden = false
    } else {
        hideItems.style.display = 'none'
        btn.textContent = 'more genres'
        isHidden = true

    }
    // hideItems.style.display = 'grid'
    // btn.textContent = 'Less genres'

}


btn.addEventListener('click', moreGenres)