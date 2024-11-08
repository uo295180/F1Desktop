class Fondo{
    constructor(){
        (function() {
            var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
            $.getJSON(flickrAPI, 
                    {
                        tags: "Formula1",
                        tagmode: "any",
                        format: "json"
                    })
                .done(function(data) {
                    $.each(data.items, function(i,item ) {
                        $("body").css({
                            backgroundImage: `url(${item.media.m})`,
                            backgroundRepeat : "no-repeat",
                            backgroundSize: "cover",
                            backgroundAttachment: "fixed"
                        });
                        //$("body").css("background-size", "cover");
                        // $("<img />").attr( "src", item.media.m).appendTo("body");
                        if ( i === 0 ) {
                                return false;
                        }
                    });
                
            });
        })();
    }
}
//$('body').css('background-image', `url(${data[0].media.m})`);
//$('body').css('background-size', 'cover');

new Fondo();