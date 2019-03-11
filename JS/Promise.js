// 鏈式調用
const PENDING = 'pending';
const RESOLVE = 'resolve';
const REJECT  = 'reject';


function Promise(executor){

	this.status = PENDING;
	this.value = '';
	this.reason = '';

	this.onResolvedCallbacks = [];
	this.onRejectedCallbacks = [];


	let resolve = (value)=>{
		if(this.status === PENDING){
			this.status = RESOLVE;
			this.value = value;

			this.onResolvedCallbacks.forEach(fn=>{ 
					fn();
			})

		}		
	}

	let reject = (reason)=>{
		this.status = REJECT;
		this.reason = reason;

		this.onRejectedCallbacks.forEach(fn=>{
			fn()
		})

	}

	try{
		executor(resolve, reject)
	}catch(err){
		reject(err);
	}

}



Promise.prototype.then = function(onFulfilled, onRejected){
	
	let promise2;

	onFulfilled = typeof onFulfilled === 'function'  ? onFulfilled : function(value){ return value;};
	onRejected = typeof onRejected === 'function' ? onRejected : function(err){ throw err; };

	if( this.status === PENDING){
		promise2 = new Promise( (resolve, reject)=>{
			this.onResolvedCallbacks.push(()=>{				
				setTimeout(()=>{
					try{
						let x = onFulfilled(this.value);
						resolvePromise(promise2, x, resolve, reject);						
					}catch(err){
						reject(err);
					}			
				})
					
			})

			this.onRejectedCallbacks.push(()=>{			
				setTimeout(()=>{
					try{
						let x = onRejected(this.reason);
						resolvePromise(promise2, x, resolve, reject);						
					}catch(err){
						reject(err);
					}		
				})								
			})

		})
	}

	if( this.status === RESOLVE ){				
		promise2 = new Promise((resolve, reject)=>{
			setTimeout(()=>{
				try{
					let x = onFulfilled(this.value);
					resolvePromise(promise2, x, resolve, reject);
				}catch(err){
					reject(err);								
				}		
			})									
		});		
	}

	if( this.status === REJECT ){

		promise2 = new Promise( (resolve, reject)=>{
			setTimeout(()=>{
				try{
					let x = onRejected(this.reason);			
					resolvePromise(promise2, x, resolve, reject);					
				}catch(err){
					reject(err);
				}	
			})			
		})		
	}	

	return promise2;
}



function  resolvePromise(promise2, x, resolve, reject){
	// get  4 params
	// x maybe  other's promise
	// so  there are many situations
	
	//condition 1
	if( promise2 === x){
		return reject(new TypeError('循環引用了'))
	}

	let called; // 表示是否調用過成功或者失敗

	if( x !== null && (typeof x === 'object' || typeof x === 'function')){
		try{
			let then = x.then; //这条语句为何一定要放在try里面呢?

			if( typeof then === 'function'){
				//認爲then是一個promise
				then.call(x, function(y){
					if(called) return;
					called = true;

					resolvePromise(promise2, y, resolve, reject);
				}, function(err){
					if(called) return;
					called = true;
					reject(err);
				})

			}else{
				resolve(x);
			}

		}catch(e){
			if(called) return;
			called = true;
			reject(e);
		}
	}else{
		resolve(x);
	}
}



// 捕获错误的方法，在原型上有catch方法，返回一个没有resolve的then结果即可
Promise.prototype.catch = function (callback) {
    return this.then(null, callback)
}

// 解析全部方法，接收一个Promise数组promises,返回新的Promise，遍历数组，都完成再resolve
Promise.all = function (promises) {
    //promises是一个promise的数组
    return new Promise(function (resolve, reject) {
        let arr = []; //arr是最终返回值的结果
        let i = 0; // 表示成功了多少次
        function processData(index, y) {
            arr[index] = y;
            if (++i === promises.length) {
                resolve(arr);
            }
        }
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(function (y) {
                processData(i, y)
            }, reject)
        }
    })
}



// 只要有一个promise成功了 就算成功。如果第一个失败了就失败了
Promise.race = function (promises) {
    return new Promise(function (resolve, reject) {
        for (var i = 0; i < promises.length; i++) {
            promises[i].then(resolve,reject)
        }
    })
}
// 生成一个成功的promise
Promise.resolve = function(value){
    return new Promise(function(resolve,reject){
        resolve(value);
    })
}
// 生成一个失败的promise
Promise.reject = function(reason){
    return new Promise(function(resolve,reject){
        reject(reason);
    })
}


// 安装promises-aplus-tests进行测试

Promise.deferred = function () {
  let dfd = {};
  dfd.promise = new Promise(function (resolve, reject) {
      dfd.resolve = resolve;
      dfd.reject = reject;
  });
  return dfd;
}

module.exports = Promise;

