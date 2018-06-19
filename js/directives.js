/**
 * Main directives.js file
 * Define directives for used plugin
 *
 *
 * Functions (directives)
 *  - sideNavigation
 *  - iboxTools
 *  - minimalizaSidebar
 *  - vectorMap
 *  - sparkline
 *  - icheck
 *  - ionRangeSlider
 *  - dropZone
 *  - responsiveVideo
 *  - chatSlimScroll
 *  - customValid
 *  - fullScroll
 *  - closeOffCanvas
 *  - clockPicker
 *  - landingScrollspy
 *  - fitHeight
 *  - iboxToolsFullScreen
 *  - slimScroll
 *  - truncate
 *  - touchSpin
 *  - markdownEditor
 *  - resizeable
 *  - bootstrapTagsinput
 *  - passwordMeter
 *
 */


/**
 * pageTitle - Directive for set Page title - mata title
 */
function pageTitle ($rootScope, $timeout) {
  return {
    link: function (scope, element) {
      var listener = function (event, toState, toParams, fromState, fromParams) {
        // Default title - load on Dashboard 1
        var title = '舵定分';
        // Create your own title pattern
        if (toState.data && toState.data.pageTitle) title = '舵定分 | ' + toState.data.pageTitle;
        $timeout(function () {
          element.text(title);
        });
      };
      $rootScope.$on('$stateChangeSuccess', listener);
    }
  }
};

/**
 * sideNavigation - Directive for run metsiMenu on sidebar navigation
 */
function sideNavigation ($timeout) {
  return {
    restrict: 'A',
    link: function (scope, element) {
      // Call the metsiMenu plugin and plug it to sidebar navigation
      $timeout(function () {
        element.metisMenu();

      });

      // Colapse menu in mobile mode after click on element
      var menuElement = $('#side-menu a:not([href$="\\#"])');
      menuElement.click(function () {
        if ($(window).width() < 769) {
          $("body").toggleClass("mini-navbar");
        }
      });

      // Enable initial fixed sidebar
      if ($("body").hasClass('fixed-sidebar')) {
        var sidebar = element.parent();
        sidebar.slimScroll({
          height: '100%',
          railOpacity: 0.9,
        });
      }
    }
  };
};

/**
 * responsibleVideo - Directive for responsive video
 */
function responsiveVideo () {
  return {
    restrict: 'A',
    link: function (scope, element) {
      var figure = element;
      var video = element.children();
      video
        .attr('data-aspectRatio', video.height() / video.width())
        .removeAttr('height')
        .removeAttr('width')

      //We can use $watch on $window.innerWidth also.
      $(window).resize(function () {
        var newWidth = figure.width();
        video
          .width(newWidth)
          .height(newWidth * video.attr('data-aspectRatio'));
      }).resize();
    }
  }
}

/**
 * iboxTools - Directive for iBox tools elements in right corner of ibox
 */
function iboxTools ($timeout) {
  return {
    restrict: 'A',
    scope: true,
    templateUrl: 'views/common/ibox_tools.html',
    controller: function ($scope, $element) {
      // Function for collapse ibox
      $scope.showhide = function () {
        var ibox = $element.closest('div.ibox');
        var icon = $element.find('i:first');
        var content = ibox.children('.ibox-content');
        content.slideToggle(200);
        // Toggle icon from up to down
        icon.toggleClass('fa-chevron-down').toggleClass('fa-chevron-up');
        ibox.toggleClass('').toggleClass('border-bottom');
        $timeout(function () {
          ibox.resize();
          ibox.find('[id^=map-]').resize();
        }, 50);
      };
      // Function for close ibox
      $scope.closebox = function () {
        var ibox = $element.closest('div.ibox');
        ibox.remove();
      }
    }
  };
}

/**
 * iboxTools with full screen - Directive for iBox tools elements in right corner of ibox with full screen option
 */
function iboxToolsFullScreen ($timeout) {
  return {
    restrict: 'A',
    scope: true,
    templateUrl: 'views/common/ibox_tools_full_screen.html',
    controller: function ($scope, $element) {
      // Function for collapse ibox
      $scope.showhide = function () {
        var ibox = $element.closest('div.ibox');
        var icon = $element.find('i:first');
        var content = ibox.children('.ibox-content');
        content.slideToggle(200);
        // Toggle icon from up to down
        icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
        ibox.toggleClass('').toggleClass('border-bottom');
        $timeout(function () {
          ibox.resize();
          ibox.find('[id^=map-]').resize();
        }, 50);
      };
      // Function for close ibox
      $scope.closebox = function () {
        var ibox = $element.closest('div.ibox');
        ibox.remove();
      };
      // Function for full screen
      $scope.fullscreen = function () {
        var ibox = $element.closest('div.ibox');
        var button = $element.find('i.fa-expand');
        $('body').toggleClass('fullscreen-ibox-mode');
        button.toggleClass('fa-expand').toggleClass('fa-compress');
        ibox.toggleClass('fullscreen');
        setTimeout(function () {
          $(window).trigger('resize');
        }, 100);
      }
    }
  };
}

/**
 * minimalizaSidebar - Directive for minimalize sidebar
 */
function minimalizaSidebar ($timeout) {
  return {
    restrict: 'A',
    template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',
    controller: function ($scope, $element) {
      $scope.minimalize = function () {
        $("body").toggleClass("mini-navbar");
        if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
          // Hide menu in order to smoothly turn on when maximize menu
          $('#side-menu').hide();
          // For smoothly turn on menu
          setTimeout(
            function () {
              $('#side-menu').fadeIn(400);
            }, 200);
        } else if ($('body').hasClass('fixed-sidebar')) {
          $('#side-menu').hide();
          setTimeout(
            function () {
              $('#side-menu').fadeIn(400);
            }, 100);
        } else {
          // Remove all inline style from jquery fadeIn function to reset menu state
          $('#side-menu').removeAttr('style');
        }
      }
    }
  };
};


function closeOffCanvas () {
  return {
    restrict: 'A',
    template: '<a class="close-canvas-menu" ng-click="closeOffCanvas()"><i class="fa fa-times"></i></a>',
    controller: function ($scope, $element) {
      $scope.closeOffCanvas = function () {
        $("body").toggleClass("mini-navbar");
      }
    }
  };
}

/**
 * vectorMap - Directive for Vector map plugin
 */
function vectorMap () {
  return {
    restrict: 'A',
    scope: {
      myMapData: '=',
    },
    link: function (scope, element, attrs) {
      var map = element.vectorMap({
        map: 'world_mill_en',
        backgroundColor: "transparent",
        regionStyle: {
          initial: {
            fill: '#e4e4e4',
            "fill-opacity": 0.9,
            stroke: 'none',
            "stroke-width": 0,
            "stroke-opacity": 0
          }
        },
        series: {
          regions: [
            {
              values: scope.myMapData,
              scale: ["#1ab394", "#22d6b1"],
              normalizeFunction: 'polynomial'
            }
          ]
        },
      });
      var destroyMap = function () {
        element.remove();
      };
      scope.$on('$destroy', function () {
        destroyMap();
      });
    }
  }
}


/**
 * sparkline - Directive for Sparkline chart
 */
function sparkline () {
  return {
    restrict: 'A',
    scope: {
      sparkData: '=',
      sparkOptions: '=',
    },
    link: function (scope, element, attrs) {
      scope.$watch(scope.sparkData, function () {
        render();
      });
      scope.$watch(scope.sparkOptions, function () {
        render();
      });
      var render = function () {
        $(element).sparkline(scope.sparkData, scope.sparkOptions);
      };
    }
  }
};

/**
 * icheck - Directive for custom checkbox icheck
 */
function icheck ($timeout) {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function ($scope, element, $attrs, ngModel) {
      return $timeout(function () {
        var value;
        value = $attrs['value'];

        $scope.$watch($attrs['ngModel'], function (newValue) {
          $(element).iCheck('update');
        })

        return $(element).iCheck({
          checkboxClass: 'icheckbox_square-green',
          radioClass: 'iradio_square-green'

        }).on('ifChanged', function (event) {
          if ($(element).attr('type') === 'checkbox' && $attrs['ngModel']) {
            $scope.$apply(function () {
              return ngModel.$setViewValue(event.target.checked);
            });
          }
          if ($(element).attr('type') === 'radio' && $attrs['ngModel']) {
            return $scope.$apply(function () {
              return ngModel.$setViewValue(value);
            });
          }
        });
      });
    }
  };
}

/**
 * ionRangeSlider - Directive for Ion Range Slider
 */
function ionRangeSlider () {
  return {
    restrict: 'A',
    scope: {
      rangeOptions: '='
    },
    link: function (scope, elem, attrs) {
      elem.ionRangeSlider(scope.rangeOptions);
    }
  }
}

/**
 * dropZone - Directive for Drag and drop zone file upload plugin
 */
function dropZone () {
  return {
    restrict: 'C',
    link: function (scope, element, attrs) {

      var config = {
        url: 'http://localhost:8080/upload',
        maxFilesize: 100,
        paramName: "uploadfile",
        maxThumbnailFilesize: 10,
        parallelUploads: 1,
        autoProcessQueue: false
      };

      var eventHandlers = {
        'addedfile': function (file) {
          scope.file = file;
          if (this.files[1] != null) {
            this.removeFile(this.files[0]);
          }
          scope.$apply(function () {
            scope.fileAdded = true;
          });
        },

        'success': function (file, response) {
        }

      };

      dropzone = new Dropzone(element[0], config);

      angular.forEach(eventHandlers, function (handler, event) {
        dropzone.on(event, handler);
      });

      scope.processDropzone = function () {
        dropzone.processQueue();
      };

      scope.resetDropzone = function () {
        dropzone.removeAllFiles();
      }
    }
  }
}

/**
 * chatSlimScroll - Directive for slim scroll for small chat
 */
function chatSlimScroll ($timeout) {
  return {
    restrict: 'A',
    link: function (scope, element) {
      $timeout(function () {
        element.slimscroll({
          height: '234px',
          railOpacity: 0.4
        });

      });
    }
  };
}

/**
 * customValid - Directive for custom validation example
 */
function customValid () {
  return {
    require: 'ngModel',
    link: function (scope, ele, attrs, c) {
      scope.$watch(attrs.ngModel, function () {

        // You can call a $http method here
        // Or create custom validation

        var validText = "Inspinia";

        if (scope.extras == validText) {
          c.$setValidity('cvalid', true);
        } else {
          c.$setValidity('cvalid', false);
        }

      });
    }
  }
}


/**
 * fullScroll - Directive for slimScroll with 100%
 */
function fullScroll ($timeout) {
  return {
    restrict: 'A',
    link: function (scope, element) {
      $timeout(function () {
        element.slimscroll({
          height: '100%',
          railOpacity: 0.9
        });

      });
    }
  };
}

/**
 * slimScroll - Directive for slimScroll with custom height
 */
function slimScroll ($timeout) {
  return {
    restrict: 'A',
    scope: {
      boxHeight: '@'
    },
    link: function (scope, element) {
      $timeout(function () {
        element.slimscroll({
          height: scope.boxHeight,
          railOpacity: 0.9
        });

      });
    }
  };
}

/**
 * clockPicker - Directive for clock picker plugin
 */
function clockPicker () {
  return {
    restrict: 'A',
    link: function (scope, element) {
      element.clockpicker();
    }
  };
};


/**
 * landingScrollspy - Directive for scrollspy in landing page
 */
function landingScrollspy () {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      element.scrollspy({
        target: '.navbar-fixed-top',
        offset: 80
      });
    }
  }
}

/**
 * fitHeight - Directive for set height fit to window height
 */
function fitHeight () {
  return {
    restrict: 'A',
    link: function (scope, element) {
      element.css("height", $(window).height() + "px");
      element.css("min-height", $(window).height() + "px");
    }
  };
}

/**
 * truncate - Directive for truncate string
 */
function truncate ($timeout) {
  return {
    restrict: 'A',
    scope: {
      truncateOptions: '='
    },
    link: function (scope, element) {
      $timeout(function () {
        element.dotdotdot(scope.truncateOptions);

      });
    }
  };
}


/**
 * touchSpin - Directive for Bootstrap TouchSpin
 */
function touchSpin () {
  return {
    restrict: 'A',
    scope: {
      spinOptions: '='
    },
    link: function (scope, element, attrs) {
      scope.$watch(scope.spinOptions, function () {
        render();
      });
      var render = function () {
        $(element).TouchSpin(scope.spinOptions);
      };
    }
  }
};

/**
 * markdownEditor - Directive for Bootstrap Markdown
 */
function markdownEditor () {
  return {
    restrict: "A",
    require: 'ngModel',
    link: function (scope, element, attrs, ngModel) {
      $(element).markdown({
        savable: false,
        onChange: function (e) {
          ngModel.$setViewValue(e.getContent());
        }
      });
    }
  }
};


/**
 * passwordMeter - Directive for jQuery Password Strength Meter
 */
function passwordMeter () {
  return {
    restrict: 'A',
    scope: {
      pwOptions: '='
    },
    link: function (scope, element, attrs) {
      scope.$watch(scope.pwOptions, function () {
        render();
      });
      var render = function () {
        $(element).pwstrength(scope.pwOptions);
      };
    }
  }
}

function datePicker () {
  return {
    restrict: 'E',
    template: '<input class>',
    // ng-class="{true: 'actived', false: 'inactive'}[this.focus]" ng-blur="this.focus=false" ng-focus="this.focus=true"
    replace: true,
    scope: false,
    link: function (scope, element, attr) {
      laydate.render({
        elem: element[0],
        done: function (value) {
          scope.$parent[attr.ngModel] = value
        }
      });
    }
  }
}

function myDatePicker ($timeout, dateFilter) {
  return {
    restrict: 'E',
    template: '<input class ng-model="date" ng-change="changeDate">',
    replace: true,
    scope: {
      date: '=',
      dateMin: '=',
      dateMax: '=',
      dateType: '=',
      changeDate: '&changeDate'
    },
    link: function (scope, element, attr) {
      var today = dateFilter(new Date(), 'yyyy-MM-dd');
      laydate.render({
        elem: element[0],
        type: scope.dateType || 'date',
        min: scope.dateMin || '1970-1-1',
        max: scope.dateMax || '2100-12-31',
        done: function (val) {
          scope.$apply(function () {
            scope.date = val;
          });
          scope.changeDate()
        }
      });
    }
  }
}

// 说明：res格式必须如下，否则将出现不可预知的错误
/*
{
    currentPage: num,
    dataList: [{}, {}, {}, ...],
    totalcount: num
}
 */
function drawTable ($compile, REST) {
  return {
    restrict: 'E',
    template: '<table id class></table>',
    replace: true,
    scope: {
      tableConfig: '='
    },
    link: function (scope, element, attr) {
      var conf = {
        cache: false,
        striped: true,
        pagination: true,
        pageSize: 10,
        pageList: [],
        sidePagination: 'server',
        search: false,
        showColumns: false,
        showRefresh: false,
        minimumCountColumns: 2,
        clickToSelect: true,
        showToggle: false,
        cardView: scope.$root.isSmart,
        maintainSelected: true,
        onPostBody: function () {
          $('.page-number.active').addClass('disabled');
        },
        onPageChange: function (pageNum, pageSize) {
          drawTable(pageNum)
        },
        onLoadError: function (a, b, c) {
          console.error(a, b, c)
        },
        formatLoadingMessage: function () {
          return '数据加载中，请稍候！'
        },
        formatNoMatches: function () {
          return '暂无匹配的记录！'
        }
      };
      angular.extend(conf, scope.tableConfig);

      function drawTable (pageNum) {
        element.bootstrapTable('showLoading');
        REST.get(conf.tabelDateUrl + '&pageSize=' + conf.pageSize + '&pageIndex=' + pageNum)
          .then(function (res) {
            // if(res.dataList.length > 0){
            draw(res)
            // }else{
            //     element.bootstrapTable.
            // }
          }, function (err) {
            console.log(err)
          })
      }

      drawTable(1);

      function draw (table) {
        conf.data = table.dataList;
        conf.pageNumber = table.currentPage;
        conf.totalRows = table.totalcount;
        element.bootstrapTable('destroy');
        $compile(element.bootstrapTable(conf))(scope);
      }

      scope.$watch('tableConfig.tabelDateUrl', function (n, o) {
        if (n !== o) {
          conf.tabelDateUrl = n;
          drawTable(1);
        }
      });

      scope.$on('tableHandle', function (event, data) {
        switch (data) {
          case 'delete' :
            deleteItems();
            break
        }
      });

      function deleteItems () {
        if (element.bootstrapTable('getSelections').length < 1) {
          REST.pop('error', '', '请至少选择一条记录！', 2000);
          return
        }
        var arr = [];
        element.bootstrapTable('getSelections').forEach(function (val, ind) {
          arr.push(val.companyId)
        });

        REST.get('manage/deleteManageCompany.do?companyId=' + arr.join(',')).then(
          function (res) {
            REST.pop('success', '', res.message, 2000);
            drawTable(1);
          }, function (err) {

          }
        )
      }
    }
  }
}

/**
 * I lazily load the images, when they come into view.
 * @param $window
 * @param $document
 * @returns {{link: link, restrict: string}}
 * eg: <img bn-lazy-src="{{img.attchPath}}">
 */
function bnLazySrc ($window, $document) {
  // I manage all the images that are currently being
  // monitored on the page for lazy loading.
  var lazyLoader = (function () {
    // I maintain a list of images that lazy-loading
    // and have yet to be rendered.
    var images = [];
    // I define the render timer for the lazy loading
    // images to that the DOM-querying (for offsets)
    // is chunked in groups.
    var renderTimer = null;
    var renderDelay = 100;
    // I cache the window element as a jQuery reference.
    var win = $($window);
    // I cache the document document height so that
    // we can respond to changes in the height due to
    // dynamic content.
    var doc = $document;
    var documentHeight = doc.height();
    var documentTimer = null;
    var documentDelay = 2000;
    // I determine if the window dimension events
    // (ie. resize, scroll) are currenlty being
    // monitored for changes.
    var isWatchingWindow = false;
    // ---
    // PUBLIC METHODS.
    // ---
    // I start monitoring the given image for visibility
    // and then render it when necessary.
    function addImage (image) {
      images.push(image);
      if (!renderTimer) {
        startRenderTimer();
      }
      if (!isWatchingWindow) {
        startWatchingWindow();
      }
    }

    // I remove the given image from the render queue.
    function removeImage (image) {
      // Remove the given image from the render queue.
      for (var i = 0; i < images.length; i++) {
        if (images[i] === image) {
          images.splice(i, 1);
          break;
        }
      }
      // If removing the given image has cleared the
      // render queue, then we can stop monitoring
      // the window and the image queue.
      if (!images.length) {
        clearRenderTimer();
        stopWatchingWindow();
      }
    }

    // ---
    // PRIVATE METHODS.
    // ---
    // I check the document height to see if it's changed.
    function checkDocumentHeight () {
      // If the render time is currently active, then
      // don't bother getting the document height -
      // it won't actually do anything.
      if (renderTimer) {
        return;
      }
      var currentDocumentHeight = doc.height();
      // If the height has not changed, then ignore -
      // no more images could have come into view.
      if (currentDocumentHeight === documentHeight) {
        return;
      }
      // Cache the new document height.
      documentHeight = currentDocumentHeight;
      startRenderTimer();
    }

    // I check the lazy-load images that have yet to
    // be rendered.
    function checkImages () {
      // Log here so we can see how often this
      // gets called during page activity.
      console.log("Checking for visible images...");
      var visible = [];
      var hidden = [];
      // Determine the window dimensions.
      var windowHeight = win.height();
      var scrollTop = win.scrollTop();
      // Calculate the viewport offsets.
      var topFoldOffset = scrollTop;
      var bottomFoldOffset = (topFoldOffset + windowHeight);
      // Query the DOM for layout and seperate the
      // images into two different categories: those
      // that are now in the viewport and those that
      // still remain hidden.
      for (var i = 0; i < images.length; i++) {
        var image = images[i];
        if (image.isVisible(topFoldOffset, bottomFoldOffset)) {
          visible.push(image);
        } else {
          hidden.push(image);
        }
      }
      // Update the DOM with new image source values.
      for (var i = 0; i < visible.length; i++) {
        visible[i].render();
      }
      // Keep the still-hidden images as the new
      // image queue to be monitored.
      images = hidden;
      // Clear the render timer so that it can be set
      // again in response to window changes.
      clearRenderTimer();
      // If we've rendered all the images, then stop
      // monitoring the window for changes.
      if (!images.length) {
        stopWatchingWindow();
      }
    }

    // I clear the render timer so that we can easily
    // check to see if the timer is running.
    function clearRenderTimer () {
      clearTimeout(renderTimer);
      renderTimer = null;
    }

    // I start the render time, allowing more images to
    // be added to the images queue before the render
    // action is executed.
    function startRenderTimer () {
      renderTimer = setTimeout(checkImages, renderDelay);
    }

    // I start watching the window for changes in dimension.
    function startWatchingWindow () {
      isWatchingWindow = true;
      // Listen for window changes.
      win.on("resize.bnLazySrc", windowChanged);
      win.on("scroll.bnLazySrc", windowChanged);
      // Set up a timer to watch for document-height changes.
      documentTimer = setInterval(checkDocumentHeight, documentDelay);
    }

    // I stop watching the window for changes in dimension.
    function stopWatchingWindow () {
      isWatchingWindow = false;
      // Stop watching for window changes.
      win.off("resize.bnLazySrc");
      win.off("scroll.bnLazySrc");
      // Stop watching for document changes.
      clearInterval(documentTimer);
    }

    // I start the render time if the window changes.
    function windowChanged () {
      if (!renderTimer) {
        startRenderTimer();
      }
    }

    // Return the public API.
    return ({
      addImage: addImage,
      removeImage: removeImage
    });
  })();
  // ------------------------------------------ //
  // ------------------------------------------ //
  // I represent a single lazy-load image.
  function LazyImage (element) {
    // I am the interpolated LAZY SRC attribute of
    // the image as reported by AngularJS.
    var source = null;
    // I determine if the image has already been
    // rendered (ie, that it has been exposed to the
    // viewport and the source had been loaded).
    var isRendered = false;
    // I am the cached height of the element. We are
    // going to assume that the image doesn't change
    // height over time.
    var height = null;
    // ---
    // PUBLIC METHODS.
    // ---
    // I determine if the element is above the given
    // fold of the page.
    function isVisible (topFoldOffset, bottomFoldOffset) {
      // If the element is not visible because it
      // is hidden, don't bother testing it.
      if (!element.is(":visible")) {
        return (false);
      }
      // If the height has not yet been calculated,
      // the cache it for the duration of the page.
      if (height === null) {
        height = element.height();
      }
      // Update the dimensions of the element.
      var top = element.offset().top;
      var bottom = (top + height);
      // Return true if the element is:
      // 1. The top offset is in view.
      // 2. The bottom offset is in view.
      // 3. The element is overlapping the viewport.
      return (
        (
          (top <= bottomFoldOffset) &&
          (top >= topFoldOffset)
        )
        ||
        (
          (bottom <= bottomFoldOffset) &&
          (bottom >= topFoldOffset)
        )
        ||
        (
          (top <= topFoldOffset) &&
          (bottom >= bottomFoldOffset)
        )
      );

    }

    // I move the cached source into the live source.
    function render () {
      isRendered = true;
      renderSource();
    }

    // I set the interpolated source value reported
    // by the directive / AngularJS.
    function setSource (newSource) {
      source = newSource;
      if (isRendered) {
        renderSource();
      }
    }

    // ---
    // PRIVATE METHODS.
    // ---
    // I load the lazy source value into the actual
    // source value of the image element.
    function renderSource () {
      element[0].src = source;
    }

    // Return the public API.
    return ({
      isVisible: isVisible,
      render: render,
      setSource: setSource
    });
  }

  // ------------------------------------------ //
  // ------------------------------------------ //
  // I bind the UI events to the scope.
  function link ($scope, element, attributes) {
    var lazyImage = new LazyImage(element);
    // Start watching the image for changes in its
    // visibility.
    lazyLoader.addImage(lazyImage);
    // Since the lazy-src will likely need some sort
    // of string interpolation, we don't want to
    attributes.$observe(
      "bnLazySrc",
      function (newSource) {
        lazyImage.setSource(newSource);
      }
    );
    // When the scope is destroyed, we need to remove
    // the image from the render queue.
    $scope.$on(
      "$destroy",
      function () {
        lazyLoader.removeImage(lazyImage);
      }
    );
  }

  // Return the directive configuration.
  return ({
    link: link,
    restrict: "A"
  });
}


/**
 *
 * Pass all functions into module
 */
app
  .directive('pageTitle', pageTitle)
  .directive('sideNavigation', sideNavigation)
  .directive('iboxTools', iboxTools)
  .directive('minimalizaSidebar', minimalizaSidebar)
  .directive('vectorMap', vectorMap)
  .directive('sparkline', sparkline)
  .directive('icheck', icheck)
  .directive('ionRangeSlider', ionRangeSlider)
  .directive('dropZone', dropZone)
  .directive('responsiveVideo', responsiveVideo)
  .directive('chatSlimScroll', chatSlimScroll)
  .directive('customValid', customValid)
  .directive('fullScroll', fullScroll)
  .directive('closeOffCanvas', closeOffCanvas)
  .directive('clockPicker', clockPicker)
  .directive('landingScrollspy', landingScrollspy)
  .directive('fitHeight', fitHeight)
  .directive('iboxToolsFullScreen', iboxToolsFullScreen)
  .directive('slimScroll', slimScroll)
  .directive('truncate', truncate)
  .directive('touchSpin', touchSpin)
  .directive('markdownEditor', markdownEditor)
  .directive('passwordMeter', passwordMeter)
  .directive('datePicker', datePicker)
  .directive('myDatePicker', myDatePicker)
  .directive('drawTable', drawTable)
  .directive('bnLazySrc', bnLazySrc);