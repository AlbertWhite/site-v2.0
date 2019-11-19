---
title: "Rethink on web design"
date: "2017-11-07"
category: "blog"
star: 4
---

Thanks to the experience in La Maison du Bitcoin, I had the opportunity for designing the whole website and then implementing it. In this article, I will talk about several things I have learned about web design during this experience:

1. Animations.
2. Design for the whole system.
3. Content is the king.

### 1. Interactions

What is the biggest difference between poster design and web design? Animations! Web design is not static. Besides content, web designers should also think of the possible interactions to make the site more dynamic. As for the interactions, there are some common practices:

#### 1.1 Interaction (Hover, Scroll...) + Animation.

It is really a common practice: when we scroll down to a certain point or hover on something, something shows or hides. Please take a look at an example from [Qonto](http://www.qonto.eu/).

img
As for implementation, we can use waypoint or use javascript to detect scrolling, and then change className of the element to show the animation.

#### 1.2 Interaction (Hover, Scroll...) + Transition

The idea is similar, with transition, we can play create simple and cool effects. There are moving (translate), rotating, skewing, scaling in css transition. Please take a look at an example [here](https://codepen.io/AlbertXu/pen/MOyQGo).

The difference of animation and transition is that with animation, we can create more complicated css animations. Animation is combined of a series transition.

### 2. Design for the whole system

When we design for a whole website, it is important to consider the consistency between pages. In detail, we should consider:

#### 2.1 Color Pallete.

The more color we use, the more complicated to handle it. Two main colors except black, white and grey can already work well. **Specific color should work as a specific role**, for example, light green always for the button, orange always for the border... It is also important to consider the color from the logo.

#### 2.2 Text.

**Information has layers. Each layer of information should have typical style with a specific font-size, font-weight, color, opacity**.

As for the font-family, the classic fonts like helvatica are safe but not original. If you want to give a new look to your web, give it a new and adapted font.

#### 2.3 Style.

Once, I remember that after I made the design for one page, section by section, my manager gave a feedback: **'I feel it is not the same thing'**. He is right, because the ideas of design come from lots of other sites. The problem of that is that we lose the style for your website, **even if we use the same color and font, we cannot make sure that the style of the site is unique but not mixed**.

Like with colors, in one website, the more style we have, the more complicated to make it look good. Why not choose fewer style, but play it well?

#### 2.4. Responsive.

Responsive doesn't just mean put the same thing in one column. A better way is to think deeperly: can we change the way of navigation? Can we remove less content?

#### 2.5 Pixel Perfect

Human eyes are really amazing, maybe you don't notice that something is not aligned, but you will feel **uncomfortable** with it. **Sometimes it is not the problem with the idea of design, the problem is that the design is not strictly accomplished**.

### 3. Content is the king.

Web design is not just putting text, images and animations together. The more important part is what and how to organize them together, and it requires tons of communication with the manager, with marketing in the team. Once in a interview, the interviewer gave me a very good question: **after you made the design, who valides it**?

Perhaps you have seen sites like this (yes I have been working like this): on the first section, an big images with big text, 'the world leading XXX'; on the second section, the title is : 'why choose us', and below it is a list of advantages; on the third section, the title is 'how it works', and then there is a long long text about how it works; on the fourth section, the title is 'our team', with the photos of CEO, CFO...

Let's try to think as marketing. What is the most important information to convey? It should be **what is our service and how to access it**, but in the example above, we put that in the third part and with just long text! Why do people want to read that?

Let's get rid of all the information which doesn't count, and concentrate on the most important parts. For example, if it is web tool, we can put the trial box in the first section, for another example, **instead of saying 'why us', we can use a slogan which is more straight and useful**. The content is the king. Every word, every line of text should be well considered.

Web designers are not just designers, **they are also like consultants: they have knowledge, and the knowledge should be always used for serving client**. Good design is not just about technique, it is the collaboration between marking and programmers.

Good sites don't need to be complicated, but they must be attracting and informations must be useful.
