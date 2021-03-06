# How GIT Works

Autor: [Paolo Perrotta](https://app.pluralsight.com/profile/author/paolo-perrotta "PluralSight profile"), 
[course link](https://app.pluralsight.com/library/courses/how-git-works/table-of-contents "How git works")


____
| Porcelain commands | Plumbing commands (advanced) |
|------------------- | ----------------- |
| add, commit, push, pull, branch, merge, checkout... | cat-file, hash-object, count-objects... |
	
## !Do not learn commands, learn the model!
	
Git is a map of key-value parameters. For every value, git calculates a hash by [SHA1](https://en.wikipedia.org/wiki/SHA-1 "SHA1 algorithm") algorithm.
Every piece of content has its own hash: 20 bites in hexadecimal format.
>This will printout in console the hash value for "example value"  
>`echo "example value" | git hash-object --stdin`  
>`38830df35f015f8f0f348a6806d8d765dd46d580` 

What if the hash code collide? Two values with the same hash?, it is unlikely to happen, but it could make a mess in your project in case of collide.  
#### Git is not a map, but a **persistent** map.
When we initialize a git project `git init` git creates a hidden directory *.git/*. Lets have a look:
	
+ **.git/objects/**: this is the object database, the place where git saves all its objects.  
    - **info/**
    - **pack/**
    - **38/**: "38" is the first 2 hexadecimal digits of the hashcode of the objects inside.  
     Inside are files whose names are the remain digits of the hashcode of the object. The content of the files inside is compressed and we cannot open the file as a normal file.
     To see the content of the files we can use the `cat-file` command: 
       >
       `git cat-file`: takes the hash of the object and an argument  
        - `git cat-file <hash> -t`: prints the type of the content.  
          
            >
            `git cat-file -t 38830df35f015f8f0f348a6806d8d765dd46d580`  
            >>
            `blob`
            >>
            >
            
        - `git cat-file <hash> -p` pretty printing. Git unzips the object, removes the header and prints out the content "example value".  
	        
	        >
	        `git cat-file -p 38830df35f015f8f0f348a6806d8d765dd46d580`  
	        >>
            `example value`
            >>
            >
       > 

#### Git is also a "Content Tracker"	
If we have a repository, imagine we want to check a file hashcode and the file is already committed:
>
`git log -1`: shows last commit done    
>>
`commit c7141b524051805b0b2439dd78923fc29e125e46`      
`Author: autorName <autor@email.com>`   
`Date:   Mon Apr 3 13:37:12 2017 +0200`   
>>
>
					
The first 2 digits of the commit "c7" is the folder inside *.git/objects/* where our commit is compressed.
>
`git cat-file -p c7141b524051805b0b2439dd78923fc29e125e46`  
>>
`tree e25e243d1b3a26366b6fd20217ee94725c9e87ba`  
`parent 0c13ed3b382bad2a2751d6b43b4fc961a85f4b2c`  
`author autorName <autor@email.com> 1491219432 +0200`  
`committer autorName <autor@email.com> 1491219432 +0200`  
>>
>
		
This is what a **commit** is, a simple piece of text. Contains all metadata about the commit.  
`tree` is a directory of another file. Again, the first 2 digits "e2" is the folder where the file is. Like commits,
a tree is a tinny piece of text and contains a list of the content inside the directory:  
>
`git cat-file -p e25e243d1b3a26366b6fd20217ee94725c9e87ba`
>>
`100644 blob 7d11a11a074b256077bd6e1b817db27965959690    README.md`  
`040000 tree a2c0f673e3bf12ae9f2ee87dbcb7707183b330dd    coursesNotes`  
`160000 commit 7c9030e456db6064b821dbd878196774cfeb7c92  source`  
>>  
>

The structure is: `<access permissions>	<type> <value>	<filename>`    
>
`git cat-file -p a2c0f673e3bf12ae9f2ee87dbcb7707183b330dd`  
>>
`100644 blob 6b19c6c697851138715d213e96c0740dd951fa74 how_git_works.md`
>>
>
If we do the same with the blob file, then we will get the content of the *how_git_works.md* file. 
		
	
## VERSIONING
We modify a file and commit it.
>`git cat-file -p <new commit Hashcode>`
>>
`tree 10348310cc1bebf0a8e25c9a80097153a6944baf`  
`parent c7141b524051805b0b2439dd78923fc29e125e46`  
`author  autorName <autor@email.com> 1491220803 +0200`  
`committer  autorName <autor@email.com> 1491220803 +0200`  
`<commit message>`
>>
>

Now we have a new parameter called `parent`, this is the previous commit. **Commits are linked**  
If the content of a file or directory haven't changed, then the hashcode will remain the same and **git reuses** it!. Git do not duplicate 
objects that haven't changed. This is one of the reasons why git is efficient.

>`git count-objects` prints out the number of objects and the size of all them together.

Another great point is that git can store file differences instead of the hole file in the "blob" object. 
It means, if we modify just 1 line in a huge file, git will create a new blob object with just the difference (the line modified), not the hole content of the file.

## TAGS (part1)
Tags are labels for the current state of the project, there are two types of tags:
+ **Regular tags**
+ **Annotated tags**, which come with a message. We will talk about this one.

Tags are also objects:

>
`git tag -a firstTag -m "first tag with the git fundamentals course`  
`git tag`
>>
`firstTag`
>>
>

>
`git cat-file -p firstTag`
>>
`object 31a2e5bbf2cf20f3611fc72ec12c30345d20c17a`  
`type commit`  
`tag firstTag`  
`tagger autorName <autor@email.com> 1491225246 +0200`  
`first tag with the git fundamentals course`  
>>
>

The tag is a a commit attached to an object (linked).

So in the git object database (.git/objects/) we have the **Object Model**: 
- Blobs
- Trees
- Commits
- Annotated Tags
	
## BRANCHES
Git normally puts branches inside .git/refs/heads/, 
if we check the content of the current branch (master), there is only one hashcode, which is the hash of the last commit `31a2e5bbf2cf20f3611fc72ec12c30345d20c17a`
>
`git cat-file -p master` or `git cat-file -p 31a2e5bbf2cf20f3611fc72ec12c30345d20c17a`
>>
`tree 10348310cc1bebf0a8e25c9a80097153a6944baf`  
`parent c7141b524051805b0b2439dd78923fc29e125e46`  
`author autorName <autor@email.com> 1491220803 +0200`  
`committer autorName <autor@email.com> 1491220803 +0200`
>>
>

(more notes on git course)
		
Branches are just simple references.
Git knows always in which branch we are, the file *.git/HEAD* contains a line that defines our current branch:  
`ref: refs/heads/master`

#### HEAD is just a reference to a branch

To change our branch we have to make a checkout:`git checkout <branchName>`
- `git checkout` makes 2 things (move head and update working area):  
    1. Git changes its HEAD and link it to <branchName> branch.
    2. Our working area changes to the state where the new branch was pointing at.	

- `git merge` (todo)

#### THREE RULES:
1. The current branch tracks new commits
2. When you make another commit, Git updates your working directory
3. Unreachable objects are **garbage collected**. Git checks for commits that are no longer accessible, it means, no other element points to its hashcode.
		
## REBASING
`git rebase <branchToRebase>`:
1. Rebase looks for the first commit in <branchToRebase> that is also referenced in our current branch, all previous
commits are shared in both branches.
2. Git detach the current branch from the common commit and attach to the <branchToRebase> branch.
3. Now our current branch contains all the commits done while working on it PLUS the commits done in the <branchToRebase> branch.

But this is not 100% true. Objects in git are unmutable, so if we detach a branch and attach to another commit, the content of the branch changes so its hashcode had to change
as well, and this is not possible in git because our current branch still points to the same hashcode(commit).

So what Rebase really does is:
1. Copy commits from current branch till the common commit of both branches and modify its parents, this way, the first commit of the current branch will be copied but the parent will be the last
commit of the <branchToRebase> branch. This means new hashcode = **NEW COMMIT**
2. When all new commits are created, git moves the branch to the copy of the las commit.
3. Git leaves the original commits in its state with no branch referencing them.
#### ¡REBASE CREATES NEW COMMITS!
Here comes the **garbage collector**. Now original commits are almost impossible to reach again. 
Git takes some time to check unreachable objects as commits and blobs and delete them. 

#### Why do we have 2 methods to get the content together?
- **merge**:
    + keeps the project's history
    - merge can result less simple when working with big projects with lots of branches
- **rebase**:
    + project looks more like a single line.
    + refactor history making it looking better
    - the history is not real
    
If we have doubts between merge and rebase, **use merge**.

## TAGS (part2)	
Tags are saved at *.git/refs/tags/* folder.

- **non-annotated** (regular) tags: `git tag <tagName>`  
    If we open any, we could check that a tag is a reference to an object, like branches. If we move this file to the *.git/refs/heads/*,
    we transform the tag into a branch.
- **annotated** tags: `git tag <tagName>`  
    Similar but the file contains the hashCode of the tag object, and that object is a reference to a commit.
    
#### What is the difference between branches and tags?
A tag is like a branch that does not move. So if we make new commits, the branch will point to the latest commit but the tag will remain 
pointing to its original commit.
		
## GIT IS A DISTRIBUTED VERSION CONTROL SYSTEM
When we use "clone" command, git adds a few lines to our configuration file for the repository *.git/config*.
Each git repo, can remember info about other copies which we call **remote**. 
Git defines a default remote repo **origin**, and also a branch called **master** that maps over the master branch of the remote.

>
`git branch --all` shows all branches
>
*.git/refs/remotes/origin/* contains remote branches and also the *HEAD* file that says where is HEAD pointing at.
But sometimes, as an improvement feature of git, only the HEAD file exists and packs all remote branches inside *.git/packed-refs* file. 
This can happen in both the local and remote branches.
>
`git show-ref <branchName>` shows the commit which the branch is pointing at.   
If we write "master", git will printout al branches that contains "master"(local and remote)
>

#### Synchronizing repositories
When we clone, we copy the objects from the origin repository to our local. But this is a bit tricky.
So if we make a new commit in local:
>
`git log -1`
>>
`commit 066deb4f117a22bbe9ec4ddba1669b4fabe831d5`  
`Author: autorName <autor@email.com> `  
`Date:   Tue Apr 4 10:42:11 2017 +0200`  
`<new commit message>`
>>
>

>
`git show-ref master`
>>
`066deb4f117a22bbe9ec4ddba1669b4fabe831d5 refs/heads/master`    
`e42d61410e311f9b2cbfdad40a7323e936a68d76 refs/remotes/origin/master`  
>>
>
We can see that our local branch "master" is pointing to our last commit, but "origin/master" branch is not.

`git push` to update remote repo and then: 
>
`git show-ref master`
>>
`066deb4f117a22bbe9ec4ddba1669b4fabe831d5 refs/heads/master`  
`066deb4f117a22bbe9ec4ddba1669b4fabe831d5 refs/remotes/origin/master`
>>
>

Both branches points now to our last commit.

#### What if we have some local commits and remote branch has different history with new commits? 
if we push, there will be a conflict. There are 2 options to solve this:
1. **not recommended**: `git push -f` *-f* means force!  
We force git to copy our history to the remote, so remote branch will point to our last commit and 
all other commits that remote had, will be removed by the garbage collector.
2. **recommended**: solve conflicts in our local repository before git push.
    1. `git fetch` will copy in our local repo the remote new history and changes the *origin/master* (our local) pointer to the same as remote, so now our local *master* branch will point to a different commit than *origin/master*.
    2. `git merge origin/master` create new object which our local will point to.
    3. `git push` copy our history without conflicts to remote repo and sets te remote branch to the same object as our local object created before with `git merge origin/master`
    
As this procedure is so common (`git fetch` + `git merge origin/master`), there exist a command that makes both: 
>
`git pull`
>
So now we can do just `git pull` + `git push`
					

[autor profile link]: https://app.pluralsight.com/profile/author/paolo-perrotta "PluralSight profile"
[course link]: https://app.pluralsight.com/library/courses/how-git-works/table-of-contents "How git works"
[SHA1]: https://en.wikipedia.org/wiki/SHA-1 "SHA1 algorithm"