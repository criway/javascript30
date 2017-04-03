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
		
		
		
		