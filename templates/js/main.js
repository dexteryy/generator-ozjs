
require.config({
    baseUrl: 'js/mod/',
    distUrl: 'dist/js/mod/',
    aliases: {
        '<%= appname %>': '../<%= appname %>/'
    }
});
<% if (userOpt.jqueryAlternate) { %>
define('jquery', ['<%= userOpt.jqueryAlternate %>'], function($){
    return $;
});
<% } else { %>
define('dollar', ['jquery'], function(){
    return window.$;
});
<% } %> <% if (userOpt.forModernBrowser && userOpt.hasMo) { %>
// unnecessary in the modern browser
define('mo/lang/es5', [], function(){});
define('mo/mainloop', [], function(){});
<% } %>
require([
    'dollar', 
    '<%= appname %>/app'
], function($, app){

    app.init({

    });

});

