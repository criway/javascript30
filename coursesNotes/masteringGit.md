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
## History: Exploring the Past
## History: Fixing Mistakes
## Finding Your Workflow