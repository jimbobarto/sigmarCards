$( setDraggable );

function setDraggable() {
	$(".draggable").draggable({
	  revert: 'invalid',
	  appendTo: 'body',
	  helper: 'clone'
	});
	$( ".droppable" ).droppable({
		classes: {
				'ui-droppable-hover': 'highlight'
		},
      drop: function( event, ui ) {
        var $this = $(this);
        //ui.draggable.removeClass("draggable-card");
        ui.draggable.addClass("hidden");
        hideDroppedCardsInList();

        addImage(ui.draggable.find("img.card").attr("src"), $this);
        
	    ui.draggable.position({
	      my: "center",
	      at: "center",
	      of: $this,
	      using: function(pos) {
	        $(this).animate(pos, 10, "linear");
	      }
	    });
      },
		accept: function(draggable) {
			return $(this).find("div.card-holder").length == 0;
  		}
    });
}

function hideDroppedCardsInList() {
	$("div.droppable img").each( function(index) {
		var droppedSource = $(this).attr("src");
		if ($(".draggable img[src='" + droppedSource + "']").length) {
			$(".draggable img[src='" + droppedSource + "']").closest(".draggable").addClass("hidden");
		}
	})
}

function screenshot() {
	html2canvas(document.body, {taintTest: false, allowTaint: true}).then(canvas => {
			//var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
			canvas.toBlob(function(blob){
				var a = document.createElement('a');
				a.href = URL.createObjectURL(blob);
 			a.download = 'screenshot.png';
				if ($("#screenshot-name").val() != "") {
					a.download = $("#screenshot-name").val();	
				}
 			a.click();
		});
	});
}

function revert(currentElement) {
	var source = $(currentElement).closest(".droppable").find("img.resize").attr('src');
	$(".draggable img[src='" + source + "']").closest(".draggable").removeClass("hidden");
	$(".draggable img[src='" + source + "']").closest(".draggable").attr("style", "position: relative;");

	$(".draggable img[src='" + source + "']").closest(".draggable").addClass("draggable-card");

	$(currentElement).closest(".droppable").find("div.card-holder").remove();
}

function clearAllCards() {
	$("div#card-list .draggable").each( function(index) {
			$(this).removeClass("hidden");
			$(this).attr("style", "position: relative;");
			$(this).addClass("draggable-card");
  	});
	$(".droppable").each( function(index) {
			$(this).find("div.card-holder").remove();
  	});
}

function addImage(imageSource, destination) {
	$.get($SCRIPT_ROOT + '/_get_dropped_card_template', {
        img_src: imageSource
      }, function(data) {
      	destination.html(data);
  	});
}

function cardSearch() {
	$.get($SCRIPT_ROOT + '/_get_filtered_cards', {
        search_string: $('input#card_search').val()
      }, function(data) {
      	$("div#card-list").html(data);
      	setDraggable();
      	hideDroppedCardsInList();
  	});
}

function clearCardSearch() {
	$.get($SCRIPT_ROOT + '/_get_all_cards', function(data) {
      	$("div#card-list").html(data);
      	setDraggable();
      	hideDroppedCardsInList();
  	});
	$("#card_search").val("");
}
