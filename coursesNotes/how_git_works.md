GIT
	-porcelain commands: add, commit, push, pull, bvranch, merge, checkout.....
	-Plumbing commands: cat-file, hash-object, count-objects...(advanced)
	
	!Do not learn commands, lear the model!
	
	Git is a map of key-value parameters. For every value, git calculates a hash by SHA1 algorithm.
	every piece of content has its own hash: 20 bites in hexadecimal format.
		-echo "example value" | git hash-object --stdin     //this will printout in console the hash value for "expample value"
		What if the hash code collide?, 2 values with the same hash?, it is unlikely to happen, but it could make a mess in your project in case of collide happens.
	
	Git is not a map, but a PERSISTANT map.
	
	-.git\objects\:	this is the object database. the place where git saves all its objects.
		-info\
		-pack\
		-23\: "23" is the first 2 hexadecimal digits of the hascode of the objects inside. Inside are files whose names are the remain digits of the hash code of the object.
			the content of the files inside, is compressed and we cannot open the file as a normal file. To see the content of the files, there is a command 
				"git cat-file": takes the hash of the object and an argument
					"git cat-file <hash> -t" prints the type of the content.
					"git cat-file <hash> -p" pretty printing. Git unzip the object, removes the header and prints out the content "example value".
	
	Git is also a "Content Tracker"
	
	If we have a repository, imagine we want to check a file hashcode and the file is already commited:
		-"git log -1" shows last commmit done
				C:\Users\Oleon\workspace\javascript30\coursesNotes>git log -1
				commit c7141b524051805b0b2439dd78923fc29e125e46
				Author: criway <cri_way_16@hotmail.com>
				Date:   Mon Apr 3 13:37:12 2017 +0200

					more courses notes
					
	the first 2 digits of the commit "c7" is the folder inside .git\objects\ where our commit is compressed.
		"git cat-file -p c7141b524051805b0b2439dd78923fc29e125e46"
			tree e25e243d1b3a26366b6fd20217ee94725c9e87ba
			parent 0c13ed3b382bad2a2751d6b43b4fc961a85f4b2c
			author criway <cri_way_16@hotmail.com> 1491219432 +0200
			committer criway <cri_way_16@hotmail.com> 1491219432 +0200

			more courses notes
		
		This is just a commit, a simple piece of text. contains all the metaData about the commit, also "tree" property. tree is a directory of another file.
			tree e25e243d1b3a26366b6fd20217ee94725c9e87ba
		again, the first 2 digits is the folder where the file is. Like commits, a tree is a tinny piece of text and contains a list of the content inside the directory
		"git cat-file -p e25e243d1b3a26366b6fd20217ee94725c9e87ba"
				100644 blob 7d11a11a074b256077bd6e1b817db27965959690    README.md
				040000 tree 3a7563ae924010a3bfb2b83dfdf884d41bc87214    ajaxType
				040000 tree 5599d0b2885dd0914ead3af555d49be44cf76e48    arrayCardio
				040000 tree 6107d649f2afa53e8e8548483587830a24768597    arrayCardio2
				040000 tree a2c0f673e3bf12ae9f2ee87dbcb7707183b330dd    coursesNotes
				040000 tree 9cdd34d54a4a76bc9c6dd5a92f7e544e4f9b6b03    cssVariables
				040000 tree 883441350aa2cd7379528f4abb1de363cde0b223    devTools
				040000 tree bc7d07d9d35bc74d76b6ef45cac02827d5d2bca1    drumKit
				040000 tree 12f6109f59181e9f06964ffbc7ee1af93d8149df    flexPanels
				040000 tree 7a8a7eb70067ea6e1740fda3e42b42fc244ef37c    html5Canvas
				040000 tree 6c224719a05d39646187a549aadd21e8049eb598    html5VideoPlayer
				040000 tree fc2855140eb16ab9bcd8e5f5686fc0e0f6680f65    jsClock
				040000 tree 6014cd201bc48020b51ddd3991d7cfd97ee0234e    keySequenceDetection
				160000 commit 7c9030e456db6064b821dbd878196774cfeb7c92  source
				
		The structure is: <access permissions>	<type> <value>	<filename>
			"git cat-file -p a2c0f673e3bf12ae9f2ee87dbcb7707183b330dd"
				100644 blob b6fefcbf98cd00f63c6261044a5f01cf5d06d3eb    angularjs_directive_fundamentals
				100644 blob 6b19c6c697851138715d213e96c0740dd951fa74    how_git_works.md
				100644 blob 23678e4f9fdb95039f4b7cf7f36aac82d4cdc7d1    javascript_best_practices.md
				
			"git cat-file -p a2c0f673e3bf12ae9f2ee87dbcb7707183b330dd" //prints this file with the content it had in the last commit.
		
	
	-VERSIONING
		we modify a file and commit it.
			"git cat-file -p <new commit Hashcode>"
					tree 10348310cc1bebf0a8e25c9a80097153a6944baf
					parent c7141b524051805b0b2439dd78923fc29e125e46
					author criway <cri_way_16@hotmail.com> 1491220803 +0200
					committer criway <cri_way_16@hotmail.com> 1491220803 +0200

						more notes on git course
		Now we have a new parameter called "parent", is the first commit. Commits are linked
<<<<<<< HEAD
		
		If the content of a file or directory havent changed, then the Hashcode will remain the same and git reuse it!, git do not duplicate 
		objects that haven't changed. This is one of the reasons why git is efficient.
	
		"git count-objects" prints out the number of objects and the size of all them together
		
		Another great point is that git can store file diferences instead of the hole file in the "blob" object. Example, if we just
		modify 1 line in a huge file, git will create a new blob object with just the difference(the line modified), not the hole content of the file.
	
	-TAGS:
		tags is like a label for the current state of the project:
			regular tags
			annotated tags: come with a message
		tags are also objects like commits
			"git tag -a firstTag -m "first tag with the git fundamentals course" creates a tag
			"git tag"
					firstTag
			"git cat-file -p firstTag"
					object 31a2e5bbf2cf20f3611fc72ec12c30345d20c17a
					type commit
					tag firstTag
					tagger criway <cri_way_16@hotmail.com> 1491225246 +0200

					first tag with the git fundamentals course
		The tag is a a commit attached to an object (linked)
		
	So in the git object database (.git\objects\) we have: 
		-Blobs
		-Trees
		-Commits
		-Annotated Tags
	This is the Git Object Model
	
-BRANCHES:
	Git normally puts branches inside .git\refs\heads\
	if we check the content of the current branch(master), there is only one hashcode, which is the hash of the last commit:
		31a2e5bbf2cf20f3611fc72ec12c30345d20c17a
	"git cat-file -p master" / "git cat-file -p 31a2e5bbf2cf20f3611fc72ec12c30345d20c17a"
			tree 10348310cc1bebf0a8e25c9a80097153a6944baf
			parent c7141b524051805b0b2439dd78923fc29e125e46
			author criway <cri_way_16@hotmail.com> 1491220803 +0200	
			committer criway <cri_way_16@hotmail.com> 1491220803 +0200	
			
			more notes on git course
		
=======
		
		If the content of a file or directory havent changed, then the Hashcode will remain the same and git reuse it!, git do not duplicate 
		objects that haven't changed. This is one of the reasons why git is efficient.
	
		"git count-objects" prints out the number of objects and the size of all them together
		
		Another great point is that git can store file diferences instead of the hole file in the "blob" object. Example, if we just
		modify 1 line in a huge file, git will create a new blob object with just the difference(the line modified), not the hole content of the file.
	
	-TAGS:
		tags is like a label for the current state of the project:
			regular tags
			annotated tags: come with a message
		tags are also objects like commits
			"git tag -a firstTag -m "first tag with the git fundamentals course" creates a tag
			"git tag"
					firstTag
			"git cat-file -p firstTag"
					object 31a2e5bbf2cf20f3611fc72ec12c30345d20c17a
					type commit
					tag firstTag
					tagger criway <cri_way_16@hotmail.com> 1491225246 +0200

					first tag with the git fundamentals course
		The tag is a a commit attached to an object (linked)
		
	So in the git object database (.git\objects\) we have: 
		-Blobs
		-Trees
		-Commits
		-Annotated Tags
	This is the Git Object Model
	
-BRANCHES:
	Git normally puts branches inside .git\refs\heads\
	if we check the content of the current branch(master), there is only one hashcode, which is the hash of the last commit:
		31a2e5bbf2cf20f3611fc72ec12c30345d20c17a
	"git cat-file -p master" / "git cat-file -p 31a2e5bbf2cf20f3611fc72ec12c30345d20c17a"
			tree 10348310cc1bebf0a8e25c9a80097153a6944baf
			parent c7141b524051805b0b2439dd78923fc29e125e46
			author criway <cri_way_16@hotmail.com> 1491220803 +0200	
			committer criway <cri_way_16@hotmail.com> 1491220803 +0200	
			
			more notes on git course
		
	Branches are just simple references.
	
	Git knows always in which branch i am, the file .git\HEAD\ contains a line that defines our current branch:
		"ref: refs/heads/master"
	So HEAD is just a refference to a branch.
	
	To change our branch we have to make a checkout:
		"git checkout <branchName>"
		-checkout makes 2 things (move head and update working area):
			1. git changes its head to point this branch.
			2. Our working area changes to the state where the new branch was pointing.	
	"git merge"		
	
	THREE RULES:
		1. The current branch tracks new commits
		2. When you move to another commit, Git updates your working directory
		3. Unreachable objects are garbage collected. Git checks for commits that are no longer accessible, no other element points to its hashCode.
		
-REBASING
	Rebase "git rebase <branchToRebase>":
	1. Rebase loocks for the first commit in <branchToRebase> that is also refferenced in our current branch, all previous
	commits are shared in both branches.
	2. Then git detach the current branch from the common commit and attach to the <branchToRebase> branch.
	3. Now our current branch contains all the commits done while working on it PLUS the commits done in the <branchToRebase> branch.
	
	But this is not 100% true. Objects in git are inmmutables, so if we detach a branch and attach to another commit, the content of the branch changes so its hashcode had to change
	as well, and this is not possible in git because our current branch still points to the same hashcode(commit)
	
	So what Rebase realy does is:
	1. copy commits from current branch till the common commit and modify its parets, this way, the first commit of the current branch will be copied but the parent will be the last
	commit of the <branchToRebase> branch. This means new hashcode so NEW COMMIT
	2. when all new commits are created, git moves the branch to the copy of the las commit.
	3. Git leaves the original commits in its state with no branchs refferencing them.
	
	---------->¡REBASE CREATES NEW COMMITS!<-----------
	-GARBAGE COLLECTOR
		Original commits are almost impossible to reach again. 
		Git takes some time to check unreachable objects as commits and blobs and delete them. 
	
	Why do we have 2 methods to get the content together?
		->merge:
			+keeps the project's history
			-merge can result less simple when working with big projects and lot of branches
		->rebase:
			+project looks more like a single line.
			+rebases refactor history making it looking better
			-the history is not real
		
		If we have doubts between merge and rebase, use merge.

-TAGS	
	-annotated tags
	-non-annotated tags or lightweight tags
	
	Tags are saved at .git\refs\tags
	
	->non-annotated tags: "git tag <tagName>"
		if we open any, we could check that a tag is a refference to an object, like a branch. If we move this file to the .git\refs\heads\
		we transform the tag into a branch.
	->annotated tags: "git tag <tagName>"
		similar but the file contains the hashCode of the tag object, and that object is a refference to a commit.
		
	What is the difference between branches and tags?
		A tag is like a branch that does not move. So if we make new commits, the branch will point to the latest commit but the tag will remain 
		pointing to its original commit.
		
-GIT IS A DISTRIBUTED VERSION CONTROL SYSTEM
	When we use "clone" command, git adds a few lines to our configuration repo .git\config
	Each git repo, can remember info about other copies which we call "remote". 
	Git defines a default remote repo "origin", and also a branch called "master" that maps over the master branch of the remote.
	"git branch --all" shows all branches
	
	.git\refs\remotes\origin\ contains remote branches and also the HEAD file that sais where is HEAD pointing. But sometimes, as an improve feature of git, 
	only the HEAD file exists and packs all remote branches at .git\packed-refs. This can happen in both the local and remote branches.
	"git show-ref <branchName>" shows the commit the branch is pointing at. If we write "master", git will printout al branches that contains "master"(local and remote)
	
	-Synchronizing Repos
		When we clone, we copy the objects from the origin repo to the local. But this is a bit tricky.
		So if we make a new commit in local:
			"git log -1":
				commit 066deb4f117a22bbe9ec4ddba1669b4fabe831d5
				Author: criway <cri_way_16@hotmail.com>
				Date:   Tue Apr 4 10:42:11 2017 +0200

						synchronizing repos
			"git show-ref master"
				066deb4f117a22bbe9ec4ddba1669b4fabe831d5 refs/heads/master
				e42d61410e311f9b2cbfdad40a7323e936a68d76 refs/remotes/origin/master	
		We can see that our local branch "master" is pointing to our last commit, but "origin/master" branch is not.
		
		"git push" to update remote repo and then "git show-ref master":
				066deb4f117a22bbe9ec4ddba1669b4fabe831d5 refs/heads/master
				066deb4f117a22bbe9ec4ddba1669b4fabe831d5 refs/remotes/origin/master
		Both branches points to our last commit now.
		
		But, what if we have some local commits and remote branch has different history with new commit? 
			if we push, there will be a conflict. There are 2 options to solve this:
				1. NOT RECOMENDED->"git push -f" f means force!, we force git to copy our history to the remote, so remote branch will point to our last commit and 
				all other commits that remote had, will be or garbage collector.
				2. RECOMENDED-> solve conflicts in our local repository before git push.
					2_1. "git fetch" will copy in our local repo the remote new history and changes the origin/master pointer to the same as remote, so our local master branch will point to a different commit than origin/master.
					2_2. "git merge origin/master" create new object which our local will point at
					2_3. "git push" copy our history without conflicts to remote repo and sets te remote branch to the same object as our local object created on "git merge origin/master"
				
					As this procedure is so common ("git fetch" + "git merge origin/master"), there exist a command that makes both: "git pull"
					So now we can just "git pull" + "git push"
					
		