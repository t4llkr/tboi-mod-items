var isMobile = false; //initiate as false
  // device detection
  if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
      || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;


function getQueryVariable(variable){
	var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
    	var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}
function findItemFromID(id,type,cid) {
	if(!cid) cid = ''; else cid = "[data-cid='" + cid + "']";

	var t = '.items-container';
	if (type == 1) t = '.trinkets-container'; else
	if (type == 2) t = '.tarot-container';
	var val = id.toString();
	var node = $(t).find("[data-sid='" + val + "']"+cid);
	var title = node.find('.item-title').html();
	//alert(title);
	if (node.html() === undefined) {
		return ["<p>Invalid item ID!</p>", 'error'];
	}
	return [node.html(),title];
}

function closepp(back) {
	// БЕз jquery
	/*var k = document.getElementById("popup");
	document.getElementById("darkback").style.display = 'none';
	k.innerHTML = "";
	*/
	/*if($('.nav-item.logged').length) {
		if(!confirm('точно закрыть?')) {
			return false;
		}
	}*/
	$('.overlay').fadeOut();
	var popit = $('.itm-popup#popup');
	if(back == 'popup-video') {
		popit = $('#popup-video');
	}
	popit.fadeOut(300, function(){
		popit.toggleClass("items-container trinkets-container tarot-container", false );
		if(back != 'popup-video') {
			popit.html('');
		}
	})
	if(!back) history.pushState({}, "Предметы для Binding of Isaac: Rebirth", window.location.pathname);
}
function initpp(id,type,click,self) {
	var cid = $(self).closest('.textbox').data('cid')
	$('.textbox').removeClass('popuphover');
	$('.library-background > div').removeClass('show');
	$('.popupdummy').remove();


	if (addlinkdata.want) {
		addLinkHandler(id,type);
		return;
	}
	var chk = getQueryVariable("id");
	if (type == undefined) {
		type = getQueryVariable("type");
		if (!type) type = 0;
	}
	if (id != null) chk = id;
	if (click == undefined) click = false;
	
	if(type == '3') {
		// history.pushState({type: type, id: 0}, 'Update', "?type="+type);
		$('.itm-popup#popup').html('<div class="customtext">'+id+'</div><a class="pp-close" onclick="closepp()">x</a>').fadeIn();
		$('.overlay').fadeIn();
		return;
	}
	if ((chk !== false) || (click == true)) {
		if(chk == false) return;
		var  markup = findItemFromID(chk,type,cid);
		var str = window.location.href;
		if (!click) {// если открыли изначально ссылку с type, то заменяем лишний state. Иначе добавляем state
			// if(str.indexOf("type") >= 0) history.replaceState({type: type, id: chk}, markup[1], "?type="+type+"&id="+chk);
			// else history.pushState({type: type, id: chk}, markup[1], "?type="+type+"&id="+chk);
			history.pushState({type: type, id: chk}, markup[1], "?type="+type+"&id="+chk);

		}

		//alert(markup[1]);
		markup[0] += '<a class="pp-close" onclick="closepp()">x</a>';
		var node = $('.itm-popup#popup');
		node.toggleClass("items-container trinkets-container tarot-container", false ).html('');
		if (type == 0) node.addClass('items-container'); else
		if (type == 1) node.addClass('trinkets-container'); else
		if (type == 2) node.addClass('tarot-container');
		node.html(markup[0]).fadeIn();
		$('.overlay').fadeIn();
	}
}

var addlinkdata = {want: false};


initpp(undefined,null,true);

function sortItems() {
	if($('#itemid').is(':checked')){
			$('.textbox').tsort({attr:'data-sid'});
	} else if($('#colour').is(':checked')){
			$('.textbox').tsort({attr:'data-cid'});
	} else if($('#alphabet').is(':checked')){
			$('.textbox').tsort({attr:'data-tid'});
	}
}

function searchFilter(search, value, bool){
	if (bool === undefined) search.addClass('x');
	else search.removeClass('x');
	search.val(value).trigger('keyup');
}

/* ------------------------------------------------------------------------------ DOCUMENT READY --------------------------*/
var input = $('.search input');


$(document).ready(function(e) {
	$(document).on('click', '.youtube_video', function(event) {
		event.preventDefault();
		$('#popup-video').fadeIn();
		$('.overlay').fadeIn();
	});
	// Update блок слева
	var updateBlock = $('.update-block');
	var disableUpdate = parseInt(gC("update-6"));	//читаем куки
	// disableUpdate = 1;	//УБИРАЕМ НОВОСТЬ
	if (!disableUpdate) {	//если окошко не закрывали, то показываем как обычно и вешаем обработчик:
		updateBlock.fadeIn(800);
	} else {
		$('.update-block').remove();
	}

	$('.update-close').on('click', function(event) {
		updateBlock.fadeOut('300', function() {
			$(this).remove();	
		});
		sC('update-6', 1, 370);	// ставим куки

	});

	//добавляем событие по клику на рекламу
	$('.unit').on('click', function(event) {
		_gaq.push(['_trackEvent', 'ads', 'click']);
	});


	var seedCount = $('.seeds tbody tr').length;
	$('.seed-ttl').html('(' + seedCount + ')');
	$('.seeds-hide-img').click(function(e){
		$('.seeds table img').toggle();
	});
	//-----------------------------------------Добавляем одноразовую всплываху
	 /*if (gC("custompopup1") == '') {
		 // initpp('my text',3)
		initpp('<p> • Закончил перевод брелков из Afterbirth. Осталось еще 70 предметов.</p>\
			<p> • Так же у предметов из Afterbirth пока что не работает сортировка и быстрый поиск по расположению.</p>',3);
		sC("custompopup1", 1, 370);
	} */


	if(self.innerWidth < 420) $('.pool-menu').html('Где найти ▼');
	//---------------------------------------------------------------------------------------------
	// disable caching of all ajax responses
	$.ajaxSetup ({
    	cache: false
	});
	// filter/search input box
	jQuery.expr[':'].Contains = function(a,i,m){
      return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase())>=0;
  	};
	function filterList(list) {
		var form = $("header .container .search form");
			input = $(".search-input");
		
		$(form).on('submit', function(event){
			event.preventDefault();
		});
		
		$(input).change(function() {
			var filter = $(this).val();
			if (filter) {			
				$matches = $(list).find('.a:Contains(' + filter + ')').parent();
				$('li', list).not($matches).addClass('fade');
				// $matches.show();     
				$matches.removeClass('fade');
				$('.library-background > div').each(function(index, el) {
					if($(this).find('li').length == $(this).find('li.fade').length) {
						$(this).hide();
					} else {
						$(this).show();
					}
				});
				$('.library-background > div li').length == $('.library-background > div li.fade').length  
			} else {
				// $(list).find("li").show(); 
				$(list).find("li").removeClass('fade');

				$('.library-background > div').show();
			}
			return false;
		})
		.keyup( function () {
			$(this).change();
		});
  	}
	$(function () {
    	filterList($(".main"));
  	});


	//Поиск!!!!
	var myListNow = {},myListNow2 = [];
	var searchInput = $('header .search-input');
	var timerLiver1;
	$('.main .a .tags').each(function(index, el) {
		var temp = $(el).text().replace('*','').replace('ТЕГИ: ','').split(',');
		$.each(temp, function(index2, val) {
			 myListNow[$.trim(val)] = 1;
		});
	});
	
	$.each(myListNow, function(index, val) {
		if(index.match('[^a-zA-Z .\?0-9]') != null) myListNow2.push(index);
	});
	var randomItem = myListNow2[Math.floor(Math.random()*myListNow2.length)];
	setTimeout(function() {
		searchInput.attr('placeholder', 'Может быть это...');
		searchYES.removeClass('show');
	}, 2000);
	var mouseEntered = false;
	searchInput.mouseenter(function(event) {
		var self = this;
		mouseEntered = true;
		if(searchInput.val() == '') {
			clearTimeout(timerLiver1);
			timerLiver1 = setTimeout(function() {
				$(self).attr('placeholder', myListNow2[Math.floor(Math.random()*myListNow2.length)] + '?');
				searchYES.addClass('show');
				mouseEntered = false;
			}, 200);
			
		}
		
	});

	searchInput.on('mouseleave', function(event) {
		var self = this;
		clearTimeout(timerLiver1);
		timerLiver1 = setTimeout(function() {
				$(self).attr('placeholder', 'Может быть это...');
				searchYES.removeClass('show');
		}, 1500);
	});
	searchInput.click(function(event) {
		// console.log(mouseEntered);
		if(mouseEntered) clearTimeout(timerLiver1);
		$(this).attr('placeholder', myListNow2[Math.floor(Math.random()*myListNow2.length)] + '?');
		if(searchInput.val() == '') {
			searchYES.addClass('show');
		}
	});

	var searchYES = $('header .container .search .search-wrap p');


	searchYES.click(function(event) {
		if(searchInput.attr('placeholder') != 'Может быть это...') {
			searchFilter(searchInput, searchInput.attr('placeholder').replace('?',''));
			searchYES.removeClass('show');
		}
	});

	searchInput.keyup(function(event) {
		searchYES.removeClass('show');
	});

	//Поиск - конец!

	
	// input 'x' to clear text
	function tog(v){return v?'addClass':'removeClass'; } 
	  
	$(document).on('input', 'header .container .search input[type=text]', function(){
		$(this)[tog(this.value)]('x');
	}).on('mousemove', '.x', function( e ){
		$(this)[tog(this.offsetWidth-26 < e.clientX-this.getBoundingClientRect().left)]('onX');   
	}).on('click', '.onX', function(){
		$(this).removeClass('x onX').val('');
		// $(".main").find("li").show()
		$(".main").find("li").removeClass('fade');
		$('.library-background > div').show();
		searchInput.attr('placeholder', 'Может быть это...');
		
	});
	
	// hide/show settings menu
    $(".option-expander").click(function() {
    	var options = $(".option-container");
		if (options.css("display") == "block") {
            options.fadeOut(200);
        } else {
            options.fadeIn(200);
        }
    });
	// hide/shown mobile nav menu
    $(".mobile-nav").click(function() {
        if ($(".mobile-nav-container").css("display") == "block") {
            $(".mobile-nav-container").fadeOut(200);
        } else {
            $(".mobile-nav-container").fadeIn(200);
        }
    });

	// options
	$("input[name=sort]").click(function(){	// item sort
    	sortItems();
	});
	
	$("input[name=night]").click(function() {
		if($('#night-on').is(':checked')) 
		{
			$("html").addClass("dark");
		} 
		else 
		if($('#night-off').is(':checked')) 
		{
			$("html").removeClass("dark");
		}
	});

	$("input[name=helper]").click(function() {
		if($('#helper-on').is(':checked')) {
			helperEnable();
		} 
		else if($('#helper-off').is(':checked')) {
			helperDisable();
		}
	});
	$("input[name=size]").click(function() 
	{
    	if($('#small').is(':checked')) 
		{
			$(".item").removeClass("large");
			$(".item").addClass("small");
			$(".rebirth-item").removeClass("large");
			$(".rebirth-item").addClass("small");
		} 
		else 
		if($('#medium').is(':checked')) 
		{
			$(".item").removeClass("small");
			$(".item").removeClass("large");
			$(".rebirth-item").removeClass("small");
			$(".rebirth-item").removeClass("large");
		}
	});

	// Расположение, исчезание меню по клику
	$('.pool-nav-list').click(function() {
		//alert('wtf');
		$(this).css('display', 'none');
	});

	$('.pool-nav-list').hover(function(e){
		$(this).css('display', 'block');
	},function(e){
		$(this).css('display', 'none');
	});

	var mainLinkText = '';
	if($('.useful-menu').text().indexOf('New') > 0) {
		mainLinkText = 'Полезные ссылки<span class="new">New</span>'
	} else {
		mainLinkText = 'Полезные ссылки';
	}
	if($('.useful-menu.logged').length) {
		mainLinkText = 'Вы авторизованы';
	}

	// перелинковка на главную
	$('.useful-menu').hover(function(e){
		$(this).html('На главную');
		$(this).attr('href', '/');
	},function(e){
		$(this).html(mainLinkText);
		$(this).attr('href', '');
	});
	$('.nav-dd').hover(function(e){
		$(this).next('ul').addClass('shown');
	},function(e){
		$(this).next('ul').removeClass('shown');
	});

	//------------------------------------------------------------------------------------------------ОТВЕЧАЕТ ЗА ВСПЛЫВАЮЩЕЕ ОКНО:
	if(gC('dlc') == "" || gC('dlc') == "undefined") sC('dlc', 'y', 370);
	$('.main .textbox').click(function(e){
		var sid = $(this).data("sid");
		if ($(this).hasClass('fade')) return;
		var num = 0;
		if ($(this).parent().hasClass('trinkets-container')) num = 1; else
		if ($(this).parent().hasClass('tarot-container')) num = 2;
		addlinkdata.title = $(this).find('.item-title').html();
		

		var pos = $(this).offset();
		var elem_left = pos.left;
		var elem_top = pos.top;
		// положение курсора внутри элемента
		var Xinner = e.pageX - elem_left;
		var Yinner = e.pageY - elem_top;

		if(Xinner > 37 && Yinner < 10 && $(this).hasClass('repentance') && gC('dlc') == "y") {
			if(confirm("Скрыть звездочки? Их можно вернуть через меню настроек")) {
				$('#hide-dlc').click();
			} else {
			}
		} else {
			initpp(sid,num,false,e.target);
		}
	});	
	//----------------------------------
	$('.r-item-ttl').html('('+$('.items-container.rebirth .textbox').size()+')');
	$('.r-trink-ttl').html('('+$('.trinkets-container.rebirth .textbox').size()+')');
	$('.r-card-ttl').html('('+$('.tarot-container .textbox').size()+')');

	$('.a-item-ttl').html('('+$('.items-container.afterbirth .textbox').size()+')');
	$('.a-trink-ttl').html('('+$('.trinkets-container.afterbirth .textbox').size()+')');

	$('.count').each(function(index, el) {
		$(this).html('('+$(this).parent().parent().find('.textbox').size()+')');
		if($(this).hasClass('minus')) {
			$(this).html('('+($(this).parent().parent().find('.textbox').size() - 1)+')');
		}
		if($(this).hasClass('harv')) {
			$(this).html('('+($(this).parent().parent().find('.textbox').size() - 2)+')');
		}
	});

	$('.pool-menu').click(function(e){
		$('.option-pools').toggle();		
	});

	var input = $('.search input');
	$('.pool-all').click(function(e){searchFilter(input, '', true);});
	$('.pool-itm').click(function(e){searchFilter(input, 'item room pool');});
	$('.pool-shop').click(function(e){searchFilter(input, 'shop room pool');});
	$('.pool-boss').click(function(e){searchFilter(input, 'boss room pool');});
	$('.pool-devil').click(function(e){searchFilter(input, 'devil room pool');});
	
	$('.pool-angel').click(function(e){searchFilter(input, 'angel room pool');});
	$('.pool-secret').click(function(e){searchFilter(input, 'secret room pool');});
	$('.pool-lib').click(function(e){searchFilter(input, 'library pool');});
	$('.pool-gold').click(function(e){searchFilter(input, 'golden chest pool');});
	
	$('.pool-red').click(function(e){searchFilter(input, 'red chest pool');});
	$('.pool-curse').click(function(e){searchFilter(input, 'curse room pool');});
	$('.pool-nbeggar').click(function(e){searchFilter(input, 'normal beggar pool');});
	$('.pool-dbeggar').click(function(e){searchFilter(input, 'demon beggar pool');});
	
	$('.pool-kbeggar').click(function(e){searchFilter(input, 'key beggar');});
	$('.pool-brush').click(function(e){searchFilter(input, 'boss rush pool');});
	$('.pool-dung').click(function(e){searchFilter(input, 'challenge room pool');});
	$('.pool-bbeggar').click(function(e){searchFilter(input, 'bomb beggar');});

	$('.pool-planet').click(function(e){searchFilter(input, 'planetarium room pool');});


	
	//ЗАГУЛШКА ДЛЯ ADBLOCK
	setTimeout(function() {
		if($('.adsbygoogle').html() == '') {
			var chance = Math.random();
			console.log('шанс от коорого зависит, увидишь ли ты просьбу отключить адблок: '+ chance);
			if (chance<=0.3) $('.unit').append('<img src="images/adblock.png" alt="">');
		}
	}, 2000);
	
	if(isMobile == false) {
		$(document).on('mouseenter', '.itm-popup .description-middle a', function(event) {
			var type = parseInt($(this).attr('onclick').replace('initpp','').replace('(','').replace(')','').split(',')[1]);
			var itemId = parseInt($(this).attr('onclick').replace('initpp','').replace('(','').replace(')','').split(',')[0]);
			var razdel = '';
			if(type == 0) razdel = 'items-container';
			if(type == 1) razdel = 'trinkets-container';
			if(type == 2) razdel = 'tarot-container';
			if(razdel != '') {
				$('.'+razdel+' .textbox[data-sid='+itemId+']').addClass('popuphover');
				// console.log('.'+razdel+' .textbox[data-sid='+itemId+']');
				$('.'+razdel+' .textbox[data-sid='+itemId+']').parent().addClass('show');
				$('.'+razdel+' .textbox[data-sid='+itemId+']').after('<div class="textbox popupdummy"></div>');
			}
			return true;
		});
		$(document).on('mouseleave', '.itm-popup .description-middle a', function(event) {
			var type = parseInt($(this).attr('onclick').replace('initpp','').replace('(','').replace(')','').split(',')[1]);
			var itemId = parseInt($(this).attr('onclick').replace('initpp','').replace('(','').replace(')','').split(',')[0]);
			var razdel = '';
			if(type == 0) razdel = 'items-container';
			if(type == 1) razdel = 'trinkets-container';
			if(type == 2) razdel = 'tarot-container';
			if(razdel != '') {
				$('.'+razdel+' .textbox[data-sid='+itemId+']').removeClass('popuphover');
				$('.'+razdel).removeClass('show');
				$('.popupdummy').remove();
			}
			return true;
		});
		
	}

	




	

	$('.overlay').click(function(event) {
		if($('#popup-video').css('display') == 'block') {
			$('.overlay').fadeOut();
			$('#popup-video').fadeOut();
		}
		
	});

	$(document).on('click', '.clear_cache', function(event) {
		event.preventDefault();
		$.ajax({
		  url: "/admin/clear_cache.php",
		  context: document.body
		}).done(function() {
		  
		});
	});	
	//обновление текста в режиме админа
	if($('.nav-item.logged').length) {
		var changeTimer;
		$(document).on('keyup','.itm-popup span input',function(e){
			var self = this;
			clearTimeout(changeTimer);
		   changeTimer = setTimeout(function() {
		    	$(self).attr('value',$(self).val());
		    	$(self).next().html($(self).val());
		    }, 300);
		});
	}

	$(document).on('change', 'input[name="dlc"]', function(event) {
		event.preventDefault();
		if($(this).attr('id') == 'show-dlc') {
			$('body').removeClass('hidedlc');
		} else {
			$('body').addClass('hidedlc');
		}
	});
}); // end document .ready



$(document).mousedown(function(e) {
	var container = $('.option-container');
	var mobile_nav = $('.mobile-nav-container');
	var popit = $('.itm-popup#popup');
	if (!container.is(e.target) && container.has(e.target).length === 0 ) {
		container.fadeOut(200);
		$('.option-pools').hide();
	}
	if (!mobile_nav.is(e.target) && mobile_nav.has(e.target).length === 0 ) {
		mobile_nav.fadeOut(200);
	}
	
	if (!popit.is(e.target) && popit.has(e.target).length === 0 ) {
		if (popit.is(':visible')) {
			closepp();
		}
	}
	
}); // end document .mouseup



$(window).scroll(function() {
	if (window.location.pathname == "/afterbirth") loadUpdates();
}); // end document .scroll



function cCo() {
	// alert('wtf');
    var e = gC("nocookie");
    if (e == "") sC('nocookie','y',365);
    
    if (e == "y") {		

		var ta = gC("sort");
		var id = document.getElementById("itemid");
		var cl = document.getElementById("colour");
        var az = document.getElementById("alphabet");
		if (ta == "id") {
            $('.textbox').tsort({attr:'data-sid'});
            if (az !== undefined && id !== undefined && cl !== undefined && az !== null && id !== null && cl !== null) {
                az.checked = false;
				cl.checked = false;
                id.checked = true;
            }
        } else if (ta == "co") {
			$('.textbox').tsort({attr:'data-cid'});	
			if (az !== undefined && id !== undefined && cl !== undefined && az !== null && id !== null && cl !== null) {
                az.checked = false;
				cl.checked = true;
                id.checked = false;
            } 
		}
		else if (ta == "az") {
			$('.textbox').tsort({attr:'data-tid'});	
			if (az !== undefined && id !== undefined && cl !== undefined && az !== null && id !== null && cl !== null) {
                az.checked = true;
				cl.checked = false;
                id.checked = false;
            }

		}
		
		var fi = gC("filter");
		var rm = document.getElementById("remove");
        var fa = document.getElementById("fade");
		if (fi == "f") {
            if (rm !== undefined && fa !== undefined && rm !== null && fa !== null) {
                rm.checked = false;
                fa.checked = true;
            }
        } else if (fi == "r") {
			if (rm !== undefined && fa !== undefined && rm !== null && fa !== null) {
                rm.checked = true;
                fa.checked = false;
            }
		} else {
            if (rm !== undefined && fa !== undefined && rm !== null && fa !== null) {
                rm.checked = false;
                fa.checked = true;
            }
		}
		
		var cdi = gC("nowarn");
		var cd = document.getElementById("countdown");
		if (cdi == "y") {
			if (cd !== undefined && cd !== undefined) {
				$('#countdown').hide()
			} else {
				if (cd !== undefined && cd !== undefined) {
					$('#countdown').show()
				}
			}
		}
		
		var z = gC("size");
		var y = document.getElementById("small");
        var x = document.getElementById("medium");
		if (z == "s") {
			if (y !== undefined && x !== undefined && y !== null && x !== null) {
				$(".item").removeClass("large");
				$(".item").addClass("small");
				$(".rebirth-item").removeClass("large");
				$(".rebirth-item").addClass("small");
				y.checked = true;
				x.checked = false;
			}
		} else if (z == "m") {
			if (y !== undefined && x !== undefined && y !== null && x !== null) {
				$(".item").removeClass("small");
				$(".item").removeClass("large");
				$(".rebirth-item").removeClass("small");
				$(".rebirth-item").removeClass("large");
				y.checked = false;
				x.checked = true;
			}
		} else {
			if (y !== undefined && x !== undefined && y !== null && x !== null) {
				$(".item").removeClass("small");
				$(".item").removeClass("large");
				$(".rebirth-item").removeClass("small");
				$(".rebirth-item").removeClass("large");
				y.checked = false;
				x.checked = true;
			}
		}
		// мое
		
		var t=gC("helper");
        var n=document.getElementById("helper-on");
        var r=document.getElementById("helper-off");
        if(t=="on"){
            helperEnable();
            n.checked = true;
            r.checked = false;
        }else if(t=="off"){
            n.checked = false;
            r.checked = true;
        } else if (t == "") {
        	//Первый запуск
        	sC('helper','off',360)
        	//helperEnable();
    	}
        
    }
}

cCo();
var cycleID;
//Проверка на запуск по локалке!
if (window.location.protocol == 'file:') {
	$('.textbox').tsort({attr:'data-tid'});
}

//getQueryVariable(){}



/* ----------------------------------------------------------------------------------------------- Babe-helper, летающий за тобой */
function helperDisable(){
	clearInterval(cycleID);
	$('#babe').hide();
	$('#shadow').hide();
}
function helperEnable() {
			clearInterval(cycleID);
 			
            var rect = $('#babe').show(); // объект
            var shadow = $('#shadow').show(); // тень
            var footer = $('.footer-bar');
            var footerHeight = parseInt(footer.css('top'), 10); // высота объекта
            var mouseState; //для анимации при клике
            var zavisArr = [
                0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,-1,0,0,0,0,-1,0,0,0,0,-1,0,0,0,0,-1,0,0,0,0,-1,0,0,0,0];
            var mx,my; // координаты мышки
            var speed=6; // Скорость передвижения в пикселях
            var ObjWidth = parseInt(rect.css('width'), 10); // ширина объекта
            var ObjHeight = parseInt(rect.css('height'), 10); // высота объекта
         	
            // Случайный babe:
            var famarray = [0,-64,-128,-192,-256,-320,-384,-448,-512,-576,-640,-704,-768,-832,-896,-960,-1024,-1088,-1152,-1216,-1280,-1344,-1408,-1472,-1536,-1600,-1664,-1728,-1792,-1856,-1920,-1984,-2048,-2112,-2176,-2240,-2304,-2368,-2432,-2496,-2560,-2624,-2688,-2752,-2816,-2880,-2944,-3008,-3072,-3136,-3200,-3264,-3328,-3392,-3456,-3520,-3584,-3648,-3712,-3776,-3840,-3904,-3968,-4032,-4096,-4160,-4224,-4288,-4352,-4416,-4480,-4544,-4608,-4672,-4736,-4800,-4864,-4928,-4992,-5056,-5120,-5184,-5248,-5312,-5376,-5440,-5504,-5568,-5632,-5696,-5760,-5824,-5888,-5952,-6016,-6080,-6144,-6208,-6272,-6336,-6400,-6464,-6528,-6592,-6656,-6720,-6784,-6848,-6912,-6976,-7040,-7104,-7168,-7232,-7296,-7360,-7424,-7488,-7552,-7616,-7680,-7744,-7808,-7872,-7936,-8000,-8064,-8128,-8192,-8256,-8320,-8384,-8448,-8512,-8576,-8640,-8704,-8768,-8832,-8896,-8960,-9024,-9088,-9152,-9216,-9280,-9344,-9408,-9472,-9536,-9600,-9664,-9728,-9792,-9856,-9920,-9984,-10048,-10112,-10176,-10240,-10304,-10368,-10432,-10496,-10560,-10624,-10688,-10752,-10816,-10880,-10944,-11008,-11072,-11136,-11200,-11264,-11328,-11392,-11456,-11520,-11584,-11648,-11712,-11776,-11840,-11904,-11968,-12032,-12096,-12160,-12224,-12288,-12352,-12416,-12480, -12544, -12608, -12672, -12736];
            var randY = 0 + Math.floor(Math.random() * (famarray.length + 1));
            
            rect.css('background-position', "0 "+ famarray[randY]+"px");

            // Координаты курсора
            $(document).mousemove(function (e) {
                mx = e.pageX;
                my = e.pageY;
            });
            $(document).mousedown(function (e) { mouseState = true; });
            $(document).mouseup(function (e) { mouseState = false; });

            // Главный цикл
            cycleID = setInterval(function () { 
               // расстояние объекта от левого и верхнего краев
               var ObjTop = parseInt(rect.css('top'), 10);
               var ObjLeft = parseInt(rect.css('left'), 10);
               // Представим что две точки (мышка и объект) образуют прямоугольник, и найдем его стороны
               var a = my - (ObjTop + ObjHeight/2); // сторона а
               var b = mx - (ObjLeft + ObjWidth/2); // сторона b
               var len = Math.sqrt(a * a + b * b); // расстояние от объекта до мышки (гипотенуза)
               if (len) {
               // Найдем стороны маленького прямоугольника (между объектом и будущим его местоположением)
                    a = a / len * speed; 
                    b = b / len * speed;
                }
                
                //Поворачиваем babe
                var pos;
                if((a < 0)) {
                    pos = -256;//вверх
                    if(a > b) pos =-384;//налево
                    if(b > -a) pos=-128;//направо
                } else {
                    pos=0;  //вниз
                    if(a < -b) pos=-384;//налево
                    if(b > a) pos=-128;//направо
                }
                var bp = rect.css('background-position');
                var bpArr = bp.split(' ');
                if (mouseState) pos-=64;
                rect.css('background-position', pos+"px"+" "+bpArr[1]);

                //https://toster.ru/q/29215
                var zavis;
                switch (true) {
                        case len < 80: 
                            a = -a;
                            b = -b;
                            switch(true){
                                case len > 70: speed = 1.5; break;
                                case len > 60: speed = 2.0; break;
                                case len > 50: speed = 2.5; break;
                                case len > 40: speed = 3.0; break;
                                case len > 30: speed = 3.5; break;
                            }
                            break;
                        case ((len < 100) && (len > 80)): 
                            zavis=true;
                            break;
                        case len < 110:
                            speed = 2.5;
                            break;
                        case len < 130:
                            speed = 3.0;
                            break;
                        case len < 140:
                            speed = 4.5;
                            break;
                        case len < 150:
                            speed = 5.0;
                            break;
                        case len < 160:
                            speed = 5.5;
                            break; 
                        default:
                            speed = 6;
                    }
                //console.log('speed='+speed, 'len='+len);
                if (zavis) {
                    speed = 2.5;
                    var temp = zavisArr.pop();
                    ObjTop+=temp;
                    rect.css('top', ObjTop + 'px');
                    zavisArr.unshift(temp);
                    //console.log(ShadowObjTop);
                    //zavis=false;
                } else{
                    ObjTop+=a;
                    ObjLeft+=b;
                    rect.css('left', ObjLeft  + 'px');
                    rect.css('top', ObjTop + 'px');
                    /*if((ObjLeft+19 < 360) && (ObjLeft+19 > 307) && !(ObjTop > footerCoords.top)) shadow.css({
                    	'transform' : 'rotate(45deg)',
                    	'-moz-transform' : 'rotate(45deg)',
                    	'-webkit-transform' : 'rotate(45deg)'});
                    else shadow.css({
                    	'transform' : 'none',
                    	'-moz-transform' : 'none',
                    	'-webkit-transform' : 'none'})
                    
					*/

                    //console.log(footerCoords.top, ObjTop);
                    shadow.css('left', ObjLeft+19  + 'px');
                    shadow.css('top', ObjTop+58-window.pageYOffset + 'px');
                }
            }, 20);
}


// Обработчик back/forward событий
window.onpopstate = function(event) {
	console.log("location: " + location.href + ", state: " + JSON.stringify(event.state));
	//alert('ssss');
	var pp = document.getElementById('popup');
	
	if(pp.style.display == 'block'){
		if ((event.state == null) || (event.state['id'] == undefined)) closepp(true); 
  		else initpp(event.state['id'],event.state['type'],true);
	} else if (pp.style.display == 'none'){
		if ((event.state != null) || (event.state['id'] != undefined)) initpp(event.state['id'],event.state['type'],true);
	}
};

// добавить состояние истории
 //history.pushState({}, "title", "/");
 //history.pushState({id: 320}, "title 2", "?id=320");

// заменить текущее состояние
  //history.replaceState({id: 11}, "title 3", "?id=11");

//history.back(); // location: http://example.com/example.html?page=1, state: {"page":1}
//history.back(); // location: http://example.com/example.html, state: null
//history.go(2);  // location: http://example.com/example.html?page=3, state: {"page":3}
//console.log(history.state) // Object {page: 3}

