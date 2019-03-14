# BFC
BFC就是``block formatting content``的简称

## BFC的生成
  1. 根元素
  2. float不为none
  3. position为absolute和fixed
  4. overflow不为visible
  5. display为inline-block、table-cell、table-caption
  6. flex boxes (元素的display: flex或inline-flex)

## BFC的布局规则
  1. 内部的box会在垂直方向一个接一个的排列，可以理解为BFC中的一个常规流
  2. 属于同一个BFC的两个相邻盒子的margin可能会发生重叠
  3. 每个元素的左外边距与包含块的左边界相接触（从左往右，否则相反），即使存在浮动也是如此
  4. BFC的区域不会与float box重叠
  5. BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然
  6. 计算BFC的高度时，浮动元素也参与计算

## BFC的应用
  1. 自适应两栏布局    

  2. 解决垂直方向margin重叠

  3. 清除浮动


[segmentful](https://segmentfault.com/a/1190000012221820)

[csdn](http://www.cnblogs.com/lhb25/p/inside-block-formatting-ontext.html)

[mdn](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)