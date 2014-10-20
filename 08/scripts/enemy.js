Quintus.ActionPlatformerEnemy = function(Q) {

	Q.component("commonEnemy", {
	  added: function() {
	    var entity = this.entity;
	    entity.on("bump.left,bump.right,bump.bottom",function(collision) {
	      if(collision.obj.isA("Player")) {                        
	        console.log('you died!');
	      }
	    });
	    entity.on("bump.top",function(collision) {
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
    },
    step: function(dt) {        
      //make the enemy walk to one side and the other on a platform, otherwise they fall
      var dirX = this.p.vx/Math.abs(this.p.vx);
      var ground = Q.stage().locate(this.p.x, this.p.y + this.p.h/2 + 1, Q.SPRITE_DEFAULT);
      var nextElement = Q.stage().locate(this.p.x + dirX * this.p.w/2 + dirX, this.p.y + this.p.h/2 + 1, Q.SPRITE_DEFAULT);
      var nextTile;

      if(nextElement instanceof Q.TileLayer) {
      	nextTile = true;
      }

      //if we are on ground and there is a cliff
      if(!nextTile && ground) {
        if(this.p.vx > 0) {
          if(this.p.defaultDirection == "right") {
            this.p.flip = "x";
          }
          else {
            this.p.flip = false;
          }
        }
        else {
          if(this.p.defaultDirection == "left") {
            this.p.flip = "x";
          }
          else {
            this.p.flip = false;
          }
        }
        this.p.vx = -this.p.vx;
      }
    }
  });  
  
  Q.Sprite.extend("VerticalEnemy", {
    init: function(p) {
      this._super(p, {vy: -100, rangeY: 40, gravity: 0 });
      this.add("2d, commonEnemy");

      this.p.initialY = this.p.y;
      this.p.initialVy = this.p.vy;
      this.p.vyDirection = this.p.vy/Math.abs(this.p.vy);

      this.on("bump.top, bump.bottom",function(collision) {
        that.p.vy = -Math.abs(that.p.initialVy) * that.p.vyDirection;
        that.p.vyDirection = that.p.vy/Math.abs(that.p.vy);
      });

    },
    step: function(dt) {                
      if(this.p.y - this.p.initialY >= this.p.rangeY && this.p.vy > 0) {
        this.p.vy = -this.p.vy;   
        this.p.vyDirection *= -1;               
      } 
      else if(-this.p.y + this.p.initialY >= this.p.rangeY && this.p.vy < 0) {
        this.p.vy = -this.p.vy;  
        this.p.vyDirection *= -1;                 
      } 
    }
  });

  
  
};
