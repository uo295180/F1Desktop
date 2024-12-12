class Fondo {
    apiKey= "21f3182ccffb62ef5f1f440fc9dd62ea";
    constructor() {
        (function () {
            var flickrAPI = "https://api.flickr.com/services/rest";

            $.getJSON(flickrAPI,
                {
                    method: "flickr.photos.search",
                    api_key: "21f3182ccffb62ef5f1f440fc9dd62ea",
                    lat: 31.3389, 
                    lon: 121.2196,
                    radius: 20,
                    tags: "Formula1",
                    format: "json",
                    nojsoncallback: 1,
                    per_page: 1
                })
                .done(function (data) {
                    console.log(data);
                    if (data.photos.photo.length > 0) {
                        const photo = data.photos.photo[0];
                        const photoURL = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`;
                
                        console.log(`Photo URL: ${photoURL}`);
                        $("body").css({
                            backgroundImage: `url(${photoURL})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundAttachment: "fixed"
                        });
                        
                    } else {
                        console.log("No photo retrieved");
                    }

                });
        })();
    }
}

new Fondo();