# sefaria-interactive-simple
Sefaria clone with Stack Exchange-like features
## To begin collabrating
### Folllow these steps:
#### Setup the coding environment
1. Install nodeJS (LTS version) - https://nodejs.org/dist/v12.18.3/node-v12.18.3-x64.msi 
2. Install Git (do not change default options during installation) - https://git-scm.com/download/win
3. Install GitHub Desktop - https://central.github.com/deployments/desktop/desktop/latest/win32  
4. Create GitHub account - https://github.com/
5. Install Visual Studio Code - https://code.visualstudio.com/docs/?dv=win
6. Request access to the code repository - https://github.com/akivamprager/sefaria-interactive-simple 
1. Open the repository with GitHub Desktop (on the website click the green dropdown button)
1. Open VS Code, and select File > Add Folder to Workspace...
1. Select the repository
1. You can now begin working! whenever you want to commit the code you've worked on, use the GitHub Desktop application to commit, and then Push to update changes online (click Fetch to refresh the changes from others).

#### The work will be split into three parts:
1. **The front-end application** - creating a website with a Sefaria-like UI/UX, plus a sidepane which will display all comments/questions and such. The data from Sefaria and from our comments database will eventually be served up by our API, but for now the UI can be developed with dummy values for simulation.
1. **The Sefaria API** - working on "plugging in" the text from Sefaria into our web UI.
1. **The comments API** - working on storing the comments for specific texts and serving them to the web UI, using an API.