/*jshint eqnull:true, expr:true*/
//TestChange

var _ = {};

(function() {

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
  	return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
  	return n === undefined ? array[array.length-1] : function(){
  		return n > array.length ? array.slice(0) : array.slice(array.length-n);
  	}();
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
  	if (collection.length === undefined){//is object, use for-in loop
  		for (var property in collection){
  			iterator(collection[property],property.toString(),collection);
  		};
  	}else{//is array, use for-with-SC loop
  		for (var element = 0; element < collection.length; element++){
  			iterator(collection[element],element,collection);
  		};
  	}
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  // Note to self: should return new array, with all the "passed" truthy elements pushed to it
  _.filter = function(collection, test) {
  	var passed = [];
  	_.each(collection, function(item, index, collection){
  		if (test(item)===true){passed.push(item)};

  	})
  	return passed;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    /* Trying to use filter, not seeing a way to it that is more concise or faster. Maybe I should be looking at the extra arguments in forEach?
    var failed = [];
    _.each(_.filter(collection,test), function(item,index,collection){
    	if (indexOf(collection,item) === -1){failed.push(item);};

    });
    return failed;
    */
    var failed = [];
  	_.each(collection, function(item, index, collection){
  		if (test(item)===false){failed.push(item)};

  	})
  	return failed;
  };


  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
  	var chkdElms = [];
  	_.each(array,function(item, index, collection){
  		if (_.indexOf(chkdElms, item) === -1){
  			chkdElms.push(item)};

  	});
  	return chkdElms;
  };


  // Return the results of applying an iterator to each element.
  //Note to self: this time the iterator will return something, and we must store it
  _.map = function(collection, iterator) {
  	var results = [];
  	_.each(collection, function(item,index,collection){
  		results.push(iterator(item));
  	});
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    return results;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Calls the method named by functionOrKey on each value in the list.
  // Note: you will nead to learn a bit about .apply to complete this.
  //AND returns a list of results
  _.invoke = function(collection, functionOrKey, args) {
	if(typeof(functionOrKey)==='function'){//is a function
		return _.map(collection, function(item,index,collection){
			return functionOrKey.apply(item,args);

		});
	};
	if(typeof(functionOrKey)==='string'){//is a function
		return _.map(collection, function(item,index,collection){
			return item[functionOrKey]();

		});
	};
  	};



  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. If initialValue is not explicitly passed in, it should default to the
  // first element in the collection.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  _.reduce = function(collection, iterator, accumulator) {
  	//initialValue and holderArr get changed with each call
  	//each call hits every element of the array, with function iterator
  	if (accumulator === undefined){//assigning initialValue
  		var initialValue = collection[0];
  	}else{//initialValue is specified
  		var initialValue = accumulator
  	};

  	_.each(collection, function(item, index, collection){
  		initialValue = iterator(initialValue,item);
  	});

  	return initialValue;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
  	if (iterator === undefined){
  		iterator = _.identity;
  	};
    // TIP: Try re-using reduce() here.
    return _.reduce(collection, function(wasFound, item){
      if (wasFound===false){
    	return false;
      }
      if (iterator(item)){
      	return true;
      	}else{
      		return false;
      		}
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
  	if (iterator === undefined){
  		iterator = _.identity;
  	}
  	if (collection === []){
  		return false;
  	}
    // TIP: There's a very clever way to re-use every() here.
    var results = _.map(collection, function(item){
    	if (iterator(item)){
    		return true
    	}else {
    		return false}
    });
    return _.contains(results,true);
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
  	_.each(arguments,function(item,index,collection){
  	  _.each(item, function(item, index,collection){
  	  	obj[index] = item;
  	  });
  	});
  	return obj;
  };


  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
  	_.each(arguments,function(item,index,collection){
  	  _.each(item, function(item, index,collection){
  	  	if (obj.hasOwnProperty(index)===false){
  	  		obj[index] = item;
  	  	}
  	  });
  	});
  	return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // _.memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
  	var prevComputes = [];
  	var prevResults = [];
  	return function(){
  		var argsIndex = _.indexOf(prevComputes,arguments[0]);
  		var result;
  		if (argsIndex === -1){
  			result = func.apply(this,arguments);
  			prevComputes.push(arguments[0]);
  			prevResults.push(result);

  		}else{
  			result = prevResults[argsIndex];
  		}
		return result;
  	};
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
  	var args= [];
  	if (arguments.length >2){//extra args, need to create array
  		for (var i =2; i<arguments.length;i++ ){
  			args[i-2] = arguments[i];
  		}
  	} else{//no extra args
  		args = undefined;
  	}
  	window.setTimeout(function(){
  		func.apply(null,args);
  	},wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  //Note to self, this is barely pseudo-random.
  //Perhaps a long way to do this would be to slice a bunch of times on an array that was getting elements popped into a holder?
  //Please look at the actual implementation later to learn more!
  _.shuffle = function(array) {
  	var randoCut = Math.floor(Math.random()*(array.length-1));
  	var elements1 = array.slice(randoCut);
  	var elements2 = array.slice(0,randoCut).reverse();
  	return elements1.concat(elements2).reverse();
  };


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
  };

}).call(this);
