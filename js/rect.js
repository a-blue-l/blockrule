$(function(){
	var num = 0;
	var gameH = ['h1','h2','h3','h4','h5','h6','h7','h8'];
	var arr = {};
	var recarr = [];
	var cirarr = [];
	var arro = [];
	var xxx = 0;
	var colors = {
		0 : "#c0392b",
        1 : "#2980b9",
        2 : "#2c3e50",
        3 : "#e67e22",
        4 : "#16a085",
        5 : "#27ae60",
        6 : "#9b59b6",
        7 : "#7f8c8d",
        8 : "#f1c40f",
        9 : "#c24646",
        10 : "#0b7140",
        11 : "#555744",
        12 : "#f19c2e",
	}
	var circle = function(x,y,color){
		this.left = x;
		this.top = y;
		this.id = color;
		this.color = colors[color];
		var game_cir = document.createElement('div');
		game_cir.className = 'game-object';
		$(game_cir).css({left:x*100+'%',top:y*100+'%'});
		var circle = document.createElement('div');
		circle.className = 'circle';
		circle.style.backgroundColor = this.color;
		circle.id = color;
		game_cir.appendChild(circle);
		this.paint($(game_cir));
		cirarr.push(this);
	}
	circle.prototype = {
		paint:function(sprite){
			$('.stage').append(sprite);
		}
	}
	function ifai(sprite){
		for(var j = 0; j < cirarr.length; j ++){
			if(sprite.id == cirarr[j].id){
				if(sprite.left == cirarr[j].left && sprite.top == cirarr[j].top){
					if(!arr[j]){
						arr[j] = true;
						xxx += 1;
					}
				}
			}
		}
		if(xxx >= cirarr.length){
			var t = setTimeout(function(){
				alert('666');
				next();
				clearTimeout(t);
			},200)
		}
	}
	var rect = function(x,y,color,arrow){
		this.left = x;
		this.top = y;
		this.color = colors[color];
		this.arrow = arrow;
		this.id = color;
		this.run = [{'x':x,'y':y,'arrow':arrow}];
		this.box = document.createElement('div');
		this.box.className = 'game-object squere';
		this.box.style.left = this.left*100+'%';
		this.box.style.top = this.top*100+'%';
		this.box.style.backgroundColor = this.color;
		this.box.innerHTML = this.arrow;
		recarr.push(this);
		var that = this;
		this.box.onclick = function(){
			if(that.arrow == 'down'){
				boomdown(that,"down");
				that.top += 1;
				that.box.style.top = that.top*100+'%';
			}
			if(that.arrow == 'left'){
				boomdown(that,"left");
				that.left -= 1;
				that.box.style.left = that.left*100+'%';
			}
			if(that.arrow == 'up'){
				boomdown(that,"up");
				that.top -= 1;
				that.box.style.top = that.top*100+'%';
			}
			if(that.arrow == 'right'){
				boomdown(that,"right");
				that.left += 1;
				that.box.style.left = that.left*100+'%';
			}
			for(var j = 0; j < recarr.length; j ++){
				arrbom(recarr[j]);
			}
			for(var i = 0; i < recarr.length; i ++){
				recarr[i].run.push({'x':recarr[i].left,'y':recarr[i].top,'arrow':recarr[i].arrow});
			}
			ifai(that);
		}
		$('.stage').append($(this.box));
	}
	var arow = function(x,y,arrow){
		this.left = x;
		this.top = y;
		this.arrow = arrow;
		this.boxarr = document.createElement('div');
		this.boxarr.className = 'game-object';
		this.boxarr.style.left = this.left*100+'%';
		this.boxarr.style.top = this.top*100+'%';
		this.boxarr.innerHTML = this.arrow;
		this.boxarr.style.color = '#000';
		arro.push(this);
		$('.stage').append($(this.boxarr));
	}
	// 后退
	$('.return').on('touchstart',function(){
		for(var i = 0; i < recarr.length; i ++){
			if(recarr[i].run.length > 1){
				recarr[i].run.pop();
			}
			var m = recarr[i].run.length;
			recarr[i].left = recarr[i].run[m - 1].x;
			recarr[i].top = recarr[i].run[m - 1].y;
			recarr[i].arrow = recarr[i].run[m - 1].arrow;
			recarr[i].box.innerHTML = recarr[i].run[m - 1].arrow;
			recarr[i].box.style.left = recarr[i].left*100+'%';
			recarr[i].box.style.top = recarr[i].top*100+'%';
		}
	});
	$('.again').on('touchstart',function(){
		xxx = 0;
		arr = {};
		$('.stage .game-object').remove();
		recarr = [];
		cirarr = [];
		arrow = [];
		games[gameH[num]]();
	})
	function arrbom(sprite){
		for(var i = 0; i < arro.length; i ++){
			if(sprite.left == arro[i].left && sprite.top == arro[i].top){
				sprite.arrow = arro[i].arrow;
				sprite.box.innerHTML = arro[i].arrow;
			}
		}
	}
	function boomdown(sprite,zoo){
		if(zoo == 'down'){
			for(var i = 0; i < recarr.length; i ++){
				if(sprite.left == recarr[i].left && sprite.top == recarr[i].top - 1){
					var th = recarr[i];
					for(var j = 0; j < recarr.length; j ++){
						if(th.left == recarr[j].left && th.top == recarr[j].top - 1){
							recarr[j].top += 1;
							recarr[j].box.style.top = recarr[j].top*100+'%';
						}
					}
					recarr[i].top += 1;
					recarr[i].box.style.top = recarr[i].top*100+'%';
				}
			}
		}else if(zoo == 'left'){
			for(var i = 0; i < recarr.length; i ++){
				if(sprite.top == recarr[i].top && sprite.left == recarr[i].left + 1){
					var th = recarr[i];
					for(var j = 0; j < recarr.length; j ++){
						if(th.top == recarr[j].top && th.left == recarr[j].left + 1){
							recarr[j].left -= 1;
							recarr[j].box.style.left = recarr[j].left*100+'%';
						}
					}
					recarr[i].left -= 1;
					recarr[i].box.style.left = recarr[i].left*100+'%';
				}
			}
		}else if(zoo == 'up'){
			for(var i = 0; i < recarr.length; i ++){
				if(sprite.left == recarr[i].left && sprite.top == recarr[i].top + 1){
					var th = recarr[i];
					for(var j = 0; j < recarr.length; j ++){
						if(th.left == recarr[j].left && th.top == recarr[j].top + 1){
							recarr[j].top -= 1;
							recarr[j].box.style.top = recarr[j].top*100+'%';
						}
					}
					recarr[i].top -= 1;
					recarr[i].box.style.top = recarr[i].top*100+'%';
				}
			}
		}else if(zoo == 'right'){
			for(var i = 0; i < recarr.length; i ++){
				if(sprite.top == recarr[i].top && sprite.left == recarr[i].left - 1){
					var th = recarr[i];
					for(var j = 0; j < recarr.length; j ++){
						if(th.top == recarr[j].top && th.left == recarr[j].left - 1){
							recarr[j].left += 1;
							recarr[j].box.style.left = recarr[j].left*100+'%';
						}
					}
					recarr[i].left += 1;
					recarr[i].box.style.left = recarr[i].left*100+'%';
				}
			}
		}
	}
	function next(){
		num += 1;
		xxx = 0;
		arr = {};
		$('.stage .game-object').remove();
		recarr = [];
		cirarr = [];
		arrow = [];
		$('.stage').removeClass('h'+(num-1)).addClass('stage h'+num);
		games[gameH[num]]();
	}
	var games = {
		h1:function(){
			new circle(0,2,0);
			new rect(0,0,0,'down');
		},
		h2:function(){
			new circle(0,1,1);
			new circle(0,2,0);
			new rect(0,0,1,'down');
			new rect(0,3,0,'up');
		},
		h3:function(){
			new circle(0,3,0);
			new circle(2,5,1);
			new rect(2,0,1,'down');
			new rect(3,2,0,'left');
		},
		h4:function(){
			new circle(1,1,0);
			new circle(2,2,2);
			new circle(3,3,1);
			new rect(1,0,0,'down');
			new rect(0,1,1,'right');
			new rect(2,1,2,'down');
		},
		h5:function(){
			new circle(0,0,2);
			new circle(1,1,1);
			new circle(2,3,0);
			new rect(3,0,0,'down');
			new rect(4,1,1,'left');
			new rect(2,2,2,'up');
		},
		h6:function(){
			new circle(2,0,1);
			new arow(0,2,'right');
			new arow(2,2,'up');
			new rect(0,0,1,'down');
		},
		h7:function(){
			new circle(2,0,3);
			new circle(3,0,2);
			new arow(0,2,'right');
			new arow(2,2,'up');
			new rect(0,0,3,'down');
			new rect(0,2,2,'right');
		},
		h8:function(){
			new circle(1,0,3);
			new circle(2,0,1);
			new arow(0,1,'right');
			new arow(2,1,'up');
			new arow(3,1,'left');
			new rect(0,1,3,'right');
			new rect(2,1,1,'up');
		}
	}
	games[gameH[num]]();

})
