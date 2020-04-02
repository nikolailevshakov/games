
$(document).ready(function() {
    $('h1').fadeIn(1000, function() {
        $('.game').css("top", "40%");
    });
});

// Меню игр
$('.ball_bouncing').on('click', function() {
    location.href = 'bouncingBall.html';
});
$('.flying_bird').on('click', function() {
    location.href = 'flyingBird.html';
})