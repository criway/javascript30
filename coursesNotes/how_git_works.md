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