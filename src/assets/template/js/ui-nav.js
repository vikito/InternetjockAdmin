// +function ($) {

   // $(function(){
  
        // nav
        // $(document).on('click', '[ui-nav] a', function (e) {
        //     var $this = $(e.target), $active;
        //     $this.is('a') || ($this = $this.closest('a'));
            
        //     $active = $this.parent().siblings( ".active" );
        //     $active && $active.toggleClass('active').find('> ul:visible').slideUp(200);
            
        //     ($this.parent().hasClass('active') && $this.next().slideUp(200)) || $this.next().slideDown(200);
        //     $this.parent().toggleClass('active');
            
        //     $this.next().is('ul') && e.preventDefault();
        // });

        function menuToogle(el) {

            var _window = $(window), 
            _mb = 768, 
            wrap = $('.app-aside'), 
            next, 
            backdrop = '.dropdown-backdrop';
            // unfolded
            el.on('click', 'a', function(e) {
    //          console.log("hi");
              //next && next.trigger('mouseleave.wraplist');
              var _this = $(this);
              _this.parent().siblings( ".active" ).toggleClass('active');
              _this.parent().toggleClass('active');
              _this.next().is('ul') && _this.find(".arrow").toggleClass("open");
    
              if(_this.next().is('ul') && _this.find(".arrow").html() == "keyboard_arrow_left"){
                  _this.find(".arrow").html("keyboard_arrow_down") &&  e.preventDefault();
              } else {
                  _this.find(".arrow").html("keyboard_arrow_left") &&  e.preventDefault();
              }
    
              // mobile
              //_this.next().is('ul') || ( ( _window.width() < _mb ) && $('.app-aside').removeClass('show off-screen') );
        });
    }
//     });
//   }(jQuery);