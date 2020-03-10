---
index_ignore: true
editLink : false
---
# Submit Your Article

Thanks you so much for considering to help out with the documentation! We welcome contributions from anyone on the internet, and are grateful for even the smallest of improvement!

Please fork, fix, commit and send a pull request for the maintainers to review and merge into the main code base.

## Forking doc
When you "Fork" the [docs project](https://github.com/vechain/docs), GitHub will make a copy of the project that is entirely yours; it lives in your namespace, and you can push to it.

## Getting ready for a pull request
1. Add your article under [tutorials directory](https://github.com/vechain/docs/tree/master/tutorials)
2. Add following contents in your article

:::tip
The contents must be the first thing in the Markdown file and must take the form of valid YAML set between triple-dashed lines and all fields are required . Here is a basic example:
:::

```YAML
---
title: Article Title  
date: 2020-03-06 //YYYY-MM-DD
description: short description //desc showing on tutorial index page
author: VeChain
sidebar: true //set false to disable ,or you can set auto
tags: 
    - Thor
    - Connex 
prev: /tutorials/article-name  //external link is not allow 
next: false  // set false to disable 
---
```

## Making the pull request
- On the GitHub site, go to "Code". Then click the green "Compare and Review" button. Your branch is probably in the "Example Comparisons" list, so click on it. If not, select it for the "compare" branch.
- Make sure you are comparing your new branch to master. It probably won't be, since the front page is the latest release branch, rather than master now. So click the base branch and change it to master.
- Press Create Pull Request button.
- Give a brief title.
- Explain the major changes you are asking to be code reviewed. Often it is useful to open a second tab in your browser where you can look through the diff yourself to remind yourself of all the changes you have made.