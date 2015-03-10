/**
 * Rayman App
 * Copyright(c) 2014 Koreviz
 * MIT Licensed
 */
 
(function () {
  'use strict';

  var $navdrawerContainer = $('.navdrawer-container'),
  $window = $(window),
  $body = $('body'),
  $appbarElement = $('.app-bar'),
  $menuBtn = $('.menu'),
  $main = $('main'),

  closeMenu = function() {
    $body.removeClass('open');
    $appbarElement.removeClass('open');
    $navdrawerContainer.removeClass('open');
  },

  toggleMenu = function() {
    $body.toggleClass('open');
    $appbarElement.toggleClass('open');
    $navdrawerContainer.toggleClass('open');
    $navdrawerContainer.classList.add('opened');
  },

  getUrlVars = function() {
    var vars = [], hash,
    hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    
    for (var i = 0; i < hashes.length; i++) {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    
    return vars;
  },

  getUrlVar = function(name) {
      return getUrlVars()[name];
  },
  prd = getUrlVar('prd'),
  qty = parseInt(getUrlVar('qty') || 1, 10),

  onClick = function(event) {
    var $this = $(this), 
    hrefs = $this.attr('href').split('/'),
    $el = $(hrefs[0]),
    offset = $el.offset();

    event.preventDefault();

    $('html, body').animate({ scrollTop: offset.top }, 500);

    if (hrefs.length > 1) { $('[href="#' + hrefs[1] + '"]').click(); }
  },

  onResize = function() {
    var h = parseInt($(window).height(), 10);

    $('[class*="section-"]').css({ height:  h + 'px' });
  },

  curBottom,
  offScreen = function(el) {
    var curPos = el.offset(),
    scrollTop = $('body').scrollTop();

    if (!curBottom) { curBottom = curPos.top + el.height(); }

    return curBottom < scrollTop;
  },

  isFixed = false,
  onScroll = function() {
    var width = $window.width(),
    isHidden = offScreen($navdrawerContainer);
    if (width < 990) { return; }
    if ((isFixed && isHidden) || (!isFixed && !isHidden)) { return; }
    
    if (!isFixed && isHidden) { 
      isFixed = true;
      $navdrawerContainer.css({ position: 'fixed', height: $navdrawerContainer.height() });
    }
    else if (isFixed && !isHidden) { 
      isFixed = false;
      $navdrawerContainer.css({ position: 'relative', height: 'auto' });
    }
  };

  FastClick.attach(document.body);
  $main.on('click', closeMenu);
  $menuBtn.on('click', toggleMenu);
  $navdrawerContainer.on('click', function(event) {
    if (event.target.nodeName === 'A' || event.target.nodeName === 'LI') { closeMenu(); }
  });
  onResize();
  $window.on('resize', onResize);
  $window.scroll(onScroll);
  new scrollReveal(); // jshint ignore:line
  $('[data-animate-scroll]').on('click', onClick);

  if (prd) {
    _.defer(function() {
      for (var i=0; i < qty; i++) {
        Helium.cart.add(prd);
      }

      Helium.show();
    });
  }

  if (window.location.hash === '#section-9') {
    $('#section-8').hide();
    $('#section-9').show();
  }
})();
