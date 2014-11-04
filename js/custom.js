$(document).ready(function() {  
  // minimize side bar
  $('#sidebar-minimize').on('click', function() {
    minimizeSideBar();  
  });
});

function minimizeSideBar() {
  // hide sidebar
  if( $('#page-sidebar').is(':visible') ) {
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
