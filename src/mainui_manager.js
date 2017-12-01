(function () {

    var Ease = Laya.Ease;
    var Event = Laya.Event;
    var Handler = Laya.Handler;
    var SoundManager = Laya.SoundManager;
    var Sprite = Laya.Sprite;
    var Tween = Laya.Tween;
	var Loader = laya.net.Loader;

	var _parent;
	var _gamelogic;
	function onListRender(item, index)
	{
		//自定义list的渲染方式
		var userlist = _gamelogic.getUserList();
		
		var userinfo = userlist.at(index);
		console.log( userinfo.UserName() + userinfo.Time());
		var boxview = item.getChildByName("boxview");
		boxview.getChildByName("playername").text = userinfo.UserName();
		boxview.getChildByName("playertime").text = userinfo.Time();

		var wordspanel = boxview.getChildByName("words");
		var words = userinfo.Words();
		wordspanel.pinyin1.text = CC2PY(words[0]);
		wordspanel.word1.text = words[0];
		wordspanel.pinyin2.text = CC2PY(words[1]);
		wordspanel.word2.text = words[1];
		wordspanel.pinyin3.text = CC2PY(words[2]);
		wordspanel.word3.text = words[2];
		wordspanel.pinyin4.text = CC2PY(words[3]);
		wordspanel.word4.text = words[3];
	}
	function main_ui()
	{
		var Event = laya.events.Event;
		main_ui.super(this);

		//btn是编辑器界面设定的，代码里面能直接使用，并且有代码提示
		this.btnResult.on(Event.CLICK, this, onBtnReadmeClick);
		this.btnStart.on(Event.CLICK, this, onBtnStartClick);

        var userlist = _gamelogic.getUserList();
		this.render.dataSource = {slider: 50, scroll: 80, progress: 0.2, label: {color: "#ff0000", text: "Hello LayaAir"}};
		var arr = [];		//list赋值，先获得一个数据源数组
		var listLength = userlist.count();
		for (var i = 0; i < listLength; i++) {			
			arr.push({label: "item " + i, clip: i % 9});			
		}		
		this.lst_players.array = arr;//给list赋值更改list的显示			
		this.lst_players.renderHandler = new Handler(this, onListRender);//还可以自定义list渲染方式，可以打开下面注释看一下效果


		console.log(this.topicpanel);
		var wordspanel = this.topicpanel;
		var words = _gamelogic.currentWord().words;
		wordspanel.pinyin1.text = CC2PY(words[0]);
		wordspanel.word1.text = words[0];
		wordspanel.pinyin2.text = "";
		wordspanel.word2.text = "?";
		wordspanel.pinyin3.text = "";
		wordspanel.word3.text = "?";
		wordspanel.pinyin4.text = "";
		wordspanel.word4.text = "?";

		//add flash effect on word1
		var flashwords = "圆缘预案";
		for(var i=0;i<flashwords.length;i++)
		{
			var newlabel = new Laya.Label(flashwords[i]);
			
			//newlabel.x = wordspanel.word1.x;
			newlabel.y = wordspanel.word1.y;
			newlabel.width = wordspanel.word1.width;
			newlabel.height = wordspanel.word1.height;
			newlabel.fontSize = wordspanel.word1.fontSize;
			newlabel.align = wordspanel.word1.align;
			newlabel.valign = wordspanel.word1.valign;
			newlabel.color = wordspanel.word1.color;
			wordspanel._word1.addChild(newlabel);
		}


		function onBtnReadmeClick()
		{			
		//	Laya.stage.removeChild(this);
			_parent.showReadme();
			console.log("btn readme pressed");
		}

		function onBtnStartClick()
		{			
			Laya.stage.removeChild(this);
			_parent.showGameUI();
			console.log("btn start pressed");
		}
	}

	Laya.class(main_ui, "main_ui", main_uiUI);

    function mainuiManager() {
        var _this = this;
        mainuiManager.super(_this);		
    }

    Laya.class(mainuiManager, "mainuiManager", Sprite);

    var _proto = mainuiManager.prototype;
    _proto.init_ui = function (parent, gamelogic)
    {
		_parent = parent;
		_gamelogic = gamelogic;
        function onAssetLoaded()
		{
			Laya.stage.addChild(new main_ui());
		}
		Laya.loader.load("res/atlas/main_ui.json", Handler.create(this, onAssetLoaded), null, Loader.ATLAS);
    }
})();