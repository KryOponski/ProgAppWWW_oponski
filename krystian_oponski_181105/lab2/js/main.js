document.addEventListener('DOMContentLoaded', () => {
    const przeMotyw = document.getElementById('motyw');
    if (!przeMotyw) return;
    const saveMotyw = localStorage.getItem('motyw') || 'light';
    document.documentElement.setAttribute('motyw', saveMotyw);
    updateButtonState(saveMotyw);
    przeMotyw.addEventListener('click', () => {
        const obecnyMotyw = document.documentElement.getAttribute('motyw');
        const nowyMotyw = obecnyMotyw === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('motyw', nowyMotyw);
        localStorage.setItem('motyw', nowyMotyw);
        updateButtonState(nowyMotyw);
    });
    function updateButtonState(motyw) {
        if (motyw === 'dark') {
            przeMotyw.setAttribute('aria-pressed', 'true');
            przeMotyw.textContent = 'Tryb jasny';
        } else {
            przeMotyw.setAttribute('aria-pressed', 'false');
            przeMotyw.textContent = 'Tryb ciemny';
        }
    }
});
function polskiZegar() {
    const zegar = document.getElementById('zegar');
    const stop = document.getElementById('stop');
    const start = document.getElementById('start');

    if (!zegar || !stop || !start) return;
    let interwal = null;
    const polskiCzas = Intl.DateTimeFormat('pl-PL', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    function aktualnyCzas() {
        const teraz = new Date();
        zegar.textContent = polskiCzas.format(teraz);
    }
    interwal = setInterval(aktualnyCzas, 1000);
    aktualnyCzas();
    start.addEventListener('click', () => {
        if (interwal === null) {
            interwal = setInterval(aktualnyCzas, 1000);
        }
    });
    stop.addEventListener('click', () => {
        if (interwal !== null) {
            clearInterval(interwal);
            interwal = null;
        }
    });
}
document.addEventListener('DOMContentLoaded', () => {
    polskiZegar();
});
function Wyszukiwarka() {
    const poleWysz = document.getElementById('wyszProdukt');
    const produkty = document.querySelectorAll('.product-card');
    const licznik = document.getElementById('iloscProduktow');
    const error = document.getElementById('errorProdukt');

    if (!poleWysz || produkty.length === 0) return; 

    poleWysz.addEventListener('input', () => {
        const slowo = poleWysz.value.trim().toLowerCase();
        let liczbaWid = 0;
        for(produkt of produkty) {
            const nazwaProduktu = produkt.querySelector('h2').textContent.toLowerCase();

            if (nazwaProduktu.includes(slowo)) {
                produkt.hidden = false;
                liczbaWid++;
            } else {
                produkt.hidden = true;
            }
        }
        if (licznik) {
            licznik.textContent = liczbaWid;
        }
        if (error) {
            if (liczbaWid === 0) {
                error.hidden = false;
            } else {
                error.hidden = true;
            }
        }
    });
}
        document.addEventListener('DOMContentLoaded', () => {
            Wyszukiwarka();
        });