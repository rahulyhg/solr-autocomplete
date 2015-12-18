/*! jQuery Solr-Autocomplete Plugin for Apache solr - v1.0 
*	Author:V.Naveenraj
* 	https://github.com/--/--
* 	Copyright (c) 2015  Licensed MIT */
$.fn.sAuto=function(e){var s=$.extend({width:" 100%",url:"",get:"name",fields:"",rows:5,show:"name",theme:function(e){return'<div class="eac-item"><div><span>'+e.name+"</span></div></div>"},onselect:function(e){}},e);$(this).wrap('<div class="s-auto"  style="width:100%;"></div>').after('<ul style="display: none;"></ul>'),$(this).siblings("ul").wrap('<div class="s-auto-container" id="eac-container-bs"></div>');var i=$(this).siblings("div").children("ul");$("ul > li");return $(this).keyup(function(e){var t,l=$(i).children("li"),n=l.filter(".selected");if(clearTimeout($.data(this,"timer")),40==e.keyCode&&1==($("ul").has("li").length?1:0))t=!n.length||n.is(":last-child")?l.eq(0):n.next(),t.addClass("selected").siblings().removeClass();else if(38==e.keyCode&&1==($("ul").has("li").length?1:0))t=!n.length||n.is(":first-child")?l.last():n.prev(),t.addClass("selected").siblings().removeClass();else if(39==e.keyCode||41==e.keyCode)i.hide();else if(13==e.keyCode&&1==($("ul").has("li.selected").length?1:0)){var a=$(i).children("li.selected").attr("id");$(this).val(jQuery.data(i,"data").response.docs[a][s.show]);s.onselect(jQuery.data(i,"data").response.docs[a]),i.hide()}else 13==e.keyCode?search(!0,i,"",""):$(this).data("timer",setTimeout($.fn.sAuto.search(!1,i,this,s),500))}),this.css("width",s.width),this},$.fn.sAuto.minit=function(e,s){$(e).children("li").hover(function(){$(this).addClass("selected").siblings().removeClass()}),$(e).children("li").click(function(){var i=$(e).children("li.selected").attr("id");$(this).parent("ul").parent("div").siblings("input").val(jQuery.data(e,"data").response.docs[i][s.show]);s.onselect(jQuery.data(e,"data").response.docs[i]),e.hide()})},$.fn.sAuto.search=function(e,s,i,t){var l=$(i).val(),n=t.url,a=t.get,d=t.theme;return!e&&l.length<3?void $(s).empty():void $.ajax({url:n+a+":*"+l+"*&fl="+t.fields+"&rows="+t.rows+"&wt=json&indent=true",type:"GET",dataType:"jsonp",jsonp:"json.wrf",success:function(e){$(s).empty(),jQuery.data(s,"data",e),$.each(e.response.docs,function(e,i){$(s).append("<li id='"+e+"'>"+d(i)+"</li>")}),$.fn.sAuto.minit(s,t),$(i).parent().mouseleave(function(){$(s).hide()}),$(s).show()}})};