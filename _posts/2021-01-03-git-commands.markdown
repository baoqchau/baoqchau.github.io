---
layout: post
title:  "Git commands I use at work"
date:   2021-01-03 20:26:00 -0800
tags: programming educated review
categories: jekyll update
---

Git is a popular version control software used by a lot of tech companies (Yes, there are still companies using [SVN](https://subversion.apache.org/)).
If you don't know Git, here's a quick [tutorial](https://www.atlassian.com/git) to get started.

In this post, I will show you the Git commands I use everyday at work. In fact, this is the same material that I teach
new hires when they join my company. Let's get started.

# 1. `git commit --amend [--no-edit]`
This is an option of the regular `git commit` command. Let's say that you just commited some changes like this
```
commit 3b867ef53b9027d3125ecb84437827b5e4d476f1
Author: Bao Chau <chauquocbao0907@gmail.com>
Date:   Sun Jan 3 20:55:15 2021 -0800

    add new blog post
```

And then, you remember that you forget to add another file to the same commit. Maybe you want to add more details to the git commit.
Either way, you want to make some change to *the latest git commit*. In that case, you can use the command `git commit --amend`.

After executing that command, you should see a text editor pops up and ask you to update the commit. If you use vi or vim like me, you should see 
something like this on your terminal:

```
add new blog post               
                                                                                  
# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit. 
#                                                                              
# Date:      Sun Jan 3 20:55:15 2021 -0800
```
You can now update the commit message, save it and Git will update your commit with the new message. 

If you'd like to add new files in the commit, make sure you `git add` your files first. If then you don't want to change your commit
message, you can add the option `--no-edit` (`git commit --amend --no-edit`) and Git will update your latest commit with the new files.

Pretty convenient, right? I use this quite often at work.

# 2. `git commit --fixup`
This is another option of `git commit` command that I use heavily in my work. Here's a popular scenario I run into at work:

I created a PR with 10 commits. My teammate reviewed it, gave some feedbacks and I went back and updated my PR. However, most of
the time I will only want to update the code, not the commit itself. As a result, I want a quick way to update the code in my commit
without changing the commit message. `Fixup` allows me to do that work flawlessly.

So how can you use it? Let's say you have 4 commits like this:
```bash
commit 2e8a77a2b45a75576f6eecde9772be7fade10e15 (HEAD -> addGitCommandBlogpost)
Author: Bao Chau <chauquocbao0907@gmail.com>
Date:   Tue Jan 5 21:46:37 2021 -0800

    commit 4

commit e2b138c242fb61b5e420f5f09b5d9ab02ed33d2e
Author: Bao Chau <chauquocbao0907@gmail.com>
Date:   Tue Jan 5 21:46:26 2021 -0800

    commit 3

commit bd502f8eea7b4bc29ec37295da81ded81c0e48c9
Author: Bao Chau <chauquocbao0907@gmail.com>
Date:   Tue Jan 5 21:46:14 2021 -0800

    commit 2

commit 716edf4b19ec238236ad59ed8a355cce952c7412
Author: Bao Chau <chauquocbao0907@gmail.com>
Date:   Tue Jan 5 21:46:04 2021 -0800

    commit 1
```
Now let's say you want to add `hello.txt` to commit 1 and `world.txt` to commit 3. 
For commit 1, first you need to run `git add hello.txt`.

And then you can run **`git commit --fixup <SHA of the commit you want to fixup>`**. In this case, it's `716edf4b19ec2`.

Note: You don't need the whole SHA for the fixup. The first 10 characters should be good enough.

So if you do everything's correctly, here's what you should see:
```bash
bao@bao-linux:~/code/baoqchau.github.io$ git commit --fixup 716edf4b19ec2
[addGitCommandBlogpost f9ff455] fixup! commit 1
 1 file changed, 1 insertion(+)
 create mode 100644 hello.txt
 ```
 After that, you can follow similar steps for commit 3.
 
 So now you have 2 `fixup` commits, you will want to find a way to "squash" them into the commits you'd like. You can do
 that by interactive rebasing, or `git rebase -i` command. In this case, the command we use is `git rebase -i --autosquash <SHA of commit you want to rebase from>`.

 **Quick tips**: For rebasing after fixup, the fastest way I have always done is copying the SHA of the commit you'd like to fixup
 that's furthest from the top when you do `git log`, and add a `~` next to it, i.e go one commit below that.

  For our example, we want to fixup commit 1 and commit 3, and since commit 1 is furthest, we will copy its SHA and add a `~`, or 
  the command we will use is `git rebase -i --autosquash 716edf4b19ec2~`.

  If you do it correctly, you should see this interactive view in your text editor:
  ```bash
  pick 716edf4 commit 1                                                            
  pick f9ff455 fixup! commit 1                                                     
  pick bd502f8 commit 2                                                            
  pick e2b138c commit 3                                                            
  pick f7fcd1d fixup! commit 3   
  pick 2e8a77a commit 4                                                            

  # Rebase 25a847b..9558f48 onto 25a847b (7 commands)                              
  #                                                                                
  # Commands:                                                                      
  # p, pick = use commit                                                           
  # r, reword = use commit, but edit the commit message                            
  # e, edit = use commit, but stop for amending                                    
  # s, squash = use commit, but meld into previous commit                          
  # f, fixup = like "squash", but discard this commit's log message                
  # x, exec = run command (the rest of the line) using shell                       
  # d, drop = remove commit                                                        
  #                                                                                
  # These lines can be re-ordered; they are executed from top to bottom.           
  #                                                                                
  # If you remove a line here THAT COMMIT WILL BE LOST.                            
  #                                                                                
  # However, if you remove everything, the rebase will be aborted.                 
  #                                                                                
  # Note that empty commits are commented out
  ```
  As you can see, Git know to reorder your commits so that the fixup commit will be below the one that needs to be fixup-ed. If you check it
  and everything's good, you can save the file and Git will apply the change. This process can save you a lot of time!! 

  Through this tutorial, I hope it will help you do your work faster. If you'd like more useful tips I learn at work, let me know by sending me an email :)