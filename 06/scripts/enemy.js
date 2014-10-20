Quintus.ActionPlatformerEnemy = function(Q) {

	Q.component("commonEnemy", {
		added: function() {
			var entity = this.entity;
			entity.on("bump.left, bump.right, bump.bottom", function(collision){
				if(collision.obj.isA("Player")) {
					console.log('you died!');
				}
				
			});
			entity.on("bump.top", function(collision){
				if(collision.obj.isA("Player")) {
					//make the player jump
	        collision.obj.p.vy = -100;

	        //kill enemy
	        this.destroy();
				}
			});
		}
	});

  Q.Sprite.extend("GroundEnemy", {
    init: function(p) {
      this._super(p, {vx: -50, defaultDirection: "left"});
      this.add("2d, aiBounce, commonEnemy");
    }
  });      
  
};
