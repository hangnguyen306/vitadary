function ui(){// Range UI
$('.range-ui').each(function(key){var el=$(this);el.attr({'id':'range-ui-'+key}).queue(function(next){$('#range-ui-'+key).ionRangeSlider();next()})});// Scroll
$('.scroll-ui').each(function(key){var el=$(this);el.attr({'id':'scroll-ui-'+key}).queue(function(next){new SimpleBar($('#'+el.attr('id'))[0]);next()})});// File Browse UI
$('.file-ui .file-ui-input').change(function(e){if(typeof e.target.files[0]!=='undefined'){var fileName=e.target.files[0].name;$(this).siblings('.file-ui-label').text(fileName)}});// Parallax
$('[data-paroller-factor]').paroller()}// Image svg
function imgSVG(){$('img.svg').each(function(){var $img=$(this);var imgID=$img.attr('id');var imgClass=$img.attr('class');var imgURL=$img.attr('src');$.get(imgURL,function(data){// Get the SVG tag, ignore the rest
var $svg=$(data).find('svg');// Add replaced image's ID to the new SVG
if(typeof imgID!=='undefined'){$svg=$svg.attr('id',imgID)}// Add replaced image's classes to the new SVG
if(typeof imgClass!=='undefined'){$svg=$svg.attr('class',imgClass+' replaced-svg')}// Remove any invalid XML tags as per http://validator.w3.org
$svg=$svg.removeAttr('xmlns:a');// Replace image with new SVG
$img.replaceWith($svg)},'xml')})}function gotoTop(){var topTop=$('.toTop');$(window).scroll(function(){if($(this).scrollTop()>200){topTop.addClass('active')}else{topTop.removeClass('active')}});topTop.click(function(){$('body,html').animate({scrollTop:0},500);return false});$('.scroll-down').click(function(){if(window.innerWidth<=750){var headerHight=65}else{var headerHight=130}var speed=600;var href=$(this).attr('href');var target=$(href=='#'||href==''?'html':href);var position=target.offset().top-headerHight;$('body,html').animate({scrollTop:position},speed,'swing');return false})};function slider(){$('.homeSlider').slick({infinite:true,slidesToShow:1,prevArrow:'<a href=\'#\' class=\'icon-arr icon-left\'></a>',nextArrow:'<a href=\'#\' class=\'icon-arr icon-right\'></a>',dots:true,autoplay:true,arrows:true,speed:500,fade:true,cssEase:'linear',slidesToScroll:1})}function sHomeProduct(){$('.sHomeProductSliderInner').slick({infinite:true,arrows:true,prevArrow:'<a href=\'#\' class=\'icon-arr icon-arr-small icon-left\'></a>',nextArrow:'<a href=\'#\' class=\'icon-arr icon-arr-small icon-right\'></a>',speed:1000,autoplay:true,slidesToShow:4,slidesToScroll:1,responsive:[{breakpoint:1024,settings:{slidesToShow:3,slidesToScroll:1,infinite:true}},{breakpoint:768,settings:{slidesToShow:2,slidesToScroll:1}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1}}]})}function sHomeNews(){$('.sNewsSliderInner').slick({infinite:true,arrows:true,prevArrow:'<a href=\'#\' class=\'icon-arr icon-arr-small icon-left\'></a>',nextArrow:'<a href=\'#\' class=\'icon-arr icon-arr-small icon-right\'></a>',speed:1000,autoplay:true,slidesToShow:3,slidesToScroll:1,responsive:[{breakpoint:768,settings:{slidesToShow:2,slidesToScroll:1,infinite:true}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1}}]})}function sliderPartner(){$('.sSliderParInner').slick({infinite:true,arrows:true,prevArrow:'<a href=\'#\' class=\'btn-arrow-left arrow1\'><i class=\'arrow_left\'></i></a>',nextArrow:'<a href=\'#\' class=\'btn-arrow-right arrow1\'><i class=\'arrow_right\'></i></a>',speed:300,slidesToShow:3,slidesToScroll:3,focusOnSelect:true,asNavFor:'.sSliderParContentInner',responsive:[{breakpoint:1024,settings:{slidesToShow:3,slidesToScroll:3,infinite:true,dots:true}},{breakpoint:600,settings:{slidesToShow:2,slidesToScroll:2}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1}}]});$('.sSliderParContentInner').slick({slidesToShow:1,slidesToScroll:1,arrows:false,//fade: true,
asNavFor:'.sSliderParInner'})}function sliderEvent(){$('.sSliderEventInner').slick({infinite:true,arrows:true,prevArrow:'<a href=\'#\' class=\'btn-arrow-left arrow1\'><i class=\'arrow_left\'></i></a>',nextArrow:'<a href=\'#\' class=\'btn-arrow-right arrow1\'><i class=\'arrow_right\'></i></a>',speed:300,slidesToShow:3,slidesToScroll:3,focusOnSelect:true,responsive:[{breakpoint:1024,settings:{slidesToShow:3,slidesToScroll:3,infinite:true,dots:true}},{breakpoint:600,settings:{slidesToShow:2,slidesToScroll:2}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1}}]});$('.sEventNewsSliderInner').slick({slidesToShow:1,slidesToScroll:1,arrows:true,prevArrow:'<a href=\'#\' class=\'btn-arrow-left arrow1\'><i class=\'arrow_left\'></i></a>',nextArrow:'<a href=\'#\' class=\'btn-arrow-right arrow1\'><i class=\'arrow_right\'></i></a>'})}function searchBox(){var sButton=$('.navbar-search-btn'),sForm=$('.navbar-search');sButton.bind('click',function(e){e.preventDefault();e.stopPropagation();if(sForm.hasClass('active')){sForm.removeClass('active');sButton.removeClass('active')}else{sForm.addClass('active');sButton.addClass('active')}});$(document).click(function(){if(sForm.hasClass('active')){sForm.removeClass('active');sButton.removeClass('active')}});sForm.bind('click',function(e){e.stopPropagation()})}$(function($){$toggleMenu=$('.header__toggle');$toggleMenu.bind('click',function(e){var el=$(this);el.toggleClass('active');$('.wrapMenu').toggleClass('active');e.preventDefault()});$expand=$('.expand');$expand.click(function(){el=$(this);elUl=$(this).next();if(el.hasClass('active')){el.removeClass('active');elUl.stop().slideUp(200)}else{el.addClass('active');elUl.stop().slideDown(200)}})});function stick(){// sticky
var wind=$(window);var sticky=$('.header');wind.on('scroll',function(){var scroll=wind.scrollTop();if(scroll<100){sticky.removeClass('sticky')}else{sticky.addClass('sticky')}})}function waypointEl(){var way=$('[data-waypoint]');way.each(function(){var _el=$(this),_ofset=_el.data('waypoint'),_up=_el.data('waypointup');_el.waypoint(function(direction){if(direction=='down'){_el.addClass('active')}else{if(_up){_el.removeClass('active')}}},{offset:_ofset})})}waypointEl();// Base
ui();// Image SVG
imgSVG();// Go to top
gotoTop();//waypointEl();
slider();sHomeProduct();sHomeNews();searchBox();stick();$('.lazy').lazy();function init(){// waypointEl();
// // Base
// ui();
// // Image SVG
// imgSVG();
// // Go to top
// gotoTop();
// //waypointEl();
// slider();
// sHomeProduct();
// sHomeNews();
// searchBox();
// stick();
// $('.lazy').lazy();
// sliderPartner();
// sliderEvent();
$(window).on('debouncedresize',function(event){// ...
})}// $('body').imagesLoaded( function() {
//     init();
//     $('body').addClass('loaded');
//     $('.pageLoad').fadeOut();
// })
