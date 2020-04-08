
$(document).ready(function() {
    $('h1').fadeIn(1000, function() {
        $('.game').css("top", "40%");
    });

    $('form button').on('click', function() {
        // location.href = ''
    });

});

// Меню игр
$('.ball_bouncing').on('click', function() {
    location.href = 'bouncingBall.html';
});
$('.flying_bird').on('click', function() {
    location.href = 'flyingBird.html';
});
$('.who_first').on('click', function() {
    location.href = 'whoFirst.html';
});