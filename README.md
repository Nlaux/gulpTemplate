# gulpTemplate
Basic gulp template.
<br />
git clone https://github.com/Nlaux/gulpTemplate.git ./
<br />
<em>clones into current directory</em>

Gulp template to serve a base for future projects. Includes the following plugins / features:
<ul>
  <li>Jquery</li>
  <li>Bootstrap</li>
  <li>Browsersync (serving from both src and dist directories)</li>
  <li>Jquery Uglify</li>
  <li>Es Lint (for finding code issues)</li>
  <li>Css Minifier</li>
  <li>Directory sync</li>
</ul>
  
<h3>Install Notes:</h3>
<h4>Clean install:</h4>
 <ol>
  <li>Install Node first with -g flag in target directory (if not already installed)</li>
  <li>Run Npm install in target directory</li>
  <li>Unzip directories.rar or Create src/dist directory structure (ex. folder-structure.jpg)</li>
  <li>May need to then install Gulp, Eslint, Eslint-plugin-angular with the -g flag to avoid path issues</li>
 </ol>
 
 <hr />
 <h4>Run:</h4>
    Run gulp watch from project directory. 
    <br />
    <em>Compiles scss, minifies css/js, copies assets (html/images/js) to dist folder, reloads browser on changes.</em>

<hr />
<h4>Notes:</h4>
  <ul>
    <li>The directory structure of the project follows best practices for large scale app development. Specific to work with Angular, but good to adopt for any project structure.</li>
    <li>Jquery / Bootstrap run from local node_modules directory, but perhaps want to switch to a cdn for production deploy</li>
    <li>One-way directory syncing for html/js/images</li>
  <li>The gulp file could probably be optimized further, but for now it works.</li>
