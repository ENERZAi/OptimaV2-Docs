# Chapter 4. Managing control flow

Control flow is one of the critical feature of the all programming languages. This determines execution order of the blocks in the program.
In this page, we introduce if/else statement, exception and print statement

### If/Else 
If/Else statement is written as following.
```
template</a : idx/>
module ifElseExample(){
    if (a == 0i){
        !{0}
    } else {
        !{1}
    }
}
```
This shows example of simple if/else statement in Opto. Unlike python or C, our if/else statement itself is an expression. Which means, it has to return some kind of value. Return value of the 'if' and 'else' block becomes the return value of the if/else statement. Therefore, the return type of if block and else block must be compatible. Otherwise, it will cause type error.

We can omit 'else' clause if we want. 
```
template</a : idx/>
module ifElseExample(){
    if (a == 0i){
        !{0}
    }
}
```
The omitted 'else' block returns 'None' as default. Since None type is compatible with any type, (None type is parent type of any other type in Opto) There is no restriction in return type of if clause.

### Exceptions
We can throw exceptions in opto like following. Note that when exception is thrown, program always terminates intermediately. There is not 'catch' functionality in Opto. Therefore, you should use it for checking conditions where program must fail before it does any unwanted behaviors. We can throw exception with 'except' clause.

Since 'except' always terminates program, we don't have to think about type compatibility. Opto language does not type-check return value of except because it will be never returned.

```
template</input : idx/>
module ifElseExample(){
    let _ = if (input == 0i){
        except("input should not be zero')
    }
    !{0}
}
```

### Print
We can print compile-time values on the console. This is helpful in debugging, or examining the output.
```
print(<expression>))
```
We can print any value in opto language using print statement including non values, or runtime expressions and runtime type.