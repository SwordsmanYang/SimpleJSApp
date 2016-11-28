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

- (void)viewDidLoad {
    [super viewDidLoad];
    
    UIButton *btn = [[UIButton alloc] initWithFrame:CGRectMake(0, 100, [UIScreen mainScreen].bounds.size.width, 50)];
    [btn setTitle:@"Push JPTableViewController" forState:UIControlStateNormal];
    [btn addTarget:self action:@selector(handleBtn:) forControlEvents:UIControlEventTouchUpInside];
    [btn setBackgroundColor:[UIColor grayColor]];
    [self.view addSubview:btn];

}

- (void)handleBtn:(id)sender
{
    NSLog(@"oc的方法");
    self.view.backgroundColor = [UIColor redColor];
    
    UIButton *btn = [[UIButton alloc]initWithFrame:CGRectMake(64, 20, 200, 30)];
    btn.backgroundColor = [UIColor yellowColor];
    [self.view addSubview:btn];
    
    [btn addTarget:sender action:@selector(btnClickAction) forControlEvents:UIControlEventTouchUpInside];
}
    
- (void)btnClickAction
{
        
}


- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}


@end
