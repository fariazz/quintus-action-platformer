window.addEventListener("load",function() {
  var Q = window.Q = Quintus({development: true})
    .include("Scenes, Sprites, 2D, Input, Touch, UI, TMX, Audio")
    .include("ActionPlatformerPlayer, ActionPlatformerEnemy")
    .setup({
      width: 320,   //to fit devices with a screne resolution of 1280 x 720
      height: 180,
      scaleToFit: true
    }).controls().touch();

    Q.setImageSmoothing(false);

    Q.scene("level",function(stage) {
      var player;
      Q.stageTMX("small_level.tmx",stage);
      player = Q("Player").first();
      stage.add("viewport").follow(player,{x: true, y: true});
    });

    //load assets
    Q.loadTMX("small_level.tmx, sprites.json, sprites.png", function() {       
      Q.compileSheets("sprites.png","sprites.json");     
      Q.stageScene("level");
    });
    
});
        
        
        
        
        
        