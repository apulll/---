function genericPoemMaker(name,gender){
	console.log(name+"is finer than fine wine.");
	console.log("Altruistic and noble for the modern time.");
    console.log("Always admirably adorned with the latest style.");
    console.log("A " + gender + " of unfortunate tragedies who still manages a perpetual smile");
}
//callback，参数的最后一项，将会是我们在上面定义的genericPoemMaker函数
function getUserInput(firstName, lastName, gender, callback) {
    var fullName = firstName + " " + lastName;

    // Make sure the callback is a function
    if (typeof callback === "function") {
    // Execute the callback function and pass the parameters to it
    callback(fullName, gender);
    }
}

getUserInput("Michael", "Fassbender", "Man", genericPoemMaker);

function A(callback){
	alert("我是A函数");
	(callback && typeof(callback) === "function") && callback();
}
function B(){
	alert("我是B函数")
}
A(B);


//
var myapp = {};
myapp.color = "green";
myapp.paint = function(color){
	alert(this.color)
}
var findf = function(callback,callback_obj){
	(callback && typeof(callback) === "function") && callback.call(callback_obj);
}

findf(myapp.paint,myapp);