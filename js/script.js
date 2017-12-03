/////////////////////////////////////////
//// Image randomizer
//// Images go in images folder with format img001_01.gif, img001_02.gif,
//// ..., img015_99.gif etc.
////
////
////
////
var pauseTime   = 2500;  // Pause between flipping squares in milliseconds
var numLoops    = 10; // Number of times to flip
var highestImg  = 57;   // Update if there are more images

// Set width to ten times the rowHeight
$( "#mygallery" ).css( "margin", "auto" );
$( "#mygallery" ).css( "width", "501px" );



var imgLinks        = ""; // String used to append images to DOM
var link            = "";
var alt             = "";
var pathStart      = "images/";
var firstPic       = "img001";
var imgEnding      = ".gif";
var path            = "";
var id              = 0; // two-digit identifier for grid: 00-99
var currentName     = "";
var nextName        = "";
var imgID           = 0;
var randomNum       = 0;
var randomID        = 0;


// Get Next Image Name:
// Given an image name, like img001,
// return a random name of the same format, like img078
function getNextName(){

    // SET RANGE of IMAGES
    imgID = randomIntFromInterval(1, highestImg);

    // Make number two digits
    imgID = ("00" + imgID).slice(-3);

    // Append to image name base
    nextName = "img" + imgID;
    return nextName;
};

// Hide alt text when images don't load
$( "img" ).css( "color:white" );

// Get a random number from an interval
function randomIntFromInterval( min,max ){
    return Math.floor(Math.random()*(max-min+1)+min);
}

function flipAllRandom() {
  $( "#mygallery" ).hide(); // Hide all images

  // Change each image position to a random image
  $("#mygallery").promise().done(function() {
      $( "img" ).each(function() {
          var currentID = $( this ).attr("id");
          var oldSrc = $( this ).attr("src");
          nextName = getNextName();
          var newSrc = pathStart + nextName + "_" + currentID + imgEnding;
          $(this).attr("src", newSrc);
          $( this ).on('error', function(){
              $(this).attr("src", oldSrc);
              console.log("using old source " + oldSrc)
          });
      });
  });

  // When all images have been updated, fade them back in
  $( "#mygallery" ).promise().done(function() {
      $( "#mygallery" ).show();
  })
};

// Cycle images on click, for testing
// $("h3").click(function(){
//   flipAllRandom();
// });

//////////////////////////////////////////////////////
// On Doc Ready
$(function() {

    // Build original image:
    // Add html to #mygallery for each of the 100 images
    // 10 by 10 grid
    for (var i = 0; i < 100; i++) {

        // Make number two digits
        id = ("0" + i).slice(-2);
        // id = "35";

        // Build path to image
        path  = pathStart + firstPic + "_" + id + imgEnding;
        alt   = firstPic;

        // Add image html to imgLinks string
        imgLinks += '<a href="' + link + '"><img id="' + id + '" src="' + path + '"/></a>';
    }

    // Append imgLinks string of HTML to #mygallery
    var container = document.getElementById("mygallery");
    container.innerHTML = imgLinks;

    // Initialize the gallery
    $( "#mygallery" ).justifiedGallery({
        rowHeight : 50,             // Pixels. For our 10x10, should be width of #mygallery divided by 10.
        lastRow : 'nojustify',      // Don't stretch images in last row (if not full)
        margins : 0                 // Pixels between images
    });

    // Flip all photos once every pauseTime
    setInterval (flipAllRandom, pauseTime);


});
