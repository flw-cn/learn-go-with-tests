$("blockquote").hide();

$("blockquote + *").click( function(e){
    $(this).prev().toggle();
});

$("blockquote").click( function(e){
    $(this).toggle();
});
