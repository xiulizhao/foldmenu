(function (root, factory) {
  /* CommonJS */
  if (typeof exports == "object") module.exports = factory();
  /* AMD module */
  else if (typeof define == "function" && define.amd) define(factory);

  /*第一处修改，将wwtemplate改为元素名(data-wwclass的值)*/
  else root.foldmenu = factory();
}(this, function () {
  "use strict";

  /*第二处修改，将wwtemplate改为元素名(data-wwclass的值)*/
  var wwclassName = /*INSBEGIN:WWCLSNAME*/
    "foldmenu"
    /*INSEND:WWCLSNAME*/
    ;

  //默认没有依赖资源
  function loadDependence(fncallback) {
    if (typeof fncallback === "function") {
      fncallback();
    }
  }

  /* 加载依赖资源, 如没有依赖资源可直接回调
  var loadDependence = function(fncallback) {
    // 这里依赖具体的依赖对象，由于可能从其它元素中被加载，因此名称需要使用依赖库的名称，并需要settimeout来等待。
    // 本模板只支持一个依赖库，如果需要多个依赖库，需要改进。
    if (!window.wwload.qrcode) {
      window.wwload.qrcode = "wait";
      requirejs.config({
        paths: {
          "qrcode": "libs/qrcodejs/qrcode"
        },
        "shim": {
          "qrcode": {
            deps: ["jquery"]
          }
        }
      });
      require(["qrcode"], function() {
        window.wwload.qrcode = true;
        replace();
        fncallback();
      });
    } else if (window.wwload.qrcode === "wait") {
      setTimeout(function () {
        loadDependence(fncallback);
      }, 100);
    } else {
      replace();
      fncallback();
    }
 
    function replace() {
      loadDependence = function(fncallback) {
        fncallback();
      };
    }
  };
  //*/


  // 本函数处理元素初始化动作
  var init = function () {
    init = function () {
      return true;
    };

    $.wwclass.addEvtinHandler(wwclassName, evtInHandler);

    // 如有其他初始化动作, 请继续在下方添加
  };
  function xiala($ele) {
    $ele.find("ul,ol").not("li.open > ul, li.open > ol").css("display", "none");
    // 对 $ele 元素做对应处理
    var open = $ele.attr("data-open");

    $ele.on("click", ".control", function (e) {

      // console.log(e);
      e.preventDefault();
      e.stopPropagation();
      var $ele = $(e.currentTarget);
      var $targetLi = $ele.parents("li").first();
      var $otherLi = $targetLi.siblings();
      var $targetUl = $targetLi.children("ul,ol");
      if ($targetLi.is(".disabled")) {
        return;
      }

      if (open == "true") {

        $otherLi.removeClass("open").find("ul,ol").hide(300);
        $otherLi.find("li").removeClass("open");
      }

      $targetLi.toggleClass("open");
      $targetUl.toggle(300);
    });

    $ele.on("click", "li:not(.disabled)", function (e) {
      e.stopPropagation();
      var $ele = $(e.currentTarget);
      var $targetLi = $ele;
      var $otherLi = $targetLi.siblings();
      $(e.delegateTarget).find("li").removeClass("active");
      $targetLi.addClass("active");
      // $targetLi.find("li").removeClass("active");
      $targetLi.parentsUntil(e.delegateTarget).addClass("active");
      $targetLi.parentsUntil('[data-wwclass="foldmenu"]').filter("li").addClass("open");
      $targetLi.parentsUntil('[data-wwclass="foldmenu"]').filter("ul").css("display", "block");
      $(e.delegateTarget).trigger("activechange");
    });
  }

  // 元素初始化——每个wwclass元素只会被初始化一次。, 传入了元素对象($前缀表明是一个jquery对象).
  function processElement($ele) {
    setTimeout(function () {
      xiala($ele);
    }, 500)

  };

  // 元素析构——每个wwclass元素只会被析构一次。, 传入了元素对象($前缀表明是一个jquery对象).
  function finalizeElement($ele) {
    // 对 $ele 元素做对应处理
  };

  // 监听属性相关处理
  var evtInHandler = function ($ele, attribute, value) {
    // 处理代码
    switch (attribute) {
      /*case "data--show":
        // 添加处理动作
        break;*/
      case "finalize":
        finalizeElement($ele);
        break;
      default:
        console.info("监听到 " + attribute + " 属性值改变为 " + value + ", 但是没找到对应处理动作.");
    }
  };

  // 以下部分不需要修改
  if (!$.wwclass) {
    console.error("Can not use without wwclass.js");
    return false;
  }

  var ret = /*INSBEGIN:WWCLSHANDLER*/
    function (set) {
      if (set.length > 0) {
        loadDependence(function () {
          init();
          $(set).each(function (index, targetDom) {
            processElement($(targetDom));
          });
        });
      }
    }
    /*INSEND:WWCLSHANDLER*/
    ;

  return ret;

}));
