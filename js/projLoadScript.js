$(document).ready(function() {
	
	$("h2.year").click(function() {
	  var projYear = this.innerHTML;
        var projName2 = "projectHTML/"+projYear+".html";
        $("#content").load(projName2,function() { //callback function
		  resizeCanvas(getDocWidth(), getDocHeight());
	    $("a[rel^='lightbox']").slimbox({/* Put custom options here */}, null, function(el) { //rebind slimbox to new HTML elements
			return (this == el) || ((this.rel.length > 8) && (this.rel == el.rel));
        });
        });    

	});
});