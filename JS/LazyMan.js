
function LazyMan( name ){
	return new _lazyMan( name )
}

function _lazyMan(name){
	this.task = [];
	var fn = (name=>{
		return  ()=>{
			console.log(`Hello  ${name}`);
			this.next()
		}
	})(name);
	
	this.task.push(fn);
	setTimeout( ()=>{
		this.next();
	}, 0)
}	

_lazyMan.prototype = {
	next: function(){
		var fn = this.task.shift();
		fn && fn();
	},
	eat: function(food){
		var fn = (food=>{
			return ()=>{
				console.log(`Eat ${food}`);
				this.next();
			}
		})(food);
		this.task.push(fn);
		return this;
	},
	sleep: function(time){
		var fn = (time=>{
			return ()=>{
				console.log(`Sleep ${time}`);
				setTimeout(()=>{
					this.next();
				}, time);								
			}
		})(time);
		this.task.push(fn);
		return this;
	},
	sleepFirst: function(time){
		var fn = (time=>{
			return ()=>{
				console.log(`FirstSleep ${time}`);
				setTimeout(()=>{
					this.next();
				}, time);								
			}
		})(time);
		this.task.unshift(fn);
		return this;
	}
}

// LazyMan('Hack');

// LazyMan('Hack').eat('dinner');

// LazyMan('Hack').sleep(2000).eat('dinner').sleepFirst(3000);

LazyMan("Joe").sleepFirst(3000).eat("breakfast").sleep(1000).eat("dinner");




