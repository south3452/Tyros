const $menu = document.querySelector('.menu')
const $hidden = document.querySelector('.center')
const $btnMenuOpen = document.querySelector('.btnMenu_open')
const $btnMenuClose = document.querySelector('.btnMenu_close')
const $menuClose = document.querySelector('.menuClose')

$btnMenuOpen.addEventListener('click', function() {
    $menu.classList.add('menu_open')
    $hidden.classList.add('hidden')
})

$btnMenuClose.addEventListener('click', function() {
    $menu.classList.remove('menu_open')
    $hidden.classList.remove('hidden')
})

$menuClose.addEventListener('click', function(){
    $menu.classList.remove('menu_open')
    $hidden.classList.remove('hidden')
})
