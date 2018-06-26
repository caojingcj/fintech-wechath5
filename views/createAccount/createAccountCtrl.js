/**
 *  Created by fangQing on 2018/06/14.
 */
(function () {
    'use strict';

    app
        .controller('createAccountCtrl', ['REST', '$timeout', '$state', '$scope','$stateParams',function (REST, $timeout, $state, $scope,$stateParams) {
            var vm = this;
            var mobile = REST.sessionParam('mobile', $stateParams.mobile === "" ? null : $stateParams.mobile);
            var order = REST.sessionParam('order', $stateParams.order === "" ? null : $stateParams.order);
            vm.handle = {
                nextStep:nextStep
            };

            vm.pic = 'http://manager-front.oss-cn-beijing.aliyuncs.com/manage/merchant/attach/20180614/999999/EK001-ddc8bec5-fde8-4816-bd34-208555585784-%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20180517135809.png';

            vm.picUp = 'http://weixin-front.oss-cn-beijing.aliyuncs.com/images/201806/21/YDC20180621175643815f24a23f0959045f5bcd5cc32ca1f88e42.jpg';
            vm.init = {
                protectProblem:[
                    {val:1,tit:'我的名字是？'},
                    {val:1,tit:'我的年龄？'},
                    {val:1,tit:'我的配偶的名字？'},
                    {val:1,tit:'我的第一家公司的名字？'}
                ]
            };

            function nextStep() {
                $('body').loading({
                    title:'请稍等',
                    name:'test',
                    discription:'数据加载中..',
                });

                setTimeout(function(){
                    $state.go('app.home',{mobile:mobile,order:order});
                    removeLoading('test');
                },1000);
            }
        }])
})();