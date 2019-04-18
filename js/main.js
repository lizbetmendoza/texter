
$(function () {

	// menu code
	$('[data-curtain-menu-button]').click(function(){
	  $('body').toggleClass('curtain-menu-open');
	});

	// Floating label effect
  var showClass = 'show';

  $('input, textarea').on('checkval', function () {
    var label = $(this).prev('label');
    if(this.value !== '') {
      label.addClass(showClass);
    } else {
      label.removeClass(showClass);
    }
  }).on('keyup', function () {
    $(this).trigger('checkval');
  });
  
  
  // drop downs
	$('#switch-toggle-all [data-toggle-all]' ).click(function () {
	  $( '#switch-toggle-all input[type="checkbox"]').prop('checked', this.checked)
	})

 

  
});



