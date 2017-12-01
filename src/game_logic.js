(function () {

    var Ease = Laya.Ease;
    var Event = Laya.Event;
    var Handler = Laya.Handler;
    var SoundManager = Laya.SoundManager;
    var Sprite = Laya.Sprite;
    var Tween = Laya.Tween;
    var playerList = null;
    var currentWord = null;

    function GameLogic() {
        var _this = this;
        GameLogic.super(_this);
        
        _this.initGame();
    }

    Laya.class(GameLogic, "GameLogic", Sprite);

    var _proto = GameLogic.prototype;

    _proto.initGame = function () {
        var _this = this;
        playerList = new LList();

        //初始化测试数据
        _this.initTestData();
    }

    _proto.initTestData = function(){
        if (playerList != null){
            playerList = null;
            playerList =new LList();
        }
                
		//var jsontext = '{"一条老腊肉":["喜出望外","5"] , "两条老腊肉":["外国人渣","6"], "三条老腊肉":["渣程序员","6"]}';
        var testarray =  ["'name':一条老腊肉, 'words':喜出望外, 'time':3", "'name':一条老腊肉, 'words':喜出望外, 'time':3"];
        var str = JSON.stringify(testarray);
      //  console.log(str);
        var newArr = JSON.parse(str);
        while (newArr.length > 0) {
            console.log(newArr.pop());
        }
        //var jsontext = '{"一条老腊肉":["喜出望外","5"] , "两条老腊肉":["外国人渣","6"], "三条老腊肉":["渣程序员","6"]}';
        //this.initWithJson(jsontext);
    }

    _proto.initWithJson = function(jsonstr){
        var newArr = JSON.parse(jsontext);        
        for(var i=0;i<newArr.length;i++)
        {            
            var userinfo = JSON.parse(newArr[i]);
            playerList.insert(userinfo.name, new player(userinfo.name,userinfo.words,userinfo.time));   
        }
    }

    _proto.dumpPlayerList = function(){
        playerList.dump();
        console.log("getUserList");
    }

    _proto.getUserList = function(){
        return playerList;
    }

    _proto.currentWord = function(){
        return currentWord;
    }

})();
