// Sticky header on index (home) page
$(document).ready(() => {
  let header = $('.site-header');

  $(window).on('scroll', () => {
    let scroll = $(window).scrollTop();

    if (scroll >= 50) {
      header.addClass('sticky');
    } else {
      header.removeClass('sticky');
    }
  });
});
