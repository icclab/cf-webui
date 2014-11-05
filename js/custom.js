$(document).ready(function() {  
  // minimize side bar
  $('#sidebar-minimize').on('click', function() {
    minimizeSideBar();  
  });
  
  // navigation
  $('#sidebar-navigation li > a').on('click', function() {
    subNavi($(this));
  
    return false;
  });
});

function minimizeSideBar() {
  // hide sidebar
  if ($('#page-sidebar').is(':visible')) {
    $('#sidebar-minimize span').removeClass('fa-dedent').addClass('fa-indent');
    
    $('#page-sidebar').animate({'width': 0}, 400, function() {
      $('#page-sidebar').hide();
    });
    $('#page-content').animate({'marginLeft': 0}, 400);
    
  // show sidebar
  } else {
    $('#sidebar-minimize span').removeClass('fa-indent').addClass('fa-dedent');
    
    $('#page-sidebar').show();
    $('#page-sidebar').animate({'width': '220px'}, 400);
    $('#page-content').animate({'marginLeft': '220px'}, 400);
  }
}

function subNavi($this) {
  var $subNavi = $this.next();
  
  if ($subNavi.is(':visible')) {
    $subNavi.slideUp();
  } else {
    $subNavi.slideDown();
  }
}
