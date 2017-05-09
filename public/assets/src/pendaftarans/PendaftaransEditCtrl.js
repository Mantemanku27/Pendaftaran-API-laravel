app.controller('PendaftaransEditCtrl', ['$state', '$scope', 'pendaftarans', 'SweetAlert', 'toaster', '$stateParams', function ($state, $scope, pendaftarans, SweetAlert, toaster, mdToast, $stateParams) {
    $scope.id = $scope.$stateParams.id;
    //edit pendaftarans
    //If Id is empty, then redirected
    if ($scope.id == null || $scope.id == '') {
        $state.go("app.dasboard")
    }
    $scope.isLoading = true;
    $scope.isLoaded = false;

    $scope.setLoader = function (status) {
        if (status == true) {
            $scope.isLoading = true;
            $scope.isLoaded = false;
        } else {
            $scope.isLoading = false;
            $scope.isLoaded = true;
        }
    };

    //Init input form variable
    $scope.input = {};

    //Set process status to false
    $scope.process = false;

    //Init Alert status
    $scope.alertset = {
        show: 'hide',
        class: 'green',
        msg: ''
    };
    //get lass pendaftarans



    //Run Ajax
    pendaftarans.show($scope.id)
        .success(function (data) {
            $scope.setLoader(false);
            $scope.myModel = data;
            $scope.objjurusan = [];
            pendaftarans.getListjurusan($scope.myModel.formulirs_id)
                .success(function (datajk) {
                    datajk.unshift({ id: 0, nama: 'Silahkan Pilih Jurusan' });
                    $scope.objjurusan = datajk;
                    $scope.myModel.jurusans = $scope.objjurusan[0];
                    $scope.myModel.jurusans = $scope.objjurusan[findWithAttr($scope.objjurusan, 'id', parseInt(data.jurusans_id))];
                });

        });


    //Submit Data
    $scope.updateData = function () {
        $scope.alerts = [];
        //Set process status
        $scope.process = true;

        //Close Alert
        // $scope.alertset.show = 'hide';

        //Check validation status
        if ($scope.Form.$valid) {
            //run Ajax
            $scope.myModel.jurusans_id = $scope.myModel.jurusans.id
            pendaftarans.update($scope.myModel)
                .success(function (data) {
                    if (data.updated == true) {
                        //If back to list after submitting
                        //Redirect to akun
                        window.location = "/pendaftaran#/app/pendaftarans/" + $scope.myModel.formulirs_id;

                        $state.go('app.pendaftarans');
                        $scope.toaster = {
                            type: 'success',
                            title: 'Sukses',
                            text: 'Update Data Berhasil!'
                        };
                        toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);

                    }


                })
                .error(function (data, status) {
                    // unauthorized
                    if (status === 401) {
                        //redirect to login
                        $scope.redirect();
                    }
                    $scope.sup();
                    // Stop Loading
                    $scope.process = false;
                    $scope.alerts.push({
                        type: 'danger',
                        msg: data.validation
                    });
                    $scope.toaster = {
                        type: 'error',
                        title: 'Gagal',
                        text: 'Update Data Gagal!'
                    };
                    toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
                });
        }
    };

    function findWithAttr(array, attr, value) {
        for (var i = 0; i < array.length; i += 1) {
            if (array[i][attr] === value) {
                return i;
            }
        }
    }
}]);