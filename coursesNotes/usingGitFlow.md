# Using Gitflow
Autor: [Kevin Jones](https://app.pluralsight.com/profile/author/kevin-jones "PluralSight profile"), 
[course link](https://app.pluralsight.com/profile/author/kevin-jones "Using GitFlow")


## Introduction
- What is Gitflow?
- installing Gitflow
- Initialising Gitflow
- Git branching models

### Git Branching Models
- Centralized:  
One centralized repo, ed users clone repo, any changes pushed are pushed on the same remote repo.  
Very like SVN
- Feature branch:  
We have a central repo, but any changes we wanna make, we create a "feature branch"  
`git checkout -b <myFeature> master`
and then we push to remote repo.
- Gitflow:  
More complicated.
- Others...

### What is Gitflow?
In gitflow we have 2 branches to record the history of the project, *master* and *develop*.

But also we can have other special branches such as *Hotfix*, *Release*, *Feature*.
- Master: is the branch with the final state of the tested project, no development process on it
- Hotfix: used to fix little bugs found in *master* branch, once the bug is fixed, we must merge the *hotfix* branch into *master* and *develop* branches.
- Develop: contains the project with last features developed, here is were we modify our project for future releases and test it.
 This branch must be merged into *release* branch. And must be updated with *master* and *release* branches.
- Feature: we can have as many as we need, all *feature* branches born from *develop* branch and are merged into it.
- Release: branch with the last released code. Any time we modify this branch, we have to merge into *master* and *develop* branches.

### Setting up a Repository to use Gitflow
`git init`  
`git flow init`  
Choose default options for branches and configuration.

By default we are automatically moved to *develop* branch, so if we want to add an existing repo, we have to change to *master* branch:  
>
`git checkout -b master`
`git remote add origin <existingGitRepo>`   
`git push -u origin master`  
`git checkout develop`  
`git push origin develop` 
>

## Creating and Using Feature Branches
A feature branch is a place where work for a specific feature is done.
 
### Creating a Feature Branch
`git flow feature start <featureBranchName>`  
`git flow feature start <featureBranchName> <basedOnFeature>`

Automatically, gitflow will add to our branch the prefix *feature/*, so our feature will be *feature/featureBranchName*.

### Publishing and Tracking a Feature Branch
Git flow has a helper, so if we type:  
>
`git flow feature help`
>
git flow returns a set of commands we can use:  
>
`usage: git flow feature [list]`  
>>
   `or: git flow feature start`  
   `or: git flow feature finish`  
   `or: git flow feature publish`  
   `or: git flow feature track`  
   `or: git flow feature diff`  
   `or: git flow feature rebase`  
   `or: git flow feature checkout`  
   `or: git flow feature pull`  
   `or: git flow feature delete`  
>>
>

When we want our feature be accessible by other members. 
>
`git flow feature publish <featureBranchName>`
>

To pull into local an existing feature we can do `track` or `pull`:  
- `pull`: git will pull the changes of the feature branch, into my local repo and switch into that branch. But it will no track the remote into my local.
- `track`: will do the same as `pull` but also will track the remote branch

So to track we just write:
>
`git flow feature tarck <branchName>`
>

Now, any local change into this branch, can be pushed into the remote branch and everyone could see the changes.

### Finishing a Feature Branch
We have two things to do to complete a feature:
- **review** the feature
- **publish** the feature

### Review a feature
On gitHub what we do is to make a *pull request* to ask someone to pull our changes into the branch. But the thing we don't do with a pull request
 is to merge it.
 
Instead, we are gonna finish it:
>
`git flow finish <branchName>`
>

Using *finish* we:
1. **merge** <branchName> into *develop* branch (or into the branch which <branchName> was based on)
2. **delete** <branchName> branch
3. switch to *develop* branch (or to the branch which <branchName> was based on)

Now the feature branch no longer exists on the central repository. We should now delete our local feature branch:
>
`git branch -d <branchName>`
>

## Creating a Release Branch
Release branches contains all of the features after the point of release. Remember any change done in this feature, we have to test it and merge into 
*develop* and *master* branch.

### Creating a Release Branch
>
`git flow release start <releaseBranchName>`
>
Automatically gitflow creates a new branch *release/releaseBranchName* and switch to this branch.  
Now we have to publish it:
>
`git flow release publish <releaseBranchName>`
>

To track a release:
>
`git flow release track <releaseBranchName>`
>

### Finishing the Release Branch
Once our code has been tested and throw to develop branch, we are ready to finish the release.
>
`git flow release finish <releaseBranchName>`
>

This merge our changes into *master* branch and create a tag where we can write a message for a tag. Release branch is deleted from origin and locally.

But we still haven push our changes to remote. When we do `push`, we must not forget to push also the tag created when finishing the release.
>
`git push --tags`
>
Now we have remote repo updated with commits and tags.

## Creating a Hotfix
Similar to *feature* and *release* branches.
Code is never perfect and sometimes we still find some bugs in the production code. This branches allow us to update the production branch.

- Is an emergency fix to released code.
- Branch of master to create the hot fix
- All files are merged into master and develop

Usually only one person will work on hot fix as them use to be small fixes
>
`git flow hotfix start <version>`  
`git flow hotfix finish <version>`  
`git flow hotfix publish <version>`  
`git flow hotfix track <version>`
>

We create them with the version and this becomes the name of the branch.

### Creating a hotfix branch
>
`git flow hotfix start <versionName>`
>

This will create a branch named *hotfix/versionName*

Again we can `publish`it to let other user to review the hotfix. Once the fix is reviewed, we can then finish the hotfix. 
###  Finishing the hotfix branch
After committing our changes we can finish the hotfix branch.
>
`git flow hotfix finish <verionName>`
>

Now Git create a tag and let us to write a message.  
*Hotfix* branch is merged into *master* and into *develop* (locally).  
*hotfix/versionName* branch is deleted locally.
 
To finish we have to push the local changes to remote.
>
`git checkout master`  
`git push --all origin` This push all branches and tags to origin.
>

 
