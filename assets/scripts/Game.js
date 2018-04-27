cc.Class({
    extends: cc.Component,

    properties: {
        starPrefab: {
            default: null,
            type: cc.Prefab
        },
       
        maxStarDuration: 0,
        minStarDuration: 0,
     
        ground: {
            default: null,
            type: cc.Node
        },
      
        player: {
            default: null,
            type: cc.Node
        },
      
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
     
        scoreAudio: {
            default: null,
            url: cc.AudioClip
        }
    },

   
    onLoad: function () {

        this.groundY = this.ground.y + this.ground.height/2;
      
        this.timer = 0;
        this.starDuration = 0;
        
        this.spawnNewStar();
      
        this.score = 0;
    },

    spawnNewStar: function() {
        
        var newStar = cc.instantiate(this.starPrefab);
        
        this.node.addChild(newStar);
        
        newStar.setPosition(this.getNewStarPosition());
       
        newStar.getComponent('Star').game = this;

        this.starDuration = this.minStarDuration + cc.random0To1() * (this.maxStarDuration - this.minStarDuration);
        this.timer = 0;
    },

    getNewStarPosition: function () {
        var randX = 0;
        
        var randY = this.groundY + cc.random0To1() * this.player.getComponent('Player').jumpHeight + 50;
        
        var maxX = this.node.width/2;
        randX = cc.randomMinus1To1() * maxX;
     
        return cc.p(randX, randY);
    },

 
    update: function (dt) {
       
        
        if (this.timer > this.starDuration) {
            this.gameOver();
            return;
        }
        this.timer += dt;
    },

    gainScore: function () {
        this.score += 1;
       
        this.scoreDisplay.string = 'Score: ' + this.score.toString();
    
        cc.audioEngine.playEffect(this.scoreAudio, false);
    },

    gameOver: function () {
        this.player.stopAllActions(); 
        cc.director.loadScene('game');
    }
});
