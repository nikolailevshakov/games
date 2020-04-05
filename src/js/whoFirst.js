
window.addEventListener('DOMContentLoaded', function() {
    const spinner = document.querySelector('.spinner p');
    const spinnerContainer = document.querySelector('.spinner');
    let rotateCount = 0;
    let startTime = null;
    let rAF;
    const btn = document.querySelector('button');
    const result = document.querySelector('.result');
    // random interval
    function random(min, max) {
        return Math.floor(Math.random()*(max-min)) + min;
    }
    // animate spinner
    function draw(timestamp) {
        if (!startTime) {
            startTime = timestamp;
        }

        rotateCount = (timestamp - startTime) / 3;

        if (rotateCount > 359) {
            rotateCount %= 360;
        }

        spinner.style.transform = 'rotate(' + rotateCount + 'deg)';
        rAF = requestAnimationFrame(draw);
    }
    result.style.display = 'none';
    spinnerContainer.style.display = 'none';
    function reset() {
        btn.style.display = 'block';
        result.textContent = '';
        result.style.display = 'none';
    }
    btn.addEventListener('click', start);

    function start() {
        draw();
        spinnerContainer.style.display = 'block';
        btn.style.display = 'none';
        setTimeout(setEndgame, random(5000, 10000));
    }

    function setEndgame() {
        cancelAnimationFrame(rAF);
        spinnerContainer.style.display = 'none';
        result.style.display = 'block';
        result.textContent = 'ГОУ';

        document.addEventListener('keydown', keyHandler);

        function keyHandler(e) {
            console.log(e.key);
            if (e.key ==='ы') {
                result.textContent = 'Первый игрок победил!';
            } else if (e.key === 'ж') {
                result.textContent = 'Второй игрок победил!';
            }

        document.removeEventListener('keydown', keyHandler);
        setTimeout(reset, 5000);
        };
    };
});