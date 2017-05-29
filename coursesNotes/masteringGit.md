# Mastering Git

Autor: [Paolo Perrotta](https://app.pluralsight.com/profile/author/paolo-perrotta "PluralSight profile"), 
[course link](https://app.pluralsight.com/library/courses/how-git-works/table-of-contents "How git works")
____

## The Four Areas: Introduction
We will focus on the Git *WAY OF THINKING*

### The Four Areas
Git has 4 separate storage areas.

- Working Area: place where you keep your current files and folders
- Index: where you put your files before commit
- Repository: contains the entire history of the project, when you commit staff, it comes here
- Stash: temporary storage area.

To fully understand git commands, we must ask ourselves this two important questions:
- How does this command move information across the Four Areas?
- How does ths command change the Repository?

For now, we will forget about Stash area.

### The Working Area
[course link](https://app.pluralsight.com/library/courses/how-git-works/table-of-contents "How git works")
The project's directory of our file system. Git will avoid data in the working area, but not always. Some git commands exist that can modify the files.
### The Repository
[course link](https://app.pluralsight.com/library/courses/how-git-works/table-of-contents "How git works")
Most important is the *.git/objects/* folder.  
Objects:
- **blobs**: represent the content of the file at some point of the project history
- **tree**: represent folder in the repository
- **commit**: represent a snapshot of your working area at some points in your project's history. Commits can share same objects.
Each commit points to its parent commit in the history. Reference to commit are called branches, are the entry point to a history of commits. 
We can have multiple branches. There is a special pointer called **HEAD**, can be only one and is usually pointing to a branch, so HEAD is indirectly pointing to a commit, 
this commit is called **current commit**.
Sometimes commits are unreachable and git will delete those commits by a **GARBAGE COLLECTOR**.

All objects are unmutable. Are linked together in the structure that represents the projects history. 

### The Index
Unique to git. Git is the unique **versioning system** that allow us to modify the Index directly.

We can visualize the Index as something between the Working Area and Repository. Index area is used to move data from Working Area to Repository, 
that is why sometimes Index Area is also called the **Staging Area**. You stage your changes by adding them into the index and then you commit the changes from the index to the repository.

If we look at *.git/* folder, there is a binary file called **index**.

When we type `git status` and returns `nothing to commit...`, does not mean that Index is empty, in fact, index contains the same as our Working Area.

>
`git diff` returns the difference between two areas. With no arguments will output difference between Working area and index.  
`git diff --cached` returns the difference between index and Repository
>

## The Four Areas: Basic Workflow
### Moving Data to the Right
*Working Area*->*Index*->*Repository*

When we modify some code, the file is ready to be staged. 
>
`git add <fileName>` will copy the file from working area to the index. Now `git diff` will output nothing. But `git diff --cached` will printout the difference between index and Repository.
>

>
`git commit -m "<message>"` will copy the file from the index to the repository (apart of creating a new commit etc...). Now there is no difference between areas.  
>

So:
- `commit` moves data and also change the repository.
- `add` moves data and does not touch the repository.

### Moving Data to the Left
- `checkout` in the Repository, moves the *HEAD* reference, generally to another branch, so it changes the *current commit*, so we are looking at different data in the repository, but don't modify data in the repo. 
Also takes data from the new current commit and copies that data to the Working Area and to Index. So it changes the repo at first, and then moves data.

### Removing Files
We have done some modifications and staged the file, so we have the file modified into both the Working Area and Index. But what if we change our mind and now 
we want to go back to the last state?, remove the file from the Index area but not from the Working Area?.
- `git rm <modifiedFile>` Does something else than removing the file from the Index area. If we just sent this command, git has a security message.
   Without any argument, `rm` will delete from both the Working Area and Index
   
>
`error: the following file has changes staged in the index:`
`<modifiedFile`
`use --cached to keep the file, or -f to force removal`
- `git rm <modifiedFile> -f` force to remove file from the Working Area and Index
- `git rm <modifiedFile> --cache` remove from the index only. We unstage the file.
>

So `add` and `rm` are not opposite. The first one modify the Index while `rm` modify both the Working Area and the Index.

### Renaming Files
Moving and renaming is actually the same.
1. `mv <oldFileName> <newFileName>` change the file in the Working Area. 
2. `git status` tell us that there is a file at the Index that is not in the Working Area (deleted),
 and also says that there is a file in the Working area that is not at Index (new file). 
 
So: 
1. `git add <newFileName>` copy the file into the Index
2. `git add <oldFileName>` copy a non-existing file into the Index, so override the *oldFileName* with no file, "delete" it.  
Now we have the same data in Working Area and Index.
3. `git status` prints `renamed: <oldFileName> -> <newFileName>`. Git understands our operation. 
It compares the content of the file in the Working Area and Index with the content of the file in the repository. 
And as the content is the same, files must be renamed.


It is recommended to separate operations into commits. First move the file and commit and then modify the content of the file and commit.
 
- `git mv <oldFileName> <newFileName>` **move** and **stage** the file automatically:

## The Four Areas: git reset
Is used to reset the repository state to a previous state in the history.

- `git reset` One of the most useful command but difficult to understand.  
To understand `reset`, we need to understand the three main Areas and Git's branches.  
`reset` does different things in different contexts.

| Commands that move Branches |
| :---: |
| commit, merge, rebase, pull ... |

None of them is specialized operation to move a branch.

What reset does:
1. Moves a branch: generally the current branch (the HEAD is pointing to). Reset does not move *HEAD*, this still keeps pointing to the branch,
 but the branch is moved to point at specific commit.  
 But this is just inside the Repository, the confusing part is what reset does to the other areas.
 
2. Moves data across the areas:
    - `--hard` option: copies data from the new current commit to both the Working Area and Index
    - `--mixed` option: copies data from the new current commit to the Index. Default option.
    - `--soft` option: just move the branch and copy nothing.

- `git reset HEAD`, unstage all changes, copy data form repository where HEAD is pointing at into the Index area.
- `git reset --hard HEAD`, unstage all changes and removes changes in Working Area. We must take care when using it.  
**One of the easiest way to lose data**.

## The Four Areas: More Tools
### The Stash
There is only one command that affects Stash Area. We decide what happens to this area, so we have to be specific.

We can understand this area as a **backup** area. Imagine we are working on something and before finish it, another important issue happens. 
We can leave our current changes in a save place and delete them from the Working Area so we can work on the new important issue without dealing with changes from the old issue.

- `git stash`
    - `git stash --include-untracked`: 
        1. Git takes all data from working Area and Index that is not in the current commit in the repository.
        2. Copy all that data into the Stash Area.
        3. Checkout the current commit.
    - `git stash list`: prints the content of the Stash Area  
    
        >`stash@{id}: WIP on <branch>: <commitRef> <message>`
    - `git stash apply` to move data from Stash into the Working Area and Index. We can specify the *id* of the Stash content we want to apply.
    - `git stash clear` clear the Stash Area


#### NOTE: revert a commit in remote:
1. `git stash --include-untracked` to save (if you want) in Stash your local modifications  
2. checkout the branch
3. `git reset <commitHashcode>` with the option `--hard` `--mixed` `--soft` you want
4. `git push -f` to force
5. `git stash apply <id>` to recover code from Stash
6. `git stash clear` to clear Stash area (if you want)

### Solve Conflicts
Conflicts occurs when git does not know how to apply changes when there are two or more modifications in the same part of the code.

When it happens, git modify the conflict file to give us enough information to solve the conflict ourselves.
>`some code...`  
`<<<<<<< HEAD`  
`changes from <currentBranch>`  
`=======`  
`changes from <otherBranchName>`  
`>>>>>>> <otherBranchName>`  
>
How does Git know there is a conflict?
> The merge command creates a few files into *.git/* (MERGE_HEAD, MERGE_MSG, MERGE_MODE) that signal that there is an operation being done.
This files also contains information about what is being merged. We normally don´t realize about this files because git use to merge without conflicts.
>

At this point we can either cancel the merge or solve the conflicts. Lets solve it.

As said before, we have our conflict file modified by git, so we can easily edit it as we want to choose the final code. After modifying,
we must tell Git that conflicts are solved, git can not know it by its own. We can do it by staging the conflict files, it means, copying the file
into the Index Area.

`git add <conflictFile>`

Now we just have to finish the merge

`git commit`

### Working with Paths

- `git reset HEAD <file>` to unstage only one file. But remember, by default `reset` implements the `--mixed` option, so copy the file from the 
 repository into the Index but not to the Working Area.
 
What if we want to revert only one file to the remote state? 
- `git reset --hard HEAD <file>`
    >`fatal: Cannot do hard reset with paths.`  
    
    Git does not allow us.
- `git checkout HEAD <file>` normally checkout moves the HEAD ref in the repository usually to a branch and the copy all the files from the repo to the Working Area and Index.
 In this case checkout will just copy the file to both areas without moving the HEAD reference. This recover the file and destroy all changes done to the file.
 There is no possibility to recover modifications.   
 So **use with care!**.

### Git is a Toolbox
As we can see, there is not an unique or a specific command to implement actions. We can choose different ways to reach the same objective. 

The knowledge of the 4 areas Git has, and how Git manage them is extremely important to fully understand Git. 
Before typing commands, a good practice is to **stop and think**,  "ok, I want to do this and I can get it by moving this file to this area,
is there any command for this?" and so on.

## History: Exploring the Past
### A commit with Any Other Name
There are many ways to refer to a commit.
- `git log` shows the commits history, but this list is not rally easy to read and follow history. There are some options to make it simpler.
    - `git log --graph --decorate --oneline` 
        - `git log --graph` gives a nice graph structure
        - `git log --decorate` shows the position references like branches and hEAD
        - `git log --oneline` formats the log so that each commit takes only one line

- `git show <commit>` shows data information about the commit. We can refer to the commit with the first 6 or 7 digits of its hashcode. 
Another way to refer the commit is to write the name of the reference that is pointing to the commit. For example if we want to see the last commit in the repo,
the branch and the HEAD refers to it, so we can just type `git show <branchName>` or `git show HEAD`.

But what if we want to refer to other previous commits? there is no reference pointing at it: `^`
- `^` means the parent commit, so if we type `git show HEAD^` we could see the second last commit (parent of the last one).
 We can use it recursively: `git show HEAD^^`...
- `~<number>` to avoid `^^^^^^` we can just type `git show HEAD~6`

This syntax is fine when commits have just one parent, but it breaks down when it has multiple parents.
- `git show HEAD~2^2` this will show the second parent of second commit from HEAD 

There are other ways to show commits, for example `git show HEAD@{"1 month ago"}` will show the commit which HEAD was pointing 1 month ago.

### History Forensics

- `git blame <file>` where the lines in a file come from. Shows line by line details of when the line was created.
- `git diff HEAD HEAD~2` shows the difference between 2 commits. Can be used also to show difference between two branches.

### Browsing the log
`git log` is the most useful command to explore history. Is the most complex command with lot of options.
- `git log --grep <word>` will filter commits which contains the word
- `git log -<x>` will show the last x commits

You can see more about `log` [here](https://git-scm.com/docs/git-log)

## History: Fixing Mistakes
This tool to fix or modify history are really useful in emergency cases.  

### The Golden Rule
**Never change shared history**, we should only modify local history.

### Changing the Latest Commit
- `git commit --amend` don't create a new commit, instead we amend the last commit. But remember that objects in Git are unmutable
  so git don't modify the last commit.  
What Git does inside is:
    1. Make a new commit with both the last commit and new changes
    2. Move branch and HEAD to point this new commit
    3. The last commit will be deleted by the Garbage Collector

### Interactive Rebases
What if we want to "modify" commits in the past, not the last one?

- `git rebase --interactive` or `git rebase -i`: With this option, `rebase` behaves much different. Now change History.
    - `git rebase -i <commitReference>` change History from *commitReference* **excluding** it. 
    Sows us a text editor to do a rebase, there is a list of commits ordered from the least recent to the most recent.
    If we just accept, the history will remains equal.
    We are **modifying a program**, we can reorder commits and change instructions... When we accept, the program will 
    be executed and will stop on each commit so we can implement our modifications.
        >`<instruction> <commitRef> <commitMessage>`  
        >>- **Instruction** tells what to do with the commit. 
        There is also an explanation of different instructions (after the list of commits) that we can apply to commit.  
        
        | Instruction | definition |  
        | :---: | --- |
        | pick | use commit |
        | reword | use commit, but edit the commit message |
        | edit | use commit, but stop for amending |
        | squash | use commit, but meld into previous commit |
        | fixup | like "squash", but discard this commit's log message |
        | exec | run command (the rest of the line) using shell |
        | drop | remove commit |
        When executing the program, git tells some instructions so you will know every moment how to continue.
        
 This is a huuuuge powerful tool. Imagine that we are continuously committing in our local with lots of non-sens messages,
 this will looks pretty weird when trying to follow the history graph. So before sharing our local changes, we should have a review
 of our commits and message so the repository will be much more clear. We can see this process as a **refactor**.
 
### The Reflog
Git will keep unreachable commits for a while before send them to garbage collector.  
What if we want to recover one of those objects?

Every time a reference moves in the repo, git logs that move and save it inside the **Referencelog**
- `git reflog <referenceName>` (Example, HEAD) will show a list of different operations we have done with it, at least those
that haven't been sent to garbage collector yet.

We can put a branch on a lost commit so this commit will be reachable.

### Reverting Commits
- `git revert <commitRef>` git will create a new commit with exactly the opposite changes than the *commitRef*.
We must be careful with possible conflicts.  
**`revert` can not revert the structure!** Be careful when revert merges. This is not an "undo".

## Finding Your Workflow