$(() => {
    $('#loginForm').on('submit',(e)=>{
        e.preventDefault();
        alert("validating the user through ajax");
        $('#sem-login').modal('hide');
        return false;
    });

    $('#sem-reg').on('hidden.bs.modal', function(e)
    { 
        $('#username').val('');
        $('#name').val('');
        $('#password').val('');
        $('#confirmPass').val('');
    }) ;


    $('#regForm').on('submit',(e)=>{
        e.preventDefault();
        //alert("creating a new user through ajax");
        // RE to validate password: ^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$
        // is used in the HTML 5 
        
        // test the password and confirmed password are equal
        $('#passError').hide();
        if ($('#password').val() == $('#confirmPass').val() ){
            // passwords are equal and rest of data validated
            // save the user
            $('#sem-reg').modal('hide');
        }
        else {
            // passwords do not match display error message
            $('#password').val('');
            $('#confirmPass').val('');
            $('#passError').show();
            $('#passError').addClass('show');
        }

        return false;
    });
});