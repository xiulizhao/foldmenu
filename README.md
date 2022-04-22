# foldmenu
折叠菜单，用于可折叠的侧边栏, 或者树状结构<br>
普通属性<br>
data-open	如何设置为true，则点击当前下拉关闭其他兄弟节点下拉内容，设置为false则点击当前节点其他兄弟节点不会关闭<br>
按照层级添加各级的子内容，折叠元素是可以嵌套的。内容可以自行更改与添加。每向下一级则用control类控制展开与收缩。下方代码 不能直接使用，只是用于大家理解折叠元素的使用<br>
```javascript
<ul>
 <li>
  <span class="control">菜单1</span>    //li的直接子元素，control控制展开
  <span>内容<span>
  <ul>                                //用ul开展li的下一级
   <li>菜单1的子内容1</li>             //li内表示下一级的内容
   <li>菜单1的子内容2</li>
  </ul>
 </li>
</ul>
```
