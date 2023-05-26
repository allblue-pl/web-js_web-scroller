'use strict';

class abWebScroller_Class
{

    constructor()
    {
        this._initialized = false;

        this.ignoreTags = [];
        this.offset = 0;
    }

    scrollTo(anchorId)
    {
        var self = this.self;
		
		var anchor_offset = $('#' + anchorId).offset();
		if (anchor_offset == undefined)
			$('html,body').animate({scrollTop: 1},'fast');
		else
			$('html,body').animate({scrollTop: anchor_offset.top + self.offset},'fast');
    }

    init(ignoreTags, offset)
    {
        this.ignoreTags = ignoreTags;
        this.offset = offset;

        if (this._initialized)
            throw new Error();
        this._initialized = true;

        window.addEventListener('load', () => {
            var anchor = '';
			var url_array = document.URL.split('#');
			
			if (url_array.length > 1)
				anchor = url_array[url_array.length - 1];
			
			if (anchor != '')
				self.scrollTo(anchor);
        });
		
        document.addEventListener('ready', () => {
            $('a').each(function () {		
				anchor = this.href.split('#');
				
				if (anchor.length <= 1)
					return;
				
				if (anchor[1] !== '') {
					if (self.ignoreTags.indexOf(anchor[1]) > -1)
						return;
					
					var elem = document.getElementById(anchor[1]);
					if (elem === null)
						return;
				}
				
				var anchor_id = function(anchor_id) {
					return anchor_id
				}(anchor[1]);
				
				$(this).on('click', function (event) {
					event.preventDefault();
					if (anchor_id == '') {
						$('html,body').animate({scrollTop: 1}, 'fast');
					} else
						self.scrollTo(anchor_id);
				});
			});
        });
    }

}
export default abWebScroller = new abWebScroller_Class();


function EScrollClass(ignore_tags, offset)
{
	this.self = this;
	var self =this;
	
	self.ignoreTags = ignore_tags;
	self.offset = offset;
	
	self.initialize();
}