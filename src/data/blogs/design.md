---
title: "Rethink on web design"
date: "2017-11-07"
category: "blog"
---

Thanks to the experience in La Maison du Bitcoin, I had the opportunity for designing for the whole website and then making it. I find web design work is far more difficult than we think. In this article, I will talk about several topics:

1. Animations and medias.
2. Design for the whole system.
3. Content is the king.

### 1. Animations and medias

What is the biggest difference between poster design and web design? I think it is the animations. Web design is not static, web designers should also think of possible interactions to make the site more dynamic. As for the animations, there are some common practices:

#### 1.1 Interaction (Hover, Scroll...) + Animation.

It is really a common practice for many web. We scroll down to a certain point, and something shows or hides. Please take a look at an example from [Qonto](http://www.qonto.eu/).

img
The idea is simple, use waypoint or use javascript to detect scrolling, and change className of the element to show the animation.

#### 1.2 Interaction (Hover, Scroll...) + Transition

The idea is similar, with transition, we can play with things cool and fun. There are moving (translate), rotating, skewing, scaling in css transition. Please take a look at an example [here](https://codepen.io/AlbertXu/pen/MOyQGo).

The difference of animation and transition is that with animation, we can create more complicated css animations. Animation is combined of a series transition.

Besides animations, **images and videos** are also an important part. It is a common practice to make video or image as the background. Some images and videos are not related to the product, like some people are talking, or a happy girl is sending an text, these kind of media is just for the atmosphere. Some images and videos are related to the product, like some websites for apps will place their videos of apps in a frame of cellphone. Take a look at an example from [frequence-running](http://www.frequence-running.com/).

img

### 2. Design for the whole system

When we do a big projet for a whole website, it is important to consider for the whole website, not just a page. To think for the whole system, we need to consider:

#### 2.1 Color Pallete.

The more color we use, the more complicated to handle it. To me, with around 2 other colors except black, white and grey can work well. **Specific color works as a specific role**, for example, we choose light green always for the button, we choose orange always for the border color. We can use the main color in the logo in other part of the site.

#### 2.2 Text.

**Information has layers. Each layer of information has just one style with a specific font-size, font-weight, color, opacity**. We need to consider that not only in one page, but for all the pages.

As for the font-family, helvatica is a safe font but it is not unique anymore. If you want to give a new look to your web, give it a new and adapted font.

#### 2.3 Style.

This part is the most difficult to me. Once I did the design for one page, section by section, but the feedback from the manager is: **'I feel it is not the same thing'**. He is right, because the ideas of design for this page come from lots of other sites. I looked at a lot of sites, found interesting layouts and use that on my site. The problem of that is that we lose a style for the page, **even if we use the same color and font, we cannot make sure that the style of the site is unique but not mixed**.

Like with colors, the more style of the sites we have, the more complicated to make it look good. Why not choose fewer style, but play it well?

#### 2.4. Responsive.

Responsive doesn't just mean put everything in one column. Yes it is but we can do more about responsive. We always to change the navigation, and sometimes we need to remove some content or the site will be too long.

Above I am talking about design for the whole system, in detail, we need to make both design and developpment **pixel perfect**. Human eyes are really amazing, maybe you don't notice that something is not aligned, but you will feel **uncomfortable** with it. You don't know why until you check it really carefully, and you will find there are problems with detail. **Sometimes it is not the problem with the idea of design, it is the design which is not strictly accomplished**.

### 3. Content is the king.

I am sorry that web design is not just putting text, images and animations together. The more important part is what and how to put on the site, and it requires tons of communication with the manager, with marketing person in the team. Once in a interview, the interviewer gave me a very good question: **after you made the design, who valides it**? I think it is a very good question.

Perhaps you have seen sites like this (yes I have been working like this): on the first section, an big images with big text, 'the world leading XXX', just that; on the second section, the title is : 'why choose us', and below it is a list of advantages; on the third section, the title is 'how it works', and then there is a long long text about how it works; on the fourth section, the title is 'our team', with the photos of CEO, CFO...

Let's try to think as marketing person. What is the most important information to convey? For sure it is **what is our service and how to use that**, but in the example above, we put that in the third part and with just long text! Why do people want to read that?

Let's get rid of all the information which doesn't count, we concentrate on important informations. For example, if it is web tool, we can put the trial box in the first section, for another example, **instead of saying 'why us', we can use a slogan which is more straight and useful**. The content is the king, and you will find very good websites for startups never say things which are not useful. Every text is after consideration.

As web designers, **somehow we are like consultants. We know the common practice for web design, we know how to choose color, but the knowledge is always used for serving people**. Good design is not just technique, it is the collaboration with marking person and programmers.

Good sites don't need to be complicated, but they must be attracting and informations are useful.
