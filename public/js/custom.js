//包含深色模式、Viewer.JS、作品内页宽度扩展、滚动到顶部、博客-复制链接、博客-右侧目录、导航栏、联系卡片

// ▼▼ 深色模式
const darkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)'); 
// 判断是否匹配深色模式 
if (darkMode && darkMode.matches) { 
document.body.classList.add('dark'); 
} 
// 监听主题切换事件 
darkMode && darkMode.addEventListener('change', e => { 
if (e.matches) { 
    document.body.classList.add('dark'); 
} else { 
    document.body.classList.remove('dark');  
} 
});
// ▲▲ 深色模式

// ▼▼ 目录随滚动高亮
const headings = document.querySelectorAll('h2, h3');
window.addEventListener('scroll', ()=> {
  let current = ''; //定义在页面上半部分的锚点，默认无

  headings.forEach( heading => { //查找在页面上半部分的锚点是什么
    if (!heading.id) return; //未分配锚点 id 的标题不参与
    const sectionTop = heading.offsetTop;
    const sectionHeight = heading.clientHeight;
    if( document.documentElement.scrollTop >= 180){ //滚动距离超过 180 后开始查找
      if(pageYOffset >= sectionTop - (document.documentElement.clientHeight - 112) / 2){
        current = heading.getAttribute('id');
      }
    }
  })
  // 每次滚动时重新查询：目录链接由下方脚本动态生成，加载时还不存在
  document.querySelectorAll('.project-anchor, #blogCatalog a').forEach( a => {
    a.classList.remove('active');
    if (current && a.classList.contains(current)) { //判断目录按钮的class是否包含当前页面中的的锚点id
      a.classList.add("active");
    }
  })
})
// ▲▲ 目录随滚动高亮


// ▼▼ 作品内页 - 宽度扩展按钮
var projectContainer = document.getElementsByClassName('project-container')[0]
var fullWidthIcon = document.getElementById('fullWidthIcon');

var fullWidthMode = function (){
  console.log(projectContainer)  
  console.log('projectContainer')  
  projectContainer.classList.toggle('extra-width');

  // 判断到宽度被扩展时，切换图标
  if (projectContainer.classList.contains("extra-width")){
    console.log('extra-width') 
    fullWidthIcon.setAttribute( "d", "M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15zM7 10h8v2H7v-2z");
  } else {
    console.log('no') 
    fullWidthIcon.setAttribute( "d", "M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15zM10 10V7h2v3h3v2h-3v3h-2v-3H7v-2h3z");
  }
}
// ▲▲ 作品内页 - 宽度扩展按钮

// ▼▼ 博客 - 右侧导航菜单 // https://www.rainng.com/js-wordpress-catalog/

var div = document.createElement('div');
div.id = 'blogCatalog';
div.setAttribute('class','blogCatalog');
document.body.appendChild(div);

// 目录
let catalogData = getArticleCatalog();
if (catalogData != null) {
    // blogCatalog换成你的目录容器
    let wrapper = document.getElementById('blogCatalog');
    if (catalogData.length > 0) {
        wrapper.innerHTML = generateCatalog(catalogData);
    } else {
        wrapper.style.display = 'none'; // 无标题的文章不显示空目录
    }
}

function getArticleCatalog(){
let articleContent = document.getElementsByClassName('section-inner');

if (articleContent.length !== 1) {
  // alert('not found');
  return null;
}
let catalog = [];
let header = {};
let elements = articleContent[0].childNodes; // 获取文章容器的子节点
// 自动适配标题层级：文章用 ##/### 时以 h2 为一级、h3 为二级；用 ###/#### 时以 h3 为一级、h4 为二级
let hasH2 = Array.prototype.some.call(elements, el => el.nodeName === 'H2');
const TOP = hasH2 ? 'H2' : 'H3';
const SUB = hasH2 ? 'H3' : 'H4';
const prefix = hasH2 ? 'h2' : 'h3';
// 遍历所有元素
for (let i = 0; i < elements.length; i++) {
  if (elements[i].nodeName === TOP) {
    elements[i].id = prefix + '-' + catalog.length;
    header = {
        id: elements[i].id,
        name: elements[i].innerText,
        childHeaders: []
    };
    catalog.push(header);
  } else if (elements[i].nodeName === SUB && header.name) {
    elements[i].id = prefix + '-' + (catalog.length - 1) + '-h' + SUB.toLowerCase() + '-' + header.childHeaders.length;
    header.childHeaders.push({ id: elements[i].id, name: elements[i].innerText });
    }
  }
  return catalog;
}

function generateCatalog(catalogData) { // 添加目录标签
  let catalog = '<div style="font-weight: 600;font-size: 16px; padding-left: 8px;">文章目录</div>';
  for (let i = 0; i < catalogData.length; i++) {
    // class 带上目标 id，供滚动高亮逻辑匹配
    catalog += '<a href="#' + catalogData[i].id + '" class="' + catalogData[i].id + '">' + catalogData[i].name + '</a>';

    for (let i2 = 0; i2 < catalogData[i].childHeaders.length; i2++) {
      let child = catalogData[i].childHeaders[i2];
      catalog += '  <a href="#' + child.id + '" class="catalog-h4 ' + child.id + '">' + child.name + '</a>'
    }
  }
  return catalog;
}

// ▲▲ 博客 - 右侧导航菜单

// ▼▼ 导航栏

 var iconMenu = document.getElementById('iconMenu');
 var iconClose = document.getElementById('iconClose');
 var navOpen = document.getElementById('navOpen');
 var navMask = document.getElementById('navMask');

 iconMenu.onclick = function(){
    navOpen.classList.toggle('hidden');
    navOpen.classList.toggle('nav-transform');
    navMask.classList.toggle('hidden');
    iconClose.classList.toggle('hide');
    iconMenu.classList.toggle('hide');
    //屏蔽滚动
    document.body.classList.add("stop-scrolling");
    //屏蔽滚动（Safari）
    navMask.addEventListener('touchmove', e => { 
        e.preventDefault()
      }, false)
    navOpen.addEventListener('touchmove', e => {
    e.preventDefault()
    }, false)
    // ESC 关闭弹窗
    document.onkeydown = function(e){ //对整个页面监听  
      if (27 == e.keyCode){  
        navOpen.classList.toggle('hidden');
        navOpen.classList.toggle('nav-transform');
        navMask.classList.toggle('hidden');
        iconClose.classList.toggle('hide');
        iconMenu.classList.toggle('hide');
        document.body.classList.remove("stop-scrolling");
      }
    }
 }
 iconClose.onclick = function(){
    navOpen.classList.toggle('hidden');
    navOpen.classList.toggle('nav-transform');
    navMask.classList.toggle('hidden');
    //图标切换
    iconClose.classList.toggle('hide');
    iconMenu.classList.toggle('hide');
    //屏蔽滚动
    document.body.classList.remove("stop-scrolling");
 }

 navMask.onclick = function(){ 
    navOpen.classList.toggle('hidden');
    navOpen.classList.toggle('nav-transform');
    navMask.classList.toggle('hidden');
    document.body.classList.remove("stop-scrolling");

    //图标切换
    iconClose.classList.toggle('hide');
    iconMenu.classList.toggle('hide');
 }

// ▲▲ 导航栏


// ▼▼ 滚动到顶部缓动实现（滚动到顶部缓动实现，rate表示缓动速率，默认是2）
  var backToTop = function (rate) {
  var doc = document.body.scrollTop? document.body : document.documentElement;
  var scrollTop = doc.scrollTop;
  
  var top = function () {
      scrollTop = scrollTop + (0 - scrollTop) / (rate || 1);
      
      // 临界判断，终止动画
      if (scrollTop <= 1) {
          doc.scrollTop = 0;
          return;
      }
      doc.scrollTop = scrollTop;
      // 动画gogogo!
      requestAnimationFrame(top);    
  };
  top();
};
// ▲▲ 滚动到顶部缓动实现


// ▼▼ 判断是 Chrome 就用回到顶部(0)的动效
var isChromium = window.chrome;
if (isChromium) {
  document.getElementById('toTop').setAttribute('onclick','backToTop(0)');
  console.log('Chrome!');
};
// ▲▲ 判断是 Chrome 就用回到顶部(0)的动效



// ▼▼ 滚动出现返回顶部
var sideButton = document.getElementById('sideButton');
window.onscroll = function(){
  if (document.documentElement.scrollTop < 150){  // 滚动时动态检测距离
    sideButton.classList.add("hidden");
    console.log('<150');
  } else {
    sideButton.classList.remove("hidden");
    console.log('>150');
  }
}

if (document.documentElement.scrollTop < 150) { // 刚进网页 静止时检测距离
  sideButton.classList.add("hidden");
} else {
  sideButton.classList.remove("hidden");
}
// ▲▲ 滚动出现返回顶部



// ▼▼ 博客 - 复制链接
var blogLink = document.getElementById('blogLink');
var copyLink = document.getElementById('copyLink');
var copied = document.getElementById('copied');
var clipboard = new ClipboardJS(blogLink);
clipboard.on('success', function (e) { 
  console.log(e);
  console.log(copied);
  copyLink.classList.toggle('hide');
  copied.classList.toggle('hide');
});

copied.onclick = function() {
  copyLink.classList.toggle('hide');
  copied.classList.toggle('hide');
}

var blogLinkTop = document.getElementById('blogLinkTop'); //复制前图标
var copiedLinkTop = document.getElementById('copiedLinkTop'); //复制成功图标
var clipboard2 = new ClipboardJS(blogLinkTop);
var clipboard3 = new ClipboardJS(copiedLinkTop);
clipboard2.on('success', function (e) { 
  console.log(e);
  blogLinkTop.classList.toggle('hide');
  copiedLinkTop.classList.toggle('hide');
});
copiedLinkTop.onclick = function() {
  blogLinkTop.classList.toggle('hide');
  copiedLinkTop.classList.toggle('hide');
}

// ▲▲ 博客 - 复制链接



// ▼▼ 创建 DOM
var popContactPopover = document.createElement('div');
popContactPopover.setAttribute('id','popover');
popContactPopover.setAttribute('class','contact-popover');
document.body.appendChild(popContactPopover);

var popPopoverContent = document.createElement('div');
popPopoverContent.setAttribute('id','popoverContent');
popPopoverContent.setAttribute('class','popover-content hidden');
popContactPopover.appendChild(popPopoverContent);

var popPopoverMask = document.createElement('div');
popPopoverMask.setAttribute('id','popoverMask');
popPopoverMask.setAttribute('class','popover-mask hidden');
popContactPopover.appendChild(popPopoverMask);

var popImg = document.createElement('img');
popImg.setAttribute('width','240');
popImg.setAttribute('height','240');
popImg.setAttribute('src','../resume/qr-code.png');
popImg.setAttribute('alt','李瑞东的微信二维码');
popPopoverContent.appendChild(popImg);

var popText = document.createElement('p');
popText.setAttribute('class', 'scan-desc-pc');
popText.innerHTML='扫一扫加我微信';
popPopoverContent.appendChild(popText);

var popText2 = document.createElement('p');
popText2.setAttribute('class', 'scan-desc-mobile');
popText2.innerHTML='长按识别加我微信';
popPopoverContent.appendChild(popText2);
// ▲▲ 创建 DOM

// ▼▼ 首页联系卡片
    var popover = document.getElementById('popover');
    var popoverContent = document.getElementById('popoverContent');
    var contactBtn = document.getElementById('contactBtn');
    var popoverMask = document.getElementById('popoverMask');
    contactBtn.onclick = function(){
      popoverContent.classList.toggle("hidden");
      popoverMask.classList.toggle("hidden");
      document.body.classList.add("stop-scrolling");
      //屏蔽滚动（Safari）
      popoverContent.addEventListener('touchmove', e => { 
          e.preventDefault()
      }, false)
      popoverMask.addEventListener('touchmove', e => {
        e.preventDefault()
      }, false)
    }
    popoverMask.onclick = function(){
      popoverContent.classList.toggle("hidden");
      popoverMask.classList.toggle("hidden");
      document.body.classList.remove("stop-scrolling");
    }
    
    document.onkeydown = function(e){ //对整个页面监听  
        if (27 == e.keyCode){  // ESC 关闭弹窗
          popoverContent.classList.add('hidden');
          popoverMask.classList.add('hidden');
          document.body.classList.remove("stop-scrolling");
        }
      };
// ▲▲ 首页联系卡片

