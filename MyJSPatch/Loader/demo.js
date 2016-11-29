//
//  ViewController.m
//  MyJSPatch
//
//  Created by djx on 2016/11/17.
//  Copyright © 2016年 ycq. All rights reserved.
//

autoConvertOCType(1)

require('UIScreen')

//global对象： 所有在全局作用域内定义的属性和方法，都是global对象的属性
global.SCREEN_WIDTH = UIScreen.mainScreen().bounds().width;
global.SCREEN_HEIGHT = UIScreen.mainScreen().bounds().height;

global.NSTextAlignmentLeft = 0;
global.NSTextAlignmentCenter = 1;
global.NSTextAlignmentRight = 2;

global.UIHelper = {
bottomY:function(view) {
    var f = view.frame();
    
    return f.height + f.y;
},
rightX:function(view)  {
    var f = view.frame();
    
    return f.width + f.x;
},
setWidth:function(view, width){
    var f = view.frame();
    
    f.width = width;
    view.setFrame(f);
},
setHeight:function(view, height){
    var f = view.frame();
    
    f.height = height;
    view.setFrame(f);
},
setX:function(view, x) {
    var f = view.frame();
    
    f.x = x;
    view.setFrame(f);
},
setY:function(view, y) {
    var f = view.frame();
    
    f.y = y;
    view.setFrame(f);
}
}

require('UIViewController,UIScrollView,NSMutableArray,UILabel,NSString,UIColor,UIButton,NSObject,UITableViewController,UITableViewCell,UIAlertView,UIAlertViewDelegate')

defineClass('UIScrollViewHelper: NSObject', {
            // 实例方法
    init: function() {
            self = self.super().init();
            console.log("UIScrollViewHelper init");
            return self;
            }
        }, {
            // 类方法
            layoutScrollView: function(scrollView, subviewsArray, isVertical) {
            
            //控制台输出信息
            console.log("layoutScrollView function");
            
            var firstViewInfoDict = subviewsArray[0];
            var firstView = firstViewInfoDict["view"];
            var firstTopLeft = {
            x:firstView.frame().x,
            y:firstView.frame().y
        };
            var currentLeft = firstTopLeft.x;
            var currentTop = firstTopLeft.y;
            
            for (var i=0; i<subviewsArray.length; i++) {
                var viewInfoDict = subviewsArray[i];
                var view = viewInfoDict["view"];
                var padding = viewInfoDict["padding"];
        if (isVertical) {
            view.setFrame({x: (scrollView.frame().width - view.frame().width) / 2.0,
                          y: currentTop + padding,
                          width: view.frame().width,
                          height: view.frame().height});
            
            currentTop += view.frame().height;
            currentTop += padding;
            
            currentLeft = view.frame().x;
            }else{
                view.setFrame({x: currentLeft + padding,
                          y: currentTop,
                          width: view.frame().width,
                          height: view.frame().height});
            
                currentLeft += view.frame().width;
                currentLeft += padding;
                currentTop = view.frame().y;
            }
            scrollView.addSubview(view);
        }
            
        if (isVertical) {
            scrollView.setContentSize({width: scrollView.frame().width, height: currentTop});
        }else {
            scrollView.setContentSize({width: currentLeft, height: scrollView.frame().height});
        }
            
        subviewsArray = null;
    }
})

//Objective-C 里的常量/枚举不能直接在 JS 上使用，可以直接在 JS 上用具体值代替，
//或者在 JS 上重新定义同名的全局变量：
var NSTextAlignmentCenter = 1;
var UIButtonTypeRoundedRect = 1;
var UIControlStateNormal = 0;
var UIControlEventTouchUpInside = 1 << 6;
var YES = 1;
var NO = 0;

defineClass('ViewController', {
  handleBtn: function(sender) {
    var tableViewCtrl = JPTableViewController.alloc().init()
    require('UIColor');
    self.view().setBackgroundColor(UIColor.orangeColor());
    self.navigationController().pushViewController_animated(tableViewCtrl, YES)
  }
})

defineClass('JPTableViewController : UITableViewController <UIAlertViewDelegate>', ['data'], {
  dataSource: function() {
    var data = self.data();
    if (data) return data;
//    var data = [];
//    for (var i = 0; i < 20; i ++) {
//      data.push("cell from js " + i);
//    }
    require('NSMutableArray');
    var data = NSMutableArray.arrayWithObjects("第1个功能点，简单控件的使用", "第3个功能点，地图的使用", "第3个功能点", "第4个功能点", "第5个功能点", "第6个功能点", "第7个功能点", "第8个功能点", null);
    self.setData(data)
    return data;
  },
            
  numberOfSectionsInTableView: function(tableView) {
    return 1;
  },
  tableView_numberOfRowsInSection: function(tableView, section) {
    return self.dataSource().length;
  },
  tableView_cellForRowAtIndexPath: function(tableView, indexPath) {
    var cell = tableView.dequeueReusableCellWithIdentifier("cell") 
    if (!cell) {
      cell = require('UITableViewCell').alloc().initWithStyle_reuseIdentifier(0, "cell")
    }
    cell.textLabel().setText(self.dataSource()[indexPath.row()])
    return cell
  },
  tableView_heightForRowAtIndexPath: function(tableView, indexPath) {
    return 60
  },
  tableView_didSelectRowAtIndexPath: function(tableView, indexPath) {
    require('UIViewController');
        if(indexPath.row() == 0){
            var vc = MyViewController.alloc().init();
            self.navigationController().pushViewController_animated(vc, YES);
        }else if(indexPath.row() == 1){
            var vc = MapViewController.alloc().init();
            self.navigationController().pushViewController_animated(vc, YES);
            }
        },
  alertView_willDismissWithButtonIndex: function(alertView, idx) {
    console.log('click btn ' + alertView.buttonTitleAtIndex(idx).toJS())
  }
})

defineClass('MyViewController : UIViewController', {
    viewDidLoad: function() {
        self.super().viewDidLoad();
        require('UIColor');
        self.view().setBackgroundColor(UIColor.redColor());
            
        require('UIButton');
        var btn = UIButton.buttonWithType(UIButtonTypeRoundedRect);
        btn.setFrame({x:10, y:74, width:200, height:30});
        btn.setTitle_forState("去成功或失败页面", UIControlStateNormal);
        btn.setBackgroundColor(UIColor.yellowColor());
        self.view().addSubview(btn);
            
        //在JS使用字符串代表Selector，如@selector(goToSuccessVC) 在JS中使用"goToSuccessVC"
        btn.addTarget_action_forControlEvents(self, "goToSuccessVC1", UIControlEventTouchUpInside);
    },
    goToSuccessVC1: function() {
        self.view().setBackgroundColor(UIColor.yellowColor());
    }
})


defineClass('MapViewController : UIViewController', {
    viewDidLoad: function() {
        self.super().viewDidLoad();
        require('UIColor');
        self.view().setBackgroundColor(UIColor.yellowColor());
            
//        require('MKMapView');
//        var mapView = MKMapView.alloc().init();
//        mapView.setFrame({x:10, y:74, width:355, height:500});
//        self.view().addSubview(mapView);
    },
})


