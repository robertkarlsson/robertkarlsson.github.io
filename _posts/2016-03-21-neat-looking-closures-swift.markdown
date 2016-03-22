---
layout: post
title:  "Understanding and writing neat looking closures in Swift"
date:   2016-03-21 15:26:51 +0100
categories: swift closures
---

Apple have added som tweaks to them closures that made me love the way they are written in swift. 
As a javascript developer, using functions as variables was nothing that took me with surprise, I've already had my struggle with callback hells and christmas trees.
For those who don't know, the concept of closures in Swift can be summarized with two purposes:

First:
Treat functions as variables, thus we can send them to other functions as arguments. This is a concept also known as lambdas in C#, blocks in objective-C and anonymous functions in javascript
(now also arrow functions).

Second:
To capture variables in their surrounding context, so the variables can be modified when the original scope no longer lives.

In this short article, I'm going to focus on the first purpose, and how you can write a nice looking closure, step by step.
In the examples below, I'm going to use the same array numbers, 0-9, and filter all the even ones into a new array. Simple stuff but works great with the example!
I'm using the built in filter function in Swift Int arrays, that expects a function with one parameter (Int) and returns a Bool.

In the first example below, we use a named function that follows the exact rules. One parameter of the type int, and it returns a Bool. 
We then pass it into the filter-function as the first and only argument and get the even numbers back.

{% highlight swift %}
//The results array
var evenNumbers: [Int] = []

//Using a named function as the argument
func even(i: Int) -> Bool {
    return i % 2 == 0
}

evenNumbers = [0,1,2,3,4,5,6,7,8,9].filter(even)
print(evenNumbers)

{% endhighlight %}

Instead of using a named function for this, we can define a closure expression as the argument.
The format for a closure expression is:
{ (parameters) -> return type in
    statements
}


{% highlight swift %}

//Using a closure expression
evenNumbers = [0,1,2,3,4,5,6,7,8,9].filter({(i: Int) -> Bool in return i % 2 == 0})
print(evenNumbers)

{% endhighlight %}

This is the "full format" of a closure expression, where we define both the type of the parameters,
the name of the parameters and the return type. Swift is a great example of a language that let us do
the same thing in ten different ways, so in the examples below we're going to pick this apart piece by 
and get a nicer looking closure. Each block of code presented below is fully executable, and will have the exact same result.

The first step is to infer the return type from the context and remove the "in Bool" part.

{% highlight swift %}

//Using a trimmed down closure
evenNumbers = [0,1,2,3,4,5,6,7,8,9].filter({(i: Int) in return i % 2 == 0 })
print(evenNumbers)

{% endhighlight %}

A closure can also infer the type of the parameter by its context and we can remove both the parantheses - ( ), and the "Int" part of 
(i: Int). This does not work if the closure have more then one parameter, though we can still write (i,j) instead of (i: Int, j: Int).

{% highlight swift %}

// Closure expression inferring parameter types from context
evenNumbers = [0,1,2,3,4,5,6,7,8,9].filter({i in return i % 2 == 0 })
print(evenNumbers)

{% endhighlight %}

Furthermore, we can remove the "return" since the closure can have an implicit return if it only consists of one statement. 
Be aware that this will not work if the closure consists of more then one statement.

{% highlight swift %}

//Closure expression with implicit return from single expression
evenNumbers = [0,1,2,3,4,5,6,7,8,9].filter({i in  i % 2 == 0 })
print(evenNumbers)

{% endhighlight %}

If we know the number of parameters in the closure, we can refer to them by using a short hand name that swift automatically gives to us, instead of naming them.
In the case of the filter function, the closure only have one parameter, and we can refer to it by writing $0. If this would be
a sort function instead, our closure would have two parameters and we would have to use $0 and $1.

{% highlight swift %}

//Ex closure implicit shorthand argument names
evenNumbers = [0,1,2,3,4,5,6,7,8,9].filter({$0 % 2 == 0 })
print(evenNumbers)

{% endhighlight %}

If the closure is the last parameter in a function, thus the last argument sent when calling the function, we can remove the parenthesis and only keep the block.
This comes in handy when dealing with callbacks or animations.

{% highlight swift %}

//If the closure expression is last argument
evenNumbers = [0,1,2,3,4,5,6,7,8,9].filter{$0 % 2 == 0}
print(evenNumbers)

{% endhighlight %}

To add this concept to some form of context, here is a snippet that animates a label from alpha 0.0 to 1.0 with the same closure expression written in two different ways.

{% highlight swift %}

 //Full format
 UIView.animateWithDuration(2, animations: {()-> Void in self.label.alpha = 1.0})
  
 //Shorthand       
 UIView.animateWithDuration(2) { self.label.alpha = 1.0 } 
 
{% endhighlight %}

This exact concept exists in the implementation of ES5 and ES2015+ and confusingly enough it's not called closures, since that's the same as swifts "capturing variables" part of closures.
More about that in another post. The name for this type of annotation in javascript is anonymous functions but can also be written as arrow functions in ES2015.
This example right below:

{% highlight javascript %}

//(ES5) Javascript implementation of the same example
evenNumbers = [0,1,2,3,4,5,6,7,8,9].filter(function(i){ return i % 2 === 0 })
console.log(evenNumbers)

{% endhighlight %}

 
 can be compared to swifts 
 
 {% highlight swift %} 
 {(i: Int) in return i % 2 == 0 } 
 {% endhighlight %} 
 
 just without the typing part.
 
 In ES2015, we can do the same thing with arrow functions. The example below uses no parentheses around the i-parameter since it's optional when there is only one.


{% highlight javascript %}


//(ES2015) Javascript implementation of the same example
evenNumbers = [0,1,2,3,4,5,6,7,8,9].filter( i =>  i % 2 === 0)
console.log(evenNumbers)

{% endhighlight %}

And that's it! Now go an write the same thing in 7 different ways just because you can!

