---
title: "From problem to decision: how to choose a technical solution"
date: "2023-01-07"
category: "blog"
star: 5
---

It's a small article about a recent learning on how to choose a technical solution, which works well in my life when I take non technical solutions too.

To resume: when there are multiple solutions to choose, we should not think of those solutions directly, but to start with the **problems**, and then define our **goals**, and lastly, choose the best **solution**. 

### The story behind 

During two weeks I have been working on a [technical design record](https://adr.github.io/)(DR). However, the objective in the DR was not that clear since the beginning.

We had worked on 3 complicated technical solutions on this DR. In the end, when we presented to stakeholders, we have received many questions: what do you want to achieve ? why not doing this instead of doing that ? The meeting had taken 2 hours but we didn't reach any agreement. 

It was a pity that we had worked on the DR so much without really thinking of the real problem and our real goal. Without acknowledging our destination, we will never get into the right way no matter how far we have gone.   

Next day, our team worked on another workshop to redefine the scope. This time we achieved amazing work in 2 hours: we had well defined what we want. We haven't been able to do it during last 2 weeks !

Here is how we do it:

### Thinking step by step

#### 1. Define problems

What are the problems ?
It's not only just one sentence to explain what you "feel", but we should be able to explain it with reasons, for whom.
For example, it's less good to say:

```
Our problem is we lack a tool to track web performance.
```

than to say:

```
Our problems are: 
- we lack a tool to track web performance
- we cannot receive an alert when the web performance degrades.
```

See ? Once we really get into the problems, we know better what we want in the step !

### 2. Refine the goal

Once we know our problem, it's time to define our goal.

Sometimes a goal can be a mapping of our problems, but in fact, if we well define our goal, a goal can be simpler than problems. We might have 5 problems, but the only one goal can cover all those problems.

For example, the goals for the above problem will be:

```
A system to visualize the web performance, and send alert onces performance degrades.
```

### 3. Elaborate the ideal Solution

It's time to find the solution.

If we repeat the goal as the final solution, then we are not really working on it.

In fact, when we work on solutions, it's time to elaborate and brainstorm as many possibilities as possible, and finally drop many of them. Let's still take the above goal as an example:

Since our goal is : 
```
A system to visualize the web performance, and send alert once performance degrades.`
```

Then, we might want to consider:

```
- Do we want to track which web pages ? Only the important SEO one or really every page ? 

- Do we want to track which metrics ? Core web vitals or other metrics too ?

- How much time do we want to keep those performance data ? 1 month ? 6 months ? 1 year ?

- The alert should be sent by mail ? or by sms ? or a slack message ?

- Do we want to track the lighthouse performance score too ? or only the web vitals ?

- Do we want to track on desktop and mobile ? or only mobile ?

- ...
```

Do you see ? There are so many things to consider when we shape our ideal technical solution, and each answer to the above question could hugely impact our final decision ! And this is the time to decide **what do we not want** too, it's even more imporant then what do we want.

### 4. Work on the technical design record

Since we have elaborated our ideal technical solution, finally it's time to write technical design record ! It will be more accurate to choose your best technical decision only when you really know what you want.


Hope this small article is useful to you !
