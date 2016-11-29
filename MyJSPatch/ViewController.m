//
//  ViewController.m
//  MyJSPatch
//
//  Created by djx on 2016/11/17.
//  Copyright © 2016年 ycq. All rights reserved.
//

#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewWillAppear:(BOOL)animated{
    [super viewWillAppear:animated];
    self.view.backgroundColor = [UIColor colorWithRed:arc4random()%255/255.0 green:arc4random()%255/255.0 blue:arc4random()%255/255.0 alpha:1.0];
}

- (void)viewDidLoad {
    [super viewDidLoad];
    
    self.navigationItem.title = @"jsApp";
    
    UILabel *titleLab = [[UILabel alloc] initWithFrame:CGRectMake(20, 100, [UIScreen mainScreen].bounds.size.width - 40, 44)];
    titleLab.text = @"JSPatch实现app各类基础功能";
    titleLab.textColor = [UIColor whiteColor];
    titleLab.textAlignment = NSTextAlignmentCenter;
    titleLab.layer.masksToBounds = YES;
    titleLab.layer.cornerRadius = 4;
    titleLab.backgroundColor = [UIColor redColor];
    [self.view addSubview:titleLab];

    NSString *infoStr = @"此示例工程是在JSPatchDemo上开发的，主要内容如下：\r\n 1.各种控件的使用。\r\n 2.待补充。";
    
    CGFloat labH = [self getgStringHight:infoStr FontSize:13 sizeWide:[UIScreen mainScreen].bounds.size.width - 40];
    UILabel *detialLab = [[UILabel alloc]initWithFrame:CGRectMake(20, CGRectGetMaxY(titleLab.frame) + 20, [UIScreen mainScreen].bounds.size.width - 40, labH + 23.5)];
    detialLab.font = [UIFont systemFontOfSize:14];
    detialLab.numberOfLines = 0;
    detialLab.text = infoStr;
    detialLab.layer.masksToBounds = YES;
    detialLab.layer.cornerRadius = 4;
    detialLab.backgroundColor = [UIColor redColor];
    [self.view addSubview:detialLab];

    UIButton *btn = [[UIButton alloc] initWithFrame:CGRectMake([UIScreen mainScreen].bounds.size.width / 2 - 60, CGRectGetMaxY(detialLab.frame) + 30, 120, 44)];
    [btn setTitle:@"点击预览" forState:UIControlStateNormal];
    [btn addTarget:self action:@selector(handleBtn:) forControlEvents:UIControlEventTouchUpInside];
    [btn setBackgroundColor:[UIColor redColor]];
    btn.layer.masksToBounds = YES;
    btn.layer.cornerRadius = 4;
    [self.view addSubview:btn];
}

//计算文字高度
- (float)getgStringHight:(NSString *)str FontSize:(float)fsize sizeWide:(float)swide
{
    if ( str==nil || [str length] == 0)
    return 0;
        
    NSDictionary *attribute = @{NSFontAttributeName:[UIFont systemFontOfSize:fsize]};
    CGSize size = [str boundingRectWithSize:CGSizeMake(swide, 0)
                                        options:\
                       NSStringDrawingTruncatesLastVisibleLine |
                       NSStringDrawingUsesLineFragmentOrigin |
                       NSStringDrawingUsesFontLeading|
                       NSStringDrawingUsesDeviceMetrics
                                     attributes:attribute
                                        context:nil].size;
    return size.height;
}
    
- (UIImage *)imageWithColor:(UIColor *)color {
    CGRect rect = CGRectMake(0.0f, 0.0f, 1.0f, 1.0f);
    UIGraphicsBeginImageContext(rect.size);
    CGContextRef context = UIGraphicsGetCurrentContext();
    
    CGContextSetFillColorWithColor(context, [color CGColor]);
    CGContextFillRect(context, rect);
    
    UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    
    return image;
}

    
- (void)handleBtn:(id)sender
{
    NSLog(@"oc的方法");
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
