$(document).ready(function() {
  $(".thumbnails").click(function() {
    jQuery(".thumbnails").slimbox([["drawings/Centipede.jpg"], ["drawings/Dancing in the rain.jpg"], ["right.jpg"]], 1, {loop: true});
   }