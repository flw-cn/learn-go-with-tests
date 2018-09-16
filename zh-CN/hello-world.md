> # Hello, World

# Hello, World

> **[You can find all the code for this chapter here](https://github.com/quii/learn-go-with-tests/tree/master/hello-world)**

**[你可以在这里找到本章的所有代码](https://github.com/quii/learn-go-with-tests/tree/master/hello-world)**

> It is traditional for your first program in a new language to be Hello, world.

当使用新的语言写你的第一个程序时，有一个传统就是写 "Hello，world"。

> In the previous chapter we discussed how Go is opinionated as to where you put your files.

**TODO**: 待翻译

> Make a directory in the following path `$GOPATH/src/github.com/{your-user-id}/hello`.

**TODO**: 待翻译

> So if you're on a unix based OS and your username is "bob" and you are happy to stick with Go's conventions about `$GOPATH` (which is the easiest way of setting up) you could run `mkdir -p ~/go/src/github.com/bob/hello`.

**TODO**: 待翻译

> Create a file in this directory called `hello.go` and write this code. To run it type `go run hello.go`.

创建一个 `hello.go` 的文件并写入这些代码。输入 `go run hello.go` 去运行它。

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, world")
}
```

> ## How it works

## 它是如何工作的

> When you write a program in Go you will have a `main` package defined with a `main` func inside it. The `func` keyword is how you define a function with a name and a body.

当你使用 Go 编写程序时，你将会有一个 `main` 的包，其中定义了 `main` 的函数。`func` 关键字用来定义带有名称和主体的函数。

> With `import "fmt"` we are importing a package which contains the `Println` function that we use to print.

通过 `import "fmt"` 我们导入一个包含 `Println` 函数的包，我们用它来打印输出。

> ## How to test

## 如何测试

> How do you test this? It is good to separate your "domain" code from the outside world \(side-effects\). The `fmt.Println` is a side effect \(printing to stdout\) and the string we send in is our domain.

怎么测试这个？将待测试代码和外部世界（副作用）分离会更好（测试）。`fmt.Println` 有副作用（打印到 stdout），而我们传递的字符串是要测试的代码。

> So let's separate these concerns so it's easier to test

所以我们把这些问题分开，就更容易测试了。

```go
package main

import "fmt"

func Hello() string {
    return "Hello, world"
}

func main() {
    fmt.Println(Hello())
}
```

> We have created a new function again with `func` but this time we've added another keyword `string` in the definition. This means this function returns a `string`.

我们再次使用 `func` 创建了一个新函数，但是这次我们在定义中添加了另一个关键字 `string`。这意味着这个函数返回一个 `string`。

> Now create a new file called `hello_test.go` where we are going to write a test for our `Hello` function

现在创建一个名为 `hello_test.go` 的新文件，我们将在这里为 `Hello` 函数编写一个测试

```go
package main

import "testing"

func TestHello(t *testing.T) {
    got := Hello()
    want := "Hello, world"

    if got != want {
        t.Errorf("got '%s' want '%s'", got, want)
    }
}
```
> Before explaining, let's just run the code. Run `go test` in your terminal. It should've passed! Just to check, try deliberately breaking the test by changing the `want` string.

在解释之前，让我们先运行一下代码。在终端运行 `go test`，它应该已经通过了！为了检验测试，可以通过尝试改变 `want` 字符串来破坏测试。

> Notice how you have not had to pick between multiple testing frameworks and then figure out how to install. Everything you need is built in to the language and the syntax is the same as the rest of the code you will write.

请注意，你不必在多个测试框架之间进行选择，也不必破译测试 DSL 来编写测试。你需要的一切都内建在语言中，语法与你将要编写的其余代码相同。

> ### Writing tests

### 编写测试

> Writing a test is just like writing a function, with a few rules

编写测试和写函数很类似，其中有一些规则

> * It needs to be in a file with a name like `xxx_test.go`
> * The test function must start with the word `Test`
> * The test function takes one argument only `t *testing.T`

- 它需要在一个名为 `xxx_test.go` 的文件中编写
- 测试函数的命名必须从单词 `Test` 开始
- 测试函数只接受一个参数 `t *testing.T`

> For now it's enough to know that your `t` of type `*testing.T` is your "hook" into the testing framework so you can do things like `t.Fail()` when you want to fail.

现在这些信息足以让我们明白，类型为 `*testing.T` 的变量 `t` 是你在测试框架中的 "hook"（钩子），所以你可以在想要失败时执行 `t.Fail()` 之类的操作。

> We've covered some new topics:

#### 新的知识

**if**

> If statements in Go are very much like other programming languages.

Go 的 `if` 语句非常类似于其他编程语言。

**声明变量**

> We're declaring some variables with the syntax `varName := value`, which lets us re-use some values in our test for readability.

我们使用语法 `varName := value` 声明了一些变量，它允许我们在测试中重用一些值以获得可读性。

**t.Errorf**

> We are calling the `Errorf` _method_ on our `t` which will print out a message and fail the test. The `f` stands for format which allows us to build a string with values inserted into the placeholder values `%s`. When you made the test fail it should be clear how it works.

我们正在调用 `t` 的 `Errorf` 方法，该方法将打印一条消息并使测试失败。`f` 表示格式化，它允许我们构建一个字符串，并将值插入占位符值 `%s` 中。当你测试失败时，它能够让你清楚测试是如何工作的。

> We will later explore the difference between methods and functions.

稍后我们将探讨方法和函数之间的区别。

> ### Go doc

### Go 文档

> Another quality of life feature of Go is the documentation. You can launch the docs locally by running `godoc -http :8000`. If you go to [localhost:8000/pkg](http://localhost:8000/pkg) you will see all the packages installed on your system.

Go 的另一个高质量特征是文档化。通过运行 `godoc -http:8000`，可以在本地启动文档。如果你访问 [localhost:8000/pkg](localhost:8000/pkg)，你将看到系统上安装的所有包。

> The vast majority of the standard library has excellent documentation with examples. Navigating to [http://localhost:8000/pkg/testing/](http://localhost:8000/pkg/testing/) would be worthwhile to see what's available to you.

大多数标准库都有优秀的文档和示例。浏览 [http://localhost:8000/pkg/testing/](http://localhost:8000/pkg/testing/) 是非常值得的，去看一下你有什么可以用的。

> ### Hello, YOU

### Hello, YOU

> Now that we have a test we can iterate on our software safely.

现在有了测试，就可以安全地迭代我们的软件了。

> In the last example we wrote the test _after_ the code had been written just so you could get an example of how to write a test and declare a function. From this point on we will be _writing tests first_.

在上一个示例中，我们在编写代码 *之后* 编写了测试，以便你可以获得如何编写测试和声明函数的示例。从此刻起，我们将 *首先编写测试*。

> Our next requirement is to let us specify the recipient of the greeting.

我们的下一个需求是让我们指定问候的接受者。

> Let's start by capturing these requirements in a test. This is basic test driven development and allows us to make sure our test is _actually_ testing what we want. When you retrospectively write tests there is the risk that your test may continue to pass even if the code doesn't work as intended.

让我们从在测试中捕获这些需求开始。这是基本的测试驱动开发，允许我们确保我们的测试 *确实* 是测试我们想要的。当你回顾编写测试时，存在一个风险：即使代码没有按照预期工作，测试也可能继续通过。

```go
package main

import "testing"

func TestHello(t *testing.T) {
    got := Hello("Chris")
    want := "Hello, Chris"

    if got != want {
        t.Errorf("got '%s' want '%s'", got, want)
    }
}
```

> Now run `go test`, you should have a compilation error

这时运行 `go test`，你应该会获得一个编译错误

```text
./hello_test.go:6:18: too many arguments in call to Hello
    have (string)
    want ()
```

> When using a statically typed language like Go it is important to _listen to the compiler_. The compiler understands how your code should snap together and work so you don't have to.

当使用像 Go 这样的静态类型语言时，*聆听编译器* 是很重要的。编译器理解你的代码应该如何合并并工作，这样你就不必再做这些了。

> In this case the compiler is telling you what you need to do to continue. We have to change our function `Hello` to accept an argument.

在这种情况下，编译器告诉你需要做什么才能继续。我们必须修改我们的函数 `Hello` 来接受一个参数。

> Edit the `Hello` function to accept an argument of type string

编辑 `Hello` 函数以接受字符串类型的参数

```go
func Hello(name string) string {
    return "Hello, world"
}
```

> If you try and run your tests again your `main.go` will fail to compile because you're not passing an argument. Send in "world" to make it pass.

如果你尝试再次运行测试，`main.go` 将无法编译，因为你没有传递参数。传递参数 "world" 让它通过。

```go
func main() {
    fmt.Println(Hello("world"))
}
```

> Now when you run your tests you should see something like

现在，当你运行测试时，你应该看到类似的内容

```text
hello_test.go:10: got 'Hello, world' want 'Hello, Chris''
```

> We finally have a compiling program but it is not meeting our requirements according to the test.

我们终于有了一个编译通过的程序，但是根据测试它并没有达到我们的要求。

> Let's make the test pass by using the name argument and concatenate it with `Hello,`

为了使测试通过，我们使用 name 参数并用 `Hello` 字符串连接它，

```go
func Hello(name string) string {
    return "Hello, " + name
}
```

> When you run the tests they should now pass. Normally as part of the TDD cycle we should now _refactor_.

当你运行测试时，现在应该通过了。通常作为 TDD 周期的一部分，我们现在应该 *重构* 测试。

> There's not a lot to refactor here, but we can introduce another language feature _constants_.

这里没有太多可重构的，但我们可以介绍另一种语言特性 *常量*。

> ### Constants

### 常量

> Constants are defined like so

常量的定义如下

```go
const helloPrefix = "Hello, "
```

> We can now refactor our code

现在我们可以重构代码

```go
const helloPrefix = "Hello, "

func Hello(name string) string {
    return helloPrefix + name
}
```

> After refactoring, re-run your tests to make sure you haven't broken anything.

重构之后，重新测试，以确保没有破坏任何东西。

> Constants should improve performance of your application as it saves you creating the `"Hello, "` string instance every time `Hello` is called.

常量应该可以提高应用程序的性能，它避免了每次调用 `Hello` 时创建 `"Hello, "` 字符串实例。

> To be clear, the performance boost is incredibly negligible for this example! But it's worth thinking about creating constants to capture the meaning of values and sometimes to aid performance.

显然，对于这个例子来说，性能提升是微不足道的！但是值得考虑的是创建常量来捕获值的含义，有时还可以帮助提高性能。

> ## Hello, world... again

## 再次回到 Hello, world

> The next requirement is when our function is called with an empty string it defaults to printing "Hello, World", rather than "Hello, ".

下一个需求是当我们的函数用空字符串调用时，它默认为打印 "Hello, World" 而不是 "Hello, "

> Start by writing a new failing test

首先编写一个新的失败测试

```go
func TestHello(t *testing.T) {

    t.Run("saying hello to people", func(t *testing.T) {
        got := Hello("Chris")
        want := "Hello, Chris"

        if got != want {
            t.Errorf("got '%s' want '%s'", got, want)
        }
    })

    t.Run("say hello world when an empty string is supplied", func(t *testing.T) {
        got := Hello("")
        want := "Hello, World"

        if got != want {
            t.Errorf("got '%s' want '%s'", got, want)
        }
    })

}
```

> Here we are introducing another tool in our testing arsenal, subtests. Sometimes it is useful to group tests around a "thing" and then have subtests describing different scenarios.

在这里，我们将在我们的测试库中引入另一个工具 —— 子测试。有时，对一个 "事情" 进行分组测试是很有用的，然后进行描述不同场景的子测试。

> A benefit of this approach is you can set up shared code that can be used in the other tests.

这种方法的好处是，你可以设置在其他测试中也能够使用的共享代码。

> There is repeated code when we check if the message is what we expect.

当我们检查信息是否符合预期时，会有重复的代码。

> Refactoring is not _just_ for the production code!

重构不 *仅仅* 是为了生产代码！

> It is important that your tests _are clear specifications_ of what the code needs to do.

重要的是，你的测试 *清楚地说明* 了代码需要做什么。

> We can and should refactor our tests.

我们可以并且应该重构我们的测试。

```go
func TestHello(t *testing.T) {

    assertCorrectMessage := func(t *testing.T, got, want string) {
        t.Helper()
        if got != want {
            t.Errorf("got '%s' want '%s'", got, want)
        }
    }

    t.Run("saying hello to people", func(t *testing.T) {
        got := Hello("Chris")
        want := "Hello, Chris"
        assertCorrectMessage(t, got, want)
    })

    t.Run("empty string defaults to 'world'", func(t *testing.T) {
        got := Hello("")
        want := "Hello, World"
        assertCorrectMessage(t, got, want)
    })

}
```

> What have we done here?

我们在这里做了什么？

> We've refactored our assertion into a function. This reduces duplication and improves readability of our tests. In Go you can declare functions inside other functions and assign them to variables. You can then call them, just like normal functions. We need to pass in `t *testing.T` so that we can tell the test code to fail when we need to.

我们将断言重构为函数。这减少了重复，提高了测试的可读性。在 Go 中，你可以在其他函数中声明函数并将它们分配给变量。你可以像普通函数一样调用它们。我们需要传入 `t *testing.T`，这样我们就可以在需要的时候令测试代码失败。

> `t.Helper()` is needed to tell the test suite that this method is a helper. By doing this when it fails the line number reported will be in our _function call_ rather than inside our test helper. This will help other developers track down problems easier. If you still don't understand, comment it out, make a test fail and observe the test output.

`t.Helper()` 需要告诉测试套件这个方法是辅助函数（helper）。通过这样做，当测试失败时所报告的行号将在函数调用中而不是在辅助函数内部。这将帮助其他开发人员更容易地跟踪问题。如果你仍然不理解，请注释掉它，使测试失败并观察测试输出。

> Now that we have a well-written failing test, let's fix the code, using an `if`.

现在我们有了一个写得很好的失败测试，让我们修复代码。

```go
const helloPrefix = "Hello, "

func Hello(name string) string {
    if name == "" {
        name = "World"
    }
    return helloPrefix + name
}
```

> If we run our tests we should see it satisfies the new requirement and we haven't accidentally broken the other functionality.

如果我们运行测试，应该看到它满足了新的要求，并且我们没有意外地破坏其他功能。

> ### Discipline

### 规律

> Let's go over the cycle again

让我们再次回顾一下这个周期

> * Write a test
> * Make the compiler pass
> * Run the test, see that it fails and check the error message is meaningful
> * Write enough code to make the test pass
> * Refactor

- 写一个测试
- 让编译器通过
- 运行测试，查看失败原因并检查错误消息是很有意义的
- 编写足够的代码以使测试通过
- 重构

> On the face of it this may seem tedious but sticking to the feedback loop is important.

从表面上看，这可能看起来很乏味，但坚持反馈循环非常重要。

> Not only does it ensure that you have _relevant tests_, it helps ensure _you design good software_ by refactoring with the safety of tests.

它不仅确保你有 *相关的测试*，还可以确保你通过重构测试的安全性来 *设计优秀的软件*。

> Seeing the test fail is an important check because it also lets you see what the error message looks like. As a developer it can be very hard to work with a codebase when failing tests do not give a clear idea as to what the problem is.

看到测试失败是一个重要的检查手段，因为它还可以让你看到错误信息。作为一名开发人员，如果测试失败时不能清楚地说明问题所在，那么使用这个代码库可能会非常困难。

> By ensuring your tests are _fast_ and setting up your tools so that running tests is simple you can get in to a state of flow when writing your code.

通过确保你的测试 *快速* 并设置你的工具，以便运行测试足够简单，你在编写代码时就可以进入流畅的状态。

> By not writing tests you are committing to manually checking your code by running your software which breaks your state of flow and you won't be saving yourself any time, especially in the long run.

如果不写测试，你承诺通过运行你的软件来手动检查你的代码，这会打破你的流畅状态，而且你任何时候都无法将自己从这种状态中拯救出来，尤其是从长远来看。

> ## Keep going! More requirements

## 继续前进！更多需求

> Goodness me, we have more requirements. We now need to support a second parameter, specifying the language of the greeting. If a language is passed in that we do not recognise, just default to English.

天呐，我们有更多的需求了。我们现在需要支持第二个参数，指定问候的语言。如果一种我们不能识别的语言被传进来，就默认为英语。

> We should be confident that we can use TDD to flesh out this functionality easily!

我们应该确信，我们可以使用 TDD 轻松实现这一功能！

> Write a test for a user passing in Spanish. Add it to the existing suite.

为通过西班牙语的用户编写测试，将其添加到现有套件。

```go
    t.Run("in Spanish", func(t *testing.T) {
        got := Hello("Elodie", "Spanish")
        want := "Hola, Elodie"
        assertCorrectMessage(t, got, want)
    })
```

> Remember not to cheat! _Test first_. When you try and run the test, the compiler _should_ complain because you are calling `Hello` with two arguments rather than one.

记住不要作弊！*先写测试*。当你尝试运行测试时，编译器 *应该* 会出错，因为你用两个参数而不是一个来调用 `Hello`。

```text
./hello_test.go:27:19: too many arguments in call to Hello
    have (string, string)
    want (string)
```

> Fix the compilation problems by adding another string argument to `Hello`

通过向 `Hello` 添加另一个字符串参数来修复编译问题

```go
func Hello(name string, language string) string {
    if name == "" {
        name = "World"
    }
    return helloPrefix + name
}
```

当你尝试再次运行测试时，它会抱怨在其他测试和 `main.go` 中没有传递足够的参数给 `Hello`

```text
./hello.go:15:19: not enough arguments in call to Hello
    have (string)
    want (string, string)
```

> When you try and run the test again it will complain about not passing through enough arguments to `Hello` in your other tests and in `hello.go`

通过传递空字符串来修复它们。现在，除了我们的新场景外，你的所有测试都应该编译并通过

```text
hello_test.go:29: got 'Hola, Elodie' want 'Hello, Elodie'
```

> Fix them by passing through empty strings. Now all your tests should compile _and_ pass, apart from our new scenario

**TODO**: 待翻译

> We can use `if` here to check the language is equal to "Spanish" and if so change the message

这里我们可以使用 `if` 检查语言是否是 "西班牙语"，如果是就修改信息

```go
func Hello(name string, language string) string {
    if name == "" {
        name = "World"
    }

    if language == "Spanish" {
        return "Hola, " + name
    }

    return helloPrefix + name
}
```

> The tests should now pass.

测试现在应该通过了。

> Now it is time to _refactor_. You should see some problems in the code, "magic" strings, some of which are repeated. Try and refactor it yourself, with every change make sure you re-run the tests to make sure your refactoring isn't breaking anything.

现在是 *重构* 的时候了。你应该在代码中看出了一些问题，其中有一些重复的"魔术"字符串。自己尝试重构它，每次更改都要重新运行测试，以确保重构不会破坏任何内容。

```go
const spanish = "Spanish"
const helloPrefix = "Hello, "
const spanishHelloPrefix = "Hola, "

func Hello(name string, language string) string {
    if name == "" {
        name = "World"
    }

    if language == spanish {
        return spanishHelloPrefix + name
    }

    return helloPrefix + name
}
```
> ### French

### 法语

> * Write a test asserting that if you pass in `"French"` you get `"Bonjour, "`
> * See it fail, check the error message is easy to read
> * Do the smallest reasonable change in the code

- 写一个测试，断言如果你传递 `"French"` 你会得到 `"Bonjour, "`
- 看到它失败，检查易读的错误消息
- 在代码中进行最小的合理更改

> You may have written something that looks roughly like this

你可能写了一些看起来大致如此的东西

```go
func Hello(name string, language string) string {
    if name == "" {
        name = "World"
    }

    if language == spanish {
        return spanishHelloPrefix + name
    }

    if language == french {
        return frenchHelloPrefix + name
    }

    return helloPrefix + name
}
```

### `switch`

> When you have lots of `if` statements checking a particular value it is common to use a `switch` statement instead. We can use `switch` to refactor the code to make it easier to read and more extensible if we wish to add more language support later

当你有很多 `if` 语句检查一个特定的值时，通常使用 `switch` 语句来代替。如果我们希望稍后添加更多的语言支持，我们可以使用 `switch` 来重构代码，以便更易于阅读和扩展。

```go
func Hello(name string, language string) string {
    if name == "" {
        name = "World"
    }

    prefix := helloPrefix

    switch language {
    case french:
        prefix = frenchHelloPrefix
    case spanish:
        prefix = spanishHelloPrefix
    }

    return prefix + name
}
```

> Write a test to now include a greeting in the language of your choice and you should see how simple it is to extend our _amazing_ function.

写一个测试，添加一个用你选择的语言写的问候，你应该看到它是多么简单，去扩展我们 *惊人* 的功能。

> ### one...last...refactor?

### 最后一次重构？

> You could argue that maybe our function is getting a little big. The simplest refactor for this would be to extract out some functionality into another function.

你可能会争辩说，也许我们的功能有点大。对此最简单的重构是将一些功能提取到另一个函数中。

```go
func Hello(name string, language string) string {
    if name == "" {
        name = "World"
    }

    return greetingPrefix(language) + name
}

func greetingPrefix(language string) (prefix string) {
    switch language {
    case french:
        prefix = frenchHelloPrefix
    case spanish:
        prefix = spanishHelloPrefix
    default:
        prefix = englishPrefix
    }
    return
}
```

> A few new concepts:

一些新的概念：

> * In our function signature we have made a _named return value_ `(prefix string)`.
> * This will create a variable called `prefix` in your function.
>   * It will be assigned the "zero" value. This depends on the type, for example `int`s are 0 and for strings it is `""`.
>     * You can return whatever it's set to by just calling `return` rather than `return prefix`.
>   * This will display in the Go Doc for your function so it can make the intent of your code clearer.
> * `default` in the switch case will be branched to if none of the other `case` statements match.
> * The function name starts with a lowercase letter. In Go public functions start with a capital letter and private ones start with a lowercase. We don't want the internals of our algorithm to be exposed to the world, so we made this function private.

- 在我们的函数签名中，我们做了一个 *命名返回值*（`prefix string`）。
- 这将在你的函数中创建一个名为 `prefix` 的变量
  - 它将被分配"零"值。这取决于类型，例如 `int` 是 0，对于字符串它是 `""`
    - 你只需调用 `return` 而不是 `return prefix` 即可返回所设置的值。
  - 这将显示在 Go Doc 中，以便你的代码更清晰。
- 如果没有其他 `case` 语句匹配，将会执行 `default` 分支
- 函数名称以小写字母开头。在 Go 中，公共函数以大写字母开始，私有函数以小写字母开头。我们不希望我们算法的内部结构暴露给外部，所以我们将这个功能私有化。

> ## Wrapping up

## 总结

> Who knew you could get so much out of `Hello, world`?

谁会知道你可以从 `Hello, world` 中学到这么多东西呢？

> By now you should have some understanding of:

现在你应该对这些有一些了解。

> ### Some of Go's syntax around

### Go 的一些语法

> * Writing tests
> * Declaring functions, with arguments and return types
> * `if`, `const` and `switch`
> * Declaring variables and constants

- 编写测试
- 用参数和返回类型声明函数
- `if`，`else`，`switch`
- 声明变量和常量

> ### The TDD process and _why_ the steps are important

### TDD 过程以及步骤的重要性

> * _Write a failing test and see it fail_ so we know we have written a _relevant_ test for our requirements and seen that it produces an _easy to understand description of the failure_
> * Writing the smallest amount of code to make it pass so we know we have working software
> * _Then_ refactor, backed with the safety of our tests to ensure we have well-crafted code that is easy to work with

- *编写一个失败的测试，并查看失败信息*，可以看到我们已经为需求写了一个 *相关* 的测试，并且看到它产生了一个 *易于理解的失败描述*
- 编写最少量的代码以使其通过，因此我们知道我们有可工作软件
- *然后* 重构，支持我们测试的安全性，以确保我们拥有易于使用的精心制作的代码

> In our case we've gone from `Hello()` to `Hello("name")`, to `Hello("name", "french")` in small, easy to understand steps.

在我们的例子中，我们通过小巧易懂的步骤从 `Hello()` 到 `Hello("name")`，到 `Hello("name", "french")`。

> This is of course trivial compared to "real world" software but the principles still stand. TDD is a skill that needs practice to develop but by being able to break problems down into smaller components that you can test you will have a much easier time writing software.

与"现实世界"软件相比，这当然是微不足道的，但原则依然成立。TDD 是一门需要通过开发去实践的技能，但通过将问题分解成更小的可测试的组件，编写软件的时间将更加轻松。

---

作者：[Chris James](https://dev.to/quii)
译者：[Donng](https://github.com/Donng)
校对：[polaris1119](https://github.com/polaris1119)，[pityonline](https://github.com/pityonline)

本文由 [GCTT](https://github.com/studygolang/GCTT) 原创编译，[Go 中文网](https://studygolang.com/) 荣誉推出
