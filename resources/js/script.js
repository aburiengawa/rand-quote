$( document ).ready(function() {
    
    var tweetContent = '';    
    var tweetTitle = '';    
    var tweetText = '';  
    
    window.twttr = (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
        t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);

    t._e = [];
    t.ready = function(f) {
        t._e.push(f);
    };

    return t;
    }(document, "script", "twitter-wjs"));
    
    $.getJSON("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=", function(a) {
        
        setTweet(a);
        createTweetBtn();
    	
    });

    $('#get-another-quote-button').on('click', function(e) {
      e.preventDefault();
      $.ajax( {
        url: 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
        success: function(a) {

            setTweet(a);
            $('iframe').remove();
            createTweetBtn();

        },
        cache: false
      });
    });
    
    function setTweet(a) {
        $('#quote-content').html(a[0].content);
        $('#quote-title').text(a[0].title);
      
        tweetTitle = a[0].title;
        tweetContent = $(a[0].content).text();
        tweetText = tweetContent + " - " + tweetTitle;
    }
    
    function createTweetBtn() {
        twttr.widgets.createShareButton(
            " ",
            document.getElementById("tweet-container"),
            {
                size: "large",
                text: tweetText
            }
        );        
    }

});