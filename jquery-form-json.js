(function ( $ ) {

	$.fn.formJSON = function(){
		var fields       = this.serializeArray(),
		json         = {},
		arraynames   = {};
		for( var v = 0; v < fields.length; v++){
			var field     = fields[v],
			field_el = this.find('[name="' + field.name + '"]'),
			name    = field.name.replace(/\]/gi,'').split('['),
			value     = field.value,
			lineconf  = {};

			if( field_el.prop('required') ){
				if( field_el[0].checkValidity ){
					if( field_el[0].checkValidity() ){
						field_el.removeClass('invalid');
					}else{
						field_el.focus().addClass('invalid');  
						return false;         
					}
				}        
			}
			for(var i = name.length-1; i >= 0; i--){
				var nestname = name[i];
				if(nestname.length === 0){
					if( typeof arraynames[name[i-1]] === 'undefined'){
						arraynames[name[i-1]] = 0;
					}else{
						arraynames[name[i-1]] += 1;
					}
					nestname = arraynames[name[i-1]];
				}
				if(i === name.length-1){
					if( value === 'true' ){
						value = true;
					}else if( value === 'false' ){
						value = false;
					}else if( !isNaN( parseFloat( value ) ) && parseFloat( value ).toString() === 'value' ){
						value = parseFloat( value );
					}else{
						try {
							value = JSON.parse( value );

						} catch (e) {
							//console.log( e );
						}
					}
					lineconf[nestname] = value;
				}else{
					var newobj = lineconf;
					lineconf = {};
					lineconf[nestname] = newobj;
				}   
			}
			$.extend(true, json, lineconf);
		};
		return json;
	}

}( jQuery ));