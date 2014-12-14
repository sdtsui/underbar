//re-implementation of SA0 functions

var _ = {};


  _.containsFiveOrMoreDivs = function (domElement){
    var counter = 0
    var recursiveCount = function(domElement){
      var children = domElement.childNodes;
      if(domElement.is("div")){
        counter++;
      }
      if(children.length>0){
        _.each(children, function(element){
          recursiveCount(element);
        });
      }
    }
    counter>4 ? return true : return false;
  }


  _.defaults = function(obj) {
    //loops over each property
    //checks if obj.hasOwnProp
    //if so, defines, if not, does nothing (sounds like a chance to try ternary)
    //no side effects***; inputs: possibly multiple objects; Outputs: none??? Or returns the object.
    ////I guess I can return the obj anyway..
    var args = Array.prototype.slice.call(arguments,1);
    _.each(args, function(element, index, collection){
      _.each(element, function(element,index,collection){
      (obj.hasOwnProperty(index)) ? return : obj[index]=element;
      });
    });
    return obj;
  };

  _.contains = function(list, value){
   //list is a collection, value is what we're testing for identity
    var hasIt = false;

    _.each(list, function(element){
      if (value === element){
        hasIt = true;
      }
    return hasIt;
    });

  };
